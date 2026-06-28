import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import ProductCan from './ProductCan';
import { dropVariants } from '../data/dropProducts';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeVariant, setActiveVariant] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || !stage || reduceMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

      timeline
        .fromTo(
          '.hero-headline-line, .hero-subtext, .hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
        )
        .fromTo(
          '.hero-carousel-indicator',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1, stagger: 0.1 },
          '-=1',
        )
        .fromTo(
          '.hero-can-container',
          { y: 120, scale: 0.8, opacity: 0, rotateZ: 15, rotateY: -30 },
          { y: 0, scale: 1, opacity: 1, rotateZ: 0, rotateY: 0, duration: 2, ease: 'expo.out', force3D: true },
          '-=1.4',
        );

      gsap.to('.hero-can-float', {
        y: 20,
        rotateZ: 2,
        rotateY: 8,
        rotateX: -4,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
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
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const shell = stage.querySelector('.hero-can-shell');
    if (!shell) return;

    const stageMove = {
      rotateY: gsap.quickTo(stage, 'rotateY', { duration: 1.2, ease: 'power4.out' }),
      rotateX: gsap.quickTo(stage, 'rotateX', { duration: 1.2, ease: 'power4.out' }),
    };

    const shellMove = {
      rotateY: gsap.quickTo(shell, 'rotateY', { duration: 1, ease: 'power4.out' }),
      rotateX: gsap.quickTo(shell, 'rotateX', { duration: 1, ease: 'power4.out' }),
      x: gsap.quickTo(shell, 'x', { duration: 1, ease: 'power4.out' }),
      y: gsap.quickTo(shell, 'y', { duration: 1, ease: 'power4.out' }),
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      stageMove.rotateY(x * 6);
      stageMove.rotateX(y * -4);

      shellMove.rotateY(x * 14);
      shellMove.rotateX(y * -8);
      shellMove.x(x * 30);
      shellMove.y(y * 15);
    };

    const onPointerLeave = () => {
      stageMove.rotateX(0);
      stageMove.rotateY(0);
      shellMove.x(0);
      shellMove.y(0);
      shellMove.rotateX(0);
      shellMove.rotateY(0);
    };

    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave);

    return () => {
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const variant = dropVariants[activeVariant];
  const style = {
    '--hero-accent': variant.accent,
    '--hero-glow': variant.glow,
    '--hero-bg': variant.gradient,
  } as React.CSSProperties;

  return (
    <section ref={rootRef} id="hero" className="hero-section full-screen" style={style}>
      <div className="hero-background" style={{ background: 'var(--hero-bg)' }}>
        <div className="ribbed-curtain" aria-hidden="true" />
        <span className="hero-rib-pulse" aria-hidden="true" />
        <span className="hero-rim-light" aria-hidden="true" />
      </div>
      
      <Header />

      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-text-content">
            <h1 className="hero-headline">
              <span className="hero-headline-line">Pure Water.</span><br />
              <span className="hero-headline-line">Zero Plastic.</span><br />
              <span className="hero-headline-line accent-text" style={{ color: 'var(--hero-accent)' }}>Choose DROP.</span>
            </h1>
            <p className="hero-subtext">
              Premium still water in a recyclable aluminium can. Clean, cold, and made for a plastic-free future.
            </p>
            <div className="hero-cta-group">
              <a className="hero-cta btn-primary" href="#waitlist">
                Join Waitlist
              </a>
              <a className="hero-cta btn-secondary" href="#details">
                Explore DROP.
              </a>
            </div>
            
            <div className="hero-carousel-nav">
              {dropVariants.map((v, i) => (
                <button
                  key={v.id}
                  className={`hero-carousel-indicator ${i === activeVariant ? 'active' : ''}`}
                  onClick={() => setActiveVariant(i)}
                  aria-label={`View ${v.name}`}
                >
                  <span className="indicator-bar" style={{ backgroundColor: v.accent }} />
                  <span className="indicator-label">{v.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div ref={stageRef} className="hero-product-stage">
            <div className="hero-can-container">
              <div className="hero-can-float">
                <div className="hero-can-shell">
                  <ProductCan variant={variant} className="drop-can--hero-massive" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
