import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Heart } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'How We Met',
    description: 'A chance encounter at a rooftop bar in Barcelona. What started as a conversation about favourite travel destinations turned into a night we\'d never forget.',
    side: 'left' as const,
  },
  {
    year: '2020',
    title: 'First Trip Together',
    description: 'A spontaneous weekend in Amsterdam — cycling along canals, sharing stroopwafels, and falling deeper in love with the city that would later become the backdrop of our forever.',
    side: 'right' as const,
  },
  {
    year: '2022',
    title: 'Moving In Together',
    description: 'We made it official and found our little apartment overlooking a quiet canal. Home became wherever we were together.',
    side: 'left' as const,
  },
  {
    year: '2025',
    title: 'The Proposal',
    description: 'Under the twinkling lights of the Magere Brug at dusk, with the city reflected in the water below, Blade got down on one knee. Chiara said yes before he could finish the question.',
    side: 'right' as const,
  },
];

export default function OurStory() {
  const ref = useScrollAnimation();

  return (
    <section id="story" className="py-24 md:py-32 bg-linen linen-texture" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Our Journey</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Our Story</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 hidden md:block" />

          {milestones.map((m, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-center mb-20 last:mb-0 ${
              m.side === 'right' ? 'md:flex-row-reverse' : ''
            }`}>
              {/* Content */}
              <div className={`w-full md:w-5/12 ${m.side === 'left' ? 'scroll-animate-left' : 'scroll-animate-right'}`}>
                <div className="bg-ivory/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gold/10">
                  <span className="text-gold text-sm tracking-widest">{m.year}</span>
                  <h3 className="font-serif text-2xl mt-2 mb-3">{m.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{m.description}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="hidden md:flex w-2/12 justify-center">
                <div className="w-10 h-10 rounded-full bg-ivory border-2 border-gold/40 flex items-center justify-center shadow-sm">
                  <Heart size={14} className="text-gold" />
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
