import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <>
      <HeroSection />

      <main className="relative z-10">
        {/* Section 2: Features */}
        <section className="min-h-screen bg-[var(--color-red)] text-[var(--color-cream)] p-8 flex flex-col justify-center relative z-10">
          <h1 className="text-[clamp(4rem,15vw,12rem)] text-center opacity-90 mb-16 leading-[0.9]">
            HYDRATION
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
            <div className="bg-[var(--color-mustard)] text-[var(--color-dark)] p-8 rounded-xl -rotate-2 shadow-[5px_5px_0px_var(--color-dark)] md:pr-[25vw] lg:pr-[20vw]">
              <h2 className="text-3xl font-bold mb-4">PURE SOURCE</h2>
              <p className="font-sans text-lg font-medium leading-relaxed">
                500ml of still water. No additives, no noise. Just crisp hydration in a hyper-realistic shell.
              </p>
            </div>
            
            <div className="bg-[var(--color-dark)] text-[var(--color-cream)] p-8 rounded-xl rotate-2 shadow-[5px_5px_0px_var(--color-dark)] md:pl-[25vw] lg:pl-[20vw] md:mt-16">
              <h2 className="text-3xl font-bold mb-4">0.0% ABV</h2>
              <p className="font-sans text-lg font-medium leading-relaxed">
                Because it's water. Drink it anywhere, anytime. Stay sharp.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Lineup */}
        <section className="min-h-screen bg-[var(--color-cream)] p-8 text-center flex flex-col justify-center items-center relative z-10">
          <h1 className="text-[clamp(3rem,10vw,8rem)] text-[var(--color-dark)] mb-8 leading-[0.9]">
            YEAR ROUND
          </h1>
          <p className="text-2xl font-bold text-[var(--color-red)] tracking-wider">
            AVAILABLE IN SILVER, BLACK, AND PURPLE.
          </p>
        </section>
      </main>
    </>
  );
}
