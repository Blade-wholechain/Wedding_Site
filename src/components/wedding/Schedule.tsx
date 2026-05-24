import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useGuest } from '@/context/GuestContext';
import { Heart, Wine, UtensilsCrossed, Music, Sparkles, Sun } from 'lucide-react';
import ChampagneTower from './ChampagneTower';

const dayEvents = [
  { time: '13:30', title: 'Ontvangst', desc: 'Drink er nog één op het bruidspaar!', icon: Sun },
  { time: '14:00', title: 'Ceremonie', desc: 'Het echtpaar geeft elkaar het ja-woord', icon: Heart },
  { time: '15:00', title: 'Champagne toost', desc: 'Op het bruidspaar en de liefde', icon: Wine },
  { time: '16:30', title: 'Diner', desc: '', icon: UtensilsCrossed },
];

const eveningEvents = [
  { time: '19:30', title: 'Uitzwaaien bruidspaar', desc: '\u200B', icon: Sparkles },
  { time: '20:00', title: 'Aanvang feest', desc: 'Het feest kan beginnen!', icon: Music },
  { time: '00:30', title: 'Uitzwaaimoment', desc: '\u200B', icon: Heart },
];

const fullEvents = [...dayEvents, ...eveningEvents];

export default function Schedule() {
  const ref = useScrollAnimation();
  const { guestType } = useGuest();

  const events = guestType === 'evening' ? eveningEvents : fullEvents;
  const subtitle = guestType === 'evening' ? 'Avondgasten' : 'Daggasten';

  return (
    <section id="schedule" className="py-24 md:py-32 bg-champagne linen-texture" ref={ref}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <div className="flex justify-center mb-6 text-gold">
            <ChampagneTower className="w-16 h-auto opacity-70" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Programma</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          {guestType === 'day' && (
            <p className="text-sm text-muted-foreground mt-4 font-serif italic">
              Speciaal voor onze daggasten
            </p>
          )}
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-sage-light/50" />

          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <div key={i} className="relative flex items-start mb-12 last:mb-0 scroll-animate" style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-ivory border-2 border-sage-light/60 flex items-center justify-center shadow-sm z-10">
                  <Icon size={16} className="text-eucalyptus" />
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
