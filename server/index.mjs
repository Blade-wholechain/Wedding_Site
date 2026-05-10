import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'node:dns';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';

// Render: Gmail SMTP can fail with ENETUNREACH on IPv6; prefer A records.
dns.setDefaultResultOrder('ipv4first');

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
function getTransporter() {
  if (!APP_PASSWORD) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: GMAIL_USER, pass: APP_PASSWORD },
    });
  }
  return transporter;
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

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
  if (RSVP_SECRET && req.headers['x-rsvp-secret'] !== RSVP_SECRET) {
    res.status(401).send('Unauthorized');
    return;
  }

  const transport = getTransporter();
  if (!transport) {
    res.status(503).type('text').send('RSVP email not configured (set GMAIL_APP_PASSWORD)');
    return;
  }

  const body = req.body ?? {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const attending = body.attending;
  if (!name || (attending !== 'yes' && attending !== 'no')) {
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
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).type('text').send('Failed to send email');
  }
});

app.listen(PORT, () => {
  console.log(`RSVP API listening on http://localhost:${PORT}`);
  if (!APP_PASSWORD) {
    console.warn('GMAIL_APP_PASSWORD is not set — POST /api/rsvp will return 503 until you add it to .env');
  }
});
