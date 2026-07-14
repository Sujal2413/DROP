'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface HeroNavbarProps {
  activeIndex?: number;
}

const THEMES = [
  { id: 'purple', text: '#E9D5FF', accentBg: '#2D1B4E' },
  { id: 'gold', text: '#C9A84C', accentBg: '#2A1F0E' },
  { id: 'black', text: '#FFFFFF', accentBg: '#1A1A1A' },
  { id: 'silver', text: '#E2E8F0', accentBg: '#23272C' },
  { id: 'olive', text: '#1B2A22', accentBg: '#FDFCF8' }
];

export default function HeroNavbar({ activeIndex = 0 }: HeroNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Default to white if activeIndex is not specified
  const theme = THEMES[activeIndex] || { id: 'default', text: '#FFFFFF', accentBg: '#1A1A1A' };
  const themeColor = theme.text;

  // Handle trap focus and escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMobileMenuOpen) return;
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      menuRef.current?.querySelector('button')?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full px-5 py-5 sm:px-8 sm:py-6 flex justify-between items-center z-[100] pointer-events-auto transition-colors duration-1000">
        {/* Left: Logo & Back Button */}
        <div className="flex items-center gap-3 w-auto md:w-[200px] min-w-0">
          {pathname !== '/' && (
            <Link 
              href="/" 
              className="hover:scale-110 active:scale-95 transition-transform flex items-center justify-center p-1 focus:outline-none focus:ring-2 focus:ring-white rounded-md"
              style={{ color: themeColor }}
              aria-label="Back to Home"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </Link>
          )}
          <div className="font-bold text-xl sm:text-2xl tracking-tight transition-colors duration-1000" style={{ color: themeColor }}>
            <Link href="/" className="outline-none focus:ring-2 focus:ring-white rounded-md font-black block p-1">DROP.</Link>
          </div>
        </div>
        
        {/* Center: Toggle-like Nav */}
        <div 
          className="hidden md:flex gap-2 text-xs font-bold tracking-widest rounded-full p-1.5 border transition-all duration-1000 backdrop-blur-md"
          style={{ 
            borderColor: `${themeColor}20`, 
            color: themeColor,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          <Link href="/#products" className="px-6 py-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white">PRODUCTS</Link>
          <Link href="/story" className="px-6 py-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white">STORY</Link>
          <Link href="/sustainability" className="px-6 py-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white">SUSTAINABILITY</Link>
        </div>
        
        {/* Right: Waitlist CTA & Mobile Menu */}
        <div className="flex justify-end gap-2 sm:gap-3 md:gap-6 w-auto md:w-[200px] shrink-0 items-center">
          <Link
            href="/#waitlist"
            className="hidden md:inline-flex px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase border transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-sm"
            style={{ 
              borderColor: `${themeColor}40`, 
              color: themeColor,
            }}
          >
            Join List
          </Link>

          {/* Mobile Menu Button */}
          <button 
            ref={triggerRef}
            onClick={() => setIsMobileMenuOpen(true)} 
            className="md:hidden hover:scale-110 active:scale-95 transition-all relative p-1 min-h-10 min-w-10 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-white rounded-md" 
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-1000">
              <line x1="3" x2="21" y1="6" y2="6"></line>
              <line x1="3" x2="21" y1="12" y2="12"></line>
              <line x1="3" x2="21" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end pointer-events-auto" role="dialog" aria-modal="true" ref={menuRef}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />
          
          {/* Drawer Body */}
          <div className="relative w-full max-w-sm bg-[#0F1112] border-l border-white/10 h-full flex flex-col shadow-2xl p-5 sm:p-8 z-10 text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
              <h3 className="text-xl font-black tracking-widest uppercase">Menu</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white/60 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-8 text-xl sm:text-2xl font-black tracking-[0.18em] sm:tracking-widest uppercase">
              <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C9A84C] transition-colors border-b border-white/5 pb-4 focus:outline-none focus:text-[#C9A84C]">Products</Link>
              <Link href="/story" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C9A84C] transition-colors border-b border-white/5 pb-4 focus:outline-none focus:text-[#C9A84C]">Story</Link>
              <Link href="/sustainability" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C9A84C] transition-colors border-b border-white/5 pb-4 focus:outline-none focus:text-[#C9A84C]">Sustainability</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C9A84C] transition-colors border-b border-white/5 pb-4 focus:outline-none focus:text-[#C9A84C]">For Business</Link>
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/10">
               <Link href="/#waitlist" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 text-center bg-white text-black font-black tracking-widest text-xs uppercase hover:bg-[#C9A84C] transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F1112]">
                 Join The List
               </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
