import { useEffect, useRef, type DependencyList } from 'react';

/** Stable empty deps so mount-only observers don’t get a new `[]` every render. */
const DEFAULT_DEPS: DependencyList = [];

/**
 * Observes `.scroll-animate*` inside `ref` and adds `.visible` when in view.
 * Pass `deps` (e.g. `[submitted]`) when inner DOM is swapped so new nodes get observed.
 */
export function useScrollAnimation(deps: DependencyList = DEFAULT_DEPS) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (el) {
      const animatables = el.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
      animatables.forEach((node) => observer.observe(node));
    }

    return () => observer.disconnect();
  }, deps);

  return ref;
}
