'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type LazySectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  defaultVisible?: boolean;
  delayMs?: number;
};

export function LazySection({ id, className, children, defaultVisible = false, delayMs = 0 }: LazySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(defaultVisible);

  useEffect(() => {
    let frameOne = 0;
    let frameTwo = 0;

    const reveal = () => {
      frameOne = window.requestAnimationFrame(() => {
        frameTwo = window.requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    };

    if (defaultVisible) {
      reveal();
      return () => {
        window.cancelAnimationFrame(frameOne);
        window.cancelAnimationFrame(frameTwo);
      };
    }

    const sectionElement = sectionRef.current;
    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(sectionElement);

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      observer.disconnect();
    };
  }, [defaultVisible]);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        transitionDelay: `${delayMs}ms`,
        transitionProperty: 'transform, opacity, filter',
        transitionDuration: '900ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(48px) scale(0.985)',
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(6px)',
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 900px',
      } as CSSProperties}
      className={`scroll-mt-28 motion-reduce:transform-none motion-reduce:transition-none motion-reduce:filter-none ${className ?? ''}`}
    >
      {children}
    </section>
  );
}