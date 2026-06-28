import type { CSSProperties } from 'react';
import type { DropVariant } from '../data/dropProducts';

type ProductCanProps = {
  variant: DropVariant;
  className?: string;
  imageClassName?: string;
  label?: string;
};

const ProductCan = ({ variant, className = '', imageClassName = '', label }: ProductCanProps) => {
  const style = {
    '--can-glow': variant.glow,
    '--can-accent': variant.accent,
  } as CSSProperties;

  return (
    <div className={`drop-can drop-can--${variant.id} ${className}`} style={style}>
      <span className="drop-can__halo" aria-hidden="true" />
      <span className="drop-can__floor-shadow" aria-hidden="true" />
      <img
        src={variant.image}
        alt={label ?? `${variant.name} DROP. can`}
        className={`drop-can__image ${imageClassName}`}
        width={746}
        height={1536}
        decoding="async"
        loading="eager"
        fetchPriority="high"
        draggable="false"
      />
    </div>
  );
};

export default ProductCan;
