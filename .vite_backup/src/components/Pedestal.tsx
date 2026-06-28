type PedestalProps = {
  className?: string;
};

const Pedestal = ({ className = '' }: PedestalProps) => {
  return (
    <div className={`podium ${className}`} aria-hidden="true">
      <span className="podium__shadow" />
      <span className="podium__top" />
      <span className="podium__side" />
      <span className="podium__rim" />
      <span className="podium__shine" />
    </div>
  );
};

export default Pedestal;
