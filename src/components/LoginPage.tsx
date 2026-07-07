'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';
import { Eye, EyeOff, Mail, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// --- Cartoon Characters Helper Components ---

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

// --- LoginPage Component ---

export default function LoginPage() {
  const { login } = useCart();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // GSI and Social Configuration
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  // Interactive Character States
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);

  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating background particles loop
  useEffect(() => {
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
  }, []);

  // Blinking effects
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Characters looking at each other when typing email
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  // Purple sneaky peek when password is visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(() => {
          setIsPurplePeeking(true);
          setTimeout(() => {
            setIsPurplePeeking(false);
          }, 800);
        }, Math.random() * 3000 + 2000);
        return peekInterval;
      };
      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      setIsPurplePeeking(false);
    }
  }, [password, showPassword, isPurplePeeking]);

  // Google GSI script loader
  useEffect(() => {
    if (googleClientId) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
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

  // Calculations for skew/lean
  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));
    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  // Client-side secure error mapper (defensive engineering)
  const getFriendlyErrorMessage = (errorStr: string, status?: number) => {
    const err = errorStr.toLowerCase();
    // Intercept generic 500 error or database failure strings to avoid info leaks
    if (status === 500 || err.includes('internal server error') || err.includes('500')) {
      return "We're having trouble connecting to our servers. Please try again in a few moments.";
    }
    if (status === 401 || err.includes('invalid email or password') || err.includes('unauthorized')) {
      return "Invalid email or password. Please verify your credentials and try again.";
    }
    if (status === 409 || err.includes('already exists')) {
      return "An account with this email already exists.";
    }
    if (status === 429 || err.includes('too many') || err.includes('rate limit')) {
      return "Too many requests. Please wait a moment before trying again.";
    }
    if (err.includes('connection error') || err.includes('fetch') || err.includes('network')) {
      return "Network connection issue. Please check your internet or if the server is offline.";
    }
    return errorStr || "An unexpected error occurred. Please try again.";
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setIsLoading(true);

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
        setError(getFriendlyErrorMessage(data.error || 'Authentication failed.', res.status));
        setIsLoading(false);
        return;
      }

      if (isSignUp) {
        // Auto-login after successful registration
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
      setError(getFriendlyErrorMessage('Connection error.', 0));
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login Simulation
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

  const jwtTokenMock = () => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      email: 'drop.enthusiast@gmail.com',
      name: 'Drop Enthusiast',
      sub: 'google_1234567890',
    }));
    return `${header}.${payload}.signature`;
  };

  // Fallback Apple Sign-In Simulation
  const handleAppleLoginSimulation = () => {
    setError('');
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      '',
      'AppleSignIn',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=no`
    );

    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Sign in with Apple</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
            </style>
          </head>
          <body class="bg-[#000000] text-white min-h-screen flex flex-col justify-between p-6 select-none">
            <div class="flex-grow flex flex-col items-center justify-center max-w-sm mx-auto w-full">
              <!-- Apple Logo -->
              <svg class="w-16 h-16 mb-8 text-white fill-current animate-pulse" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.18.66-2.9 1.5-.63.73-1.18 1.87-1.03 2.98 1.1.09 2.22-.57 2.94-1.42z"/>
              </svg>
              
              <h2 class="text-3xl font-semibold text-center mb-1 tracking-tight">Sign in with Apple ID</h2>
              <p class="text-sm text-zinc-400 text-center mb-8">Use your Apple ID to sign in to <span class="text-white font-medium">DROP</span></p>

              <!-- State 1: Choose Account or Enter Details -->
              <div id="login-container" class="w-full space-y-4">
                <button id="auth-btn" class="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all duration-300 text-left cursor-pointer">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-zinc-800 text-white font-bold flex items-center justify-center text-sm border border-zinc-700 shadow-inner"></div>
                    <div>
                      <p class="text-sm font-bold">drop.enthusiast@icloud.com</p>
                      <p class="text-xs text-zinc-400">Apple Account (Demo Mode)</p>
                    </div>
                  </div>
                  <!-- Right Chevron -->
                  <svg class="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- State 2: FaceID scanner -->
              <div id="faceid-container" class="hidden flex flex-col items-center justify-center space-y-6">
                <!-- FaceID Scanner Icon -->
                <div class="relative w-28 h-28 flex items-center justify-center">
                  <!-- Scanning green line / circles -->
                  <div class="absolute inset-0 rounded-3xl border-4 border-zinc-800 animate-pulse"></div>
                  <div class="absolute inset-2 rounded-2xl border-2 border-zinc-750"></div>
                  <!-- FaceID SVG -->
                  <svg class="w-16 h-16 text-sky-500 animate-bounce" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h.01M9 9h.01M5 12a7 7 0 1114 0c0 3.866-3 7-7 7s-7-3.134-7-7z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 15h4M12 11v3" />
                  </svg>
                </div>
                <p id="faceid-text" class="text-sm text-zinc-400 font-semibold tracking-wide animate-pulse">Scanning with FaceID...</p>
              </div>
            </div>
            
            <footer class="text-center text-[10px] text-zinc-600 border-t border-zinc-900 pt-4">
              Apple ID & &bull; Privacy &bull; Terms
            </footer>

            <script>
              const authBtn = document.getElementById('auth-btn');
              const loginContainer = document.getElementById('login-container');
              const faceidContainer = document.getElementById('faceid-container');
              const faceidText = document.getElementById('faceid-text');
              
              authBtn.addEventListener('click', () => {
                // Switch to FaceID scanning animation
                loginContainer.classList.add('hidden');
                faceidContainer.classList.remove('hidden');
                
                // Simulate scan duration
                setTimeout(() => {
                  faceidText.innerText = "Success!";
                  faceidText.classList.remove('text-zinc-400');
                  faceidText.classList.add('text-emerald-500');
                  
                  // Pulse success
                  setTimeout(() => {
                    window.opener.postMessage('apple-login-success', '*');
                    window.close();
                  }, 600);
                }, 1800);
              });
            </script>
          </body>
        </html>
      `);
      popup.document.close();

      const handleMessage = (event: MessageEvent) => {
        if (event.data === 'apple-login-success') {
          fetch('/api/auth/apple', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: appleJwtTokenMock() }),
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

  const appleJwtTokenMock = () => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      email: 'drop.enthusiast@icloud.com',
      name: 'Drop Enthusiast',
      sub: 'apple_1234567890',
    }));
    return `${header}.${payload}.signature`;
  };

  return (
    <div className="relative min-h-[100svh] w-screen bg-[#0A0A0A] grid lg:grid-cols-2 overflow-y-auto select-none">
      
      {/* Background Particles Container */}
      <div 
        ref={particlesContainerRef} 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full blur-[0.5px] mix-blend-overlay ${
              i % 2 === 0 ? 'bg-[#C9A84C]' : 'bg-white'
            }`}
          />
        ))}
      </div>

      {/* Left Content Section - Animated Characters with a sleek space background */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#121417]/90 via-[#0F1112] to-black p-12 text-white border-r border-white/5 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#2D1B4E]/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#2A1F0E]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-20">
          <div className="flex items-center gap-2 text-2xl font-black tracking-tighter uppercase font-sans">
            <span className="text-white">DROP</span>
            <span className="text-[#C9A84C]">.</span>
          </div>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          {/* Cartoon Characters */}
          <div className="relative" style={{ width: '550px', height: '400px' }}>
            {/* Purple tall rectangle character - Back layer */}
            <div 
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '70px',
                width: '180px',
                height: (isTyping || (password.length > 0 && !showPassword)) ? '440px' : '400px',
                zIndex: 1,
                transform: (password.length > 0 && showPassword)
                  ? `skewX(0deg)`
                  : (isTyping || (password.length > 0 && !showPassword))
                    ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)` 
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <img src="/assets/login-can-purple.png" alt="Purple Can" className="absolute inset-0 w-full h-full object-fill drop-shadow-xl" />
            </div>

            {/* Black tall rectangle character - Middle layer */}
            <div 
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '240px',
                width: '120px',
                height: '310px',
                zIndex: 2,
                transform: (password.length > 0 && showPassword)
                  ? `skewX(0deg)`
                  : isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : (isTyping || (password.length > 0 && !showPassword))
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` 
                      : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <img src="/assets/login-can-black.png" alt="Black Can" className="absolute inset-0 w-full h-full object-fill drop-shadow-xl" />
            </div>

            {/* Orange semi-circle character - Front left */}
            <div 
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '0px',
                width: '240px',
                height: '200px',
                zIndex: 3,
                transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <img src="/assets/login-can-gold.png" alt="Gold Can" className="absolute inset-0 w-full h-full object-fill drop-shadow-xl" />
            </div>

            {/* Yellow tall rectangle character - Front right */}
            <div 
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '310px',
                width: '140px',
                height: '230px',
                zIndex: 4,
                transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <img src="/assets/login-can-silver.png" alt="Silver Can" className="absolute inset-0 w-full h-full object-fill drop-shadow-xl" />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-xs text-white/40">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="relative z-10 flex items-center justify-center p-8 bg-transparent">
        <div className="w-full max-w-[400px] bg-white/[0.03] hover:bg-white/[0.04] backdrop-blur-[60px] border border-white/[0.08] rounded-[32px] p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.02)] transition-colors duration-700">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-2xl font-black tracking-tighter uppercase font-sans mb-8">
            <span className="text-white">DROP</span>
            <span className="text-[#C9A84C]">.</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-black tracking-tight mb-2 uppercase">
              {isSignUp ? 'Join the Survey' : 'Welcome Back'}
            </h1>
            <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-bold">
              {isSignUp ? 'Create your credentials' : 'Access Pure Hydration'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {error && (
              <div className="bg-red-950/30 border border-red-800/40 text-red-200 text-xs px-4 py-3 rounded-xl text-left font-medium space-y-2 shadow-inner">
                <p className="leading-relaxed">{error}</p>
                {(error.includes("trouble connecting") || error.includes("connection issue")) && (
                  <button 
                    type="button" 
                    onClick={handleSubmit as any}
                    disabled={isLoading}
                    className="text-[10px] text-[#E3C571] hover:underline font-bold block cursor-pointer disabled:opacity-50"
                  >
                    Retry Connection
                  </button>
                )}
              </div>
            )}

            {isSignUp && (
              <div className="space-y-1">
                <Label htmlFor="name" className="text-white/50 text-[10px] font-bold tracking-widest uppercase">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-transparent border-b border-white/10 focus:border-[#C9A84C] outline-none text-sm text-white font-semibold placeholder-white/20 h-10 w-full transition-all duration-300 focus:bg-white/[0.02] focus:px-3 focus:-ml-3 focus:rounded-t-lg disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email" className="text-white/50 text-[10px] font-bold tracking-widest uppercase">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                disabled={isLoading}
                required
                className="bg-transparent border-b border-white/10 focus:border-[#C9A84C] outline-none text-sm text-white font-semibold placeholder-white/20 h-10 w-full transition-all duration-300 focus:bg-white/[0.02] focus:px-3 focus:-ml-3 focus:rounded-t-lg disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-white/50 text-[10px] font-bold tracking-widest uppercase">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-transparent border-b border-white/10 focus:border-[#C9A84C] outline-none text-sm text-white font-semibold placeholder-white/20 h-10 w-full pr-10 transition-all duration-300 focus:bg-white/[0.02] focus:px-3 focus:-ml-3 focus:rounded-t-lg disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-[#C9A84C] to-[#E3C571] hover:from-[#B0913B] hover:to-[#C9A84C] text-black font-black tracking-widest text-[10px] py-4 rounded-full transition-all duration-300 uppercase shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isLoading ? (isSignUp ? 'Signing Up...' : 'Signing In...') : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-6">
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
                <div 
                  id="google-signin-btn-container" 
                  className="absolute inset-0 z-20 opacity-[0.01] overflow-hidden cursor-pointer [&_iframe]:w-full [&_iframe]:h-full"
                />
              ) : null}
              <button 
                type="button"
                onClick={googleClientId ? undefined : handleGoogleLoginSimulation}
                className={`w-full flex items-center justify-center gap-3 py-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 active:scale-95 ${googleClientId ? 'pointer-events-none' : 'cursor-pointer'}`}
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
              onClick={handleAppleLoginSimulation}
              className="flex-1 flex items-center justify-center gap-3 py-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.18.66-2.9 1.5-.63.73-1.18 1.87-1.03 2.98 1.1.09 2.22-.57 2.94-1.42z"/>
              </svg>
              <span className="text-[10px] font-bold tracking-widest text-white uppercase">Apple</span>
            </button>
          </div>

          {/* Toggle Footer */}
          <div className="mt-8 text-center text-xs font-semibold tracking-wide">
            <span className="text-white/40 font-medium">
              {isSignUp ? 'Already a member? ' : 'First time? '}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-white hover:text-[#C9A84C] transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#C9A84C]/50 bg-transparent border-0 cursor-pointer"
            >
              {isSignUp ? 'Sign In' : 'Join the Survey'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
