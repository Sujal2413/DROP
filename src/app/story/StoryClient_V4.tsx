'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const WATER_STANDARDS = [
  { code: 'SEC. I', title: 'NOT FLAVOURED', desc: 'No artificial additives, sweeteners, or essences. Just pure, uncompromised water.' },
  { code: 'SEC. II', title: 'NOT ARTIFICIAL', desc: 'Crafted by nature, respected by science. Balanced, clean, and cold.' },
  { code: 'SEC. III', title: 'NOT PLASTIC-FIRST', desc: 'Sustainably canned in endless-recyclable aluminum to protect the planet.' },
];

export default function StoryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full relative bg-[#FCFBF9] text-[#111111] font-serif selection:bg-[#991B1B] selection:text-white antialiased pb-24">
      
      {/* Newspaper Masthead Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#FCFBF9]/90 border-b-4 border-double border-black px-6 py-4 flex flex-col sm:flex-row items-center justify-between font-sans text-xs uppercase tracking-widest gap-2">
        <div className="text-slate-400 font-light hidden md:block">// VOL. 01 — NO. 01</div>
        <div className="font-serif text-3xl tracking-tight font-black uppercase text-center flex-1">THE DROP CHRONICLE.</div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-slate-400 font-light">EST. 2026</span>
          <a 
            href="https://forms.gle/9pFRccoCrqUjrc3D7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#991B1B] text-white hover:bg-black font-bold tracking-wider rounded-none uppercase transition-colors"
            aria-label="Join waitlist"
          >
            [Join Waitlist]
          </a>
        </div>
      </header>

      {/* Main Newspaper Page Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 space-y-16">
        
        {/* 1. Hero / Front Page Headline */}
        <section className="border-b-4 border-double border-black pb-12">
          
          {/* Metadata Bar */}
          <div className="w-full border-t border-b border-black py-2.5 flex justify-between font-sans text-[10px] tracking-wider text-slate-500 uppercase mb-8">
            <span>INDIA EDITION // HYDRATION REPORT</span>
            <span className="hidden sm:inline">DATE: JULY 2026 // EDITION: FIRST DROP</span>
            <span>STATUS: IN PROGRESS</span>
          </div>

          <div className="text-center space-y-8">
            {/* Massive Editorial Headline */}
            <h1 className="text-5xl md:text-[5.8rem] font-bold leading-[0.95] tracking-tight uppercase max-w-6xl mx-auto">
              From a simple habit<br />
              <span className="italic font-normal text-[#991B1B]">to a bigger question.</span>
            </h1>
            
            <p className="font-sans text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              DROP. began with a single personal habit — drinking clove water, paying attention to what goes into the body, and asking why water still feels so ordinary.
            </p>
          </div>

          {/* Front-Page Image Frame (No overlap) */}
          <div className="mt-12 space-y-3">
            <div className="w-full aspect-[16/9] relative border-4 border-black p-2 bg-white overflow-hidden shadow-md">
              <Image 
                src="/images/drop_water_origin.png"
                alt="Macro photography of clove water extraction rippling in clean laboratory water"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
            <div className="w-full flex justify-between font-sans text-[10px] text-slate-500 italic uppercase">
              <span>FIG 1.0 — Pure clove water extraction under process.</span>
              <span className="hidden sm:inline">SOURCE: LABORATORY RECORD VOL. 01</span>
            </div>
          </div>

          <div className="pt-12 text-center">
            <button 
              onClick={() => originRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-widest text-[#991B1B] hover:text-black transition-colors"
            >
              <span>READ THE CHRONICLE</span>
              <span className="text-sm group-hover:translate-y-1 transition-transform">↓</span>
            </button>
          </div>
        </section>

        {/* 2. Narrative Article columns (2-column newspaper article) */}
        <section ref={originRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-black pb-16">
          
          {/* Left Column: Big Drop Cap Article */}
          <div className="md:col-span-7 space-y-8 md:border-r md:border-black md:pr-12">
            <span className="font-sans text-xs tracking-widest text-[#991B1B] uppercase font-bold">// FEATURE ARTICLE</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">It started with water.</h2>
            
            <div className="text-base text-slate-700 leading-relaxed text-justify space-y-6">
              <p className="first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:font-serif first-letter:text-[#991B1B] first-letter:mr-3 first-letter:-mt-1">
                It began with a simple personal habit — drinking clove water, paying attention to what goes into the body, and slowly realizing that the smallest daily choices often say the most about how we live. One random day, while looking at India’s packaged drinking water market, a question came up: Why does water still feel so ordinary?
              </p>
              <p>
                People were already paying premium prices for energy drinks, soft drinks, and lifestyle beverages. Many of those products were designed to look exciting, feel aspirational, and own a place in modern culture. But water, something the body actually needs every single day, was still mostly treated like a basic utility.
              </p>
            </div>
          </div>

          {/* Right Column: Crimson Callout Quote & Context */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-8">
            <div className="border-l-4 border-[#991B1B] pl-6 py-2">
              <p className="text-2xl md:text-3xl italic font-light text-[#991B1B] leading-relaxed">
                "What if water could be made desirable without making it artificial? What if hydration could feel clean, premium, minimal, and modern?"
              </p>
            </div>
            <p className="font-sans text-xs text-slate-500 uppercase leading-loose">
              // NOTE: DROP. was designed from the beginning as a premium alternative to standard municipal bottles, utilizing aluminum cans to address plastic waste concerns.
            </p>
          </div>
        </section>

        {/* 3. The Product Section (Schematic Style layout) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-black pb-16">
          
          {/* Left Column: Product Image in border frame */}
          <div className="md:col-span-5 w-full aspect-[3/4] border-4 border-black p-2 bg-[#F5F2EB] relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 font-sans text-[10px] tracking-widest text-[#991B1B]">// FIG 2.0: CONTAINER SPEC</div>
            <div className="relative w-[180px] h-[300px] md:w-[260px] md:h-[450px]">
              <Image 
                src="/assets/silver-can.png" 
                alt="Silver DROP can product specification" 
                fill 
                sizes="(max-width: 768px) 180px, 260px"
                className="object-contain" 
              />
            </div>
          </div>

          {/* Right Column: The Product Narrative */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-8 md:pl-12">
            <span className="font-sans text-xs tracking-widest text-[#991B1B] uppercase font-bold">// THE SPECIFICATION</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight">Just water.<br/>Designed with intention.</h2>
            <div className="text-base text-slate-700 leading-relaxed space-y-6">
              <p>
                What if a can of water could carry the same presence as a luxury beverage — but with a purpose that was far simpler? Clean, plastic-free canned water designed for modern life.
              </p>
            </div>

            {/* Standards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10">
              {WATER_STANDARDS.map((std) => (
                <div key={std.code} className="space-y-2">
                  <span className="font-sans text-[10px] font-bold text-[#991B1B] tracking-widest block">{std.code}</span>
                  <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-black">{std.title}</h4>
                  <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-light">{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Founders / Columns Section */}
        <section className="border-b border-black pb-16">
          <div className="mb-16 text-center space-y-4">
            <span className="font-sans text-xs tracking-widest text-[#991B1B] uppercase font-bold">// COLLABORATIVE COLUMNS</span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none">Design + Science.</h2>
            <p className="font-sans text-sm text-slate-500 max-w-xl mx-auto font-light leading-relaxed pt-2">
              An editorial review of the founders' backgrounds, built between computer systems and manufacturing processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FounderColumn 
              code="COL. 01"
              title="Product & Tech"
              description="Engineering automated purification logistics, real-time IoT quality sensing, and supply-chain routing."
            />
            <FounderColumn 
              code="COL. 02"
              title="Science & Process"
              description="Chemical engineering, filtration testing, materials evaluation, and sustainable manufacturing setups."
            />
            <FounderColumn 
              code="COL. 03"
              title="Shared Belief"
              description="Water deserves better aesthetic design, clean plastic-free packaging, and cultural respect."
            />
          </div>
        </section>

        {/* 5. Editorial Note / Still in Making */}
        <section className="max-w-4xl mx-auto text-center space-y-8 pb-16">
          <span className="font-sans text-xs tracking-widest text-[#991B1B] uppercase font-bold">// EDITORIAL NOTE</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight">We are building slowly<br/>because it matters.</h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed text-justify">
            DROP. is not launched yet. We are still testing, learning, sourcing, and building the foundation — from quality and compliance to land, machinery, production, and packaging. We want the first can to feel simple only because everything behind it was done properly.
          </p>
          <div className="inline-block px-8 py-5 border border-black bg-white text-md md:text-lg uppercase tracking-wider font-sans font-bold">
            // STATUS: TESTING & QUALITY CONTROL IN PROGRESS
          </div>
        </section>

        {/* 6. Closing Section (Stark Black Ink Takeover) */}
        <section className="bg-[#111111] text-white p-12 md:p-24 rounded-none flex flex-col justify-between items-center text-center space-y-12 shadow-2xl">
          <div className="w-full flex justify-between font-sans text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-6">
            <span>THE END</span>
            <span>DROP. CHRONICLE // 2026</span>
          </div>

          <div className="space-y-8 py-12">
            <h2 className="text-2xl md:text-4xl italic font-light text-slate-300 max-w-3xl leading-relaxed mx-auto">
              "Water does not need to be louder. It needs to be better."
            </h2>
            <div className="space-y-2">
              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">DROP.</h1>
              <p className="font-sans text-[10px] tracking-[0.4em] text-slate-500 uppercase">AS. IT. SHOULD. BE.</p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <motion.a 
              href="https://forms.gle/9pFRccoCrqUjrc3D7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#991B1B] text-white font-sans font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex items-center gap-4 cursor-pointer"
            >
              <span>Join the First Drop</span>
              <span className="text-xl">→</span>
            </motion.a>
          </div>
        </section>

      </div>

    </div>
  );
}

function FounderColumn({ code, title, description }: { code: string, title: string, description: string }) {
  return (
    <div className="space-y-6 md:border-r last:border-r-0 border-black/20 md:pr-8 last:pr-0">
      <div className="flex justify-between items-center border-b border-black pb-2">
        <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">{code}</span>
        <span className="text-xs text-[#991B1B]">●</span>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold uppercase tracking-tight">{title}</h3>
        <p className="font-sans text-slate-600 leading-relaxed text-xs font-light text-justify">
          {description}
        </p>
      </div>
    </div>
  );
}
