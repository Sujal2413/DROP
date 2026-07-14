import React from 'react';

export default function PhotographyWall() {
  return (
    <section className="w-full bg-[#F9F9F9] py-16 md:py-32 overflow-hidden border-b border-[#E5E5E5]/30">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        <h2 className="sr-only">DROP. In The Wild</h2>
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {/* Lifestyle shots using Unsplash images as high-quality placeholders */}
          <div className="relative w-[80vw] md:w-[45vw] flex-shrink-0 aspect-[4/5] bg-[#E5E5E5]/50 snap-center rounded-sm overflow-hidden flex items-center justify-center group">
            <img src="https://images.unsplash.com/photo-1550505095-81378a675f05?q=80&w=1000&auto=format&fit=crop" alt="Hydration in action" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="relative w-[80vw] md:w-[45vw] flex-shrink-0 aspect-[4/5] bg-[#E5E5E5]/50 snap-center rounded-sm overflow-hidden flex items-center justify-center group">
            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop" alt="Gym and fitness" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="relative w-[80vw] md:w-[45vw] flex-shrink-0 aspect-[4/5] bg-[#E5E5E5]/50 snap-center rounded-sm overflow-hidden flex items-center justify-center group">
            <img src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1000&auto=format&fit=crop" alt="Premium lifestyle" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="relative w-[80vw] md:w-[45vw] flex-shrink-0 aspect-[4/5] bg-[#E5E5E5]/50 snap-center rounded-sm overflow-hidden flex items-center justify-center group">
            <img src="https://images.unsplash.com/photo-1559724037-f8cc0209df63?q=80&w=1000&auto=format&fit=crop" alt="Minimalist water reflection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
