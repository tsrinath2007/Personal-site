"use client";

/* ==========================================================================
   HOW TO SWAP IN YOUR FINAL TRACED "SES" SVG PATH:
   --------------------------------------------------------------------------
   1. Open your traced SVG in an editor (Figma, Illustrator, or Inkscape).
   2. Ensure the viewBox is "0 0 200 100" (or update the viewBox below).
   3. Copy your <path d="..." /> string(s) into the `SES_PATHS` array below.
   4. The path should be a line-art stroke (fill="none", stroke="currentColor").
   5. If you have a single continuous stroke, provide it as an array with 1 item.
      Multiple paths will be automatically staggered by 0.05s during drawing.
   ========================================================================== */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { motion, useAnimate, stagger } from "framer-motion";

// TODO: Replace these placeholder hand-drawn "SES" scribble paths with your final traced SVG path(s)
export const SES_PATHS: string[] = [
  // Cursive 'S' initial loop & curve
  "M 28 66 C 30 46 42 22 56 22 C 68 22 68 36 56 46 C 42 58 36 72 48 80 C 60 88 74 78 82 66",
  // Cursive 'E' connector and loops
  "M 82 66 C 90 54 98 38 108 30 C 118 22 126 28 120 42 C 112 54 94 56 100 62 C 108 70 122 70 118 78 C 114 86 100 82 108 74",
  // Cursive 'S' second loop & exit stroke
  "M 116 74 C 126 58 138 38 150 24 C 162 12 172 20 168 34 C 160 48 142 58 148 70 C 154 82 172 82 186 68 C 192 62 196 54 198 46",
  // Signature dynamic underline flourish
  "M 24 88 C 65 96 125 96 182 82",
];

export interface SesLogoProps {
  className?: string;
  isAnimated?: boolean;
}

/**
 * Hand-drawn single-stroke monogram "SES" inline SVG component
 */
export function SesLogo({ className = "", isAnimated = false }: SesLogoProps) {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-full h-full overflow-visible ${className}`}
      aria-label="SES Monogram Logo"
    >
      {SES_PATHS.map((pathD, idx) => (
        <motion.path
          key={idx}
          d={pathD}
          initial={
            isAnimated
              ? { pathLength: 0, strokeOpacity: 0.3 }
              : { pathLength: 1, strokeOpacity: 1 }
          }
        />
      ))}
    </svg>
  );
}

interface IntroContextType {
  introPlayed: boolean;
  isLogoAtNavbar: boolean;
  isContentVisible: boolean;
  isMobile: boolean;
  setIsLogoAtNavbar: (val: boolean) => void;
  setIsContentVisible: (val: boolean) => void;
}

const IntroContext = createContext<IntroContextType>({
  introPlayed: true,
  isLogoAtNavbar: true,
  isContentVisible: true,
  isMobile: false,
  setIsLogoAtNavbar: () => {},
  setIsContentVisible: () => {},
});

export const useIntro = () => useContext(IntroContext);

/**
 * Safely check whether the intro should be skipped before first paint:
 * - Respects prefers-reduced-motion
 * - Checks sessionStorage key "ses-intro-played"
 * - Handles SSR and privacy mode errors safely
 */
function checkShouldSkipIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return true;
    return sessionStorage.getItem("ses-intro-played") === "true";
  } catch {
    // If sessionStorage throws (e.g. restrictive privacy mode), fall back to skip
    return true;
  }
}

interface IntroProviderProps {
  children: ReactNode;
}

export function IntroProvider({ children }: IntroProviderProps) {
  // Check sessionStorage / reduced motion before first paint to prevent flashes
  const [introPlayed] = useState<boolean>(() => checkShouldSkipIntro());
  const [isLogoAtNavbar, setIsLogoAtNavbar] = useState<boolean>(introPlayed);
  const [isContentVisible, setIsContentVisible] = useState<boolean>(introPlayed);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <IntroContext.Provider
      value={{
        introPlayed,
        isLogoAtNavbar,
        isContentVisible,
        isMobile,
        setIsLogoAtNavbar,
        setIsContentVisible,
      }}
    >
      <div suppressHydrationWarning>{children}</div>
    </IntroContext.Provider>
  );
}

interface IntroLogoProps {
  onIntroComplete?: () => void;
}

/**
 * Self-contained IntroLogo component:
 * 1. Renders fixed white overlay with centered 140px (100px mobile) logo.
 * 2. Draws SVG strokes with pathLength 0->1 and strokeOpacity 0.3->1 over 1.1s (staggered 0.05s).
 * 3. Sets sessionStorage flag immediately on sequence start.
 * 4. Chains transition of layoutId="logo" moving to the navbar over 0.6s.
 * 5. Fades in page content (overlapping by ~150ms).
 */
export function IntroLogo({ onIntroComplete }: IntroLogoProps) {
  const {
    introPlayed,
    isLogoAtNavbar,
    isMobile,
    setIsLogoAtNavbar,
    setIsContentVisible,
  } = useIntro();
  const [isOverlayVisible, setIsOverlayVisible] = useState(!introPlayed);
  const [scope, animate] = useAnimate();
  const sequenceRanRef = useRef(false);

  const startSequence = useCallback(async () => {
    if (sequenceRanRef.current || introPlayed) return;
    sequenceRanRef.current = true;

    // 1e: Set sessionStorage flag as soon as sequence starts
    try {
      sessionStorage.setItem("ses-intro-played", "true");
    } catch {
      // Graceful fallback if storage throws
    }

    try {
      // 1b: Draw logo paths (1.1s duration, ease: [0.65, 0, 0.35, 1], staggered 0.05s per path)
      await animate(
        "path",
        { pathLength: [0, 1], strokeOpacity: [0.3, 1] },
        {
          duration: 1.1,
          ease: [0.65, 0, 0.35, 1],
          delay: stagger(0.05),
        }
      );

      // 1c & 1d: Immediately chain transition to navbar (no gap)
      setIsLogoAtNavbar(true);

      // Overlap by ~150ms: content starts fading in as logo starts flying
      setIsContentVisible(true);

      if (onIntroComplete) {
        onIntroComplete();
      }

      // Fade out solid white overlay
      await animate(
        scope.current,
        { opacity: 0 },
        { duration: 0.45, ease: "easeInOut" }
      );

      setIsOverlayVisible(false);
    } catch {
      // If animation is interrupted or cancelled, ensure clean state
      setIsOverlayVisible(false);
      setIsLogoAtNavbar(true);
      setIsContentVisible(true);
      if (onIntroComplete) onIntroComplete();
    }
  }, [
    animate,
    introPlayed,
    onIntroComplete,
    scope,
    setIsContentVisible,
    setIsLogoAtNavbar,
  ]);

  useEffect(() => {
    if (!introPlayed && !sequenceRanRef.current) {
      startSequence();
    }
  }, [introPlayed, startSequence]);

  // If already played in this session, render nothing
  if (introPlayed || !isOverlayVisible) {
    return null;
  }

  return (
    <motion.div
      ref={scope}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#ffffff] pointer-events-none"
      initial={{ opacity: 1 }}
    >
      {!isLogoAtNavbar && (
        <motion.div
          layoutId="logo"
          layout
          className={`flex items-center justify-center text-[#111111] ${
            isMobile ? "w-[100px] h-[50px]" : "w-[140px] h-[70px]"
          }`}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <SesLogo isAnimated={true} />
        </motion.div>
      )}
    </motion.div>
  );
}
