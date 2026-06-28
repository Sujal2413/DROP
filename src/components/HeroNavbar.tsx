'use client';

import Link from 'next/link';

export default function HeroNavbar() {
  return (
    <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-[100] pointer-events-auto">
      <div className="font-bold text-white text-2xl tracking-tighter">
        <Link href="#hero" className="outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/35 focus-visible:outline-offset-4">DROP.</Link>
      </div>
      <div className="flex gap-8 text-white text-sm font-medium tracking-widest">
        <Link href="#products" className="outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/35 focus-visible:outline-offset-4 hover:opacity-70 transition-opacity">PRODUCTS</Link>
        <Link href="#story" className="outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/35 focus-visible:outline-offset-4 hover:opacity-70 transition-opacity">STORY</Link>
        <Link href="#sustainability" className="outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/35 focus-visible:outline-offset-4 hover:opacity-70 transition-opacity">SUSTAINABILITY</Link>
        <button className="outline-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/35 focus-visible:outline-offset-4 hover:opacity-70 transition-opacity">CART (0)</button>
      </div>
    </nav>
  );
}
