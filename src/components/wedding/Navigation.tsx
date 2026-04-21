import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useGuest } from '@/context/GuestContext';

const navItems = [
  { label: 'Details', href: '#details' },
  { label: 'Programma', href: '#schedule' },
  { label: 'Tafelschikking', href: '#seating' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Reizen', href: '#travel' },
  { label: 'Galerij', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { signOut } = useGuest();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'glass shadow-sm border-b border-sage-light/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-serif text-lg tracking-wider text-foreground">
            D <span className="text-gold">&</span> W
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-muted-foreground hover:text-eucalyptus transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={signOut}
              title="Uitloggen"
              className="text-muted-foreground hover:text-eucalyptus transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-sage-light/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-sm tracking-wide text-muted-foreground hover:text-eucalyptus transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); signOut(); }}
              className="block text-sm tracking-wide text-muted-foreground hover:text-eucalyptus transition-colors"
            >
              Uitloggen
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
