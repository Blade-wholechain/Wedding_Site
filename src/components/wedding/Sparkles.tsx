/**
 * Subtle, classy sparkle field. Hints of disco / champagne fizz
 * without ever feeling kitsch — tiny diamond glints that twinkle.
 */
export default function Sparkles({ count = 14, className = '' }: { count?: number; className?: string }) {
  // Deterministic pseudo-random positions so they don't reshuffle on re-render
  const seeds = Array.from({ length: count }, (_, i) => {
    const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const y = (Math.sin(i * 78.233) * 43758.5453) % 1;
    return {
      left: `${Math.abs(x) * 100}%`,
      top: `${Math.abs(y) * 100}%`,
      delay: `${(i % 7) * 0.6}s`,
      size: 4 + (i % 3) * 2,
      opacity: 0.35 + ((i % 4) * 0.12),
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {seeds.map((s, i) => (
        <svg
          key={i}
          width={s.size}
          height={s.size}
          viewBox="0 0 12 12"
          className="absolute animate-sparkle"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            opacity: s.opacity,
            color: 'hsl(var(--gold))',
          }}
        >
          <path
            d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}
