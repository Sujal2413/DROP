import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import ProductSubstanceSection from './components/ProductSubstanceSection';
import ProductShowcase from './components/ProductShowcase';
import DetailView from './components/DetailView';
import SustainabilitySection from './components/SustainabilitySection';
import WaitlistSection from './components/WaitlistSection';
import Footer from './components/Footer';

import ProductCan from './components/ProductCan';
import { dropVariants } from './data/dropProducts';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.34,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.78,
      touchMultiplier: 1.42,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.68,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.defaults({ fastScrollEnd: true });
    ScrollTrigger.refresh();

    const scrollToHash = (hash: string, immediate = false) => {
      if (!hash || hash === '#') return false;
      const target = document.querySelector(hash);
      if (!target) return false;

      lenis.scrollTo(target as HTMLElement, {
        duration: immediate ? 0 : 1.42,
        immediate,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return true;
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!link || !hash || hash === '#') return;

      if (!document.querySelector(hash)) return;

      event.preventDefault();
      window.history.pushState(null, '', hash);
      scrollToHash(hash);
    };

    const handleHashChange = () => scrollToHash(window.location.hash);

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', handleHashChange);

    window.setTimeout(() => {
      scrollToHash(window.location.hash, true);
      ScrollTrigger.refresh();
    }, 80);

    const ctx = gsap.context(() => {
      // The video reference has a living outer gradient. This keeps it breathing
      // subtly while ScrollTrigger handles the content rhythm.
      gsap.to('.ambient-aura', {
        backgroundPosition: '65% 35%, 35% 70%, 50% 50%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Fixed can transform based on scroll
      lenis.on('scroll', () => {
        const scrollY = window.scrollY;
        const can = document.getElementById('global-fixed-can');
        if (can) {
          const rotation = scrollY * 0.02;
          const scale = Math.max(0.8, 1 - (scrollY * 0.0002));
          can.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        }
      });
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', handleHashChange);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="drop-experience">
      <div className="ambient-aura" />
      
      <div className="fixed-can-wrapper">
        <div id="global-fixed-can" style={{ willChange: 'transform' }}>
          <ProductCan variant={dropVariants[1]} /> {/* Purple variant as requested in reference */}
        </div>
      </div>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <ProductSubstanceSection />
        <ProductShowcase />
        <DetailView />
        <SustainabilitySection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
