import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import ProductCan from './ProductCan';
import { dropVariants } from '../data/dropProducts';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductSubstanceSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.statement-kicker, .statement-title, .statement-copy',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 66%',
          },
        },
      );

      gsap.to('.statement-can', {
        xPercent: -10,
        yPercent: -10,
        rotateZ: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="substance-section">
      <div ref={rootRef} className="substance-scene">
        <div className="statement-text">
          <p className="statement-kicker">AS. IT. SHOULD. BE.</p>
          <h2 className="statement-title">Water, redesigned for a cleaner future.</h2>
          <p className="statement-copy">No plastic. No compromise. Just DROP.</p>
        </div>

        <div className="statement-can" aria-hidden="true">
          <ProductCan variant={dropVariants[2]} />
        </div>
      </div>
    </section>
  );
};

export default ProductSubstanceSection;
