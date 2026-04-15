import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero-canal.jpg';

function Countdown() {
  const weddingDate = new Date('2026-08-24T14:00:00').getTime();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = weddingDate - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [weddingDate]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-8 mt-8">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-ivory/80 backdrop-blur border border-gold/20 flex items-center justify-center shadow-sm animate-countdown-pulse">
            <span className="font-serif text-2xl sm:text-3xl text-foreground">{u.value}</span>
          </div>
          <span className="text-xs tracking-widest text-muted-foreground mt-2 block uppercase">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Amsterdam canals watercolor"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="text-sm tracking-[0.4em] uppercase text-muted-foreground mb-6 animate-gentle-wave">
          Together with their families
        </p>
        <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-light tracking-wide mb-4">
          Blade <span className="text-gold italic font-normal">&</span> Chiara
        </h1>
        <div className="w-24 h-px bg-gold mx-auto my-8 animate-shimmer" />
        <p className="font-serif text-xl sm:text-2xl text-muted-foreground italic mb-2">
          Request the pleasure of your company
        </p>
        <p className="text-lg tracking-widest text-gold mt-4">
          August 24, 2026
        </p>
        <p className="text-sm text-muted-foreground mt-2 tracking-wider">
          Amsterdam, The Netherlands
        </p>
        <Countdown />

        <a
          href="#story"
          className="inline-block mt-12 px-8 py-3 border border-gold/40 rounded-full text-sm tracking-wider text-foreground hover:bg-gold/10 transition-all duration-500 animate-float"
        >
          View Details
        </a>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="hsl(36, 33%, 96%)"
          />
        </svg>
      </div>
    </section>
  );
}
