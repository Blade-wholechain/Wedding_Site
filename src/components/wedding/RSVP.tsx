import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useGuest } from '@/context/GuestContext';
import { Heart, Check } from 'lucide-react';

export default function RSVP() {
  const ref = useScrollAnimation();
  const { guestType } = useGuest();
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
          <div className="w-20 h-20 rounded-full bg-sage-light/20 border-2 border-sage-light/60 flex items-center justify-center mx-auto mb-6 animate-countdown-pulse">
            <Heart size={28} className="text-eucalyptus" />
          </div>
          <h2 className="font-serif text-3xl mb-3">Dankjewel!</h2>
          <p className="text-muted-foreground">
            {form.attending === 'yes'
              ? 'We kunnen niet wachten om met je te vieren!'
              : 'We zullen je missen, bedankt voor het laten weten.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Laat het ons weten</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">RSVP</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          <p className="text-muted-foreground mt-4 text-sm">Reageer graag vóór 1 juli 2026</p>
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
            <label className="text-sm text-muted-foreground mb-3 block">Ben je erbij?</label>
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

          {form.attending === 'yes' && (
            <>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Dieetwensen</label>
                <input
                  value={form.dietary}
                  onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-ivory/80 border border-sage-light/40 text-sm focus:outline-none focus:border-eucalyptus/60 transition-colors"
                  placeholder="Allergieën of voorkeuren"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, plusOne: !form.plusOne })}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      form.plusOne ? 'bg-eucalyptus border-eucalyptus' : 'border-sage-light/60'
                    }`}
                  >
                    {form.plusOne && <Check size={12} className="text-primary-foreground" />}
                  </div>
                  <span className="text-sm text-muted-foreground">Ik neem een introducé mee</span>
                </label>
                {form.plusOne && (
                  <input
                    value={form.plusOneName}
                    onChange={(e) => setForm({ ...form, plusOneName: e.target.value })}
                    className="w-full mt-3 px-4 py-3 rounded-xl bg-ivory/80 border border-sage-light/40 text-sm focus:outline-none focus:border-eucalyptus/60 transition-colors"
                    placeholder="Naam van je introducé"
                  />
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!form.name || !form.attending}
            className="w-full py-3.5 rounded-xl bg-eucalyptus text-primary-foreground font-medium text-sm tracking-wider hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verstuur RSVP
          </button>
        </form>
      </div>
    </section>
  );
}
