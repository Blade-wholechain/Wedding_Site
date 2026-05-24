import { useState, FormEvent } from 'react';
import { useGuest } from '@/context/GuestContext';
import heroRoses from '@/assets/hero-roses.jpg';
import { Lock } from 'lucide-react';

export default function AccessGate() {
  const { signIn } = useGuest();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = signIn(code);
    if (!ok) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Soft background */}
      <div className="absolute inset-0">
        <img
          src={heroRoses}
          alt="Witte rozen en eucalyptus"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-background/80 to-background" />
      </div>

      <div className={`relative z-10 w-full max-w-md mx-auto px-6 animate-fade-in ${shake ? 'animate-[gentle-wave_0.4s_ease-in-out]' : ''}`}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-eucalyptus mb-6">
            Welkom
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-light tracking-wide">
            Dulcia <span className="text-gold italic">&</span> Wybo
          </h1>
          <p className="font-serif italic text-gold text-xl mt-2">
            Gaan trouwen!
          </p>
          <div className="w-16 h-px bg-gold mx-auto my-6" />
          <p className="font-serif italic text-muted-foreground text-lg">
            5 september 2026
          </p>
        </div>

        <div className="rounded-2xl glass border border-sage-light/40 shadow-lg p-8">
          <div className="flex items-center justify-center gap-2 text-eucalyptus mb-5">
            <Lock size={14} />
            <span className="text-xs tracking-[0.25em] uppercase">Toegangscode</span>
          </div>

          <p className="text-center text-sm text-muted-foreground mb-6 font-serif italic">
            Voer ontvangen code in om verder te gaan
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder="Ontvangen code"
              autoFocus
              maxLength={32}
              className={`w-full px-5 py-3.5 rounded-xl bg-ivory/90 border text-center text-base tracking-[0.2em] uppercase font-serif focus:outline-none transition-all duration-300 ${
                error
                  ? 'border-destructive/60 focus:border-destructive'
                  : 'border-sage-light/50 focus:border-eucalyptus/60'
              }`}
            />

            {error && (
              <p className="text-center text-xs text-destructive">
                Helaas, deze code herkennen we niet. Probeer het opnieuw.
              </p>
            )}

            <button
              type="submit"
              disabled={!code.trim()}
              className="w-full py-3.5 rounded-xl bg-eucalyptus text-primary-foreground font-medium text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Bevestigen
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground/70 mt-6 leading-relaxed">
            Je code staat op je uitnodiging.<br />
            Geen code ontvangen? Neem contact met ons op.
          </p>
        </div>
      </div>
    </div>
  );
}
