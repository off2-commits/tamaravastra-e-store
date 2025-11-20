import { useEffect, useRef, useState, ReactNode } from 'react';

type LazyRevealProps = {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animation?: 'fade-up' | 'fade-in';
};

export function LazyReveal({
  children,
  threshold = 0.15,
  rootMargin = '0px 0px -20% 0px',
  className = '',
  animation = 'fade-up',
}: LazyRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reduceMotion]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      data-animation={animation}
      aria-hidden={!visible}
    >
      {visible ? children : null}
    </div>
  );
}