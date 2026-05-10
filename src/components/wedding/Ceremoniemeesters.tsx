import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Ceremoniemeesters() {
  const ref = useScrollAnimation();

  return (
    <section id="ceremoniemeesters" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Voor al je vragen op de dag zelf</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Ceremoniemeesters</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="scroll-animate text-center max-w-xl mx-auto rounded-3xl bg-champagne/60 border border-gold/30 p-10">
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
