/**
 * Minimal line-art champagne tower — classy, not kitsch.
 * Used as a quiet decorative divider.
 */
export default function ChampagneTower({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top tier — single coupe glass */}
      <g>
        <path d="M88 18 Q100 30 112 18 L108 32 Q100 40 92 32 Z" />
        <line x1="100" y1="40" x2="100" y2="58" />
        <ellipse cx="100" cy="62" rx="10" ry="2" />
        {/* Bubbles */}
        <circle cx="96" cy="26" r="0.6" />
        <circle cx="103" cy="24" r="0.5" />
        <circle cx="100" cy="29" r="0.5" />
      </g>

      {/* Middle tier — 2 glasses */}
      <g transform="translate(0, 70)">
        {[68, 132].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 12} 0 Q${cx} 12 ${cx + 12} 0 L${cx + 8} 14 Q${cx} 22 ${cx - 8} 14 Z`} />
            <line x1={cx} y1="22" x2={cx} y2="40" />
            <ellipse cx={cx} cy="44" rx="10" ry="2" />
          </g>
        ))}
      </g>

      {/* Bottom tier — 3 glasses */}
      <g transform="translate(0, 140)">
        {[48, 100, 152].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 12} 0 Q${cx} 12 ${cx + 12} 0 L${cx + 8} 14 Q${cx} 22 ${cx - 8} 14 Z`} />
            <line x1={cx} y1="22" x2={cx} y2="40" />
            <ellipse cx={cx} cy="44" rx="10" ry="2" />
          </g>
        ))}
      </g>

      {/* Champagne stream from top */}
      <path d="M100 8 Q100 4 100 0" opacity="0.5" strokeDasharray="1 2" />
    </svg>
  );
}
