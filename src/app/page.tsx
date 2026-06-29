import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full mx-auto">
            {/* Deep Purple */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full aspect-[1/1.5] mb-6 transition-transform duration-500 group-hover:-translate-y-4">
                <img src="/assets/new-can-1.png" alt="Deep Purple Can" className="w-full h-full object-contain" style={{ clipPath: 'inset(0 0 15% 0)' }} />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-dark)] mb-3">DEEP PURPLE</h3>
              <p className="font-medium text-lg text-[var(--color-dark)] opacity-70">A bold, dark aesthetic for the night. Uncompromising hydration.</p>
            </div>
            
            {/* Icy Silver */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full aspect-[1/1.5] mb-6 transition-transform duration-500 group-hover:-translate-y-4">
                <img src="/assets/new-can-2.png" alt="Icy Silver Can" className="w-full h-full object-contain" style={{ clipPath: 'inset(0 0 15% 0)' }} />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-dark)] mb-3">ICY SILVER</h3>
              <p className="font-medium text-lg text-[var(--color-dark)] opacity-70">Sleek, bright, and universally premium. The everyday classic.</p>
            </div>

            {/* Full Black */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full aspect-[1/1.5] mb-6 transition-transform duration-500 group-hover:-translate-y-4">
                <img src="/assets/new-can-3.png" alt="Full Black Can" className="w-full h-full object-contain" style={{ clipPath: 'inset(0 0 15% 0)' }} />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-dark)] mb-3">FULL BLACK</h3>
              <p className="font-medium text-lg text-[var(--color-dark)] opacity-70">Matte, mysterious, absolute zero noise. Focus in a can.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
