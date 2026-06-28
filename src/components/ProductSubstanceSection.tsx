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
    <section id="features" className="substance-section" style={{ backgroundColor: '#D32F2F', padding: '100px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 className="statement-title" style={{ fontFamily: 'Oswald, sans-serif', color: '#F6F4EB', fontSize: 'clamp(4rem, 15vw, 12rem)', textTransform: 'uppercase', textAlign: 'center', opacity: 0.9 }}>
        HYDRATION
      </h2>
      <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1200px', margin: '4rem auto 0' }}>
        <div className="info-card push-left" style={{ background: '#FBC02D', color: '#1A1A1A', padding: '2rem', borderRadius: '10px', transform: 'rotate(-2deg)', boxShadow: '5px 5px 0px #1A1A1A' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif' }}>PURE SOURCE</h2>
          <p style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>500ml of still water. No additives, no noise. Just crisp hydration in a hyper-realistic shell.</p>
        </div>
        <div className="info-card push-right" style={{ background: '#1A1A1A', color: '#F6F4EB', padding: '2rem', borderRadius: '10px', transform: 'rotate(2deg)', boxShadow: '5px 5px 0px #1A1A1A' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif' }}>0.0% ABV</h2>
          <p style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Because it's water. Drink it anywhere, anytime. Stay sharp.</p>
        </div>
      </div>
    </section>
  );
};

export default ProductSubstanceSection;
