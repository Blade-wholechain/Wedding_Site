import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Heart, Check } from 'lucide-react';

export default function RSVP() {
  const ref = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', attending: '', dietary: '', plusOne: false, plusOneName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6 animate-countdown-pulse">
            <Heart size={28} className="text-gold" />
          </div>
          <h2 className="font-serif text-3xl mb-3">Thank You!</h2>
          <p className="text-muted-foreground">
            {form.attending === 'yes'
              ? "We can't wait to celebrate with you on the canals!"
              : "We'll miss you! Thank you for letting us know."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">We'd love to hear from you</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">RSVP</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          <p className="text-muted-foreground mt-4 text-sm">Please respond by July 1, 2026</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 scroll-animate">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-ivory/80 border border-gold/20 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-3 block">Will you attend?</label>
            <div className="flex gap-3">
              {['yes', 'no'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setForm({ ...form, attending: v })}
                  className={`flex-1 py-3 rounded-xl border text-sm transition-all duration-300 ${
                    form.attending === v
                      ? 'bg-gold/10 border-gold text-foreground'
                      : 'bg-ivory/50 border-gold/15 text-muted-foreground hover:border-gold/30'
                  }`}
                >
                  {v === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline'}
                </button>
              ))}
            </div>
          </div>

          {form.attending === 'yes' && (
            <>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Dietary Requirements</label>
                <input
                  value={form.dietary}
                  onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-ivory/80 border border-gold/20 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Any allergies or preferences"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, plusOne: !form.plusOne })}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      form.plusOne ? 'bg-gold border-gold' : 'border-gold/30'
                    }`}
                  >
                    {form.plusOne && <Check size={12} className="text-primary-foreground" />}
                  </div>
                  <span className="text-sm text-muted-foreground">I'm bringing a plus one</span>
                </label>
                {form.plusOne && (
                  <input
                    value={form.plusOneName}
                    onChange={(e) => setForm({ ...form, plusOneName: e.target.value })}
                    className="w-full mt-3 px-4 py-3 rounded-xl bg-ivory/80 border border-gold/20 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Guest's full name"
                  />
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!form.name || !form.attending}
            className="w-full py-3.5 rounded-xl bg-gold/90 text-primary-foreground font-medium text-sm tracking-wider hover:bg-gold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send RSVP
          </button>
        </form>
      </div>
    </section>
  );
}
