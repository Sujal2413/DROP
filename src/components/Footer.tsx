import React from "react";
import {
  Mail,
  Phone,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export default function Footer() {
  const socialLinks = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, label: "Facebook", href: "https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, label: "Instagram", href: "https://www.instagram.com/dropwatercoigsh=cTFtemNscGpyNHBh&utm_source=qr" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 0.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, label: "X (Twitter)", href: "https://x.com/dropofficialw?s=11" },
  ];

  return (
    <footer className="bg-[#0F0F11] relative h-fit overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 md:px-14 pt-20 pb-0 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <h2 
              className="text-white text-5xl font-black tracking-tighter"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              DROP.
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 font-medium max-w-xs">
              Premium hydration designed for the modern lifestyle. AS. IT. SHOULD. BE.
            </p>
          </div>

          {/* About Us section */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">About Us</h4>
            <ul className="space-y-3 text-gray-300 font-medium text-sm">
              <li>Founder - Sujal Patil</li>
              <li>Co-founder - Atharva Pachkar</li>
              <li>Co-founder - Aayush Mokal</li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-300">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-[#8b5cf6]" />
                <a href="mailto:dropofficialmumbai@gmail.com" className="hover:text-white transition-colors">
                  dropofficialmumbai@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-[#8b5cf6]" />
                <a href="tel:8976127355" className="hover:text-white transition-colors">
                  8976127355
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8 relative z-50" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 relative z-50">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} DROP. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-20 -mb-24 relative z-10 pointer-events-auto">
        <TextHoverEffect text="DROP." className="z-50" />
      </div>

      {/* Fallback giant text for mobile */}
      <div className="flex lg:hidden absolute bottom-[-5vh] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] overflow-hidden select-none z-0">
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

      <FooterBackgroundGradient />
    </footer>
  );
}
