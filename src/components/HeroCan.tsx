'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function HeroCan() {
  const { scrollY } = useScroll();

  // Replicate the math from the HTML reference
  // rotation = scrollY * 0.02
  const rotate = useTransform(scrollY, (v) => v * 0.02);
  // scale = Math.max(0.8, 1 - (scrollY * 0.0002))
  const scale = useTransform(scrollY, (v) => Math.max(0.8, 1 - v * 0.0002));

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center pointer-events-none z-50">
      <motion.div
        style={{ rotate, scale }}
        className="relative h-[50vh] md:h-[70vh] w-[auto] aspect-[37/100] max-h-[800px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
      >
        <Image
          src="/Create_a_hyper-realistic_product_image_202606280004.jpeg"
          alt="DROP Purple Can"
          fill
          priority
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
