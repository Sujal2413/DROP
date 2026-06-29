import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />

      <main className="relative z-10">
        {/* Section 2: Features / Products */}
        <section id="products" className="min-h-screen bg-[var(--color-red)] text-[var(--color-cream)] p-8 flex flex-col justify-center relative z-10">
          <h1 className="text-[clamp(4rem,15vw,12rem)] text-center opacity-90 mb-16 leading-[0.9]">
            HYDRATION
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
            <div id="story" className="bg-[var(--color-mustard)] text-[var(--color-dark)] p-8 rounded-xl -rotate-2 shadow-[5px_5px_0px_var(--color-dark)] md:pr-[25vw] lg:pr-[20vw]">
              <h2 className="text-3xl font-bold mb-4">PURE SOURCE</h2>
              <p className="font-sans text-lg font-medium leading-relaxed">
                500ml of still water. No additives, no noise. Just crisp hydration in a hyper-realistic shell.
              </p>
            </div>
            
            <div id="sustainability" className="bg-[var(--color-dark)] text-[var(--color-cream)] p-8 rounded-xl rotate-2 shadow-[5px_5px_0px_var(--color-dark)] md:pl-[25vw] lg:pl-[20vw] md:mt-16">
              <h2 className="text-3xl font-bold mb-4">0.0% ABV</h2>
              <p className="font-sans text-lg font-medium leading-relaxed">
                Because it's water. Drink it anywhere, anytime. Stay sharp.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Lineup */}
        <section className="min-h-screen bg-[var(--color-cream)] py-24 px-8 text-center flex flex-col justify-center items-center relative z-10">
          <h1 className="text-[clamp(3rem,10vw,8rem)] text-[var(--color-dark)] mb-8 leading-[0.9]">
            YEAR ROUND
          </h1>
          <p className="text-2xl font-bold text-[var(--color-red)] tracking-wider mb-20">
            AVAILABLE IN SILVER, BLACK, AND PURPLE.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Deep Purple */}
            <div className="flex flex-col items-center justify-between p-6 md:p-8 rounded-[32px] bg-white shadow-sm border border-black/5 hover:shadow-2xl transition-shadow duration-500 group">
              <div className="w-full max-w-[320px] h-[380px] lg:h-[420px] relative flex items-center justify-center overflow-hidden mb-6">
                <Image 
                  src="/assets/new-can-variant-1.png" 
                  alt="Deep Purple Can" 
                  fill
                  sizes="(max-width: 1280px) 33vw, 100vw"
                  className="object-contain block transform transition-transform duration-300 group-hover:scale-[1.25] scale-[1.2] translate-y-[15%]" 
                  style={{ mixBlendMode: 'normal' }}
                  priority
                />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-black text-[var(--color-dark)] uppercase tracking-tight mb-3">Deep Purple</h3>
                <p className="text-[var(--color-dark)] opacity-70 leading-relaxed font-medium">A bold, dark aesthetic for the night. Uncompromising hydration.</p>
              </div>
            </div>
            
            {/* Icy Silver */}
            <div className="flex flex-col items-center justify-between p-6 md:p-8 rounded-[32px] bg-white shadow-sm border border-black/5 hover:shadow-2xl transition-shadow duration-500 group">
              <div className="w-full max-w-[320px] h-[380px] lg:h-[420px] relative flex items-center justify-center overflow-hidden mb-6">
                <Image 
                  src="/assets/new-can-variant-2.png" 
                  alt="Icy Silver Can" 
                  fill
                  sizes="(max-width: 1280px) 33vw, 100vw"
                  className="object-contain block transform transition-transform duration-300 group-hover:scale-[1.25] scale-[1.2] translate-y-[15%]" 
                  style={{ mixBlendMode: 'normal' }}
                  priority
                />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-black text-[var(--color-dark)] uppercase tracking-tight mb-3">Icy Silver</h3>
                <p className="text-[var(--color-dark)] opacity-70 leading-relaxed font-medium">Sleek, bright, and universally premium. The everyday classic.</p>
              </div>
            </div>

            {/* Full Black */}
            <div className="flex flex-col items-center justify-between p-6 md:p-8 rounded-[32px] bg-white shadow-sm border border-black/5 hover:shadow-2xl transition-shadow duration-500 group">
              <div className="w-full max-w-[320px] h-[380px] lg:h-[420px] relative flex items-center justify-center overflow-hidden mb-6">
                <Image 
                  src="/assets/new-can-variant-3.png" 
                  alt="Full Black Can" 
                  fill
                  sizes="(max-width: 1280px) 33vw, 100vw"
                  className="object-contain block transform transition-transform duration-300 group-hover:scale-[1.25] scale-[1.2] translate-y-[15%]" 
                  style={{ mixBlendMode: 'normal' }}
                  priority
                />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-black text-[var(--color-dark)] uppercase tracking-tight mb-3">Full Black</h3>
                <p className="text-[var(--color-dark)] opacity-70 leading-relaxed font-medium">Matte, mysterious, absolute zero noise. Focus in a can.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
