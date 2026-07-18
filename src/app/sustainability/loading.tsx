export default function SustainabilityLoading() {
  return (
    <div className="w-full relative bg-[#F6F4EB] text-black font-sans antialiased min-h-screen border-x-2 border-black">
      {/* Navbar placeholder */}
      <nav className="absolute top-0 left-0 w-full px-5 py-5 sm:px-8 sm:py-6 flex justify-between items-center z-[100]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-black/10 animate-pulse" />
          <div className="w-16 h-6 rounded bg-black/10 animate-pulse" />
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-32">
        {/* Headline skeleton */}
        <header className="py-20 text-center">
          <div className="space-y-3 flex flex-col items-center mb-6">
            <div className="w-[70%] max-w-md h-12 sm:h-16 rounded bg-black/5 animate-pulse" />
            <div className="w-[60%] max-w-sm h-12 sm:h-16 rounded bg-black/5 animate-pulse" />
          </div>
          <div className="w-[80%] max-w-2xl mx-auto h-12 rounded border-2 border-black/10 bg-white/50 animate-pulse" />
        </header>

        {/* Bento grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-8">
          <div className="bg-[#FBC02D]/30 min-h-[280px] md:min-h-[320px] border-2 border-black/10 shadow-[5px_5px_0px_rgba(0,0,0,0.1)] animate-pulse" />
          <div className="bg-[#D32F2F]/20 min-h-[280px] md:min-h-[320px] border-2 border-black/10 shadow-[5px_5px_0px_rgba(0,0,0,0.1)] animate-pulse" />
          <div className="bg-blue-600/20 min-h-[280px] md:min-h-[320px] border-2 border-black/10 shadow-[5px_5px_0px_rgba(0,0,0,0.1)] animate-pulse" />
          <div className="bg-black/10 min-h-[280px] md:min-h-[320px] border-2 border-black/10 shadow-[5px_5px_0px_rgba(0,0,0,0.1)] animate-pulse" />
        </div>
      </main>
    </div>
  );
}
