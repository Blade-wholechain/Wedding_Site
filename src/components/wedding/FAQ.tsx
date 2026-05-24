import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGuest } from '@/context/GuestContext';

type Faq = { q: string; a: string; food?: boolean };

const faqs: Faq[] = [
  { q: 'Wat is de dresscode?', a: 'Chique en elegant. Dames lang, heren in pak met das. ' },
  { q: 'Hoe laat moet ik er zijn?', a: 'Daggasten worden verwacht om 13:30 uur. De avondgasten worden vanaf 19:30 uur verwacht, en uiterlijk 19:45 graag aanwezig. Kom graag op tijd zodat je niets mist!”' },
  { q: 'Mag ik mijn kinderen meenemen?', a: 'We houden ervan om al jullie kleintjes te zien, maar dit wordt een bruiloft voor volwassenen. We hopen op jullie begrip.' },
  { q: 'Zijn er vegetarische of veganistische opties?', a: 'Zeker! Vermeld je dieetwensen bij de RSVP en we zorgen dat alles geregeld is.', food: true },
  { q: 'Geven jullie een cadeaulijst?', a: 'Jullie aanwezigheid is het grootste geschenk. Een bijdrage aan onze huwelijksreis wordt erg gewaardeerd - meer info volgt vanuit de ceremoniemeesters.' },
  { q: 'Waar kan ik overnachten?', a: 'Bekijk de sectie Overnachten hierboven voor onze hotelaanbeveling in de buurt.' },
  { q: 'Is er parkeergelegenheid?', a: 'Ja, zie de sectie Adres & Parkeren voor betaalde en gratis opties dichtbij.' },
  { q: 'Staat je vraag er niet tussen?', a: 'Neem contact op met onze ceremoniemeesters via doelsenwyb@gmail.com' },
];

export default function FAQ() {
  const ref = useScrollAnimation();
  const { guestType } = useGuest();
  const [open, setOpen] = useState<number | null>(null);
  const visibleFaqs = guestType === 'evening' ? faqs.filter((f) => !f.food) : faqs;

  return (
    <section id="faq" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Vragen</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">FAQ</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="space-y-3">
          {visibleFaqs.map((faq, i) => (
            <div key={i} className="scroll-animate rounded-xl border border-sage-light/40 overflow-hidden bg-ivory/50" style={{ transitionDelay: `${i * 60}ms` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-ivory/70 transition-colors"
              >
                <span className="font-serif text-base">{faq.q}</span>
                <ChevronDown size={16} className={`text-eucalyptus transition-transform duration-300 shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${open === i ? 'max-h-48' : 'max-h-0'}`}>
                <p className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
