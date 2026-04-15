import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What should I wear?', a: 'Smart casual to semi-formal. Think elegant but comfortable — you\'ll be on a boat! Avoid very high heels and opt for stylish flats or wedges.' },
  { q: 'What time should I arrive?', a: 'Please arrive at Prinsengracht Pier 7 by 1:45 PM. The boat departs promptly at 2:00 PM and we won\'t be able to wait.' },
  { q: 'What if the weather is bad?', a: 'The boat has both an open deck and a beautiful glass-covered cabin. The ceremony will proceed rain or shine!' },
  { q: 'Is there parking nearby?', a: 'We recommend using public transport or cycling. The nearest parking garage is Parkeergarage Centrum, a 5-minute walk from the pier.' },
  { q: 'Can I bring my children?', a: 'While we adore your little ones, this will be an adults-only celebration. We hope you understand!' },
  { q: 'Will there be vegetarian/vegan options?', a: 'Absolutely! Please mention your dietary requirements in the RSVP form and we\'ll make sure you\'re well taken care of.' },
  { q: 'How do I get from the boat to the restaurant?', a: 'We\'ll dock a short walk from the restaurant and stroll together along the canal. It\'s about a 3-minute walk.' },
];

export default function FAQ() {
  const ref = useScrollAnimation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Questions</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">FAQ</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="scroll-animate rounded-xl border border-gold/10 overflow-hidden bg-ivory/40" style={{ transitionDelay: `${i * 60}ms` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-ivory/60 transition-colors"
              >
                <span className="font-serif text-base">{faq.q}</span>
                <ChevronDown size={16} className={`text-gold transition-transform duration-300 shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${open === i ? 'max-h-40' : 'max-h-0'}`}>
                <p className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
