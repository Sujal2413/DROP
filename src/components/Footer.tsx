import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 px-8 relative overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 z-10 relative">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-black tracking-tighter" style={{ textShadow: '0 0 20px rgba(128, 0, 128, 0.8), 0 0 40px rgba(128, 0, 128, 0.4)', color: '#fff' }}>
            DROP.
          </h2>
          <p className="text-sm text-gray-400 mt-4 max-w-xs font-medium leading-relaxed">
            Premium hydration designed for the modern lifestyle. AS. IT. SHOULD. BE.
          </p>
        </div>

        {/* About Us Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold mb-2">About Us</h3>
          <ul className="space-y-3 text-sm text-gray-300 font-medium">
            <li>Founder - Sujal Patil</li>
            <li>Co-founder - Atharva Pachkar</li>
            <li>Co-founder - Aayush Mokal</li>
          </ul>
        </div>

        {/* Contact Us Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300 font-medium">
            <li className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href="mailto:dropofficialmumbai@gmail.com" className="hover:text-white transition-colors">dropofficialmumbai@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:8976127355" className="hover:text-white transition-colors">8976127355</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-6xl mx-auto h-[1px] bg-white/10 my-12 z-10 relative" />

      {/* Socials & Copyright */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center z-10 relative">
        <div className="flex gap-6">
          <a href="https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/dropwatercoigsh=cTFtemNscGpyNHBh&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://x.com/dropofficialw?s=11" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-gray-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 0.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
        <div className="text-sm text-gray-500 font-medium mt-6 md:mt-0">
          © 2026 DROP. All rights reserved.
        </div>
      </div>

      {/* Giant Outline Text Background */}
      <div className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] overflow-hidden select-none">
        <h1 
          className="text-[clamp(8rem,25vw,20rem)] font-black tracking-tighter"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            WebkitTextStroke: '2px white',
            color: 'transparent'
          }}
        >
          DROP.
        </h1>
      </div>
    </footer>
  );
}
