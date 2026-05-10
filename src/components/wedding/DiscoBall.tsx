/**
 * Subtle line-art disco ball — classy, art-deco feel.
 */
export default function DiscoBall({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {/* String */}
      <line x1="40" y1="0" x2="40" y2="14" opacity="0.5" />
      {/* Cap */}
      <rect x="36" y="14" width="8" height="4" rx="1" />
      {/* Sphere */}
      <circle cx="40" cy="50" r="30" />
      {/* Latitude */}
      <ellipse cx="40" cy="50" rx="30" ry="6" opacity="0.6" />
      <ellipse cx="40" cy="50" rx="30" ry="14" opacity="0.4" />
      <ellipse cx="40" cy="50" rx="30" ry="22" opacity="0.3" />
      {/* Longitude */}
      <ellipse cx="40" cy="50" rx="6" ry="30" opacity="0.6" />
      <ellipse cx="40" cy="50" rx="14" ry="30" opacity="0.4" />
      <ellipse cx="40" cy="50" rx="22" ry="30" opacity="0.3" />
      {/* Highlight tiles */}
      <circle cx="32" cy="38" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="48" cy="44" r="0.8" fill="currentColor" opacity="0.4" />
      <circle cx="38" cy="58" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
