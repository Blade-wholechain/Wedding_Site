import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { UtensilsCrossed } from 'lucide-react';

export default function SeatingPlan() {
  const ref = useScrollAnimation();

  return (
    <section id="seating" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Vind je plek</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Tafelschikking</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="scroll-animate">
          <div className="rounded-3xl bg-ivory/70 backdrop-blur border border-sage-light/40 shadow-sm p-12 md:p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-sage-light/20 border border-sage-light/50 flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed size={22} className="text-eucalyptus" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-4">
              Binnenkort beschikbaar
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto font-serif italic">
              De tafelschikking wordt dichter bij de datum bekendgemaakt.
              Houd deze pagina in de gaten — we zorgen dat je weet waar je zit.
            </p>
            <div className="w-12 h-px bg-gold/60 mx-auto mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
