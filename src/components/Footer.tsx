import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export default function Footer() {
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/dropwatercoigsh=cTFtemNscGpyNHBh&utm_source=qr" },
    { icon: <Twitter size={20} />, label: "X (Twitter)", href: "https://x.com/dropofficialw?s=11" },
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
      <div className="lg:flex hidden h-[30rem] -mt-40 -mb-24 relative z-10 pointer-events-auto">
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
