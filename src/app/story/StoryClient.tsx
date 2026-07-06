'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const WATER_STANDARDS = [
  { code: '01', title: 'NOT FLAVOURED', desc: 'No artificial additives, sweeteners, or essences. Just pure, uncompromised water.' },
  { code: '02', title: 'NOT ARTIFICIAL', desc: 'Crafted by nature, respected by science. Balanced, clean, and cold.' },
  { code: '03', title: 'NOT PLASTIC-FIRST', desc: 'Sustainably canned in endless-recyclable aluminum to protect the planet.' },
];

export default function StoryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full relative bg-[#FDFCF8] text-[#1B2A22] font-serif selection:bg-[#D4AF37] selection:text-white antialiased">

      {/* Shared Navbar using Golden palette */}
      <HeroNavbar activeIndex={1} />

      {/* Ambient Floating Orbs for Visual Depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#D4AF37]/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#1B2A22]/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Card Stacking Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-24 space-y-[20vh]">

        {/* Card 1: Hero Section */}
        <section className="sticky top-[10vh] mb-[10vh] z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[80vh] bg-[#FDFCF8] border border-[#D4AF37]/30 rounded-3xl overflow-hidden p-8 md:p-12 shadow-lg relative">

            {/* Cinematic Refractive Light Canvas */}
            <RefractiveWaterCanvas />

            <div className="space-y-8 text-left relative z-10">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">// THE INTRODUCTION</span>
              <h1
                className="text-4xl md:text-6xl font-medium leading-[1.1] text-[#1B2A22] tracking-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <MaskedWordReveal text="A SIMPLE HABIT." /><br />
                <span className="italic font-normal text-[#D4AF37]">
                  <MaskedWordReveal text="A BIGGER QUESTION." />
                </span>
              </h1>
              <p className="font-sans text-sm md:text-base text-stone-600 max-w-md leading-relaxed font-light">
                Luxury is not found in excess, but in the essential. We redesigned the most fundamental element of life for those who demand ethical clarity without compromising on aesthetic prestige.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => startRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-widest text-[#D4AF37] hover:text-[#1B2A22] transition-colors"
                >
                  <span>BEGIN READ JOURNEY</span>
                  <span className="text-sm group-hover:translate-y-1 transition-transform">↓</span>
                </button>
              </div>
            </div>
            {/* Right: Framed artwork representation */}
            <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-inner bg-[#F5F2EB] z-10">
              <Image
                src="/images/drop_water_origin.jpg"
                alt="Macro photography of pure water with clove infusion ripples"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Card 2: Origin Section */}
        <section ref={startRef} className="sticky top-[10vh] mb-[10vh] z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[80vh] bg-[#FDFCF8] border border-[#D4AF37]/30 rounded-3xl overflow-hidden p-8 md:p-12 shadow-lg">

            {/* Left: Product Can Render */}
            <div className="order-2 md:order-1 relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-[#D4AF37]/20 p-8 bg-[#F5F2EB] flex items-center justify-center">
              <div className="relative w-[220px] h-[360px] md:w-[280px] md:h-[460px]">
                <Image
                  src="/assets/silver-can.png"
                  alt="DROP Can"
                  fill
                  sizes="(max-width: 768px) 220px, 280px"
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
                />
              </div>
            </div>

            {/* Right: Text Narrative with Progressive Disclosure */}
            <div className="order-1 md:order-2 space-y-8 pl-0 md:pl-8 text-left">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">// THE GENESIS</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1B2A22]">
                <MaskedWordReveal text="It started with water." />
              </h2>
              <div className="space-y-6 text-sm md:text-base text-stone-600 leading-relaxed">
                <ProgressiveDisclosureParagraph>
                  Born from a desire to strip away the noise of the commercial beverage industry. We looked at the spring—not as a resource to be exploited, but as a legacy to be protected.
                </ProgressiveDisclosureParagraph>
                <ProgressiveDisclosureParagraph>
                  It began with clove water. Paying attention to what goes into the body, and slowly realizing that the smallest daily choices often say the most about how we live. Why does the most essential thing we consume still feel so ordinary?
                </ProgressiveDisclosureParagraph>
              </div>
              <div className="pt-4 border-t border-[#D4AF37]/20">
                <p className="text-xl md:text-2xl italic font-light text-[#D4AF37]">
                  "Purity is an act of patience."
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Card 3: Market Section */}
        <section className="sticky top-[10vh] mb-[10vh] z-30">
          <div className="flex flex-col justify-center items-center text-center min-h-[80vh] bg-[#1B2A22] border border-[#D4AF37]/30 rounded-3xl overflow-hidden p-8 md:p-24 space-y-10 shadow-lg text-[#FDFCF8]">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold">// THE OBSERVATION</span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl font-serif">
              <MaskedWordReveal text="A massive market." /><br />
              <span className="text-[#D4AF37] italic font-normal">
                <MaskedWordReveal text="An ordinary experience." />
              </span>
            </h2>
            <div className="w-24 h-[1px] bg-[#D4AF37]/50"></div>
            <p className="font-sans text-sm md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              We noticed that while the world moved toward conscious consumption, the most vital thing we consume remained trapped in plastic and mediocrity. We chose to exit the ordinary.
            </p>
          </div>
        </section>

        {/* Card 4: The Idea Section */}
        <section className="sticky top-[10vh] mb-[10vh] z-40">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[80vh] bg-[#1B2A22] border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-lg text-[#FDFCF8]">
            <div className="p-8 md:p-16 md:pr-12 space-y-8 text-left flex flex-col justify-center">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">// THE VISION</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-none text-[#D4AF37] font-serif">
                <MaskedWordReveal text="Just water." /><br />
                <span className="text-white font-normal italic">
                  <MaskedWordReveal text="Designed with intention." />
                </span>
              </h2>
              <div className="space-y-6 text-sm md:text-base text-slate-300 leading-relaxed">
                <ProgressiveDisclosureParagraph>
                  Our vessel is a statement of permanence in a world of disposability. Crafted from 100% infinitely recyclable aluminum, it is designed to feel as substantial as the liquid it protects. No labels. No clutter. Just the essence.
                </ProgressiveDisclosureParagraph>
              </div>

              <ul className="space-y-4 font-sans text-xs uppercase tracking-wider text-slate-200">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ZERO PLASTIC LEACHING</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>THERMAL TEMPERATURE LOCK</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>MATTE ALUMINUM VESSEL ARCHITECTURE</span>
                </li>
              </ul>
            </div>

            {/* Right: Technical photo representation */}
            <div className="relative w-full bg-[#15181B] flex items-center justify-center p-8 py-16 border-t md:border-t-0 md:border-l border-[#D4AF37]/20">
              <Link href="/#products" className="relative w-full h-[400px] md:h-full md:min-h-[600px] block cursor-pointer group">
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{ y: [-15, 15, -15], rotateZ: [-2, 2, -2] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/assets/new-can-variant-2-final.png"
                    alt="DROP Pure Gold Clove Water Can"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] scale-[1.1] md:scale-[1.2] transition-transform duration-700 group-hover:scale-[1.25]"
                  />
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        {/* Card 5: Foundation Pillars */}
        <section className="sticky top-[10vh] mb-[10vh] z-50">
          <div className="bg-[#FDFCF8] border border-[#D4AF37]/30 rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col justify-center min-h-[80vh] shadow-lg">
            <div className="text-center mb-16 space-y-4">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">// THE PILLARS</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1B2A22]">
                <MaskedWordReveal text="Our Foundation" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product */}
              <div className="space-y-6 p-8 border border-[#D4AF37]/25 rounded-2xl hover:bg-[#F5F2EB]/50 transition-colors duration-500 group text-left">
                <svg className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25C12 2.25 5.25 9 5.25 13.5A6.75 6.75 0 0012 20.25a6.75 6.75 0 006.75-6.75C18.75 9 12 2.25 12 2.25z" />
                </svg>
                <h3 className="text-xl md:text-2xl font-serif text-[#1B2A22]">The Product</h3>
                <ProgressiveDisclosureParagraph className="font-sans text-stone-500 leading-relaxed text-xs md:text-sm font-light">
                  Naturally alkaline, mineral-rich water that hasn't been touched by the atmosphere since the last ice age.
                </ProgressiveDisclosureParagraph>
              </div>

              {/* Science */}
              <div className="space-y-6 p-8 border border-[#D4AF37]/25 rounded-2xl hover:bg-[#F5F2EB]/50 transition-colors duration-500 group text-left">
                <svg className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.242c0 .289.139.56.378.71l2.744 1.716a1.25 1.25 0 001.256 0l2.744-1.716a.833.833 0 01.378-.71V3.104m-7.5 0h7.5m-7.5 0A2.25 2.25 0 0112 1.5c.95 0 1.761.59 2.073 1.417M9.75 3.104c-.321.087-.625.23-.896.421M14.25 3.104c.321.087.625.23.896.421M4.5 19.5h15m-15 0a2.25 2.25 0 01-2.25-2.25c0-.98.626-1.813 1.5-2.122V8.25A2.25 2.25 0 016 6h12a2.25 2.25 0 012.25 2.25v6.928c.874.309 1.5 1.142 1.5 2.122A2.25 2.25 0 0119.5 19.5" />
                </svg>
                <h3 className="text-xl md:text-2xl font-serif text-[#1B2A22]">The Science</h3>
                <ProgressiveDisclosureParagraph className="font-sans text-stone-500 leading-relaxed text-xs md:text-sm font-light">
                  Our proprietary vessel lining ensures zero metallic aftertaste, preserving the water's crisp, neutral profile.
                </ProgressiveDisclosureParagraph>
              </div>

              {/* Belief */}
              <div className="space-y-6 p-8 border border-[#D4AF37]/25 rounded-2xl hover:bg-[#F5F2EB]/50 transition-colors duration-500 group text-left">
                <svg className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747C20.846 9.878 17.518 6 12 6c-5.518 0-8.846 3.878-8.716 8.253A9.004 9.004 0 0012 21zm0 0V6" />
                </svg>
                <h3 className="text-xl md:text-2xl font-serif text-[#1B2A22]">The Belief</h3>
                <ProgressiveDisclosureParagraph className="font-sans text-stone-500 leading-relaxed text-xs md:text-sm font-light">
                  Sustainability isn't a feature; it's the baseline. Every DROP sold funds the restoration of local water tables.
                </ProgressiveDisclosureParagraph>
              </div>
            </div>
          </div>
        </section>

        {/* Card 6: Transparency Section */}
        <section className="sticky top-[10vh] mb-[10vh] z-[60]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[80vh] bg-[#FDFCF8] border border-[#D4AF37]/30 rounded-3xl overflow-hidden p-8 md:p-12 shadow-lg">

            <div className="space-y-8 text-left">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">// THE PROCESS</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1B2A22] leading-tight">
                <MaskedWordReveal text="Building slowly because" /><br />
                <span className="italic font-normal text-[#D4AF37]">
                  <MaskedWordReveal text="it matters." />
                </span>
              </h2>
              <div className="space-y-6 text-sm md:text-base text-stone-500 font-light leading-relaxed">
                <ProgressiveDisclosureParagraph>
                  We don't chase growth; we chase integrity. Sourcing high-quality manufacturing sites, testing filtration systems, and refining plastic-free packing takes patience. We want our first drop to be perfect.
                </ProgressiveDisclosureParagraph>
              </div>

              {/* Interactive Counters */}
              <div className="flex gap-8 pt-4 border-t border-[#D4AF37]/20 font-sans">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                    100%
                  </p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">Traceable</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                    0%
                  </p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">Plastic</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                    Infinite
                  </p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">Cycle</p>
                </div>
              </div>
            </div>

            {/* Right: Technical photo representation */}
            <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-[#D4AF37]/20 p-8 bg-[#F5F2EB] flex items-center justify-center">
              <Link href="/#products" className="relative w-[300px] h-[450px] md:w-[380px] md:h-[580px] block cursor-pointer group">
                <Image
                  src="/assets/new-can-variant-3.png"
                  alt="DROP Full Black Can"
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] scale-110 md:scale-125 transition-transform duration-500 group-hover:scale-150"
                />
              </Link>
            </div>

          </div>
        </section>

        {/* Card 7: Closing Section */}
        <section className="sticky top-[10vh] !mb-0 z-[70]">
          <div className="flex flex-col justify-center items-center text-center min-h-[80vh] bg-[#FDFCF8] border border-[#D4AF37]/30 rounded-3xl overflow-hidden p-8 md:p-24 space-y-12 shadow-lg">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold">// THE FINAL THOUGHT</span>

            {/* Final Thought Text */}
            <h2
              className="text-4xl md:text-6xl font-serif leading-tight max-w-4xl font-black text-[#1B2A22] py-2"
            >
              "Water does not need to be louder. It needs to be better."
            </h2>

            <div className="space-y-2">
              <Link href="/">
                <h1 className="text-7xl md:text-9xl font-bold text-[#1B2A22] tracking-tighter leading-none cursor-pointer">DROP.</h1>
              </Link>
              <p className="font-sans text-[10px] tracking-[0.4em] text-stone-400 uppercase">AS. IT. SHOULD. BE.</p>
            </div>

            {/* Magnetic CTA button */}
            <div className="pt-4">
              <MagneticButton href="https://forms.gle/9pFRccoCrqUjrc3D7">
                Experience the Source
              </MagneticButton>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer theme="olive" />

      {/* Persistent Floating Quick-Action Anchor */}
      <FloatingActionButton />

      <ScrollToTop />
    </div>
  );
}

