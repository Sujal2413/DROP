import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Products', href: '#products' },
  { label: 'Story', href: '#story' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Cart (0)', href: '#detail' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="frame-header">
      <a href="#top" className="drop-logo" aria-label="DROP. home">
        DROP.
      </a>

      <nav className="frame-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className="frame-menu"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={17} strokeWidth={1.8} /> : <Menu size={17} strokeWidth={1.8} />}
      </button>

      {open && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
