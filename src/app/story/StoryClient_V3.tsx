'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const WATER_STANDARDS = [
  { code: 'I', title: 'NOT FLAVOURED', desc: 'No artificial additives, sweeteners, or essences. Just pure, uncompromised water.' },
  { code: 'II', title: 'NOT ARTIFICIAL', desc: 'Crafted by nature, respected by science. Balanced, clean, and cold.' },
  { code: 'III', title: 'NOT PLASTIC-FIRST', desc: 'Canned responsibly in endless-recyclable aluminum to protect our ecosystems.' },
];

export default function StoryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full relative bg-[#FDFBF7] text-[#022C22] font-serif selection:bg-[#D4AF37] selection:text-white antialiased">
      
      {/* Persistent Gold-Accented Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#FDFBF7]/80 border-b border-[#022C22]/5 px-6 py-5 flex items-center justify-between font-sans text-xs uppercase tracking-wider">
        <div className="font-serif text-2xl tracking-tighter font-extrabold text-[#022C22]">DROP.</div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-slate-400 font-light">// SUSTAINABLE CANNED STILL WATER</span>
          <a 
            href="https://forms.gle/9pFRccoCrqUjrc3D7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#022C22] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#022C22] font-bold rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label="Join waitlist form"
          >
            Join Waitlist
          </a>
        </div>
      </header>

      {/* 1. Hero Section (Artistic Editorial Canvas) */}
      <section className="relative min-h-screen flex flex-col justify-between items-center px-6 pt-32 pb-16 bg-[#FDFBF7]">
        
        {/* Header Metadata */}
        <div className="text-center space-y-2">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold">// ESTABLISHED 2026</span>
          <p className="font-sans text-[11px] tracking-[0.2em] text-slate-400 uppercase font-light">PREMIUM CANNED STILL WATER</p>
        </div>

        {/* Massive Serif Headline */}
        <div className="max-w-4xl text-center space-y-6 my-12">
          <h1 
            className="text-4xl md:text-[5.5rem] font-medium leading-[1.05] text-[#022C22] tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            From a simple habit<br />
            <span className="italic font-normal text-[#D4AF37]">to a bigger question.</span>
          </h1>
          <p className="font-sans text-base md:text-xl text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
            DROP. began with one thought: why does the most essential drink still feel the least designed?
          </p>
        </div>

        {/* Framed Clove Water Ripple Art Canvas (No overlap) */}
        <div className="w-full max-w-3xl aspect-[16/10] relative rounded-3xl overflow-hidden border-8 border-[#F5F2EB] shadow-2xl bg-white">
          <Image 
            src="/images/drop_water_origin.png"
            alt="Macro photography of pure water ripple with clove representation"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover scale-105"
          />
        </div>

        <div className="pt-12">
          <button 
            onClick={() => originRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-2 font-sans text-[10px] tracking-widest text-[#D4AF37] hover:text-[#022C22] transition-colors"
          >
            <span>BEGIN READ JOURNEY</span>
            <span className="text-sm group-hover:translate-y-1 transition-transform">↓</span>
          </button>
        </div>
      </section>

      {/* CARD STACK SYSTEM */}
      <div className="relative w-full">
        
        {/* Card 1: Origin (Deep Forest Green Card Overlay) */}
        <section 
          ref={originRef}
          className="sticky top-20 min-h-screen bg-[#022C22] text-[#FDFBF7] py-32 px-6 md:px-12 flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.15)] rounded-t-[3rem] border-t border-white/5 z-10"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <span className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase font-bold">// THE ORIGIN STORY</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight">It started with water.</h2>
              <div className="space-y-6 text-base md:text-lg text-slate-300 font-light leading-relaxed">
                <p>
                  It began with a simple personal habit — drinking clove water, paying attention to what goes into the body, and slowly realizing that the smallest daily choices often say the most about how we live.
                </p>
                <p>
                  One random day, while looking at India’s packaged drinking water market, a question came up: Why does water — the most essential thing we consume — still feel so ordinary?
                </p>
              </div>
            </div>
            <div className="flex-1 border-4 border-[#D4AF37]/30 p-8 rounded-3xl bg-[#032019]/60 text-center space-y-6">
              <p className="text-2xl md:text-3xl italic font-light text-[#D4AF37] leading-relaxed">
                "Not another plastic bottle trying to look premium. Just water. As it should be."
              </p>
            </div>
          </div>
        </section>

        {/* Card 2: Market Realization (Warm Cream Card Overlay) */}
        <section 
          className="sticky top-20 min-h-screen bg-[#FDFBF7] text-[#022C22] py-32 px-6 md:px-12 flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.15)] rounded-t-[3rem] border-t border-[#022C22]/5 z-20"
        >
          <div className="max-w-6xl mx-auto w-full text-center space-y-16">
            <div className="space-y-4">
              <span className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase font-bold">// MARKET REALIZATION</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
                A massive market.<br/>
                <span className="italic font-normal text-[#D4AF37]">An ordinary experience.</span>
              </h2>
            </div>
            
            <p className="text-xl md:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Premium drinks had culture. Water had convenience. <span className="font-medium text-[#022C22] underline decoration-[#D4AF37] decoration-2">We saw space for something better.</span>
            </p>

            {/* Structured Eco-standards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 max-w-5xl mx-auto">
              {WATER_STANDARDS.map((std) => (
                <div key={std.code} className="bg-white border border-[#022C22]/5 p-8 rounded-[2rem] text-left shadow-sm">
                  <span className="text-2xl font-serif text-[#D4AF37] block mb-4">{std.code}</span>
                  <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-[#022C22] mb-2">{std.title}</h4>
                  <p className="font-sans text-xs text-slate-500 font-light leading-relaxed">{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Card 3: The Idea (Deep Green Can Display Card) */}
        <section 
          className="sticky top-20 min-h-screen bg-[#032019] text-[#FDFBF7] py-32 px-6 md:px-12 flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.15)] rounded-t-[3rem] border-t border-white/5 z-30"
        >
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16 w-full">
            {/* Left Column: Official can in a elegant frame */}
            <div className="flex-1 w-full max-w-md aspect-[3/4] border-4 border-[#D4AF37] p-2 bg-[#022C22] rounded-3xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-4 left-4 font-sans text-[10px] tracking-widest text-[#D4AF37]">// THE CAN</div>
              <div className="relative w-[180px] h-[300px] md:w-[280px] md:h-[480px]">
                <Image 
                  src="/assets/silver-can.png" 
                  alt="Official high-resolution silver can of DROP" 
                  fill 
                  sizes="(max-width: 768px) 180px, 280px"
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]" 
                />
              </div>
            </div>

            {/* Right Column: The Narrative Idea */}
            <div className="flex-grow space-y-8 md:pl-12">
              <span className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase font-bold">// THE IDEA</span>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">Just water.<br/>Designed with intention.</h2>
              <div className="space-y-6 text-base md:text-lg text-slate-300 font-light leading-relaxed">
                <p>
                  What if water could be made desirable without making it artificial? What if hydration could feel clean, premium, minimal, and modern?
                </p>
                <p>
                  What if a can of water could carry the same presence as a luxury beverage — but with a purpose that was far simpler?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Card 4: Founders (Cream Card Overlay) */}
        <section 
          className="sticky top-20 min-h-screen bg-[#FDFBF7] text-[#022C22] py-32 px-6 md:px-12 flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.15)] rounded-t-[3rem] border-t border-[#022C22]/5 z-40"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-20 text-center space-y-4">
              <span className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase font-bold">// THE FOUNDATION</span>
              <h2 className="text-4xl md:text-6xl font-bold leading-none">A brand built between<br/>design and science.</h2>
              <p className="font-sans text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed pt-4">
                I came from computer science, with a mindset shaped by systems, design, and technology. My co-founders came from chemical engineering, bringing a deeper understanding of safety, manufacturing, and safety protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FounderCard 
                code="01"
                title="Product & Tech"
                description="Engineering automated purification logistics, real-time IoT quality sensing, and supply-chain routing."
              />
              <FounderCard 
                code="02"
                title="Science & Process"
                description="Chemical engineering, rigorous filtration testing, materials evaluation, and sustainable manufacturing setups."
              />
              <FounderCard 
                code="03"
                title="Shared Belief"
                description="Water deserves better aesthetic design, clean plastic-free packaging, and cultural respect."
              />
            </div>
          </div>
        </section>

        {/* Card 5: Still in Making (Deep Green Overlay) */}
        <section 
          className="sticky top-20 min-h-screen bg-[#022C22] text-[#FDFBF7] py-32 px-6 md:px-12 flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.15)] rounded-t-[3rem] border-t border-white/5 z-50"
        >
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <span className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase font-bold">// CURRENT DEVELOPMENT</span>
            <h2 className="text-4xl md:text-6xl leading-tight">We are building slowly<br/>because it matters.</h2>
            <div className="text-base md:text-xl text-slate-300 font-light leading-relaxed text-justify space-y-6">
              <p>
                DROP. is not launched yet. We are still testing, learning, sourcing, and building the foundation — from quality and compliance to land, machinery, production, and packaging. We want the first can to feel simple only because everything behind it was done properly.
              </p>
            </div>
            <div className="inline-block px-8 py-5 border border-[#D4AF37]/20 bg-[#032019] rounded-3xl text-lg md:text-2xl text-[#D4AF37] italic">
              "Simple on the outside. Serious behind the scenes."
            </div>
          </div>
        </section>

        {/* Card 6: Final Closing Section (Deep Cream Canvas) */}
        <section 
          className="sticky top-20 min-h-screen bg-[#FDFBF7] text-[#022C22] flex flex-col justify-between p-6 md:p-12 shadow-[0_-20px_40px_rgba(0,0,0,0.15)] rounded-t-[3rem] border-t border-[#022C22]/5 z-[60]"
        >
          <div className="w-full flex justify-between font-sans text-[10px] text-slate-400 uppercase tracking-widest">
            <span>// STATUS: IN DEVELOPMENT</span>
            <span>// ESTABLISHED 2026</span>
          </div>

          <div className="text-center flex flex-col items-center justify-center h-full space-y-8">
            <h2 className="text-3xl md:text-5xl text-slate-500 italic max-w-3xl leading-relaxed">
              "Water does not need to be louder. It needs to be better."
            </h2>
            <div className="space-y-2">
              <h1 className="text-8xl md:text-[10rem] font-bold text-[#022C22] tracking-tighter leading-none">DROP.</h1>
              <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-slate-400 uppercase">AS. IT. SHOULD. BE.</p>
            </div>
          </div>

          <div className="w-full flex justify-center pb-6">
            <motion.a 
              href="https://forms.gle/9pFRccoCrqUjrc3D7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: '#D4AF37', color: '#022C22' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#022C22] text-[#D4AF37] border-2 border-transparent hover:border-[#022C22] font-sans font-bold tracking-widest uppercase rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-4 cursor-pointer"
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

function FounderCard({ code, title, description }: { code: string, title: string, description: string }) {
  return (
    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#022C22]/5 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[300px]">
      <div className="w-full flex justify-between items-start mb-8">
        <span className="font-sans text-[10px] text-slate-400 font-bold uppercase">// {code}</span>
        <div className="w-3 h-3 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-serif text-[#022C22] leading-tight">{title}</h3>
        <p className="font-sans text-slate-500 leading-relaxed text-sm font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
