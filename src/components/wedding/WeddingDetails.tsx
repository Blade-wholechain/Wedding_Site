import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Clock, Heart, Sparkles } from 'lucide-react';
import roses from '@/assets/hero-roses.jpg';

export default function WeddingDetails() {
  const ref = useScrollAnimation();

  return (
    <section id="details" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Save the Date</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">{"\n"}</h2>
          <p className="text-muted-foreground italic font-serif text-lg">Een dag vol liefde, champagne en witte rozen</p>
        </div>

        {/* Roses & champagne feature */}
        <div className="scroll-animate mb-16">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-sage-light/40">
              <img
                src={roses}
                alt="Witte rozen, eucalyptus en champagneglazen"
                className="w-full h-[420px] md:h-[520px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 text-center pb-8 px-6">
                <p className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-2">De locatie</p>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground">Brasserie Paardenburg</h3>
                <p className="text-sm text-muted-foreground italic mt-1">Ouderkerk aan de Amstel</p>
                <div className="w-12 h-px bg-gold mx-auto mt-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="scroll-animate-left">
            <div className="rounded-2xl bg-ivory/70 backdrop-blur border border-sage-light/40 shadow-sm p-8 h-full">
              <div className="flex items-center gap-2 text-eucalyptus mb-4">
                <Heart size={16} />
                <span className="text-xs tracking-[0.25em] uppercase">De Ceremonie</span>
              </div>
              <h3 className="font-serif text-2xl mb-4">Het Ja-woord</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Clock size={14} /> 14:00 uur</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> Brasserie Paardenburg, Ouderkerk a/d Amstel</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Een intieme ceremonie omringd door witte rozen en eucalyptus. We kijken ernaar uit dit moment met jullie te delen.
              </p>
            </div>
          </div>

          <div className="scroll-animate-right">
            <div className="rounded-2xl bg-ivory/70 backdrop-blur border border-sage-light/40 shadow-sm p-8 h-full">
              <div className="flex items-center gap-2 text-eucalyptus mb-4">
                <Sparkles size={16} />
                <span className="text-xs tracking-[0.25em] uppercase">Het Feest</span>
              </div>
              <h3 className="font-serif text-2xl mb-4">Vier het met ons</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Clock size={14} /> Vanaf de avond</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> Brasserie Paardenburg, Ouderkerk a/d Amstel</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Een avond vol champagne, dans en onvergetelijke momenten. Dresscode en details volgen binnenkort.
              </p>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex items-center justify-center my-12 scroll-animate">
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <Heart size={14} className="text-gold" />
            <div className="w-32 h-px bg-gradient-to-r from-sage-light/40 via-eucalyptus/60 to-sage-light/40" />
            <span className="italic font-serif">Van middag tot late avond</span>
            <div className="w-32 h-px bg-gradient-to-r from-sage-light/40 via-eucalyptus/60 to-sage-light/40" />
            <Sparkles size={14} className="text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
