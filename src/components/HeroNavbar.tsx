'use client';

import Link from 'next/link';

export default function HeroNavbar() {
  return (
    <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-[100] pointer-events-auto">
      {/* Left: Logo */}
      <div className="font-bold text-black text-2xl tracking-tighter w-[200px]">
        <Link href="/" className="outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-black/35 focus-visible:outline-offset-4">DROP.</Link>
      </div>
      
      {/* Center: Toggle-like Nav */}
      <div className="hidden md:flex gap-2 text-black text-xs font-bold tracking-widest bg-white/50 backdrop-blur-md rounded-full p-1.5 border border-black/10">
        <Link href="#products" className="px-6 py-2 rounded-full hover:bg-black/5 transition-colors outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-black/35">PRODUCTS</Link>
        <Link href="#story" className="px-6 py-2 rounded-full hover:bg-black/5 transition-colors outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-black/35">STORY</Link>
        <Link href="#sustainability" className="px-6 py-2 rounded-full hover:bg-black/5 transition-colors outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-black/35">SUSTAINABILITY</Link>
      </div>
      
      {/* Right: User and Cart */}
      <div className="flex justify-end gap-6 w-[200px]">
        <button onClick={() => alert("Login coming soon!")} className="hover:opacity-70 transition-opacity" aria-label="User Login">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button onClick={() => alert("Your cart is empty.")} className="hover:opacity-70 transition-opacity flex items-center gap-2 font-bold text-sm tracking-widest text-black" aria-label="Cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="hidden md:inline">(0)</span>
        </button>
      </div>
    </nav>
  );
}
