'use client';

import React, { useState } from "react";
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
  
  const footerBg = isOlive ? "bg-[#0F1112] border-[#C9A84C]/30" : "bg-[#0F1112] border-white/10";
  const titleText = isOlive ? "text-[#C9A84C]" : "text-white";
  const descText = isOlive ? "text-[#C9A84C]/70" : "text-gray-400";
  const bodyText = isOlive ? "text-[#C9A84C]/80" : "text-gray-300";
  const linkHover = isOlive ? "hover:text-[#C9A84C]/100 text-[#C9A84C]/85" : "hover:text-white text-gray-300";
  const iconColor = isOlive ? "#C9A84C" : "#C9A84C";
  const borderLine = isOlive ? "border-[#C9A84C]/20" : "border-white/10";
  const socialText = isOlive ? "text-[#C9A84C]/60 hover:text-[#C9A84C]" : "text-gray-400 hover:text-white";
  const copyText = isOlive ? "text-[#C9A84C]/50" : "text-gray-500";
  const strokeMobile = isOlive ? "2px #C9A84C" : "2px white";

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    
    // Simulate API call for newsletter
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const socialLinks = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, label: "Facebook", href: "https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, label: "Instagram", href: "https://www.instagram.com/dropwaterco" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X (Twitter)", href: "https://x.com/dropofficialw?s=11" },
  ];

  return (
    <footer className={`relative h-fit overflow-hidden border-t font-sans ${footerBg}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-14 pt-16 sm:pt-20 pb-0 z-40 relative">
        
        {/* Newsletter Signup */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#0F1112] rounded-sm p-8 md:p-12 mb-16 border border-white/10 shadow-2xl">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Be first to taste it.</h3>
            <p className="text-[#F9F9F9]/70 text-sm">Join the list and we&apos;ll let you know when we launch.</p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <form onSubmit={handleSubscribe} className="w-full max-w-md" noValidate>
              <div className="flex flex-col sm:flex-row gap-4 border-b border-[#F9F9F9]/30 focus-within:border-[#C9A84C] transition-colors pb-2">
                <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
                <input 
                  id="newsletter-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="w-full bg-transparent text-white outline-none py-2 px-2 text-sm placeholder:text-[#F9F9F9]/30 focus:ring-0" 
                  disabled={status === 'loading' || status === 'success'}
                  aria-invalid={status === 'error'}
                />
                <button 
                  type="submit" 
                  className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] hover:text-white px-4 transition-colors disabled:opacity-50 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm"
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              
              <div aria-live="polite" className="mt-2 text-xs">
                {status === 'error' && <p className="text-red-400">Please enter a valid email address.</p>}
                {status === 'success' && <p className="text-[#C9A84C]">Thank you for subscribing!</p>}
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm max-w-max p-1 -ml-1">
              <h2 
                className={`text-5xl font-black tracking-tighter ${titleText}`}
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
                  className="cursor-pointer hover:underline transition-all hover:text-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1 -ml-1 inline-block"
                >
                  Founder - Sujal Patil
                </a>
              </li>
              <li className="p-1 -ml-1">Co-founder - Atharva Pachkar</li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/aayush-mokal-56097a352?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:underline transition-all hover:text-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1 -ml-1 inline-block"
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
              <li className="flex items-start space-x-3 p-1 -ml-1">
                <MapPin size={16} stroke={iconColor} className="shrink-0 mt-0.5" />
                <span className={descText}>
                  Bandra West, Mumbai<br />
                  MH 400050, India
                </span>
              </li>
              <li className="flex items-center space-x-3 min-w-0">
                <Mail size={16} stroke={iconColor} className="shrink-0" />
                <a href="mailto:contactus@dropwater.in" className={`transition-colors break-all ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1 inline-block`}>
                  contactus@dropwater.in
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} stroke={iconColor} className="shrink-0" />
                <a href="tel:+918976127355" className={`transition-colors ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1 inline-block`}>
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
                className={`transition-colors ${socialText} focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1`}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <Link href="/contact" className={`text-xs font-bold uppercase tracking-widest transition-colors text-[#C9A84C] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1`}>
              For Business
            </Link>
            <span className={`text-xs ${copyText}`}>·</span>
            <Link href="/privacy" className={`text-xs font-medium transition-colors ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1`}>
              Privacy Policy
            </Link>
            <span className={`text-xs ${copyText}`}>·</span>
            <Link href="/terms" className={`text-xs font-medium transition-colors ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-sm p-1`}>
              Terms of Service
            </Link>
          </div>

          {/* Copyright + India */}
          <div className="text-center md:text-right">
            <p className={`font-medium ${copyText}`}>
              &copy; {new Date().getFullYear()} Drop Water. All rights reserved.
            </p>
            <p className={`text-[10px] mt-1 font-medium tracking-wider uppercase ${copyText}`}>
              Drop Water — India — Coming Soon
            </p>
          </div>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-20 -mb-24 relative z-10 pointer-events-auto" aria-hidden="true">
        <TextHoverEffect text="DROP." className="z-50" theme={theme} />
      </div>

      {/* Fallback giant text for mobile */}
      <div className="flex lg:hidden absolute bottom-[-5vh] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] overflow-hidden select-none z-0" aria-hidden="true">
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
