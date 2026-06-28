import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pause, Play } from 'lucide-react';
import SceneFrame from './SceneFrame';
import ProductCan from './ProductCan';
import Pedestal from './Pedestal';
import { dropVariants } from '../data/dropProducts';

gsap.registerPlugin(ScrollTrigger);

const sizes = ['330ml', '500ml'] as const;
const packs = [6, 12, 24] as const;

const DetailView = () => {
  const [variantIndex, setVariantIndex] = useState(1);
  const [size, setSize] = useState<(typeof sizes)[number]>('500ml');
  const [pack, setPack] = useState<(typeof packs)[number]>(12);
  const [playing, setPlaying] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const variant = dropVariants[variantIndex];

  const price = useMemo(() => {
    const unit = size === '330ml' ? 72 : 94;
    return unit * pack;
  }, [pack, size]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.detail-copy > *, .detail-control',
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.86,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 66%' },
        },
      );

      gsap.fromTo(
        '.detail-product',
        { x: 150, y: -10, rotateZ: 14, rotateY: -22, scale: 0.84, opacity: 0 },
        {
          x: 0,
          y: 0,
          rotateZ: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
          duration: 1.25,
          ease: 'power4.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 58%' },
        },
      );

      gsap.fromTo(
        '.detail-podium',
        { y: 88, scaleY: 0.58, opacity: 0 },
        {
          y: 0,
          scaleY: 1,
          opacity: 1,
          duration: 1.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 58%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.detail-product',
        { y: -18, rotateY: -16, scale: 0.94 },
        { y: 0, rotateY: 0, scale: 1, duration: 0.75, ease: 'power4.out', force3D: true },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [variantIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!stage || reduceMotion) return;

    const product = stage.querySelector<HTMLElement>('.detail-product');
    if (!product) return;

    const move = {
      x: gsap.quickTo(product, 'x', { duration: 0.95, ease: 'power4.out' }),
      y: gsap.quickTo(product, 'y', { duration: 0.95, ease: 'power4.out' }),
      rotateY: gsap.quickTo(product, 'rotateY', { duration: 0.95, ease: 'power4.out' }),
      rotateX: gsap.quickTo(product, 'rotateX', { duration: 0.95, ease: 'power4.out' }),
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      stage.style.setProperty('--cursor-x', `${50 + x * 32}%`);
      stage.style.setProperty('--cursor-y', `${46 + y * 24}%`);

      move.rotateY(x * 12);
      move.rotateX(y * -8);
      move.x(x * 16);
      move.y(y * 8);
    };

    const onPointerLeave = () => {
      stage.style.setProperty('--cursor-x', '54%');
      stage.style.setProperty('--cursor-y', '45%');
      move.rotateX(0);
      move.rotateY(0);
      move.x(0);
      move.y(0);
    };

    stage.addEventListener('pointermove', onPointerMove, { passive: true });
    stage.addEventListener('pointerleave', onPointerLeave);

    return () => {
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <SceneFrame id="detail" tone={variant.id === 'icy-silver' ? 'silver' : 'pink'}>
      <div
        ref={rootRef}
        className="detail-scene"
        style={{ '--detail-accent': variant.accent, '--detail-glow': variant.glow } as CSSProperties}
      >
        <div className="detail-copy">
          <p className="scene-label">DROP. Pure Still Water</p>
          <h2>{variant.name}</h2>
          <p>
            Premium still water in recyclable aluminium. Tall, slim, minimal. Pure hydration, as it should be.
          </p>

          <div className="detail-control">
            <span>Design</span>
            <div>
              {dropVariants.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={variantIndex === index ? 'selected' : ''}
                  onClick={() => setVariantIndex(index)}
                >
                  {item.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-control">
              <span>Size</span>
              <div>
                {sizes.map((item) => (
                  <button key={item} type="button" className={size === item ? 'selected' : ''} onClick={() => setSize(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-control">
              <span>Pack</span>
              <div>
                {packs.map((item) => (
                  <button key={item} type="button" className={pack === item ? 'selected' : ''} onClick={() => setPack(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="price-row">
            <span>Launch price</span>
            <strong>Rs. {price}</strong>
          </div>

          <a className="notify-button" href="#waitlist">
            Notify Me
          </a>
        </div>

        <div ref={stageRef} className="detail-product-wrap">
          <span className="detail-backlight" aria-hidden="true" />
          <Pedestal className="detail-podium" />
          <button className="motion-toggle" type="button" onClick={() => setPlaying((value) => !value)} aria-label="Toggle motion">
            {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
          </button>
          <div className={`detail-product ${playing ? 'is-playing' : ''}`}>
            <div className="detail-product-float">
              <ProductCan variant={variant} className="drop-can--detail" />
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

export default DetailView;
