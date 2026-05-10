import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function DressCode() {
  const ref = useScrollAnimation();

  return (
    <section id="dresscode" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Voor de gelegenheid</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Dresscode</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Dames */}
          <div className="scroll-animate-left rounded-3xl bg-ivory/70 backdrop-blur border border-sage-light/40 shadow-sm p-10 text-center">
            <div className="flex justify-center mb-6">
              {/* elegant long dress line drawing */}
              <svg width="80" height="120" viewBox="0 0 80 120" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-eucalyptus" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="40" cy="12" r="6" />
                <path d="M34 19 L30 32 L25 38" />
                <path d="M46 19 L50 32 L55 38" />
                <path d="M30 32 Q40 36 50 32 L52 50 Q40 54 28 50 Z" />
                <path d="M28 50 L18 115 L62 115 L52 50" />
                <path d="M22 80 Q40 90 58 80" opacity="0.5" />
                <path d="M20 100 Q40 112 60 100" opacity="0.5" />
              </svg>
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Dames</p>
            <h3 className="font-serif text-2xl font-light">Lang</h3>
          </div>

          {/* Heren */}
          <div className="scroll-animate-right rounded-3xl bg-ivory/70 backdrop-blur border border-sage-light/40 shadow-sm p-10 text-center">
            <div className="flex justify-center mb-6">
              {/* suit & tie line drawing */}
              <svg width="80" height="120" viewBox="0 0 80 120" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-eucalyptus" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="40" cy="12" r="6" />
                <path d="M30 22 L18 40 L18 115 L62 115 L62 40 L50 22" />
                <path d="M30 22 L40 40 L50 22" />
                <path d="M40 40 L36 50 L40 80 L44 50 Z" />
                <path d="M40 40 L34 35 M40 40 L46 35" />
                <path d="M28 45 L28 110" opacity="0.6" />
                <path d="M52 45 L52 110" opacity="0.6" />
              </svg>
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Heren</p>
            <h3 className="font-serif text-2xl font-light">Pak & Das</h3>
          </div>
        </div>

        {/* Ceremoniemeesters */}
        <div className="scroll-animate text-center max-w-xl mx-auto rounded-3xl bg-champagne/60 border border-gold/30 p-10">
          <p className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-4">Ceremoniemeesters</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            <p className="font-serif text-xl font-light">Chiara Spee</p>
            <span className="text-gold hidden sm:inline">&</span>
            <p className="font-serif text-xl font-light">Willemijn Ruedisulj</p>
          </div>
          <p className="text-sm text-muted-foreground italic mt-4 font-serif">
            Voor al je vragen op de dag zelf
          </p>
        </div>
      </div>
    </section>
  );
}
