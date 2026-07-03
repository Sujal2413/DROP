'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';

export default function LoginPage() {
  const { login } = useCart();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const [gsiLoaded, setGsiLoaded] = useState(false);

  // Read environment variable client-side
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  useEffect(() => {
    // 1. Particle background set up
    if (particlesContainerRef.current) {
      const dots = Array.from(particlesContainerRef.current.children);
      dots.forEach((dot) => {
        gsap.set(dot, {
          x: 'random(0, 100vw)',
          y: 'random(0, 100vh)',
          scale: 'random(0.3, 1)',
          opacity: 'random(0.15, 0.5)',
        });
        gsap.to(dot, {
          y: '-=80',
          x: '+=random(-30, 30)',
          opacity: 'random(0.1, 0.7)',
          duration: 'random(4, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 'random(0, 3)',
        });
      });
    }

    // 2. Load Google Identity Services (GSI) script dynamically if client ID is configured
    if (googleClientId) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        setGsiLoaded(true);
        if ((window as any).google) {
          (window as any).google.accounts.id.initialize({
            client_id: googleClientId,
            callback: async (response: any) => {
              try {
                setError('');
                const res = await fetch('/api/auth/google', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ credential: response.credential }),
                });
                const data = await res.json();
                if (res.ok && data.success) {
                  login();
                } else {
                  setError(data.error || 'Google Authentication failed.');
                }
              } catch (err) {
                setError('Failed to authenticate with Google. Please try again.');
              }
            },
            auto_select: false,
          });

          // Render standard button overlay if container exists
          const container = document.getElementById('google-signin-btn-container');
          if (container) {
            (window as any).google.accounts.id.renderButton(container, {
              type: 'standard',
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              shape: 'pill',
              width: 180,
            });
          }
        }
      };

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [googleClientId]);

  // Form submit handles real registration and login routes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    try {
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      const body = isSignUp ? { name, email, password } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed.');
        return;
      }

      if (isSignUp) {
        // If registration is successful, auto-login
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (loginRes.ok) {
          login();
        } else {
          setIsSignUp(false);
          setError('Registration successful! Please log in.');
        }
      } else {
        login();
      }
    } catch (err) {
      setError('Connection error. Please check if your MongoDB server is running.');
    }
  };

  // Fallback Google Sign-In Simulation if Client ID is missing (for local testing/showcase)
  const handleGoogleLoginSimulation = () => {
    setError('');
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      '',
      'GoogleSignIn',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=no`
    );

    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Sign in - Google Accounts</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
            <style>body { font-family: 'Roboto', sans-serif; }</style>
          </head>
          <body class="bg-slate-50 min-h-screen flex flex-col justify-between p-6">
            <div class="flex-grow flex flex-col items-center justify-center max-w-sm mx-auto w-full">
              <svg class="w-12 h-12 mb-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h2 class="text-2xl font-bold text-slate-800 text-center mb-1">Sign in with Google</h2>
              <p class="text-sm text-slate-500 text-center mb-8">to continue to <span class="font-semibold text-slate-700">DROP</span></p>
              
              <div class="w-full space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6">
                <button id="auth-btn" class="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors text-left">
                  <div class="w-10 h-10 rounded-full bg-[#C9A84C] text-black font-black flex items-center justify-center text-sm shadow-inner">D</div>
                  <div>
                    <p class="text-sm font-bold text-slate-800">drop.enthusiast@gmail.com</p>
                    <p class="text-xs text-slate-500">Google Account (Demo Mode)</p>
                  </div>
                </button>
              </div>
              <p class="text-xs text-slate-400 text-center px-4 leading-relaxed">
                To continue, Google will share your name, email address, language preference, and profile picture with DROP.
              </p>
            </div>
            <footer class="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-4">
              Protected by reCAPTCHA &bull; Privacy &bull; Terms
            </footer>
            <script>
              document.getElementById('auth-btn').addEventListener('click', () => {
                window.opener.postMessage('google-login-success', '*');
                window.close();
              });
            </script>
          </body>
        </html>
      `);
      popup.document.close();

      const handleMessage = (event: MessageEvent) => {
        if (event.data === 'google-login-success') {
          // Verify with simulation payload on backend
          fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: jwtTokenMock() }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                login();
              } else {
                setError('Simulation login failed.');
              }
            })
            .catch(() => setError('Connection failed.'));
          window.removeEventListener('message', handleMessage);
        }
      };
      window.addEventListener('message', handleMessage);
    }
  };

  // Helper to generate a client-side mock JWT token for the backend simulation path
  const jwtTokenMock = () => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      email: 'drop.enthusiast@gmail.com',
      name: 'Drop Enthusiast',
      sub: 'google_1234567890',
    }));
    return `${header}.${payload}.signature`;
  };

  return (
    <div className="relative min-h-[100svh] w-screen bg-[#0A0A0A] flex items-center justify-center overflow-y-auto px-4 py-6 md:py-12 select-none">
      {/* Dynamic Background Light Leaks */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#2D1B4E]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#2A1F0E]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-white/[0.01] blur-[150px] pointer-events-none" />

      {/* Dynamic Floating Particles (60 gold and white dots) */}
      <div 
        ref={particlesContainerRef} 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full blur-[0.5px] mix-blend-overlay ${
              i % 2 === 0 ? 'bg-[#C9A84C]' : 'bg-white'
            }`}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-300 my-auto">
        
        {/* Brand Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase font-sans mb-1.5">
            DROP<span className="text-[#C9A84C]">.</span>
          </h1>
          <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-bold">
            Access Pure Hydration
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-4 py-2.5 rounded-xl text-center font-semibold">
              {error}
            </div>
          )}

          {isSignUp && (
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-b border-white/10 focus:border-[#C9A84C] outline-none py-2 text-sm text-white transition-all font-semibold tracking-wider placeholder-white/20 uppercase"
              />
            </div>
          )}

          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#C9A84C] outline-none py-2 text-sm text-white transition-all font-semibold tracking-wider placeholder-white/20 uppercase"
            />
          </div>

          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#C9A84C] outline-none py-2 text-sm text-white transition-all font-semibold tracking-wider placeholder-white/20 uppercase"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#C9A84C] hover:bg-[#B0913B] text-black font-black tracking-widest text-[10px] py-3.5 md:py-4 rounded-full transition-all duration-300 uppercase shadow-lg shadow-[#C9A84C]/10 hover:shadow-[#C9A84C]/25 active:scale-[0.98] cursor-pointer"
          >
            {isSignUp ? 'Create Account' : 'Enter The Void'}
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center my-5 md:my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <span className="relative z-10 px-3 bg-[#0a0a0a] text-[9px] font-black text-white/30 tracking-widest uppercase">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Social Logins */}
        <div className="flex gap-4">
          {/* Google Login */}
          <div className="relative flex-1 group">
            {googleClientId ? (
              // Invisible standard GSI button overlay
              <div 
                id="google-signin-btn-container" 
                className="absolute inset-0 z-20 opacity-[0.01] overflow-hidden cursor-pointer [&_iframe]:w-full [&_iframe]:h-full"
              />
            ) : null}
            <button 
              type="button"
              onClick={googleClientId ? undefined : handleGoogleLoginSimulation}
              className={`w-full flex items-center justify-center gap-3 py-2.5 md:py-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 active:scale-95 ${googleClientId ? 'pointer-events-none' : 'cursor-pointer'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#EA4335" d="M12 5.04c1.67 0 3.14.58 4.32 1.7l3.23-3.23C17.58 1.64 15.01 1 12 1 7.42 1 3.51 3.65 1.7 7.5l3.97 3.08C6.6 7.94 9.07 5.04 12 5.04z"/>
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.48-1.11 2.73-2.36 3.57l3.66 2.84c2.14-1.97 3.75-4.87 3.75-8.56z"/>
                <path fill="#34A853" d="M12 23c3.24 0 5.96-1.07 7.95-2.91l-3.66-2.84c-1.02.68-2.32 1.09-3.79 1.09-2.93 0-5.4-1.91-6.28-4.49l-3.97 3.07C3.51 20.35 7.42 23 12 23z"/>
                <path fill="#FBBC05" d="M5.72 13.85c-.23-.68-.36-1.41-.36-2.15 0-.74.13-1.47.36-2.15V6.48l-3.97-3.07C.61 5.48 0 7.82 0 10.35s.61 4.87 1.75 6.94l3.97-3.07v-.37z"/>
              </svg>
              <span className="text-[10px] font-bold tracking-widest text-white uppercase">Google</span>
            </button>
          </div>

          {/* Apple Login */}
          <button 
            type="button"
            onClick={login}
            className="flex-1 flex items-center justify-center gap-3 py-2.5 md:py-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.18.66-2.9 1.5-.63.73-1.18 1.87-1.03 2.98 1.1.09 2.22-.57 2.94-1.42z"/>
            </svg>
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">Apple</span>
          </button>
        </div>

        {/* Toggle Footer */}
        <div className="mt-8 text-center text-xs font-semibold tracking-wide">
          <span className="text-white/40">
            {isSignUp ? 'Already a member? ' : 'First time? '}
          </span>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-white hover:text-[#C9A84C] transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#C9A84C]/50"
          >
            {isSignUp ? 'Sign In' : 'Join the Survey'}
          </button>
        </div>
      </div>
    </div>
  );
}
