import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneFrame from './SceneFrame';
import ProductCan from './ProductCan';
import Pedestal from './Pedestal';
import { dropVariants } from '../data/dropProducts';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
  const [active, setActive] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeVariant = dropVariants[active];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-text > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 68%' },
        },
      );

      gsap.fromTo(
        '.showcase-can',
        { y: -140, x: 90, rotateZ: 18, rotateY: -22, scale: 0.88, opacity: 0 },
        {
          y: 0,
          x: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
          duration: 1.35,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 58%' },
        },
      );

      gsap.fromTo(
        '.showcase-podium',
        { y: 72, scaleY: 0.56, opacity: 0 },
        {
          y: 0,
          scaleY: 1,
          opacity: 1,
          duration: 1.05,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 58%' },
        },
      );

      gsap.to('.showcase-can-float', {
        y: (index) => (index === 1 ? -12 : 10),
        rotateZ: (index) => [-3, 2.2, 3.4][index] ?? 2,
        rotateY: (index) => [4, -3, 3][index] ?? 2,
        duration: (index) => 4.4 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.showcase-product-${active + 1} .showcase-can`,
        { y: -24, rotateY: -16, scale: 0.98 },
        {
          y: -14,
          rotateY: 0,
          scale: 1.06,
          duration: 0.72,
          ease: 'power4.out',
          force3D: true,
        },
      );
      gsap.fromTo(
        `.showcase-product-${active + 1} .showcase-product__beam`,
        { opacity: 0.35, scale: 0.82 },
        { opacity: 0.88, scale: 1, duration: 0.72, ease: 'power4.out' },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <SceneFrame id="products" tone="purple">
      <div
        ref={rootRef}
        className="showcase-scene"
        style={{ '--stage-accent': activeVariant.accent, '--stage-glow': activeVariant.glow } as CSSProperties}
      >
        <div className="showcase-text">
          <p className="scene-label">Products</p>
          <h2>Choose your cold.</h2>
          <p>Three recyclable aluminium finishes. Same pure still water. Same rare feeling.</p>
          <div className="theme-dots" aria-label="Product theme selector">
            {dropVariants.map((variant, index) => (
              <button
                key={variant.id}
                type="button"
                aria-label={`Show ${variant.name}`}
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
                style={{ '--dot-color': variant.accent } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="showcase-stage">
          <span className="showcase-floor" aria-hidden="true" />
          {dropVariants.map((variant, index) => (
            <button
              key={variant.id}
              type="button"
              className={`showcase-product showcase-product-${index + 1} ${active === index ? 'is-active' : ''}`}
              onClick={() => setActive(index)}
            >
              <span className="showcase-product__beam" aria-hidden="true" />
              <Pedestal className={`showcase-podium showcase-podium-${index + 1}`} />
              <div className="showcase-can">
                <div className="showcase-can-float">
                  <ProductCan variant={variant} className="drop-can--showcase" />
                </div>
              </div>
              <span className="showcase-product__label">{variant.name}</span>
            </button>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
};

export default ProductShowcase;
