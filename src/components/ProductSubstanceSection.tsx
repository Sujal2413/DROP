import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
    <section id="features" className="substance-section" style={{ backgroundColor: '#D32F2F', padding: '100px 20px', textAlign: 'center' }}>
      <div ref={rootRef} className="substance-scene">
        <div className="statement-text">
          <h2 className="statement-title" style={{ fontFamily: 'Oswald, sans-serif', color: '#F6F4EB', fontSize: '4rem', textTransform: 'uppercase', marginBottom: '40px' }}>
            HYDRATION
          </h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <span style={{ backgroundColor: '#FBC02D', color: '#1A1A1A', padding: '10px 24px', borderRadius: '99px', fontFamily: 'Oswald, sans-serif', fontWeight: 'bold', fontSize: '1.2rem' }}>CRISP</span>
            <span style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', padding: '10px 24px', borderRadius: '99px', fontFamily: 'Oswald, sans-serif', fontWeight: 'bold', fontSize: '1.2rem' }}>PURE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSubstanceSection;
