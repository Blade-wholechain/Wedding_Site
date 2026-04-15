import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import canalBoatImg from '@/assets/canal-boat.jpg';
import restaurantImg from '@/assets/restaurant.jpg';
import { MapPin, Clock, Anchor, UtensilsCrossed } from 'lucide-react';

export default function WeddingDetails() {
  const ref = useScrollAnimation();

  return (
    <section id="details" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Save the Date</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">August 24, 2026</h2>
          <p className="text-muted-foreground italic font-serif text-lg">Amsterdam, The Netherlands</p>
        </div>

        {/* Venues */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          {/* Boat */}
          <div className="scroll-animate-left">
            <div className="rounded-2xl overflow-hidden bg-ivory/60 backdrop-blur border border-gold/10 shadow-sm">
              <img src={canalBoatImg} alt="Canal boat ceremony" width={800} height={600} loading="lazy" className="w-full h-56 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-2 text-gold mb-3">
                  <Anchor size={16} />
                  <span className="text-xs tracking-[0.2em] uppercase">The Ceremony</span>
                </div>
                <h3 className="font-serif text-2xl mb-3">Canal Boat Voyage</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Clock size={14} /> 2:00 PM — Boarding begins</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> Prinsengracht Pier 7, Amsterdam</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Join us aboard a classic Amsterdam canal boat as we exchange vows gliding through the historic canals. Please arrive 15 minutes early. Smart casual attire welcomed.
                </p>
              </div>
            </div>
          </div>

          {/* Restaurant */}
          <div className="scroll-animate-right">
            <div className="rounded-2xl overflow-hidden bg-ivory/60 backdrop-blur border border-gold/10 shadow-sm">
              <img src={restaurantImg} alt="Canal-side restaurant" width={800} height={600} loading="lazy" className="w-full h-56 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-2 text-gold mb-3">
                  <UtensilsCrossed size={16} />
                  <span className="text-xs tracking-[0.2em] uppercase">The Reception</span>
                </div>
                <h3 className="font-serif text-2xl mb-3">Café de Klos</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Clock size={14} /> 5:00 PM — Dinner & celebration</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> Keizersgracht 42, Amsterdam</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  We'll dock nearby and walk together to this beautiful canal-side restaurant for dinner, drinks, and dancing under the stars.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey connector */}
        <div className="flex items-center justify-center my-12 scroll-animate">
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <Anchor size={16} className="text-gold" />
            <div className="w-32 h-px bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
            <span className="italic font-serif">We'll dock & walk together</span>
            <div className="w-32 h-px bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
            <UtensilsCrossed size={16} className="text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
