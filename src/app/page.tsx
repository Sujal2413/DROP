import HeroCan from '@/components/HeroCan';

export default function Home() {
  return (
    <>
      <HeroCan />

      <main className="relative z-10">
        {/* Section 1: Hero */}
        <section className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center p-8 text-center relative z-10 overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80"
          >
            <source src="/hero_animation.mp4" type="video/mp4" />
          </video>
          
          <h1 className="text-[clamp(4rem,12vw,10rem)] text-[var(--color-red)] tracking-tighter leading-[0.9] relative z-10 mix-blend-multiply drop-shadow-xl">
            UNLIMITED<br />
            RELEASE<br />
            WATER
          </h1>
          <p className="absolute bottom-10 font-medium tracking-widest text-[var(--color-dark)] text-lg z-10 bg-[var(--color-cream)] px-4 py-1 rounded-full shadow-md">
            DROP. AS. IT. SHOULD. BE.
          </p>
        </section>

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
