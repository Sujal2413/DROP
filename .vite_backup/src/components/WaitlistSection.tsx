import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

import { dropVariants } from '../data/dropProducts';

gsap.registerPlugin(ScrollTrigger);

const WaitlistSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wait-copy > *, .wait-form',
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.84,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 66%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="waitlist-section">
      <div ref={rootRef} className="wait-scene">
        <div className="wait-copy">
          <p className="scene-label">Coming Soon</p>
          <h2>DROP. is coming soon.</h2>
          <p>Be first to experience water as it should be.</p>
        </div>

        {submitted ? (
          <div className="wait-success">
            <Check size={34} strokeWidth={1.7} />
            <h3>You're on the list.</h3>
            <p>Batch 001 access will arrive cold.</p>
            <button type="button" onClick={() => setSubmitted(false)}>
              Add another
            </button>
          </div>
        ) : (
          <form className="wait-form" onSubmit={onSubmit}>
            <label>
              <span>Name</span>
              <input name="name" placeholder="Your name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="you@email.com" required />
            </label>
            <label>
              <span>City</span>
              <input name="city" placeholder="Mumbai" required />
            </label>
            <label>
              <span>Preferred Can</span>
              <select name="preferred-can" defaultValue={dropVariants[1].name}>
                {dropVariants.map((variant) => (
                  <option key={variant.id}>{variant.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Size</span>
              <select name="size" defaultValue="500ml">
                <option>330ml</option>
                <option>500ml</option>
              </select>
            </label>
            <label>
              <span>Would you buy canned water?</span>
              <select name="buy-canned-water" defaultValue="Yes">
                <option>Yes</option>
                <option>Maybe</option>
                <option>No</option>
              </select>
            </label>
            <button type="submit">Join the DROP. List</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default WaitlistSection;
