"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-muted/60 border border-border flex items-center p-1 cursor-pointer">
        <div className="w-6 h-6 rounded-full bg-background shadow-xs flex items-center justify-center">
          <Sun className="w-3.5 h-3.5 text-muted-foreground opacity-50" />
        </div>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative w-14 h-8 rounded-full bg-muted border border-border/80 hover:border-primary/50 transition-all duration-300 p-1 flex items-center justify-between cursor-pointer shadow-inner focus:outline-none"
      aria-label="Toggle theme"
    >
      {/* Sun Icon Left */}
      <Sun
        className={`w-3.5 h-3.5 transition-all duration-300 ${
          isDark ? "text-muted-foreground/40" : "text-amber-500 font-bold scale-110"
        }`}
      />

      {/* Moon Icon Right */}
      <Moon
        className={`w-3.5 h-3.5 transition-all duration-300 ${
          isDark ? "text-blue-400 font-bold scale-110" : "text-muted-foreground/40"
        }`}
      />

      {/* Animated Sliding Thumb */}
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-background shadow-md border border-border flex items-center justify-center transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
        )}
      </span>
    </button>
  );
}
