"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

function checkShouldPlay(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPlayed = sessionStorage.getItem("ses-opening-played") === "true";
    return !prefersReducedMotion && !hasPlayed;
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => {};

export function SesOpeningAnimation() {
  const shouldPlay = useSyncExternalStore(
    emptySubscribe,
    checkShouldPlay,
    () => false
  );

  const [phase, setPhase] = useState<"enter" | "cut" | "open" | "done">("enter");

  useEffect(() => {
    if (!shouldPlay) return;

    try {
      sessionStorage.setItem("ses-opening-played", "true");
    } catch {
      // ignore private mode error
    }

    // Sequence:
    // 0.35s: laser cut slices vertically through center of E
    // 0.70s: E cuts in half, doors open left and right
    // 1.45s: animation completes and unmounts
    const t1 = setTimeout(() => setPhase("cut"), 350);
    const t2 = setTimeout(() => setPhase("open"), 700);
    const t3 = setTimeout(() => setPhase("done"), 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [shouldPlay]);

  const handleSkip = () => {
    setPhase("done");
  };

  if (!shouldPlay || phase === "done") return null;

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden select-none bg-[#0A0A0C]"
      aria-label="Click to skip intro animation"
    >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gold-accent/10 rounded-full blur-[120px] pointer-events-none" />

          {/* LEFT SHUTTER (0 to 50vw): takes S + left half of E */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "open" ? { x: "-100%" } : { x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.85, 0, 0.15, 1],
            }}
            className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-[#0A0A0C] border-r border-gold-accent/25 z-10"
          >
            {/* 100vw container, left-aligned, clips right through center of E */}
            <div className="w-screen h-screen flex items-center justify-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-heading font-black text-6xl sm:text-8xl md:text-9xl tracking-[0.25em] sm:tracking-[0.3em] flex items-center justify-center"
              >
                <span className="text-text-offwhite drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">
                  S<span className="text-gold-accent">E</span>S
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SHUTTER (50vw to 100vw): takes right half of E + S */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "open" ? { x: "100%" } : { x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.85, 0, 0.15, 1],
            }}
            className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden bg-[#0A0A0C] border-l border-gold-accent/25 z-10"
          >
            {/* 100vw container, shifted -50vw to align right half of E and second S */}
            <div className="w-screen h-screen flex items-center justify-center relative -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-heading font-black text-6xl sm:text-8xl md:text-9xl tracking-[0.25em] sm:tracking-[0.3em] flex items-center justify-center"
              >
                <span className="text-text-offwhite drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">
                  S<span className="text-gold-accent">E</span>S
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* CENTER LASER CUT LINE (Slices vertically through the center of E) */}
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
              duration: phase === "cut" ? 0.3 : 0.2,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-gold-accent to-transparent z-20 pointer-events-none shadow-[0_0_15px_#D4AF37]"
          >
            {/* Spark at slice center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#F3C63F] rounded-full blur-[2px] animate-pulse" />
          </motion.div>

          {/* Quick skip hint */}
          <div className="absolute bottom-6 right-6 z-30 font-mono text-[10px] text-text-muted/60 tracking-widest uppercase">
            CLICK TO SKIP
          </div>
        </div>
  );
}
