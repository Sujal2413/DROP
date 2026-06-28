import type { ReactNode } from 'react';
import Header from './Header';

type SceneFrameProps = {
  id?: string;
  children: ReactNode;
  tone?: 'purple' | 'charcoal' | 'silver' | 'pink';
  className?: string;
};

const SceneFrame = ({ id, children, tone = 'purple', className = '' }: SceneFrameProps) => {
  return (
    <section id={id} className={`motion-scene scene-tone-${tone}`}>
      <div className={`site-frame ${className}`}>
        <Header />
        <div className="frame-viewport">
          <div className="ribbed-curtain" aria-hidden="true" />
          {children}
        </div>
      </div>
    </section>
  );
};

export default SceneFrame;
