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
      // sharp physical objects. Keep can motion transform-only to avoid
      // muddy offscreen rasterization during the first impression.
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
          {
            x: (index) => [240, 180, 210][index] ?? 190,
            y: (index) => [86, 124, 104][index] ?? 110,
            z: -160,
            rotateZ: (index) => [24, 18, 26][index] ?? 20,
            rotateY: -32,
            scale: 0.7,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            z: (index) => [-70, 58, 105][index] ?? 0,
            rotateZ: (index) => [13, -12, 7][index] ?? 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            force3D: true,
            duration: 1.65,
            stagger: 0.14,
          },
          '-=0.76',
        )
        .fromTo(
          '.hero-podium',
          { y: 92, scaleY: 0.58, scaleX: 0.7, opacity: 0 },
          { y: 0, scaleY: 1, scaleX: 1, opacity: 1, duration: 1.18, stagger: 0.1, ease: 'power4.out', force3D: true },
          '-=1.0',
        )
        .fromTo(
          '.hero-floor-glow',
          { scaleX: 0.34, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.15, ease: 'power4.out' },
          '-=1.0',
        )
        .fromTo('.hero-rim-light', { opacity: 0, xPercent: -30 }, { opacity: 1, xPercent: 0, duration: 1.2 }, '-=0.8');

      gsap.to('.hero-can-float', {
        y: (index) => [-22, 28, -14][index] ?? 16,
        x: (index) => [6, -8, 5][index] ?? 0,
        rotateZ: (index) => [4, -5, 3][index] ?? 2,
        rotateY: (index) => [-12, 14, -8][index] ?? 4,
        rotateX: (index) => [2.5, -3, 1.5][index] ?? 1,
        duration: (index) => 6.2 + index * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        force3D: true,
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
            scrub: 1.5,
          },
        })
        .to('.hero-can--black', { y: 62, rotateZ: -10, scale: 0.94, ease: 'power2.inOut', force3D: true }, 0)
        .to('.hero-can--purple', { y: 78, rotateZ: 8, scale: 0.96, ease: 'power2.inOut', force3D: true }, 0)
        .to('.hero-can--silver', { y: 48, rotateZ: 8, scale: 0.93, opacity: 0.82, ease: 'power2.inOut', force3D: true }, 0)
        .to('.hero-podium', { y: -24, opacity: 1, ease: 'power2.inOut', force3D: true }, 0)
        .to('.hero-content', { y: -36, opacity: 0.4, ease: 'power2.out', force3D: true }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || !stage || reduceMotion) return;

    const shells = gsap.utils.toArray<HTMLElement>('.hero-can-shell', stage);
    const stageMove = {
      x: gsap.quickTo(stage, 'x', { duration: 1.1, ease: 'power4.out' }),
      y: gsap.quickTo(stage, 'y', { duration: 1.1, ease: 'power4.out' }),
      rotateY: gsap.quickTo(stage, 'rotateY', { duration: 1.1, ease: 'power4.out' }),
      rotateX: gsap.quickTo(stage, 'rotateX', { duration: 1.1, ease: 'power4.out' }),
    };
    const shellMove = shells.map((shell) => ({
      x: gsap.quickTo(shell, 'x', { duration: 1.05, ease: 'power4.out' }),
      y: gsap.quickTo(shell, 'y', { duration: 1.05, ease: 'power4.out' }),
      rotateY: gsap.quickTo(shell, 'rotateY', { duration: 1.05, ease: 'power4.out' }),
      rotateX: gsap.quickTo(shell, 'rotateX', { duration: 1.05, ease: 'power4.out' }),
    }));

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      stage.style.setProperty('--cursor-x', `${50 + x * 36}%`);
      stage.style.setProperty('--cursor-y', `${46 + y * 24}%`);

      stageMove.x(x * 20);
      stageMove.y(y * 12);
      stageMove.rotateY(x * 4.5);
      stageMove.rotateX(y * -3.2);

      shellMove.forEach((move, index) => {
        move.rotateY(x * ([18, -16, -10][index] ?? 12));
        move.rotateX(y * ([-12, -10, -8][index] ?? -7));
        move.x(x * ([14, 20, 26][index] ?? 12));
        move.y(y * ([7, 10, 5][index] ?? 8));
      });
    };

    const onPointerLeave = () => {
      stage.style.setProperty('--cursor-x', '54%');
      stage.style.setProperty('--cursor-y', '46%');
      stageMove.x(0);
      stageMove.y(0);
      stageMove.rotateX(0);
      stageMove.rotateY(0);
      shellMove.forEach((move) => {
        move.x(0);
        move.y(0);
        move.rotateX(0);
        move.rotateY(0);
      });
    };

    root.addEventListener('pointermove', onPointerMove, { passive: true });
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
            <div className="hero-can-float">
              <div className="hero-can-shell">
                <ProductCan variant={dropVariants[2]} className="drop-can--hero drop-can--hero-silver" />
              </div>
            </div>
          </div>

          <div className="hero-can hero-can--black">
            <div className="hero-can-float">
              <div className="hero-can-shell">
                <ProductCan variant={dropVariants[0]} className="drop-can--hero drop-can--hero-black" />
              </div>
            </div>
          </div>

          <div className="hero-can hero-can--purple">
            <div className="hero-can-float">
              <div className="hero-can-shell">
                <ProductCan variant={dropVariants[1]} className="drop-can--hero drop-can--hero-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

export default Hero;
