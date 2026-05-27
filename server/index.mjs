import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'node:dns';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';

dns.setDefaultResultOrder('ipv4first');

/** Used only if we fall back to hostname connect (resolve4 failed). */
function lookupIpv4(hostname, _options, callback) {
  dns.lookup(hostname, { family: 4 }, callback);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const PORT = Number(process.env.PORT ?? 3001);
const GMAIL_USER = process.env.GMAIL_USER ?? 'doelsenwyb@gmail.com';
const NOTIFY_TO = process.env.RSVP_NOTIFY_EMAIL ?? GMAIL_USER;
const APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RSVP_SECRET = process.env.RSVP_SECRET;

/** Prefer Resend on Render — many hosts block outbound SMTP (587); HTTPS always works. */
const USE_RESEND = Boolean(process.env.RESEND_API_KEY?.trim());

function normalizeRsvpGuests(payload) {
  const guests = Array.isArray(payload.guests)
    ? payload.guests
    : [
        {
          name: payload.name,
          attending: payload.attending,
          dietary: payload.dietary,
        },
      ];

  return guests.map((guest) => {
    const entry = guest && typeof guest === 'object' ? guest : {};
    return {
      name: typeof entry.name === 'string' ? entry.name.trim() : '',
      attending: entry.attending,
      dietary: typeof entry.dietary === 'string' ? entry.dietary.trim() : '',
    };
  });
}

function buildRsvpEmailBody(payload) {
  const guestLabel =
    payload.guestType === 'day' ? 'Daggast' : payload.guestType === 'evening' ? 'Avondgast' : '—';

  return normalizeRsvpGuests(payload)
    .map((guest, index) => {
      const attendingLabel =
        guest.attending === 'yes'
          ? 'Ja, ik kom'
          : guest.attending === 'no'
            ? 'Helaas niet'
            : String(guest.attending ?? '');
      const lines = [
        `Persoon ${index + 1}`,
        `Naam: ${guest.name}`,
        `Komt: ${attendingLabel}`,
        `Type gast: ${guestLabel}`,
      ];
      if (guest.attending === 'yes' && payload.guestType === 'day') {
        lines.push(`Dieetvoorkeur: ${guest.dietary || '—'}`);
      }
      return lines.join('\n');
    })
    .join('\n\n');
}

let transporter;

async function createMailTransport() {
  if (!APP_PASSWORD) return null;

  try {
    const addrs = await dns.promises.resolve4('smtp.gmail.com');
    if (addrs?.length) {
      const ip = addrs[0];
      console.log('[smtp] using Gmail A record (IPv4):', ip);
      return nodemailer.createTransport({
        host: ip,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: { user: GMAIL_USER, pass: APP_PASSWORD },
        tls: {
          servername: 'smtp.gmail.com',
        },
        connectionTimeout: 25_000,
        greetingTimeout: 20_000,
        socketTimeout: 45_000,
      });
    }
  } catch (e) {
    console.warn('[smtp] resolve4(smtp.gmail.com) failed:', e.message);
  }

  console.warn('[smtp] fallback: hostname smtp.gmail.com + IPv4-only DNS lookup');
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user: GMAIL_USER, pass: APP_PASSWORD },
    lookup: lookupIpv4,
    connectionTimeout: 25_000,
    greetingTimeout: 20_000,
    socketTimeout: 45_000,
  });
}

function getTransporter() {
  return transporter;
}

async function sendWithResend(subject, text) {
  const key = process.env.RESEND_API_KEY.trim();
  const from =
    process.env.RESEND_FROM?.trim() ?? `"RSVP bruiloft" <onboarding@resend.dev>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [NOTIFY_TO],
      subject,
      text,
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    console.error('[resend]', res.status, body);
    throw new Error(body || `Resend HTTP ${res.status}`);
  }
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.use((req, _res, next) => {
  console.log(`[req] ${req.method} ${req.url}`);
  next();
});

app.get('/', (_req, res) => {
  res.type('html').send(
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>RSVP API</title></head>' +
      '<body style="font-family:system-ui,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1rem">' +
      '<p>This URL is the <strong>RSVP backend</strong> for the wedding site. There is no webpage here.</p>' +
      '<p>Open <a href="/api/health">/api/health</a> to verify the service.</p>' +
      '</body></html>'
  );
});

app.get('/api/health', (_req, res) => {
  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  const hasSmtp = Boolean(APP_PASSWORD);
  res.json({
    ok: true,
    mailReady: hasResend || hasSmtp,
    provider: hasResend ? 'resend' : hasSmtp ? 'smtp' : 'none',
    resendConfigured: hasResend,
    gmailConfigured: hasSmtp,
  });
});

app.post('/api/rsvp', async (req, res) => {
  console.log('[rsvp] handler entered');

  if (RSVP_SECRET && req.headers['x-rsvp-secret'] !== RSVP_SECRET) {
    console.warn('[rsvp] 401 — set header: curl -H "X-RSVP-Secret: …"');
    res.status(401).send('Unauthorized');
    return;
  }

  const canSend = USE_RESEND || getTransporter();
  if (!canSend) {
    console.warn('[rsvp] 503 — set RESEND_API_KEY (Render) or GMAIL_APP_PASSWORD (local SMTP)');
    res.status(503).type('text').send('RSVP email not configured');
    return;
  }

  const body = req.body ?? {};
  const guests = normalizeRsvpGuests(body);
  const hasValidGuests =
    guests.length > 0 &&
    guests.length <= 2 &&
    guests.every((guest) => guest.name && (guest.attending === 'yes' || guest.attending === 'no'));

  if (!hasValidGuests) {
    console.warn('[rsvp] 400 — bad body', {
      guestCount: guests.length,
      guests: guests.map((guest) => ({
        hasName: Boolean(guest.name),
        attending: guest.attending,
      })),
    });
    res.status(400).json({ error: 'Missing RSVP guest details' });
    return;
  }

  const text = buildRsvpEmailBody(body);
  const subject = `RSVP bruiloft — ${guests.map((guest) => guest.name).join(' + ')}`;

  try {
    if (USE_RESEND) {
      await sendWithResend(subject, text);
      console.log('[rsvp] mail sent ok (Resend)');
    } else {
      await getTransporter().sendMail({
        from: `"RSVP bruiloft" <${GMAIL_USER}>`,
        to: NOTIFY_TO,
        subject,
        text,
      });
      console.log('[rsvp] mail sent ok (SMTP)');
    }
    res.json({ ok: true });
  } catch (e) {
    console.error('[rsvp] send failed:', e);
    res.status(500).type('text').send('Failed to send email');
  }
});

async function main() {
  if (USE_RESEND) {
    console.log('[mail] Using Resend API (HTTPS) — avoids blocked SMTP on many hosts');
    transporter = null;
  } else {
    transporter = await createMailTransport();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RSVP API listening on 0.0.0.0:${PORT}`);
    console.log(RSVP_SECRET ? 'RSVP_SECRET is set — POST /api/rsvp requires X-RSVP-Secret' : 'RSVP_SECRET not set — no secret header required');
    if (!USE_RESEND && !APP_PASSWORD) {
      console.warn('GMAIL_APP_PASSWORD not set — use RESEND_API_KEY on Render or Gmail locally');
    }
  });
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
