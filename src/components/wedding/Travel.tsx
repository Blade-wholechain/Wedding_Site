import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Hotel, ExternalLink, Star } from 'lucide-react';

export default function Travel() {
  const ref = useScrollAnimation();

  return (
    <section id="travel" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Verblijven</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Overnachten</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <a
          href="https://maps.app.goo.gl/6Zk2umZRgMNBmDcA6"
          target="_blank"
          rel="noopener noreferrer"
          className="scroll-animate group block rounded-3xl bg-ivory/70 backdrop-blur border border-sage-light/40 p-10 md:p-12 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-sage-light/20 border border-sage-light/50 flex items-center justify-center mb-6">
              <Hotel size={22} className="text-eucalyptus" />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3">Onze aanbeveling</p>
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-3">
              Radisson Hotel & Suites Amsterdam Zuid
            </h3>
            <div className="flex items-center gap-1 text-gold mb-4">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Comfortabel verblijf op korte afstand van de locatie — perfect voor een ontspannen overnachting.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold mt-6 tracking-widest uppercase group-hover:gap-3 transition-all">
              Open in Google Maps <ExternalLink size={12} />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
