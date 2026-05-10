import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Car, ParkingCircle, ExternalLink } from 'lucide-react';

const places = [
  {
    icon: MapPin,
    label: 'Trouwlocatie',
    name: 'Brasserie Paardenburg',
    desc: 'Amstelzijde 55, Ouderkerk aan de Amstel',
    href: 'https://maps.app.goo.gl/ahRq6Gvfsgcnw86NA',
    accent: 'bg-sage-light/30 border-eucalyptus/40',
  },
  {
    icon: Car,
    label: 'Betaald parkeren',
    name: '2 minuten lopen',
    desc: 'Dichtstbijzijnde parkeergelegenheid bij de locatie',
    href: 'https://maps.app.goo.gl/EswvuXNBLwsp3m1V9',
    accent: 'bg-champagne/40 border-gold/30',
  },
  {
    icon: ParkingCircle,
    label: 'Gratis parkeren',
    name: '10 minuten lopen',
    desc: 'Op iets grotere afstand, maar zonder kosten',
    href: 'https://maps.app.goo.gl/22FH8smAkXvh5YcT7',
    accent: 'bg-ivory border-sage-light/50',
  },
];

export default function AddressParking() {
  const ref = useScrollAnimation();

  return (
    <section id="address" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Hoe te bereiken</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Adres & Parkeren</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          <p className="text-sm text-muted-foreground mt-4 font-serif italic">
            Klik op een kaart om de route te openen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {places.map((p, i) => {
            const Icon = p.icon;
            return (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`scroll-animate group rounded-2xl border ${p.accent} backdrop-blur p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-ivory border border-sage-light/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={20} className="text-eucalyptus" />
                </div>
                <p className="text-xs tracking-[0.25em] uppercase text-eucalyptus mb-2">{p.label}</p>
                <h3 className="font-serif text-xl font-light mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                <div className="flex items-center gap-2 text-xs text-gold mt-5 tracking-widest uppercase">
                  Open in Google Maps <ExternalLink size={12} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
