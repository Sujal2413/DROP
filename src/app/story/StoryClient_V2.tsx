'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const WATER_STANDARDS = [
  { code: '01', title: 'NOT FLAVOURED', desc: 'No artificial additives, sweeteners, or essences. Just pure hydration.' },
  { code: '02', title: 'NOT ARTIFICIAL', desc: 'Crafted by nature, respected by science. Balanced, clean, and cold.' },
  { code: '03', title: 'NOT PLASTIC-FIRST', desc: 'Sustainably canned in endless-recyclable aluminum to protect the planet.' },
];

export default function StoryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Section refs for scroll parallax
  const originRef = useRef<HTMLDivElement>(null);
  const ideaRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Gentle parallax offsets for cinematic depth
  const yHeroCan = useTransform(scrollY, [0, 800], [0, 100]);
  const yOriginImage = useTransform(scrollY, [200, 1500], [-80, 80]);
  const yIdeaImage = useTransform(scrollY, [1200, 2500], [-100, 100]);

  return (
    <div ref={containerRef} className="w-full relative bg-[#FAF8F5] text-slate-800 font-sans selection:bg-[#E3C571] selection:text-black antialiased">
      
      {/* Persistent Glassmorphism Header (No Overlap spacing) */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#FAF8F5]/60 border-b border-black/5 px-6 py-5 flex items-center justify-between font-mono text-xs uppercase transition-all duration-300">
        <div className="font-serif text-2xl tracking-tighter font-extrabold text-black">DROP.</div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-slate-400 font-light">// PREMIUM CANNED STILL WATER</span>
          <a 
            href="https://forms.gle/9pFRccoCrqUjrc3D7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-black text-[#E3C571] hover:bg-slate-800 hover:text-white font-bold rounded-full tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E3C571]"
            aria-label="Join waitlist form"
          >
            Join Waitlist
          </a>
        </div>
      </header>

      {/* 1. Hero Section (Sleek Split-Layout with Ambient Background) */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-20 pt-28 pb-12">
        
        {/* Full-bleed Clove Water ripple background (100% opacity) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/drop_water_origin.png"
            alt="Pure water with clove ripple background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center relative z-10">
          
          {/* Left Column: Text aligned left */}
          <div className="flex flex-col items-start text-left space-y-6 md:pr-12 mt-12 md:mt-0">
            <span className="text-xs font-mono tracking-[0.4em] text-slate-400 uppercase">// EST. 2026</span>
            <h1 
              className="text-5xl md:text-[5rem] lg:text-[6rem] font-bold text-black tracking-tight leading-[0.95] font-serif"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              From a<br />simple habit<br />to a bigger<br />question.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-lg font-light leading-relaxed">
              DROP. began with one thought: why does the most essential drink still feel the least designed?
            </p>
            <div className="pt-4">
              <button 
                onClick={() => originRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 font-mono text-xs text-slate-400 hover:text-black transition-colors"
              >
                <span>DISCOVER OUR ORIGIN</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Empty spacer to let the background Clove Water image shine without overlap */}
          <div className="hidden md:block w-full h-[600px] pointer-events-none" />

        </div>
      </section>

      {/* 2. Origin Section (Warm Sand Parallax) */}
      <section ref={originRef} className="py-40 px-6 md:px-12 bg-[#FAF8F5] relative z-10 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Left: Narrative Text */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="flex-1 space-y-8"
          >
            <span className="text-xs font-mono tracking-widest text-[#E3C571] uppercase font-bold">// THE BEGINNING</span>
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-black leading-tight">It started with water.</h2>
            <div className="space-y-6 text-lg text-slate-500 font-light leading-relaxed">
              <p>
                It began with a simple personal habit — drinking clove water, paying attention to what goes into the body, and slowly realizing that the smallest daily choices often say the most about how we live.
              </p>
              <p>
                One random day, while looking at India’s packaged drinking water market, a question came up: Why does water — the most essential thing we consume — still feel so ordinary?
              </p>
            </div>
          </motion.div>
          
          {/* Right: Parallax Image frame */}
          <div className="flex-1 w-full h-[400px] md:h-[550px] relative overflow-hidden rounded-[2rem] shadow-xl border border-black/5">
            <motion.div 
              style={{ y: yOriginImage }}
              className="absolute -top-[100px] left-0 w-full h-[750px]"
            >
              <Image 
                src="/images/drop_water_origin.png" 
                alt="Minimalist abstract water clove visual representing the clean beginnings" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover scale-105" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Market Realization Section (Clean Ice Blue) */}
      <section className="py-40 bg-gradient-to-b from-[#FAF8F5] to-[#E0F2FE]/40 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <span className="text-xs font-mono tracking-widest text-[#E3C571] uppercase font-bold">// THE MARKET DISRUPTION</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black font-serif leading-none">
            A massive market.<br/>An ordinary experience.
          </h2>
          <p className="text-xl md:text-3xl font-light text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Premium drinks had culture. Water had convenience. <span className="font-semibold text-black underline decoration-[#E3C571] decoration-2">We saw space for something better.</span>
          </p>
          
          {/* Grid of Muted Standards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-5xl mx-auto">
            {WATER_STANDARDS.map((std) => (
              <div key={std.code} className="bg-white/50 border border-black/5 p-8 rounded-3xl text-left shadow-sm backdrop-blur-sm">
                <span className="text-2xl font-serif text-[#E3C571] block mb-4">{std.code}</span>
                <h4 className="font-bold text-sm tracking-widest uppercase text-black mb-2">{std.title}</h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Idea Section (Ice Blue Parallax) */}
      <section ref={ideaRef} className="py-40 px-6 md:px-12 bg-white relative z-10 overflow-hidden border-t border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">
          
          {/* Left: Parallax Image frame */}
          <div className="flex-1 w-full h-[400px] md:h-[550px] relative overflow-hidden rounded-[2rem] shadow-xl border border-black/5 bg-[#F5F2EB] flex items-center justify-center p-8">
            <motion.div 
              style={{ y: yIdeaImage }}
              className="relative w-[200px] h-[340px] md:w-[300px] md:h-[520px]"
            >
              <Image 
                src="/assets/silver-can.png" 
                alt="Silver DROP can representing minimal luxury design" 
                fill 
                sizes="(max-width: 768px) 200px, 300px"
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]" 
              />
            </motion.div>
          </div>

          {/* Right: The Idea Text */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="flex-1 space-y-8"
          >
            <span className="text-xs font-mono tracking-widest text-[#E3C571] uppercase font-bold">// THE REIMAGINATION</span>
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-black leading-tight">Just water. Designed with intention.</h2>
            <div className="space-y-6 text-lg text-slate-500 font-light leading-relaxed">
              <p>
                What if water could be made desirable without making it artificial? What if hydration could feel clean, premium, minimal, and modern?
              </p>
              <p>
                What if a can of water could carry the same presence as a luxury beverage — but with a purpose that was far simpler?
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. Founders Section (Clean & Minimal Luxury Cards) */}
      <section className="py-40 px-6 bg-[#F5F2EB] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#E3C571] uppercase font-bold">// THE CORE TEAM</span>
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-black leading-none">A brand built between<br/>design and science.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed pt-4">
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

      {/* 6. Still in Making Section */}
      <section className="py-40 px-6 bg-white relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <span className="text-xs font-mono tracking-widest text-[#E3C571] uppercase font-bold">// CURRENT STATUS</span>
          <h2 className="text-4xl md:text-6xl font-serif text-black leading-tight">We are building slowly<br/>because it matters.</h2>
          <div className="text-lg md:text-xl text-slate-500 font-light leading-relaxed space-y-6 text-justify">
            <p>
              DROP. is not launched yet. We are still testing, learning, sourcing, and building the foundation — from quality and compliance to land, machinery, production, and packaging. We want the first can to feel simple only because everything behind it was done properly.
            </p>
          </div>
          <div className="inline-block px-8 py-5 border border-[#E3C571]/20 bg-[#FAF8F5] rounded-3xl text-xl font-serif text-black italic">
            "Simple on the outside. Serious behind the scenes."
          </div>
        </div>
      </section>

      {/* 7. Final Closing Section */}
      <section className="h-screen bg-[#FAF8F5] text-slate-800 flex flex-col justify-between p-6 md:p-12 relative z-10 overflow-hidden border-t border-black/5">
        
        <div className="w-full flex justify-between font-mono text-xs text-slate-400 uppercase">
          <span>// STATUS: IN DEVELOPMENT</span>
          <span>// EST: 2026</span>
        </div>

        <div className="text-center flex flex-col items-center justify-center h-full space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-500 italic max-w-3xl leading-relaxed">
            "Water does not need to be louder. It needs to be better."
          </h2>
          <div className="space-y-2">
            <h1 className="text-8xl md:text-[10rem] font-bold text-black tracking-tighter leading-none font-serif">DROP.</h1>
            <p className="font-mono text-xs md:text-sm tracking-[0.4em] text-slate-400 uppercase">AS. IT. SHOULD. BE.</p>
          </div>
        </div>

        <div className="w-full flex justify-center pb-6">
          <motion.a 
            href="https://forms.gle/9pFRccoCrqUjrc3D7"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-black text-[#E3C571] font-mono font-bold tracking-widest uppercase rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-4 cursor-pointer"
          >
            <span>Join the First Drop</span>
            <span className="text-xl">→</span>
          </motion.a>
        </div>

      </section>

    </div>
  );
}

function FounderCard({ code, title, description }: { code: string, title: string, description: string }) {
  return (
    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-black/5 hover:border-[#E3C571]/50 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[300px]">
      <div className="w-full flex justify-between items-start mb-8">
        <span className="text-xs font-mono text-slate-400 font-bold uppercase">// {code}</span>
        <div className="w-3 h-3 rounded-full bg-[#E3C571] group-hover:scale-125 transition-transform" />
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-serif text-black leading-tight">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
