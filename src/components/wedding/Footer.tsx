import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 bg-champagne linen-texture text-center">
      <div className="max-w-md mx-auto px-4">
        <p className="font-serif text-3xl mb-3">
          Dulcia <span className="text-gold italic">&</span> Wybo
        </p>
        <p className="text-sm text-muted-foreground mb-6 italic font-serif">
          "To be continued..."
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <span>Gemaakt met</span>
          <Heart size={12} className="text-gold" />
          <span>by Bladeson</span>
        </div>
        <p className="text-xs text-muted-foreground/60 mt-4">
          5 september 2026
        </p>
      </div>
    </footer>
  );
}
