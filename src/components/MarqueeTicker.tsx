import React from 'react';

export default function MarqueeTicker() {
  const text = "AS. IT. SHOULD. BE. · NO PLASTIC. NO NOISE. · ";
  const repeatedText = Array(10).fill(text).join('');
  return (
    <div className="w-full bg-[#111111] text-[#F9F9F9] py-4 md:py-6 overflow-hidden flex whitespace-nowrap relative">
      <div className="animate-marquee shrink-0 font-inter text-sm md:text-base tracking-[0.2em] font-medium uppercase inline-block">
        {repeatedText}
      </div>
      <div aria-hidden="true" className="animate-marquee shrink-0 font-inter text-sm md:text-base tracking-[0.2em] font-medium uppercase inline-block">
        {repeatedText}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}} />
    </div>
  );
}
