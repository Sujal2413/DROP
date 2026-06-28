'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function HeroCan() {
  const { scrollYProgress } = useScroll();

  // Drastic scale and rotate math mapped from scroll progress (0 to 1)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center pointer-events-none z-50">
      <motion.div
        style={{ 
          rotate, 
          scale,
          willChange: 'transform',
          transformOrigin: 'center center'
        }}
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
