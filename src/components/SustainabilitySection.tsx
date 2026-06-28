import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ban, Leaf, PackageCheck, Recycle } from 'lucide-react';



gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: '100% recyclable aluminium can', Icon: Recycle },
  { title: 'Premium still water', Icon: Leaf },
  { title: 'Zero plastic bottle', Icon: Ban },
  { title: 'Modern portable design', Icon: PackageCheck },
  { title: 'Built for a cleaner future', Icon: Leaf },
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
    <section id="sustainability" className="sustainability-section">
      <div ref={rootRef} className="sustain-scene">
        <div className="sustain-copy">
          <p className="scene-label">Sustainability</p>
          <h2>No Plastic. Just Water.</h2>
          <ul className="sustain-list">
            {items.map(({ title, Icon }) => (
              <li key={title} className="sustain-card">
                <Icon size={18} strokeWidth={1.7} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
