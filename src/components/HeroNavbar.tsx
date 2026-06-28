'use client';

import Link from 'next/link';

export default function HeroNavbar() {
  return (
    <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-[100] pointer-events-auto">
      <div className="font-bold text-black text-2xl tracking-tighter mix-blend-difference invert">
        <Link href="/">DROP.</Link>
      </div>
      <div className="flex gap-8 text-black text-sm font-medium tracking-widest mix-blend-difference invert">
        <Link href="#products" className="hover:opacity-70 transition-opacity">PRODUCTS</Link>
        <Link href="#story" className="hover:opacity-70 transition-opacity">STORY</Link>
        <Link href="#sustainability" className="hover:opacity-70 transition-opacity">SUSTAINABILITY</Link>
        <button className="hover:opacity-70 transition-opacity">CART (0)</button>
      </div>
    </nav>
  );
}
