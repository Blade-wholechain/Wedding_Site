import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Hotel, Train, Plane, MapPin } from 'lucide-react';

const hotels = [
  { name: 'Hotel Pulitzer', desc: 'A 5-star gem on the Prinsengracht, steps from the ceremony pier.', stars: '★★★★★' },
  { name: 'The Hoxton', desc: 'Boutique charm on Herengracht. Modern, stylish, and walkable to everything.', stars: '★★★★' },
  { name: 'Motel One Amsterdam', desc: 'Great value with design-forward rooms near Centraal Station.', stars: '★★★' },
];

const tips = [
  { icon: Plane, title: 'By Air', desc: 'Fly into Amsterdam Schiphol (AMS). Take a 15-minute train to Centraal Station.' },
  { icon: Train, title: 'By Train', desc: 'Amsterdam Centraal is well connected to major European cities. Thalys from Paris or Brussels.' },
  { icon: MapPin, title: 'Getting Around', desc: 'Rent bikes, take trams, or walk — Amsterdam is wonderfully compact.' },
];

export default function Travel() {
  const ref = useScrollAnimation();

  return (
    <section id="travel" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Plan Your Trip</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Travel & Stay</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        {/* Hotels */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {hotels.map((h, i) => (
            <div key={i} className="scroll-animate rounded-2xl bg-ivory/60 backdrop-blur border border-gold/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
              <Hotel size={20} className="text-gold mb-3" />
              <h3 className="font-serif text-lg mb-1">{h.name}</h3>
              <p className="text-xs text-gold tracking-wider mb-2">{h.stars}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Transport tips */}
        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="scroll-animate text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
