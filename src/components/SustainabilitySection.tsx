import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ban, Leaf, PackageCheck, Recycle } from 'lucide-react';
import SceneFrame from './SceneFrame';
import ProductCan from './ProductCan';
import { dropVariants } from '../data/dropProducts';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: 'Recyclable aluminium', copy: 'Built for circular reuse.', Icon: Recycle },
  { title: 'Zero plastic', copy: 'No single-use bottles.', Icon: Ban },
  { title: 'Urban portable', copy: 'Slim, cold, modern.', Icon: PackageCheck },
  { title: 'Cleaner future', copy: 'Made for modern India.', Icon: Leaf },
];

const SustainabilitySection = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sustain-copy > *, .sustain-card',
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.84,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 66%' },
        },
      );

      gsap.fromTo(
        '.sustain-product',
        { x: 120, rotateZ: 10, opacity: 0 },
        {
          x: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 58%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SceneFrame id="sustainability" tone="silver">
      <div ref={rootRef} className="sustain-scene">
        <div className="sustain-copy">
          <p className="scene-label">Sustainability</p>
          <h2>No Plastic. Just Water.</h2>
          <p>DROP. replaces plastic bottles with recyclable aluminium cans and a cleaner cold ritual.</p>
          <div className="sustain-grid">
            {items.map(({ title, copy, Icon }) => (
              <article key={title} className="sustain-card">
                <Icon size={18} strokeWidth={1.7} />
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="sustain-product">
          <ProductCan variant={dropVariants[2]} />
        </div>
      </div>
    </SceneFrame>
  );
};

export default SustainabilitySection;
