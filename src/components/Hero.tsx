import { useRef } from 'react';
import Header from './Header';

const Hero = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={rootRef} id="hero" className="hero-section full-screen">
      <div className="hero-background" style={{ background: '#F6F4EB' }}></div>
      <Header />
      <div className="hero-content">
        <div className="hero-text-content" style={{ textAlign: 'center', margin: 'auto' }}>
          <h1 className="hero-headline" style={{ fontFamily: 'Oswald, sans-serif', color: '#D32F2F', textTransform: 'uppercase', lineHeight: 1.1, fontSize: 'clamp(4rem, 12vw, 10rem)', letterSpacing: '-2px' }}>
            UNLIMITED<br/>
            RELEASE<br/>
            WATER
          </h1>
          <p className="hero-subtext" style={{ color: '#1A1A1A', fontWeight: 500, letterSpacing: '2px', marginTop: '1rem', fontFamily: 'Helvetica Neue, sans-serif' }}>
            DROP. AS. IT. SHOULD. BE.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
