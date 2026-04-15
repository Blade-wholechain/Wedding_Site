import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Anchor, Heart, Wine, Ship, UtensilsCrossed, Music, Sparkles } from 'lucide-react';

const events = [
  { time: '2:00 PM', title: 'Boarding', desc: 'Welcome aboard at Prinsengracht Pier 7', icon: Ship },
  { time: '2:30 PM', title: 'Ceremony on the Canal', desc: 'Exchange of vows as we glide through Amsterdam', icon: Heart },
  { time: '3:15 PM', title: 'Champagne & Canals', desc: 'Toast and enjoy the views from the water', icon: Wine },
  { time: '4:30 PM', title: 'Docking', desc: 'We arrive near the restaurant and walk together', icon: Anchor },
  { time: '5:00 PM', title: 'Dinner', desc: 'A curated four-course dinner at Café de Klos', icon: UtensilsCrossed },
  { time: '8:00 PM', title: 'Party & Dancing', desc: 'Dance the night away under string lights', icon: Music },
  { time: '11:00 PM', title: 'Sparkler Send-Off', desc: 'A magical farewell by the canal', icon: Sparkles },
];

export default function Schedule() {
  const ref = useScrollAnimation();

  return (
    <section id="schedule" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">The Day</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Schedule</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/20" />

          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <div key={i} className="relative flex items-start mb-12 last:mb-0 scroll-animate" style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-ivory border-2 border-gold/30 flex items-center justify-center shadow-sm z-10">
                  <Icon size={16} className="text-gold" />
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  i % 2 === 0 ? 'md:pr-16' : 'md:ml-auto md:pl-16'
                }`}>
                  <span className="text-gold text-xs tracking-widest font-medium">{e.time}</span>
                  <h3 className="font-serif text-xl mt-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
