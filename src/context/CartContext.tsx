'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  flavor: string;
  price: string;
  image: string;
}

interface CartContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  showSurvey: boolean;
  setShowSurvey: (show: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check session validity from backend cookie on mount
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.authenticated) {
          setIsLoggedIn(true);
          localStorage.setItem('drop_logged_in', 'true');
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('drop_logged_in');
        }
      } catch (err) {
        // Fallback to localStorage if offline or network error
        const loggedIn = localStorage.getItem('drop_logged_in') === 'true';
        setIsLoggedIn(loggedIn);
      }
    };
    
    checkSession();

    // Retrieve cart items from localStorage on mount
    const savedCart = localStorage.getItem('drop_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
  }, []);

  const login = () => {
    localStorage.setItem('drop_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Failed to log out from backend', e);
    }
    localStorage.removeItem('drop_logged_in');
    setIsLoggedIn(false);
    setCart([]);
    localStorage.removeItem('drop_cart');
  };

  const addToCart = (item: CartItem) => {
    // Check if item is already in cart to avoid duplicates for survey purposes
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      showToast(`${item.name} is already in interest list!`);
      setIsCartOpen(true);
      return;
    }

    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('drop_cart', JSON.stringify(updatedCart));

    // Show visual toast notification and open cart sidebar
    showToast(`Added ${item.name} to interest cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('drop_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('drop_cart');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <CartContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        showSurvey,
        setShowSurvey,
        toastMessage,
        showToast,
      }}
    >
      {children}
      
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-[999] bg-[#C9A84C] text-black px-6 py-3 font-bold rounded-full shadow-2xl flex items-center gap-3 animate-bounce border border-black/10 text-sm tracking-wider">
          <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
          {toastMessage}
        </div>
      )}

      {/* Center Screen Survey Thank You Modal */}
      {showSurvey && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-md px-6 pointer-events-auto">
          <div className="bg-[#121414] border-2 border-[#C9A84C]/50 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center shadow-[0_0_50px_rgba(201,168,76,0.15)] flex flex-col items-center">
            <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-[#C9A84C] text-3xl font-black tracking-tight mb-4 uppercase font-sans">
              Thank You!
            </h3>
            <p className="text-white/80 font-medium leading-relaxed mb-8 text-sm md:text-base">
              Thank you for sharing your interest in our product. This was a survey, we would love to have you as a customer in the future. Have a good day!
            </p>
            <button 
              onClick={() => setShowSurvey(false)}
              className="px-10 py-4 bg-[#C9A84C] hover:bg-[#B0913B] text-black font-extrabold tracking-widest text-sm rounded-full transition-all duration-300 uppercase shadow-lg shadow-[#C9A84C]/20 active:scale-95"
            >
              Have a Great Day
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
