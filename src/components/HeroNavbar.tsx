'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Image from 'next/image';

interface HeroNavbarProps {
  activeIndex?: number;
}

const THEMES = [
  { id: 'purple', text: '#E9D5FF', accentBg: '#2D1B4E' },
  { id: 'gold', text: '#C9A84C', accentBg: '#2A1F0E' },
  { id: 'black', text: '#FFFFFF', accentBg: '#1A1A1A' },
  { id: 'silver', text: '#E2E8F0', accentBg: '#23272C' }
];

export default function HeroNavbar({ activeIndex = 0 }: HeroNavbarProps) {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    setShowSurvey, 
    clearCart,
    logout 
  } = useCart();
  
  const [isUserOpen, setIsUserOpen] = useState(false);

  // Default to white if activeIndex is not specified
  const theme = THEMES[activeIndex] || { id: 'default', text: '#FFFFFF', accentBg: '#1A1A1A' };
  const themeColor = theme.text;

  const handleSendInterest = () => {
    setIsCartOpen(false);
    clearCart();
    setShowSurvey(true);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-[100] pointer-events-auto transition-colors duration-1000">
        {/* Left: Logo */}
        <div className="font-bold text-2xl tracking-tighter w-[200px] transition-colors duration-1000" style={{ color: themeColor }}>
          <Link href="/" className="outline-none font-black">DROP.</Link>
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
          <Link href="#products" className="px-6 py-2 rounded-full hover:bg-white/10 transition-colors">PRODUCTS</Link>
          <Link href="/story" className="px-6 py-2 rounded-full hover:bg-white/10 transition-colors">STORY</Link>
          <Link href="/sustainability" className="px-6 py-2 rounded-full hover:bg-white/10 transition-colors">SUSTAINABILITY</Link>
        </div>
        
        {/* Right: User and Cart */}
        <div className="flex justify-end gap-6 w-[200px]">
          {/* User Button */}
          <button 
            onClick={() => setIsUserOpen(!isUserOpen)} 
            className="hover:scale-110 active:scale-95 transition-all relative p-1 cursor-pointer" 
            aria-label="User Profile"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-1000">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className="hover:scale-110 active:scale-95 transition-all relative p-1 flex items-center gap-2 font-bold text-sm tracking-widest cursor-pointer" 
            style={{ color: themeColor }}
            aria-label="Cart"
          >
            <div className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-1000">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C9A84C] text-black text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-black animate-pulse shadow-md">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="hidden md:inline transition-colors duration-1000">({cart.length})</span>
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end pointer-events-auto">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          
          {/* Drawer Body */}
          <div className="relative w-full max-w-md bg-[#0F1112] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl p-8 z-10 text-white">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
                <h3 className="text-xl font-black tracking-widest uppercase">Interest Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-white/40 font-medium">
                  <p className="mb-4 uppercase text-xs tracking-widest">No interest items added yet</p>
                  <p className="text-[10px] leading-relaxed max-w-[240px] mx-auto">Click "Show Interest" on any flavor in the products section to add it here.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 relative bg-black/30 rounded-xl overflow-hidden flex items-center justify-center">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm uppercase">{item.name}</h4>
                          <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-wider mt-0.5">{item.flavor}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-white/40 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <button 
                  onClick={handleSendInterest}
                  className="w-full py-4 bg-[#C9A84C] hover:bg-[#B0913B] text-black font-black tracking-widest text-xs rounded-full transition-all duration-300 uppercase shadow-lg shadow-[#C9A84C]/10 hover:shadow-[#C9A84C]/25 cursor-pointer active:scale-95 text-center block"
                >
                  Send Interest
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Panel Drawer */}
      {isUserOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end pointer-events-auto">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsUserOpen(false)} />
          
          {/* Drawer Body */}
          <div className="relative w-full max-w-sm bg-[#0F1112] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl p-8 z-10 text-white">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
                <h3 className="text-xl font-black tracking-widest uppercase">User Profile</h3>
                <button onClick={() => setIsUserOpen(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h4 className="font-black text-lg uppercase tracking-wider text-white">Drop Enthusiast</h4>
                <p className="text-white/40 text-xs tracking-wider uppercase mt-1">Status: Active Surveyor</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <button 
                onClick={() => {
                  setIsUserOpen(false);
                  logout();
                }}
                className="w-full py-4 border border-red-500/30 hover:bg-red-500/10 text-red-500 font-extrabold tracking-widest text-xs rounded-full transition-all duration-300 uppercase cursor-pointer text-center block"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
