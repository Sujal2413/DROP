"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
  theme = "default",
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
  theme?: "default" | "olive";
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      if (svgRect.width > 0 && svgRect.height > 0) {
        const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
        const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
        setMaskPosition({
          cx: `${cxPercentage}%`,
          cy: `${cyPercentage}%`,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor.x, cursor.y]);

  const isOlive = theme === "olive";
  const strokeColor40 = isOlive ? "stroke-[#D4AF37]/30" : "stroke-[#8b5cf6]/40";
  const strokeColor60 = isOlive ? "stroke-[#D4AF37]/50" : "stroke-[#8b5cf6]/60";

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            isOlive ? (
              <>
                <stop offset="0%" stopColor="#1B2A22" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FDFCF8" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#1A0B2E" />
                <stop offset="25%" stopColor="#B11212" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="75%" stopColor="#E8E2D2" />
                <stop offset="100%" stopColor="#0A0A0A" />
              </>
            )
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn("fill-transparent font-[Anton] text-7xl font-black tracking-tighter", strokeColor40)}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn("fill-transparent font-[Anton] text-7xl font-black tracking-tighter", strokeColor60)}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[Anton] text-7xl font-black tracking-tighter"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = ({ theme = "default" }: { theme?: "default" | "olive" }) => {
  const backgroundStyle = theme === "olive" 
    ? "radial-gradient(125% 125% at 50% 10%, #1B2A22 60%, #0A120E 100%)"
    : "radial-gradient(125% 125% at 50% 10%, #000000 50%, #1A0B2E 100%)";

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: backgroundStyle,
      }}
    />
  );
};
