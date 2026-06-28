import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneFrame from './SceneFrame';
import ProductCan from './ProductCan';
import Pedestal from './Pedestal';
import { dropVariants } from '../data/dropProducts';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Opening beat: typography resolves first, then the cans glide in as
      // physical objects with blur, scale, tilt, and delayed studio lighting.
      timeline
        .fromTo(
          '.hero-line',
          { yPercent: 116, opacity: 0, rotateX: -18 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.8, stagger: 0.16, ease: 'expo.out' },
        )
        .fromTo(
          '.hero-copy, .hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.86, stagger: 0.09 },
          '-=0.64',
        )
        .fromTo(
          '.hero-can',
          { x: 190, y: 110, z: -120, rotateZ: 20, rotateY: -28, scale: 0.72, opacity: 0, filter: 'blur(10px)' },
          {
            x: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.65,
            stagger: 0.14,
          },
          '-=0.76',
        )
        .fromTo(
          '.hero-podium',
          { y: 92, scaleY: 0.58, scaleX: 0.7, opacity: 0 },
          { y: 0, scaleY: 1, scaleX: 1, opacity: 1, duration: 1.18, stagger: 0.1, ease: 'power4.out' },
          '-=1.0',
        )
        .fromTo(
          '.hero-floor-glow',
          { scaleX: 0.34, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.15, ease: 'power4.out' },
          '-=1.0',
        )
        .fromTo('.hero-rim-light', { opacity: 0, xPercent: -30 }, { opacity: 1, xPercent: 0, duration: 1.2 }, '-=0.8');

      gsap.to('.hero-can-shell', {
        y: (index) => (index === 0 ? -28 : 24),
        rotateZ: (index) => (index === 0 ? -6 : 5.5),
        rotateY: (index) => (index === 0 ? 12 : -12),
        duration: (index) => 5.2 + index * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-rib-pulse', {
        opacity: 0.76,
        xPercent: 12,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll beat: the floating cans visibly "land" toward the podiums,
      // matching the video rhythm where product motion becomes staged display.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.85,
          },
        })
        .to('.hero-can--black', { y: 62, rotateZ: -10, scale: 0.94, ease: 'power2.out' }, 0)
        .to('.hero-can--purple', { y: 78, rotateZ: 8, scale: 0.96, ease: 'power2.out' }, 0)
        .to('.hero-can--silver', { y: 48, rotateZ: 8, scale: 0.93, opacity: 0.82, ease: 'none' }, 0)
        .to('.hero-podium', { y: -24, opacity: 1, ease: 'power2.out' }, 0)
        .to('.hero-content', { y: -36, opacity: 0.4, ease: 'power2.out' }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || !stage || reduceMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      stage.style.setProperty('--cursor-x', `${50 + x * 36}%`);
      stage.style.setProperty('--cursor-y', `${46 + y * 24}%`);

      gsap.to(stage, {
        x: x * 20,
        y: y * 12,
        rotateY: x * 4.5,
        rotateX: y * -3.2,
        duration: 1.05,
        ease: 'power4.out',
        overwrite: true,
      });

      gsap.to('.hero-can-shell', {
        rotateY: (index) => x * ([18, -16, -10][index] ?? 12),
        rotateX: (index) => y * ([-12, -10, -8][index] ?? -7),
        x: (index) => x * ([14, 20, 26][index] ?? 12),
        y: (index) => y * ([7, 10, 5][index] ?? 8),
        duration: 1.1,
        ease: 'power4.out',
        overwrite: 'auto',
      });
    };

    const onPointerLeave = () => {
      stage.style.setProperty('--cursor-x', '54%');
      stage.style.setProperty('--cursor-y', '46%');
      gsap.to(stage, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 1.1, ease: 'power4.out' });
      gsap.to('.hero-can-shell', { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 1.1, ease: 'power4.out', overwrite: true });
    };

    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerleave', onPointerLeave);

    return () => {
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <SceneFrame id="top" tone="purple">
      <div ref={rootRef} className="hero-scene">
        <span className="hero-rib-pulse" aria-hidden="true" />
        <span className="hero-rim-light" aria-hidden="true" />
        <div className="hero-content">
          <h1>
            <span className="hero-line-wrap">
              <span className="hero-line">Pure Water.</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line">Zero Plastic.</span>
            </span>
            <span className="hero-line-wrap tagline-line">
              <span className="hero-line">AS. IT. SHOULD. BE.</span>
            </span>
          </h1>
          <p className="hero-copy">
            Premium still water in recyclable aluminium cans. Clean, cold, made for modern India.
          </p>
          <a className="hero-cta" href="#waitlist">
            Join Waitlist
          </a>
        </div>

        <div ref={stageRef} className="hero-product-stage" aria-label="DROP. premium canned water">
          <span className="hero-floor-glow" aria-hidden="true" />
          <Pedestal className="hero-podium hero-podium--low" />
          <Pedestal className="hero-podium hero-podium--tall" />
          <Pedestal className="hero-podium hero-podium--rear" />

          <div className="hero-can hero-can--silver">
            <div className="hero-can-shell">
              <ProductCan variant={dropVariants[2]} className="drop-can--hero drop-can--hero-silver" />
            </div>
          </div>

          <div className="hero-can hero-can--black">
            <div className="hero-can-shell">
              <ProductCan variant={dropVariants[0]} className="drop-can--hero drop-can--hero-black" />
            </div>
          </div>

          <div className="hero-can hero-can--purple">
            <div className="hero-can-shell">
              <ProductCan variant={dropVariants[1]} className="drop-can--hero drop-can--hero-purple" />
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

export default Hero;
