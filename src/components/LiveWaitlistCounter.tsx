'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveWaitlistCounter({ initialCount = 4219 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Randomly tick up by 1-3 every 15-45 seconds
    const tick = () => {
      const nextTickTime = Math.random() * 30000 + 15000;
      setTimeout(() => {
        setCount(c => c + Math.floor(Math.random() * 3) + 1);
        tick();
      }, nextTickTime);
    };

    tick();
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase py-4">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
      <span className="opacity-60">Join </span>
      <div className="relative overflow-hidden w-10 h-4">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center text-[#C9A84C]"
          >
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="opacity-60"> others</span>
    </div>
  );
}
