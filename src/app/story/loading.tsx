export default function StoryLoading() {
  return (
    <div className="w-full relative bg-[#0F1112] text-white font-sans antialiased min-h-screen">
      {/* Navbar placeholder */}
      <nav className="absolute top-0 left-0 w-full px-5 py-5 sm:px-8 sm:py-6 flex justify-between items-center z-[100]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-white/10 animate-pulse" />
          <div className="w-16 h-6 rounded bg-white/10 animate-pulse" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-16 pt-28 sm:pt-32 pb-20 sm:pb-24 space-y-24 md:space-y-32">
        {/* Intro skeleton */}
        <section className="min-h-[70svh] flex flex-col justify-center items-start pt-16 sm:pt-20">
          <div className="w-24 h-3 rounded bg-[#C9A84C]/20 animate-pulse mb-8" />
          <div className="space-y-3 mb-8">
            <div className="w-[80%] max-w-lg h-10 sm:h-14 md:h-20 rounded bg-white/5 animate-pulse" />
            <div className="w-[60%] max-w-sm h-10 sm:h-14 md:h-20 rounded bg-[#C9A84C]/10 animate-pulse" />
          </div>
          <div className="space-y-3 max-w-2xl">
            <div className="w-full h-4 rounded bg-white/5 animate-pulse" />
            <div className="w-[85%] h-4 rounded bg-white/5 animate-pulse" />
          </div>
        </section>

        {/* Story grid skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1 w-full aspect-[4/5] md:aspect-square bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
          <div className="order-1 md:order-2 space-y-6">
            <div className="w-[70%] h-8 sm:h-10 md:h-14 rounded bg-white/5 animate-pulse" />
            <div className="space-y-3">
              <div className="w-full h-4 rounded bg-white/5 animate-pulse" />
              <div className="w-[90%] h-4 rounded bg-white/5 animate-pulse" />
              <div className="w-[75%] h-4 rounded bg-white/5 animate-pulse" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
