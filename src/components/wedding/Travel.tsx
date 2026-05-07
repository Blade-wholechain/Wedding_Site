import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Hotel, Train, Car, MapPin } from 'lucide-react';

const hotels = [
  { name: 'Boutique Hotel', desc: 'Een charmant boetiekhotel op loopafstand van de locatie.', stars: '★★★★' },
  { name: 'Landhuis Suite', desc: 'Romantische suites in landelijke sfeer, perfect om bij te komen.', stars: '★★★★' },
  { name: 'Bed & Breakfast', desc: 'Sfeervolle B&B voor een intieme overnachting.', stars: '★★★' },
];

const tips = [
  { icon: Car, title: 'Met de auto', desc: 'Voldoende parkeergelegenheid in de buurt van de locatie.' },
  { icon: Train, title: 'Met het OV', desc: 'Vanaf het dichtstbijzijnde station is het een korte rit met de taxi.' },
  { icon: MapPin, title: 'Carpoolen', desc: 'Laat het ons weten via de RSVP — we helpen graag met matchen.' },
];

export default function Travel() {
  const ref = useScrollAnimation();

  return (
    <section id="travel" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">{"\n"}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Overnachten</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        {/* Hotels */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {hotels.map((h, i) => (
            <div key={i} className="scroll-animate rounded-2xl bg-ivory/70 backdrop-blur border border-sage-light/40 p-6 shadow-sm hover:shadow-md transition-shadow duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
              <Hotel size={20} className="text-eucalyptus mb-3" />
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
                <div className="w-12 h-12 rounded-full bg-sage-light/20 border border-sage-light/50 flex items-center justify-center mx-auto mb-4">
                  <Icon size={18} className="text-eucalyptus" />
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
