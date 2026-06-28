import { useState } from 'react';
import ProductCan from './ProductCan';
import { dropVariants } from '../data/dropProducts';

const ProductShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="lineup" className="showcase-section" style={{ backgroundColor: '#F6F4EB', color: '#1A1A1A', padding: '100px 20px', textAlign: 'center' }}>
      <div className="showcase-content">
        <h2 className="showcase-title" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '0.05em' }}>YEAR ROUND</h2>
        <p style={{ fontSize: '1.2rem', fontFamily: 'Helvetica Neue, sans-serif', maxWidth: '600px', margin: '0 auto 60px' }}>
          Available in Silver, Matte Black, and Purple.
        </p>
        
        <div className="showcase-gallery" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {dropVariants.map((variant, i) => (
            <button
              key={variant.id}
              className={`showcase-product ${i === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              aria-label={`View ${variant.name}`}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <div className="showcase-can-wrapper" style={{ height: '300px', width: 'auto', transition: 'transform 0.3s ease' }}>
                <ProductCan variant={variant} className="drop-can--showcase" />
              </div>
              <p className="showcase-label" style={{ fontFamily: 'Oswald, sans-serif', marginTop: '20px', fontSize: '1.1rem', color: '#1A1A1A', textTransform: 'uppercase' }}>
                {variant.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
