import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 bg-champagne linen-texture text-center">
      <div className="max-w-md mx-auto px-4">
        <p className="font-serif text-3xl mb-3">
          Blade <span className="text-gold italic">&</span> Chiara
        </p>
        <p className="text-sm text-muted-foreground mb-6 italic font-serif">
          "And so the adventure begins..."
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <span>Made with</span>
          <Heart size={12} className="text-gold" />
          <span>in Amsterdam</span>
        </div>
        <p className="text-xs text-muted-foreground/50 mt-4">
          August 24, 2026 • Amsterdam, NL
        </p>
      </div>
    </footer>
  );
}
