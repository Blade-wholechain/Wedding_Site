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

function buildRsvpEmailBody(payload) {
  const { name, attending, guestType, dietary } = payload;
  const attendingLabel =
    attending === 'yes' ? 'Ja, ik kom' : attending === 'no' ? 'Helaas niet' : String(attending ?? '');
  const guestLabel =
    guestType === 'day' ? 'Daggast' : guestType === 'evening' ? 'Avondgast' : '—';
  const lines = [`Naam: ${name}`, `Komt: ${attendingLabel}`, `Type gast: ${guestLabel}`];
  if (attending === 'yes' && guestType === 'day') {
    lines.push(`Dieetvoorkeur: ${dietary || '—'}`);
  }
  return lines.join('\n');
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
  res.json({ ok: true, gmailConfigured: Boolean(APP_PASSWORD) });
});

app.post('/api/rsvp', async (req, res) => {
  console.log('[rsvp] handler entered');

  if (RSVP_SECRET && req.headers['x-rsvp-secret'] !== RSVP_SECRET) {
    console.warn('[rsvp] 401 — set header: curl -H "X-RSVP-Secret: …"');
    res.status(401).send('Unauthorized');
    return;
  }

  const transport = getTransporter();
  if (!transport) {
    console.warn('[rsvp] 503 — no GMAIL_APP_PASSWORD');
    res.status(503).type('text').send('RSVP email not configured (set GMAIL_APP_PASSWORD)');
    return;
  }

  const body = req.body ?? {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const attending = body.attending;
  if (!name || (attending !== 'yes' && attending !== 'no')) {
    console.warn('[rsvp] 400 — bad body', { hasName: Boolean(name), attending });
    res.status(400).json({ error: 'Missing name or attending' });
    return;
  }

  const text = buildRsvpEmailBody(body);

  try {
    await transport.sendMail({
      from: `"RSVP bruiloft" <${GMAIL_USER}>`,
      to: NOTIFY_TO,
      subject: `RSVP bruiloft — ${name}`,
      text,
    });
    console.log('[rsvp] mail sent ok');
    res.json({ ok: true });
  } catch (e) {
    console.error('[rsvp] sendMail failed:', e);
    res.status(500).type('text').send('Failed to send email');
  }
});

async function main() {
  transporter = await createMailTransport();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RSVP API listening on 0.0.0.0:${PORT}`);
    console.log(RSVP_SECRET ? 'RSVP_SECRET is set — POST /api/rsvp requires X-RSVP-Secret' : 'RSVP_SECRET not set — no secret header required');
    if (!APP_PASSWORD) {
      console.warn('GMAIL_APP_PASSWORD is not set — POST /api/rsvp will return 503 until you add it to .env');
    }
  });
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
