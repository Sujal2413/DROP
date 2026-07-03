'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function StoryPage() {
  useEffect(() => {
    const cards = document.querySelectorAll('.brutalist-shadow-sm') as NodeListOf<HTMLElement>;
    const enterHandler = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'translate(-4px, -4px)';
      card.style.boxShadow = '8px 8px 0px 0px #000000';
    };
    const leaveHandler = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'translate(0px, 0px)';
      card.style.boxShadow = '4px 4px 0px 0px #000000';
    };
    cards.forEach(card => {
      card.addEventListener('mouseenter', enterHandler);
      card.addEventListener('mouseleave', leaveHandler);
    });
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', enterHandler);
        card.removeEventListener('mouseleave', leaveHandler);
      });
    };
  }, []);

  return (
    <div className="story-page-wrapper bg-[var(--color-cream)] text-[var(--color-dark)]">
      <style dangerouslySetInnerHTML={{__html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .brutalist-border { border: 4px solid #000000; }
        .brutalist-shadow { box-shadow: 8px 8px 0px 0px #000000; }
        .brutalist-shadow-sm { box-shadow: 4px 4px 0px 0px #000000; }
        .active-nav-link { text-decoration: underline; text-decoration-thickness: 4px; text-underline-offset: 8px; }
        
        @keyframes flow {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        .animate-flow { animation: flow 6s ease-in-out infinite; }
    `}} />
      <div className="bg-surface text-on-surface antialiased overflow-x-hidden selection:bg-on-surface selection:text-surface">
        
{/*  TopAppBar  */}
<main>
{/*  Hero Section  */}
<section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 border-b-4 border-on-surface">
<div className="absolute top-12 left-12 opacity-10 pointer-events-none select-none">
<span className="text-[20vw] font-black leading-none tracking-tighter uppercase font-['Bebas_Neue','Anton']">ESSENCE</span>
</div>
<div className="z-10 text-center max-w-6xl">
<h1 className="text-6xl md:text-[120px] font-black leading-[0.85] tracking-tighter uppercase font-['Bebas_Neue','Anton'] mb-12">
                    THE ORIGIN OF<br/>PURE VITALITY
                </h1>
<div className="relative w-full aspect-video md:aspect-[21/9] border-4 border-on-surface brutalist-shadow bg-white overflow-hidden mb-12">
<img className="w-full h-full object-cover" data-alt="A cinematic, high-contrast black and white macro shot of a single crystal-clear water droplet suspended in mid-air against a stark, minimalist background. The lighting is dramatic and sharp, highlighting the liquid tension and purity of the form. The overall aesthetic is premium brutalist, focusing on raw elemental beauty and structural simplicity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSmwC7Ws6wScyROQIT5aIvcM1tywx7AHsFybAEYx2xJtQ8TDKMgvf7aOThMDPz9iRtewkg132a2pX4iTxnkG4CpGJgYJGvhnnmglzvF2tY5VUmqABuDyIRTG4u6MZhpeqdlR3Rl6lRENcLknzDo-gq4wt-CBBv9sYyEn5aQcQhxkt_JTiwdPA063IV9RcUcpjGooRIGoAOsjcG7ynECPMxc2n3zb1jP1BeS6k75m_AToZ7nSwpF57y_hYVhwcA9Ce-1PpKce5FBC8G"/>
</div>
<p className="text-xl md:text-2xl font-bold uppercase tracking-tight max-w-2xl mx-auto leading-tight">
                    Born from the crushing pressure of the Himalayas. Filtered through ancient rock. Designed to counteract the noise of the modern world.
                </p>
</div>
<div className="absolute bottom-12 right-12 animate-flow">
<span className="material-symbols-outlined text-6xl">arrow_downward</span>
</div>
</section>
{/*  The Modern Chaos Section  */}
<section className="py-24 px-6 md:px-12 bg-white">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
<h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">THE MODERN<br/>CHAOS</h2>
<p className="text-lg font-bold max-w-md uppercase tracking-tight">An industry built on artificial peaks and chemical crashes. We are the correction.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-on-surface">
{/*  Column 1: The Others  */}
<div className="p-8 border-b-4 md:border-b-0 md:border-r-4 border-on-surface bg-[#EBEBEB]">
<h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
<span className="material-symbols-outlined text-4xl">warning</span>
                            THE OLD GUARD
                        </h3>
<div className="space-y-6">
<div className="p-6 border-4 border-on-surface bg-white brutalist-shadow-sm group hover:-translate-x-1 hover:-translate-y-1 transition-transform">
<span className="block text-xs font-black uppercase mb-2 text-red-600">Synthetic Fuel</span>
<h4 className="text-2xl font-black uppercase mb-2">High Sugar Spikes</h4>
<p className="text-sm font-semibold">Temporary energy derived from 40g+ of processed glucose. A violent metabolic cycle.</p>
</div>
<div className="p-6 border-4 border-on-surface bg-white brutalist-shadow-sm group hover:-translate-x-1 hover:-translate-y-1 transition-transform">
<span className="block text-xs font-black uppercase mb-2 text-red-600">Chemical Noise</span>
<h4 className="text-2xl font-black uppercase mb-2">Artificial Additives</h4>
<p className="text-sm font-semibold">Taurine, Glucuronolactone, and coloring agents. Unnecessary noise for your nervous system.</p>
</div>
<div className="p-6 border-4 border-on-surface bg-white brutalist-shadow-sm group hover:-translate-x-1 hover:-translate-y-1 transition-transform">
<span className="block text-xs font-black uppercase mb-2 text-red-600">The Crash</span>
<h4 className="text-2xl font-black uppercase mb-2">Adrenal Fatigue</h4>
<p className="text-sm font-semibold">The inevitable 3:00 PM collapse. A debt your body pays for borrowed energy.</p>
</div>
</div>
</div>
{/*  Column 2: DROP  */}
<div className="p-8 bg-surface">
<h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
<span className="material-symbols-outlined text-4xl">verified</span>
                            THE DROP STANDARD
                        </h3>
<div className="space-y-6">
<div className="p-6 border-4 border-on-surface bg-on-surface text-surface brutalist-shadow-sm group hover:-translate-x-1 hover:-translate-y-1 transition-transform">
<span className="block text-xs font-black uppercase mb-2 text-primary">Natural Origin</span>
<h4 className="text-2xl font-black uppercase mb-2">Mineral Foundation</h4>
<p className="text-sm font-semibold opacity-80">84+ trace minerals sourced directly from Himalayan rock. True cellular hydration.</p>
</div>
<div className="p-6 border-4 border-on-surface bg-on-surface text-surface brutalist-shadow-sm group hover:-translate-x-1 hover:-translate-y-1 transition-transform">
<span className="block text-xs font-black uppercase mb-2 text-primary">Pure Science</span>
<h4 className="text-2xl font-black uppercase mb-2">Zero Chaos</h4>
<p className="text-sm font-semibold opacity-80">No sugar. No calories. No artificial sweeteners. Just the molecular structure you need.</p>
</div>
<div className="p-6 border-4 border-on-surface bg-on-surface text-surface brutalist-shadow-sm group hover:-translate-x-1 hover:-translate-y-1 transition-transform">
<span className="block text-xs font-black uppercase mb-2 text-primary">Sustainable Flow</span>
<h4 className="text-2xl font-black uppercase mb-2">Steady Vitality</h4>
<p className="text-sm font-semibold opacity-80">Equilibrium for your mind and body. Sustained focus without the jittery debt.</p>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  The Antidote Section (Bento Grid)  */}
<section className="py-24 px-6 md:px-12 bg-on-surface text-surface">
<div className="max-w-7xl mx-auto">
<div className="text-center mb-20">
<h2 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-6">THE ANTIDOTE</h2>
<p className="text-xl md:text-2xl font-bold uppercase tracking-widest opacity-60">Stripping away the unnecessary.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
{/*  Large Feature  */}
<div className="md:col-span-7 border-4 border-surface p-12 flex flex-col justify-between hover:bg-surface hover:text-on-surface transition-all duration-300">
<div>
<span className="material-symbols-outlined text-6xl mb-8">filter_hdr</span>
<h3 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-none">HIMALAYAN<br/>GEOLOGY</h3>
<p className="text-lg font-bold leading-tight opacity-80">Our water travels through layers of ancient mineral-rich terrain for over 50 years before it reaches the surface. It is not manufactured; it is harvested.</p>
</div>
</div>
{/*  Small Feature  */}
<div className="md:col-span-5 border-4 border-surface p-8 relative overflow-hidden group">
<div className="z-10 relative">
<h3 className="text-3xl font-black uppercase mb-4">MOLECULAR<br/>CLARITY</h3>
<p className="text-base font-bold opacity-70">Perfect pH balance. Structural integrity. Real results.</p>
</div>
<div className="absolute inset-0 opacity-20 pointer-events-none">
<img className="w-full h-full object-cover grayscale brightness-200" data-alt="A microscopic, artistic visualization of water molecules in a perfect geometric arrangement. The style is technical yet elegant, using white lines on a dark black background to create a sense of scientific precision and purity. Minimalist brutalist aesthetic with high contrast." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCFERZb19tqXDN6YsNwCmI56LrwMMF-ZgnvwMrNDMPUP7_RXM2K2TtbJpT3D-1wihnq0LzRT2yJsCFDQWCdXLnec6lzJMjRP4xY8ZW3Fw0PHEyfqsbdO-mN1q5Haa2hrT8CU5AZgDmSea7uV5dqWz7Mc9NPOr18z_xvKTxUEnbMqn2hW7k4OTKeCs3GxnZ8aQGNlppL5K2HFTjPA7iIIiIr39DQBChjc37suEO5f8ptVWx_x64fBg_M1dzhlEkr-ZnArvXeKIoAbiR"/>
</div>
</div>
{/*  Middle Feature  */}
<div className="md:col-span-4 border-4 border-surface p-8 text-center flex flex-col items-center justify-center">
<div className="text-8xl font-black mb-4">0.0</div>
<p className="text-xl font-black uppercase tracking-widest">Additives</p>
</div>
{/*  Call to Action Block  */}
<div className="md:col-span-8 bg-surface text-on-surface p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-4 border-surface">
<div className="text-left">
<h3 className="text-4xl font-black uppercase leading-none mb-2">JOIN THE<br/>REVOLUTION</h3>
<p className="font-bold uppercase opacity-70">Return to the source.</p>
</div>
<button className="w-full md:w-auto bg-on-surface text-surface px-12 py-6 font-['Bebas_Neue','Anton'] font-black text-xl tracking-widest uppercase hover:scale-105 active:scale-95 transition-all brutalist-shadow-sm">
                            BUY THE DROP
                        </button>
</div>
</div>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="bg-on-surface text-surface border-t-4 border-on-surface p-8 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
<div className="flex flex-col gap-6">
<div className="text-6xl font-black tracking-tighter text-surface uppercase font-['Bebas_Neue','Anton'] leading-none">DROP</div>
<p className="max-w-xs  uppercase font-bold text-[10px] tracking-widest opacity-60">
                ©2024 DROP BEVERAGES. ROOTED IN HERITAGE, REFINED BY SCIENCE.
            </p>
</div>
<div className="flex flex-wrap gap-8">
<div className="flex flex-col gap-2">
<span className="text-[10px] font-black opacity-40 uppercase">Connect</span>
<Link className=" uppercase font-bold text-[12px] tracking-widest hover:text-primary transition-colors" href="#">INSTAGRAM</Link>
<Link className=" uppercase font-bold text-[12px] tracking-widest hover:text-primary transition-colors" href="#">TIKTOK</Link>
</div>
<div className="flex flex-col gap-2">
<span className="text-[10px] font-black opacity-40 uppercase">Legal</span>
<Link className=" uppercase font-bold text-[12px] tracking-widest hover:text-primary transition-colors" href="#">PRIVACY</Link>
<Link className=" uppercase font-bold text-[12px] tracking-widest hover:text-primary transition-colors" href="#">TERMS</Link>
</div>
</div>
</footer>


      </div>
    </div>
  );
}