// 1. Cinematic Fluid Water Refraction Canvas component
function RefractiveWaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radial Caustics gradient representing light refracted in water
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.6 + 0.15 * Math.sin(time)),
        canvas.height * (0.4 + 0.15 * Math.cos(time * 0.7)),
        20,
        canvas.width * (0.6 + 0.15 * Math.sin(time)),
        canvas.height * (0.4 + 0.15 * Math.cos(time * 0.7)),
        canvas.width * 0.7
      );

      // Muted gold and forest green reflections with low opacity
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.04)');
      gradient.addColorStop(0.5, 'rgba(27, 42, 34, 0.02)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glacial pacing ripples
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const radius = ((time * 80 + i * 140) % 500) + 10;
        ctx.arc(
          canvas.width * (0.6 + 0.1 * Math.sin(time * 0.4)),
          canvas.height * (0.4 + 0.1 * Math.cos(time * 0.3)),
          radius,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-3xl"
    />
  );
}

// 2. Staggered Masked Word Reveal component
function MaskedWordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] as const // smooth cubic ease
      }
    }
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap gap-x-2 overflow-hidden ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden py-1">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// 3. Progressive Disclosure Paragraph component
function ProgressiveDisclosureParagraph({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;

      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      const activeRange = viewportHeight * 0.18; // middle 36% viewport focus range

      if (distanceFromCenter < activeRange) {
        const ratio = 1 - (distanceFromCenter / activeRange);
        setOpacity(0.3 + 0.7 * ratio); // smooth interpolation between 0.3 and 1.0
      } else {
        setOpacity(0.3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <p
      ref={ref}
      style={{ opacity, transition: 'opacity 0.4s ease' }}
      className={className}
    >
      {children}
    </p>
  );
}

// 4. Metric Counter component (with count-down/count-up support)
function MetricCounter({ target, startVal = 0, suffix = "", duration = 1.5 }: { target: number; startVal?: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(startVal);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;

    let start = startVal;
    const end = target;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = progress * (2 - progress); // Ease out quad
      const currentCount = Math.round(start + easedProgress * (end - start));

      setCount(currentCount);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, target, startVal, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// 5. Magnetic Button with Arrow transitions and clip-path/slide background transitions
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Smooth magnetic pull displacement
    setPosition({ x: x * 0.22, y: y * 0.22 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 15 }}
      className="relative px-12 py-5 overflow-hidden bg-[#D4AF37] text-[#1B2A22] font-sans font-bold tracking-widest uppercase rounded-md shadow-xl hover:shadow-2xl flex items-center justify-center gap-4 cursor-pointer group z-10"
    >
      {/* Background slide transition on hover */}
      <span className="absolute inset-0 bg-[#1B2A22] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />

      <span className="relative z-10 group-hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-4">
        {children}
        <span className="relative w-5 h-5 overflow-hidden inline-block">
          <span className="absolute transform transition-transform duration-300 group-hover:translate-x-5 flex">
            →
          </span>
          <span className="absolute transform -translate-x-5 transition-transform duration-300 group-hover:translate-x-0 flex text-[#D4AF37]">
            →
          </span>
        </span>
      </span>
    </motion.a>
  );
}

// 6. Persistent Floating Quick-Action Anchor
function FloatingActionButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.a
      href="https://forms.gle/9pFRccoCrqUjrc3D7"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-8 right-8 z-[100] px-6 py-4 bg-[#1B2A22] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#1B2A22] font-sans font-bold text-xs tracking-widest uppercase rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
    >
      <span>Secure a Drop</span>
      <span>→</span>
    </motion.a>
  );
}
