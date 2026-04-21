import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { X } from 'lucide-react';

const photos = [
  { id: 1, span: 'row-span-2', color: 'from-stone-100 to-stone-50' },
  { id: 2, span: '', color: 'from-emerald-50 to-stone-50' },
  { id: 3, span: '', color: 'from-stone-50 to-emerald-50' },
  { id: 4, span: 'row-span-2', color: 'from-amber-50 to-stone-50' },
  { id: 5, span: '', color: 'from-stone-50 to-amber-50' },
  { id: 6, span: '', color: 'from-emerald-50 to-amber-50' },
];

const captions = [
  'Onze eerste reis samen',
  'Een rustige zondagmorgen',
  'Wandelen door het bos',
  'De ring, het ja, de tranen',
  'Dansen in de keuken',
  'Plannen voor altijd',
];

export default function Gallery() {
  const ref = useScrollAnimation();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-linen linen-texture" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <p className="text-sm tracking-[0.3em] uppercase text-eucalyptus mb-4">Momenten</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Galerij</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {photos.map((p, i) => (
            <div
              key={p.id}
              className={`scroll-animate rounded-2xl overflow-hidden cursor-pointer group ${p.span}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setLightbox(i)}
            >
              <div className={`w-full h-full bg-gradient-to-br ${p.color} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
                <div className="text-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-serif text-sm text-foreground/50 italic px-4">{captions[i]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 italic">
          Foto's worden binnenkort toegevoegd ✨
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground" aria-label="Sluiten">
            <X size={24} />
          </button>
          <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className={`w-full aspect-[4/3] bg-gradient-to-br ${photos[lightbox].color} flex items-center justify-center`}>
              <p className="font-serif text-lg text-foreground/60 italic">{captions[lightbox]}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
