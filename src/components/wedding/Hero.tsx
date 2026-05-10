import { useEffect, useState } from 'react';
import heroBrasserie from '@/assets/hero-brasserie-bg.jpg';
import Sparkles from './Sparkles';
import DiscoBall from './DiscoBall';

function Countdown() {
  const weddingDate = new Date('2026-09-05T14:00:00').getTime();
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
    { label: 'Dagen', value: time.days },
    { label: 'Uren', value: time.hours },
    { label: 'Minuten', value: time.minutes },
    { label: 'Seconden', value: time.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6 mt-8">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-ivory/85 backdrop-blur border border-sage-light/40 flex items-center justify-center shadow-sm animate-countdown-pulse">
            <span className="font-serif text-2xl sm:text-3xl text-foreground">{u.value}</span>
          </div>
          <span className="text-[10px] sm:text-xs tracking-widest text-muted-foreground mt-2 block uppercase">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — Brasserie Paardenburg watercolor */}
      <div className="absolute inset-0">
        <img
          src={heroBrasserie}
          alt="Brasserie Paardenburg aan het water — aquarel"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Soft ivory wash so text remains legible while the painting still reads */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/40 to-ivory/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--ivory)/0.55)_0%,_transparent_60%)]" />
        <Sparkles count={18} />
      </div>

      {/* Subtle disco ball — top right, very small & quiet */}
      <div className="absolute top-24 right-10 w-12 opacity-30 text-eucalyptus animate-slow-spin hidden md:block">
        <DiscoBall />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-light tracking-wide mb-6">
          Dulcia <span className="text-gold italic font-normal">&</span> Wybo
        </h1>
        <p className="text-sm tracking-[0.4em] uppercase text-eucalyptus mb-3 animate-gentle-wave">
          Gaan Eindelijk Trouwen
        </p>
        <p className="font-serif text-xl sm:text-2xl text-muted-foreground italic">
          Nodigen je van harte uit op
        </p>
        <div className="w-24 h-px bg-gold mx-auto my-8 animate-shimmer" />
        <p className="text-lg tracking-widest text-gold">
          5 september 2026
        </p>
        <Countdown />

        <a
          href="#schedule"
          className="inline-block mt-12 px-8 py-3 border border-sage-light/60 rounded-full text-sm tracking-wider text-foreground hover:bg-sage-light/20 transition-all duration-500 animate-float"
        >
          Bekijk de details
        </a>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="hsl(40, 35%, 97%)"
          />
        </svg>
      </div>
    </section>
  );
}
