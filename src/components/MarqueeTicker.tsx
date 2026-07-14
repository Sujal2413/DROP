import React from 'react';

export default function MarqueeTicker() {
  const text = "AS. IT. SHOULD. BE. · NO PLASTIC. NO NOISE. · ";
  return (
    <div className="w-full bg-[#111111] text-[#F9F9F9] py-4 md:py-6 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee inline-block font-inter text-sm md:text-base tracking-[0.2em] font-medium uppercase">
        {text}{text}{text}{text}
      </div>
      <div className="animate-marquee inline-block font-inter text-sm md:text-base tracking-[0.2em] font-medium uppercase absolute top-0">
        {text}{text}{text}{text}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
}
