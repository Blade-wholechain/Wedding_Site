import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type GuestType = 'day' | 'evening';

interface GuestContextValue {
  guestType: GuestType | null;
  signIn: (code: string) => boolean;
  signOut: () => void;
}

const STORAGE_KEY = 'wedding-guest-type';

// Access codes
const CODES: Record<string, GuestType> = {
  'DENWDAG2026': 'day',
  'DENW2026': 'evening',
};

const GuestContext = createContext<GuestContextValue | undefined>(undefined);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [guestType, setGuestType] = useState<GuestType | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'day' || stored === 'evening') {
      setGuestType(stored);
    }
  }, []);

  const signIn = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    const type = CODES[normalized];
    if (type) {
      setGuestType(type);
      localStorage.setItem(STORAGE_KEY, type);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setGuestType(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GuestContext.Provider value={{ guestType, signIn, signOut }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error('useGuest must be used within GuestProvider');
  return ctx;
}
