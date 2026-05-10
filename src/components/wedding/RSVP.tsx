import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useGuest } from '@/context/GuestContext';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

const dietaryOptions = ['Vlees', 'Vis', 'Ik ben zwanger', 'Anders'];

const RSVP_NOTIFY_EMAIL = 'doelsenwyb@gmail.com';

function buildRsvpMessage(params: {
  name: string;
  attending: string;
  guestType: 'day' | 'evening' | null;
  dietary: string;
}): string {
  const attendingLabel =
    params.attending === 'yes' ? 'Ja, ik kom' : params.attending === 'no' ? 'Helaas niet' : params.attending;
  const guestLabel =
    params.guestType === 'day' ? 'Daggast' : params.guestType === 'evening' ? 'Avondgast' : '—';
  const lines = [
    `Naam: ${params.name}`,
    `Komt: ${attendingLabel}`,
    `Type gast: ${guestLabel}`,
  ];
  if (params.attending === 'yes' && params.guestType === 'day') {
    lines.push(`Dieetvoorkeur: ${params.dietary || '—'}`);
  }
  return lines.join('\n');
}

const initialForm = () => ({
  name: '',
  attending: '',
  dietary: '' as string,
});

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollAnimation([submitted]);
  const { guestType } = useGuest();
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState(initialForm);

  const isDayGuest = guestType === 'day';
  const showDietarySection = form.attending === 'yes' && isDayGuest;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      attending: form.attending,
      guestType,
      dietary: showDietarySection ? form.dietary : '',
    };

    const useGmailApi =
      Boolean(import.meta.env.VITE_RSVP_API_URL) || import.meta.env.DEV;

    if (useGmailApi) {
      setIsSending(true);
      try {
        const base = import.meta.env.VITE_RSVP_API_URL?.replace(/\/$/, '') ?? '';
        const url = base ? `${base}/api/rsvp` : '/api/rsvp';
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        const secret = import.meta.env.VITE_RSVP_SECRET;
        if (secret) {
          headers['X-RSVP-Secret'] = secret;
        }

        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        setSubmitted(true);
      } catch (err) {
        console.error(err);
        toast.error('Versturen mislukt. Probeer het later opnieuw of mail ons rechtstreeks.');
      } finally {
        setIsSending(false);
      }
      return;
    }

    const message = buildRsvpMessage({
      name: payload.name,
      attending: payload.attending,
      guestType: payload.guestType,
      dietary: payload.dietary,
    });
    const subject = encodeURIComponent(`RSVP bruiloft — ${payload.name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${RSVP_NOTIFY_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const resetAndSubmitAnother = () => {
    setForm(initialForm());
    setSubmitted(false);
    setIsSending(false);
    requestAnimationFrame(() => {
      document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-sage-light/20 border-2 border-sage-light/60 flex items-center justify-center mx-auto mb-6 animate-countdown-pulse">
            <Heart size={28} className="text-eucalyptus" />
          </div>
          <h2 className="font-serif text-3xl mb-3">Dankjewel!</h2>
          <p className="text-muted-foreground">
            {form.attending === 'yes'
              ? 'We kunnen niet wachten om met je te vieren!'
              : 'We zullen je missen, bedankt voor het laten weten.'}
          </p>
          <button
            type="button"
            onClick={resetAndSubmitAnother}
            className="mt-8 text-sm text-eucalyptus border border-eucalyptus/40 rounded-xl px-6 py-3 hover:bg-sage-light/20 transition-colors tracking-wide"
          >
            Nog een RSVP versturen
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Laat ons weten of je erbij bent</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">RSVP</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          <p className="text-muted-foreground mt-4 text-sm">Graag reageren vóór 1 juli 2026</p>
          {guestType && (
            <p className="text-xs text-eucalyptus mt-2 tracking-widest uppercase">
              {guestType === 'day' ? 'Daggast' : 'Avondgast'}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 scroll-animate">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Volledige naam</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-ivory/80 border border-sage-light/40 text-sm focus:outline-none focus:border-eucalyptus/60 transition-colors"
              placeholder="Je volledige naam"
            />
          </div>

          <div>
            <div className="flex gap-3">
              {[
                { v: 'yes', label: 'Ja, met liefde' },
                { v: 'no', label: 'Helaas niet' },
              ].map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => setForm({ ...form, attending: opt.v })}
                  className={`flex-1 py-3 rounded-xl border text-sm transition-all duration-300 ${
                    form.attending === opt.v
                      ? 'bg-sage-light/25 border-eucalyptus text-foreground'
                      : 'bg-ivory/50 border-sage-light/30 text-muted-foreground hover:border-sage-light/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {showDietarySection && (
            <div>
              <label className="text-sm text-muted-foreground mb-3 block">Dieetvoorkeur</label>
              <div className="grid grid-cols-2 gap-3">
                {dietaryOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm({ ...form, dietary: opt })}
                    className={`py-3 rounded-xl border text-sm transition-all duration-300 ${
                      form.dietary === opt
                        ? 'bg-sage-light/25 border-eucalyptus text-foreground'
                        : 'bg-ivory/50 border-sage-light/30 text-muted-foreground hover:border-sage-light/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!form.name || !form.attending || isSending}
            className="w-full py-3.5 rounded-xl bg-eucalyptus text-primary-foreground font-medium text-sm tracking-wider hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSending ? 'Verzenden…' : 'Verstuur RSVP'}
          </button>
        </form>
      </div>
    </section>
  );
}
