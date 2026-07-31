"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroContextType {
  introStage:
    | "loading"
    | "fade_in"
    | "entrance"
    | "wave"
    | "text"
    | "pause"
    | "transition"
    | "completed";
  skipIntro: () => void;
  replayIntro: () => void;
  isIntroCompleted: boolean;
}

const IntroContext = createContext<IntroContextType>({
  introStage: "completed",
  skipIntro: () => {},
  replayIntro: () => {},
  isIntroCompleted: true,
});

export const useIntro = () => useContext(IntroContext);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introStage, setIntroStage] = useState<
    | "loading"
    | "fade_in"
    | "entrance"
    | "wave"
    | "text"
    | "pause"
    | "transition"
    | "completed"
  >("loading");

  const skipIntro = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenOmkarIntro", "true");
    }
    setIntroStage("completed");
  };

  const replayIntro = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hasSeenOmkarIntro");
    }
    setIntroStage("fade_in");
  };

  // Check initial state on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeen = localStorage.getItem("hasSeenOmkarIntro") === "true";

    if (hasSeen || prefersReducedMotion) {
      setIntroStage("completed");
    } else {
      setIntroStage("fade_in");
    }
  }, []);

  // Sequence Timeline Controller
  useEffect(() => {
    if (introStage === "loading" || introStage === "completed") return;

    let timer: NodeJS.Timeout;

    if (introStage === "fade_in") {
      // 500ms Fade In -> Entrance
      timer = setTimeout(() => {
        setIntroStage("entrance");
      }, 500);
    } else if (introStage === "entrance") {
      // 1200ms Entrance (Walk from left to center) -> Wave
      timer = setTimeout(() => {
        setIntroStage("wave");
      }, 1200);
    } else if (introStage === "wave") {
      // 800ms Wave -> Text
      timer = setTimeout(() => {
        setIntroStage("text");
      }, 800);
    } else if (introStage === "text") {
      // 1000ms Text Fade Up -> Pause
      timer = setTimeout(() => {
        setIntroStage("pause");
      }, 1000);
    } else if (introStage === "pause") {
      // 1000ms Pause -> Transition to Hero
      timer = setTimeout(() => {
        setIntroStage("transition");
      }, 1000);
    } else if (introStage === "transition") {
      // 1000ms Transition -> Completed
      timer = setTimeout(() => {
        localStorage.setItem("hasSeenOmkarIntro", "true");
        setIntroStage("completed");
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [introStage]);

  const isIntroCompleted = introStage === "completed";

  return (
    <IntroContext.Provider
      value={{ introStage, skipIntro, replayIntro, isIntroCompleted }}
    >
      <AnimatePresence mode="wait">
        {!isIntroCompleted && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-white via-slate-50 to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 select-none overflow-hidden"
          >
            {/* Ambient Subtle Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,rgba(37,99,235,0.08),transparent)] pointer-events-none" />

            {/* Skip Intro Button */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-50">
              <Button
                variant="outline"
                size="sm"
                onClick={skipIntro}
                className="rounded-full gap-2 text-xs font-semibold px-4 py-2 bg-background/80 backdrop-blur-md border-border/80 shadow-sm hover:bg-muted transition-all"
              >
                <span>Skip Intro</span>
                <SkipForward className="w-3.5 h-3.5 text-primary" />
              </Button>
            </div>

            {/* Center Stage Container */}
            <div className="relative w-full max-w-2xl px-6 flex flex-col items-center justify-center text-center z-10 space-y-6">
              {/* Doraemon Mascot Vector */}
              <motion.div
                initial={{ x: "-100vw", opacity: 0, scale: 0.9 }}
                animate={
                  introStage === "fade_in"
                    ? { x: "-100vw", opacity: 0, scale: 0.9 }
                    : introStage === "entrance"
                    ? {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0, -8, 0], // Natural walking bob
                      }
                    : introStage === "wave" ||
                      introStage === "text" ||
                      introStage === "pause"
                    ? { x: 0, opacity: 1, scale: 1, y: 0 }
                    : {
                        x: "30vw",
                        y: "15vh",
                        scale: 0.5,
                        opacity: 0,
                      }
                }
                transition={
                  introStage === "entrance"
                    ? {
                        x: { type: "spring", stiffness: 90, damping: 14, mass: 0.8 },
                        y: { repeat: Infinity, duration: 0.4 },
                        scale: { duration: 0.6 },
                        opacity: { duration: 0.4 },
                      }
                    : {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        mass: 0.8,
                      }
                }
                className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 500 520"
                  fill="none"
                  className="w-full h-full drop-shadow-xl"
                >
                  <defs>
                    <linearGradient id="seqBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00A8FF" />
                      <stop offset="100%" stopColor="#0072CE" />
                    </linearGradient>
                    <linearGradient id="seqWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F0F4F8" />
                    </linearGradient>
                    <linearGradient id="seqRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF3838" />
                      <stop offset="100%" stopColor="#C51162" />
                    </linearGradient>
                    <linearGradient id="seqBell" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFEAA7" />
                      <stop offset="100%" stopColor="#E1B12C" />
                    </linearGradient>
                    <linearGradient id="seqCopter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF200" />
                      <stop offset="100%" stopColor="#F79F1F" />
                    </linearGradient>
                  </defs>

                  {/* Bamboo Copter */}
                  <g className="animate-copter-spin">
                    <ellipse cx="250" cy="58" rx="85" ry="7" fill="url(#seqCopter)" opacity="0.9" />
                    <ellipse cx="250" cy="58" rx="80" ry="4" fill="#FFFFFF" opacity="0.7" />
                  </g>
                  <rect x="246" y="58" width="8" height="26" rx="4" fill="#F79F1F" />
                  <path d="M236 84 C236 78, 264 78, 264 84 Z" fill="#D4AC0D" />

                  {/* Head */}
                  <circle cx="250" cy="205" r="135" fill="url(#seqBlue)" stroke="#00569E" strokeWidth="3.5" />
                  <ellipse cx="205" cy="115" rx="35" ry="18" fill="#FFFFFF" opacity="0.25" transform="rotate(-20 205 115)" />

                  {/* Face */}
                  <ellipse cx="250" cy="220" rx="110" ry="92" fill="url(#seqWhite)" stroke="#E0E6ED" strokeWidth="2" />

                  {/* Eyes */}
                  <ellipse cx="220" cy="150" rx="20" ry="28" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
                  <ellipse cx="227" cy="154" rx="9" ry="14" fill="#0F172A" />
                  <circle cx="229" cy="148" r="3.5" fill="#FFFFFF" />

                  <ellipse cx="280" cy="150" rx="20" ry="28" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
                  <ellipse cx="273" cy="154" rx="9" ry="14" fill="#0F172A" />
                  <circle cx="271" cy="148" r="3.5" fill="#FFFFFF" />

                  {/* Nose */}
                  <line x1="250" y1="192" x2="250" y2="242" stroke="#1E293B" strokeWidth="3" />
                  <circle cx="250" cy="182" r="15" fill="url(#seqRed)" stroke="#B71C1C" strokeWidth="2" />
                  <circle cx="245" cy="176" r="4.5" fill="#FFFFFF" opacity="0.9" />

                  {/* Whiskers */}
                  <line x1="210" y1="200" x2="145" y2="190" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="210" y1="215" x2="140" y2="215" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="210" y1="230" x2="145" y2="240" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

                  <line x1="290" y1="200" x2="355" y2="190" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="290" y1="215" x2="360" y2="215" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="290" y1="230" x2="355" y2="240" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

                  {/* Smile */}
                  <path d="M175 228 Q250 305 325 228" fill="url(#seqRed)" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M212 262 Q250 235 288 262 Q250 292 212 262 Z" fill="#FF7675" />

                  {/* Body */}
                  <path d="M175 325 C165 365 170 435 185 450 C210 455 290 455 315 450 C330 435 335 365 325 325 Z" fill="url(#seqBlue)" stroke="#00569E" strokeWidth="3.5" />

                  {/* Belly & Pocket */}
                  <ellipse cx="250" cy="385" rx="68" ry="56" fill="url(#seqWhite)" stroke="#E0E6ED" strokeWidth="2" />
                  <path d="M200 385 C200 425 300 425 300 385 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
                  <line x1="200" y1="385" x2="300" y2="385" stroke="#1E293B" strokeWidth="3" />

                  {/* Collar & Bell */}
                  <rect x="165" y="312" width="170" height="20" rx="10" fill="url(#seqRed)" stroke="#B71C1C" strokeWidth="2" />
                  <circle cx="250" cy="338" r="17" fill="url(#seqBell)" stroke="#B7950B" strokeWidth="2" />
                  <line x1="234" y1="334" x2="266" y2="334" stroke="#784212" strokeWidth="2" />
                  <circle cx="250" cy="343" r="3.5" fill="#784212" />

                  {/* Left Arm */}
                  <path d="M172 335 L125 370" stroke="url(#seqBlue)" strokeWidth="28" strokeLinecap="round" />
                  <circle cx="115" cy="378" r="21" fill="url(#seqWhite)" stroke="#1E293B" strokeWidth="2.5" />

                  {/* Right Arm (Hand Waving Animation) */}
                  <motion.g
                    animate={
                      introStage === "wave" ||
                      introStage === "text" ||
                      introStage === "pause"
                        ? { rotate: [0, 24, -14, 24, 0] }
                        : { rotate: 0 }
                    }
                    transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                    style={{ transformOrigin: "328px 335px" }}
                  >
                    <path d="M328 335 L375 300" stroke="url(#seqBlue)" strokeWidth="28" strokeLinecap="round" />
                    <circle cx="388" cy="290" r="21" fill="url(#seqWhite)" stroke="#1E293B" strokeWidth="2.5" />
                  </motion.g>

                  {/* Feet */}
                  <ellipse cx="208" cy="455" rx="40" ry="17" fill="url(#seqWhite)" stroke="#1E293B" strokeWidth="2.5" />
                  <ellipse cx="292" cy="455" rx="40" ry="17" fill="url(#seqWhite)" stroke="#1E293B" strokeWidth="2.5" />
                </svg>
              </motion.div>

              {/* Central Heading Text */}
              <div className="min-h-[72px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {(introStage === "text" || introStage === "pause") && (
                    <motion.h1
                      key="intro-heading"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent"
                    >
                      Welcome to Omkar World
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Container */}
      <motion.div
        initial={{ opacity: isIntroCompleted ? 1 : 0 }}
        animate={{ opacity: isIntroCompleted ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full min-h-screen flex flex-col"
      >
        {children}
      </motion.div>
    </IntroContext.Provider>
  );
}
