"use client";

import type { SVGProps } from "react";

export function HeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-square flex items-center justify-center p-2 sm:p-4">
      {/* Soft Ground Shadow */}
      <div className="absolute bottom-3 w-2/3 h-5 bg-black/10 dark:bg-black/30 rounded-full blur-md animate-pulse pointer-events-none" />

      {/* Doraemon Floating Container with Smooth Animations */}
      <div className="relative z-10 w-full h-full flex items-center justify-center animate-doraemon-float transition-transform duration-500 ease-out hover:scale-[1.03] group">
        <svg
          viewBox="0 0 500 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg select-none"
          {...props}
        >
          <defs>
            {/* 4K Vector Color Gradients */}
            <linearGradient id="doraemonBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A8FF" />
              <stop offset="100%" stopColor="#0072CE" />
            </linearGradient>

            <linearGradient id="doraemonWhite" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0F4F8" />
            </linearGradient>

            <linearGradient id="doraemonRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3838" />
              <stop offset="100%" stopColor="#C51162" />
            </linearGradient>

            <linearGradient id="bellGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFEAA7" />
              <stop offset="50%" stopColor="#FDCB6E" />
              <stop offset="100%" stopColor="#E1B12C" />
            </linearGradient>

            <linearGradient id="copterYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF200" />
              <stop offset="100%" stopColor="#F79F1F" />
            </linearGradient>
          </defs>

          {/* 1. BAMBOO COPTER (TAKE-COPTER) */}
          <g className="animate-copter-spin">
            {/* Rotor Blades */}
            <ellipse cx="250" cy="58" rx="85" ry="7" fill="url(#copterYellow)" opacity="0.9" />
            <ellipse cx="250" cy="58" rx="80" ry="4" fill="#FFFFFF" opacity="0.7" />
          </g>
          {/* Copter Stem */}
          <rect x="246" y="58" width="8" height="26" rx="4" fill="#F79F1F" />
          <path d="M236 84 C236 78, 264 78, 264 84 Z" fill="#D4AC0D" />

          {/* 2. DORAEMON HEAD */}
          <circle cx="250" cy="205" r="135" fill="url(#doraemonBlue)" stroke="#00569E" strokeWidth="3.5" />
          {/* Specular Highlight on Head */}
          <ellipse cx="205" cy="115" rx="35" ry="18" fill="#FFFFFF" opacity="0.25" transform="rotate(-20 205 115)" />

          {/* 3. WHITE FACE OVAL */}
          <ellipse cx="250" cy="220" rx="110" ry="92" fill="url(#doraemonWhite)" stroke="#E0E6ED" strokeWidth="2" />

          {/* 4. EYES */}
          {/* Left Eye */}
          <g>
            <ellipse cx="220" cy="150" rx="20" ry="28" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <ellipse cx="227" cy="154" rx="9" ry="14" fill="#0F172A" />
            <circle cx="229" cy="148" r="3.5" fill="#FFFFFF" />
          </g>
          {/* Right Eye */}
          <g>
            <ellipse cx="280" cy="150" rx="20" ry="28" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <ellipse cx="273" cy="154" rx="9" ry="14" fill="#0F172A" />
            <circle cx="271" cy="148" r="3.5" fill="#FFFFFF" />
          </g>

          {/* 5. NOSE & VERTICAL NOSE LINE */}
          <line x1="250" y1="192" x2="250" y2="242" stroke="#1E293B" strokeWidth="3" />
          <circle cx="250" cy="182" r="15" fill="url(#doraemonRed)" stroke="#B71C1C" strokeWidth="2" />
          <circle cx="245" cy="176" r="4.5" fill="#FFFFFF" opacity="0.9" />

          {/* 6. WHISKERS */}
          {/* Left Whiskers */}
          <line x1="210" y1="200" x2="145" y2="190" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="210" y1="215" x2="140" y2="215" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="210" y1="230" x2="145" y2="240" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

          {/* Right Whiskers */}
          <line x1="290" y1="200" x2="355" y2="190" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="290" y1="215" x2="360" y2="215" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="290" y1="230" x2="355" y2="240" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

          {/* 7. SMILE & MOUTH */}
          <path
            d="M175 228 Q250 305 325 228"
            fill="url(#doraemonRed)"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Tongue */}
          <path
            d="M212 262 Q250 235 288 262 Q250 292 212 262 Z"
            fill="#FF7675"
          />

          {/* 8. BODY (TORSO) */}
          <path
            d="M175 325 C165 365 170 435 185 450 C210 455 290 455 315 450 C330 435 335 365 325 325 Z"
            fill="url(#doraemonBlue)"
            stroke="#00569E"
            strokeWidth="3.5"
          />

          {/* 9. WHITE BELLY & 4D POCKET */}
          <ellipse cx="250" cy="385" rx="68" ry="56" fill="url(#doraemonWhite)" stroke="#E0E6ED" strokeWidth="2" />
          {/* 4D Pocket (Half Moon) */}
          <path
            d="M200 385 C200 425 300 425 300 385 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="3"
          />
          <line x1="200" y1="385" x2="300" y2="385" stroke="#1E293B" strokeWidth="3" />

          {/* 10. RED COLLAR & GOLD BELL */}
          <rect x="165" y="312" width="170" height="20" rx="10" fill="url(#doraemonRed)" stroke="#B71C1C" strokeWidth="2" />
          <circle cx="250" cy="338" r="17" fill="url(#bellGold)" stroke="#B7950B" strokeWidth="2" />
          <line x1="234" y1="334" x2="266" y2="334" stroke="#784212" strokeWidth="2" />
          <circle cx="250" cy="343" r="3.5" fill="#784212" />
          <line x1="250" y1="346" x2="250" y2="355" stroke="#784212" strokeWidth="2" />

          {/* 11. ARMS & HANDS */}
          {/* Left Arm & Paw */}
          <path d="M172 335 L125 370" stroke="url(#doraemonBlue)" strokeWidth="28" strokeLinecap="round" />
          <circle cx="115" cy="378" r="21" fill="url(#doraemonWhite)" stroke="#1E293B" strokeWidth="2.5" />

          {/* Right Arm & Paw (Waving High) */}
          <path d="M328 335 L375 300" stroke="url(#doraemonBlue)" strokeWidth="28" strokeLinecap="round" />
          <circle cx="388" cy="290" r="21" fill="url(#doraemonWhite)" stroke="#1E293B" strokeWidth="2.5" />

          {/* 12. FEET */}
          <ellipse cx="208" cy="455" rx="40" ry="17" fill="url(#doraemonWhite)" stroke="#1E293B" strokeWidth="2.5" />
          <ellipse cx="292" cy="455" rx="40" ry="17" fill="url(#doraemonWhite)" stroke="#1E293B" strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
}
