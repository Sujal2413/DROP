export default function WhyDropSection() {
  return (
    <section className="bg-[#111111] py-24 md:py-36 px-5 sm:px-8 md:px-16 text-[#F9F9F9] relative overflow-hidden">
      {/* Background visual texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-28 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase text-[#C9A84C]">Why DROP.</h2>
          <p className="text-[#F9F9F9]/70 text-base md:text-lg font-medium leading-relaxed">
            Hydration stripped back to its purest form, engineered for the demands of a high-performance life.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          
          {/* Column 1: The Water */}
          <div className="flex flex-col">
            <div className="h-0.5 w-full bg-[#C9A84C]/30 mb-8 relative">
              <div className="absolute top-0 left-0 h-full w-1/4 bg-[#C9A84C]"></div>
            </div>
            <span className="text-[#C9A84C] font-black text-6xl tracking-tighter opacity-20 mb-4 block leading-none">01</span>
            <h3 className="text-2xl font-bold tracking-tight mb-4 uppercase">The Water</h3>
            <p className="text-[#F9F9F9]/60 text-sm leading-relaxed font-medium">
              Sourced with absolute precision. Our water undergoes advanced filtration to ensure a crisp, zero-compromise profile, fortified with natural trace minerals. No sugars, no synthetic additives, just pure cellular hydration.
            </p>
          </div>

          {/* Column 2: The Can */}
          <div className="flex flex-col">
            <div className="h-0.5 w-full bg-[#C9A84C]/30 mb-8 relative">
              <div className="absolute top-0 left-0 h-full w-1/4 bg-[#C9A84C]"></div>
            </div>
            <span className="text-[#C9A84C] font-black text-6xl tracking-tighter opacity-20 mb-4 block leading-none">02</span>
            <h3 className="text-2xl font-bold tracking-tight mb-4 uppercase">The Can</h3>
            <p className="text-[#F9F9F9]/60 text-sm leading-relaxed font-medium">
              Aluminium isn&apos;t just an aesthetic choice; it&apos;s a structural and environmental necessity. Infinitely recyclable, it shields the water from light and oxygen degradation while keeping it colder for longer. Pure performance packaging.
            </p>
          </div>

          {/* Column 3: The Experience */}
          <div className="flex flex-col">
            <div className="h-0.5 w-full bg-[#C9A84C]/30 mb-8 relative">
              <div className="absolute top-0 left-0 h-full w-1/4 bg-[#C9A84C]"></div>
            </div>
            <span className="text-[#C9A84C] font-black text-6xl tracking-tighter opacity-20 mb-4 block leading-none">03</span>
            <h3 className="text-2xl font-bold tracking-tight mb-4 uppercase">The Experience</h3>
            <p className="text-[#F9F9F9]/60 text-sm leading-relaxed font-medium">
              Engineered to elevate any environment. Whether stocking a premium boutique hotel, served at high-end fitness studios, or fueling your personal best, DROP is designed to be the definitive standard for modern hydration.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
