"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

const emptySubscribe = () => () => {};

export function SesOpeningAnimation() {
  // Mount on client side immediately on every page load/refresh
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [phase, setPhase] = useState<"draw" | "fill" | "cut" | "open" | "done">("draw");

  useEffect(() => {
    // Sequence runs on every page refresh:
    // 0.00s – 0.70s: Double-line geometric strokes draw in
    // 0.70s – 1.15s: Monogram fills solid ("it should fill")
    // 1.15s – 1.35s: Razor-sharp cut line flashes down the center of E
    // 1.35s – 2.05s: E cuts in half and doors open ("cut E in half and open", "and close")
    // 2.05s: Animation complete, unmounts completely (not a logo)
    const tFill = setTimeout(() => setPhase("fill"), 700);
    const tCut = setTimeout(() => setPhase("cut"), 1150);
    const tOpen = setTimeout(() => setPhase("open"), 1350);
    const tDone = setTimeout(() => setPhase("done"), 2050);

    return () => {
      clearTimeout(tFill);
      clearTimeout(tCut);
      clearTimeout(tOpen);
      clearTimeout(tDone);
    };
  }, []);

  const handleSkip = () => {
    setPhase("done");
  };

  if (!isMounted || phase === "done") return null;

  const isFilled = phase === "fill" || phase === "cut" || phase === "open";

  const renderMonogram = () => (
    <svg
      viewBox="0 0 320 140"
      className="w-[260px] sm:w-[340px] md:w-[400px] h-auto select-none"
    >
      {/* S1: Double-contour ribbon path */}
      <motion.path
        d="M 92,26 C 74,15 54,18 42,30 C 30,44 34,62 52,74 L 68,84 C 84,94 88,110 78,122 C 68,134 48,136 34,126 L 28,136 C 46,148 74,146 88,130 C 102,114 98,92 78,80 L 62,70 C 48,60 44,46 52,36 C 60,26 76,24 88,32 Z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        stroke="#111113"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill={isFilled ? "#111113" : "transparent"}
        style={{ transition: "fill 0.35s ease-out" }}
      />
      {/* S1: Centerline */}
      <motion.path
        d="M 90,29 C 75,19 57,21 47,32 C 37,44 40,58 56,70 L 72,82 C 90,94 93,107 83,119 C 74,129 55,130 40,121"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        fill="none"
        stroke={isFilled ? "#ffffff" : "#111113"}
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{ transition: "stroke 0.35s ease-out" }}
      />

      {/* Center E: Centered at X=160 (X spans 134 to 186) */}
      <motion.path
        d="M 134,22 L 186,22 L 186,34 L 148,34 L 148,65 L 180,65 L 180,75 L 148,75 L 148,106 L 186,106 L 186,118 L 134,118 Z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.08, ease: "easeInOut" }}
        stroke="#111113"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill={isFilled ? "#111113" : "transparent"}
        style={{ transition: "fill 0.35s ease-out" }}
      />
      {/* E: Centerline */}
      <motion.path
        d="M 184,28 L 141,28 L 141,112 L 184,112 M 141,70 L 178,70"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.08, ease: "easeInOut" }}
        fill="none"
        stroke={isFilled ? "#ffffff" : "#111113"}
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{ transition: "stroke 0.35s ease-out" }}
      />

      {/* S2: Double-contour ribbon path */}
      <motion.path
        d="M 282,26 C 264,15 244,18 232,30 C 220,44 224,62 242,74 L 258,84 C 274,94 278,110 268,122 C 258,134 238,136 224,126 L 218,136 C 236,148 264,146 278,130 C 292,114 288,92 268,80 L 252,70 C 238,60 234,46 242,36 C 250,26 266,24 278,32 Z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.16, ease: "easeInOut" }}
        stroke="#111113"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill={isFilled ? "#111113" : "transparent"}
        style={{ transition: "fill 0.35s ease-out" }}
      />
      {/* S2: Centerline */}
      <motion.path
        d="M 280,29 C 265,19 247,21 237,32 C 227,44 230,58 246,70 L 262,82 C 280,94 283,107 273,119 C 264,129 245,130 230,121"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.16, ease: "easeInOut" }}
        fill="none"
        stroke={isFilled ? "#ffffff" : "#111113"}
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{ transition: "stroke 0.35s ease-out" }}
      />
    </svg>
  );

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden select-none"
      aria-label="Click to skip intro animation"
    >
      {/* LEFT SHUTTER: covers left half (0 to 50vw). Holds S1 + left half of E */}
      <motion.div
        initial={{ x: 0 }}
        animate={phase === "open" ? { x: "-100%" } : { x: 0 }}
        transition={{
          duration: 0.65,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-[#ffffff] border-r border-[#D4AF37]/40 z-10"
      >
        <div className="w-screen h-screen flex items-center justify-center relative">
          {renderMonogram()}
        </div>
      </motion.div>

      {/* RIGHT SHUTTER: covers right half (50vw to 100vw). Holds right half of E + S2 */}
      <motion.div
        initial={{ x: 0 }}
        animate={phase === "open" ? { x: "100%" } : { x: 0 }}
        transition={{
          duration: 0.65,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden bg-[#ffffff] border-l border-[#D4AF37]/40 z-10"
      >
        <div className="w-screen h-screen flex items-center justify-center relative -translate-x-1/2">
          {renderMonogram()}
        </div>
      </motion.div>

      {/* CENTER CUT LINE: Slices vertically through the center of E */}
      <motion.div
        initial={{ height: "0%", opacity: 0 }}
        animate={
          phase === "cut"
            ? { height: "100%", opacity: 1 }
            : phase === "open"
            ? { height: "100%", opacity: 0 }
            : { height: "0%", opacity: 0 }
        }
        transition={{
          duration: phase === "cut" ? 0.2 : 0.15,
          ease: "easeInOut",
        }}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent z-20 pointer-events-none shadow-[0_0_12px_#D4AF37]"
      >
        {/* Glow spark at center of the cut */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#D4AF37] rounded-full blur-[2px]" />
      </motion.div>

      {/* Skip indicator */}
      <div className="absolute bottom-6 right-6 z-30 font-mono text-[10px] text-[#888888] tracking-widest uppercase">
        CLICK TO SKIP
      </div>
    </div>
  );
}
