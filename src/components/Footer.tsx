import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

interface FooterProps {
  theme?: "default" | "olive";
}

export default function Footer({ theme = "default" }: FooterProps) {
  const isOlive = theme === "olive";
  
  const footerBg = isOlive ? "bg-[#1B2A22] border-[#D4AF37]/30" : "bg-[#0F0F11] border-white/10";
  const titleText = isOlive ? "text-[#D4AF37]" : "text-white";
  const descText = isOlive ? "text-[#D4AF37]/70" : "text-gray-400";
  const bodyText = isOlive ? "text-[#D4AF37]/80" : "text-gray-300";
  const linkHover = isOlive ? "hover:text-[#D4AF37]/100 text-[#D4AF37]/85" : "hover:text-white text-gray-300";
  const iconColor = isOlive ? "#D4AF37" : "#8b5cf6";
  const borderLine = isOlive ? "border-[#D4AF37]/20" : "border-white/10";
  const socialText = isOlive ? "text-[#D4AF37]/60 hover:text-[#D4AF37]" : "text-gray-400 hover:text-white";
  const copyText = isOlive ? "text-[#D4AF37]/50" : "text-gray-500";
  const strokeMobile = isOlive ? "2px #D4AF37" : "2px white";

  const socialLinks = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, label: "Facebook", href: "https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, label: "Instagram", href: "https://www.instagram.com/dropwaterco" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X (Twitter)", href: "https://x.com/dropofficialw?s=11" },
  ];

  return (
    <footer className={`relative h-fit overflow-hidden border-t font-sans ${footerBg}`}>
      <div className="max-w-7xl mx-auto px-8 md:px-14 pt-20 pb-0 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <h2 
                className={`text-5xl font-black tracking-tighter cursor-pointer ${titleText}`}
                style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
              >
                DROP.
              </h2>
            </Link>
            <p className={`text-sm leading-relaxed font-medium max-w-xs ${descText}`}>
              Premium hydration designed for the modern lifestyle. AS. IT. SHOULD. BE.
            </p>
          </div>

          {/* About Us section */}
          <div>
            <h4 className={`text-lg font-bold mb-6 ${titleText}`}>About Us</h4>
            <ul className={`space-y-3 font-medium text-sm ${bodyText}`}>
              <li>
                <a 
                  href="https://www.linkedin.com/in/sujal-patil-227681258/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:underline transition-all hover:text-[#D4AF37]"
                >
                  Founder - Sujal Patil
                </a>
              </li>
              <li>Co-founder - Atharva Pachkar</li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/aayush-mokal-56097a352?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:underline transition-all hover:text-[#D4AF37]"
                >
                  Co-founder - Aayush Mokal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className={`text-lg font-bold mb-6 ${titleText}`}>Contact Us</h4>
            <ul className={`space-y-4 text-sm font-medium ${bodyText}`}>
              <li className="flex items-center space-x-3">
                <MapPin size={16} stroke={iconColor} className="shrink-0" />
                <span className={descText}>
                  Bandra West, Mumbai<br />
                  MH 400050, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} stroke={iconColor} />
                <a href="mailto:contactus@dropwater.in" className={`transition-colors ${linkHover}`}>
                  contactus@dropwater.in
                </a>
              </li>
              <li className="flex items-center space-x-3 whitespace-nowrap">
                <Phone size={16} stroke={iconColor} />
                <a href="tel:+918976127355" className={`transition-colors ${linkHover}`}>
                  +91 8976127355
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className={`border-t my-8 relative z-50 ${borderLine}`} />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-6 md:space-y-0 relative z-50">
          {/* Social icons */}
          <div className="flex space-x-6">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`transition-colors ${socialText}`}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className={`text-xs font-bold uppercase tracking-widest transition-colors text-[#D4AF37] hover:text-white`}>
              For Business
            </Link>
            <span className={`text-xs ${copyText}`}>·</span>
            <Link href="/privacy" className={`text-xs font-medium transition-colors ${linkHover}`}>
              Privacy Policy
            </Link>
            <span className={`text-xs ${copyText}`}>·</span>
            <Link href="/terms" className={`text-xs font-medium transition-colors ${linkHover}`}>
              Terms of Service
            </Link>
          </div>

          {/* Copyright + India */}
          <div className="text-center md:text-right">
            <p className={`font-medium ${copyText}`}>
              &copy; {new Date().getFullYear()} DROP. All rights reserved.
            </p>
            <p className={`text-[10px] mt-1 font-medium tracking-wider uppercase ${copyText}`}>
              DROP. — India — Coming Soon
            </p>
          </div>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-20 -mb-24 relative z-10 pointer-events-auto">
        <TextHoverEffect text="DROP." className="z-50" theme={theme} />
      </div>

      {/* Fallback giant text for mobile */}
      <div className="flex lg:hidden absolute bottom-[-5vh] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] overflow-hidden select-none z-0">
        <h1 
          className="text-[clamp(8rem,25vw,20rem)] font-black tracking-tighter"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            WebkitTextStroke: strokeMobile,
            color: 'transparent'
          }}
        >
          DROP.
        </h1>
      </div>

      <FooterBackgroundGradient theme={theme} />
    </footer>
  );
}

