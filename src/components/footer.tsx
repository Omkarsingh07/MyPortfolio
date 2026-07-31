"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Mail, ArrowUp, RotateCcw } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useIntro } from "@/components/intro-experience";
import { cn } from "@/lib/utils";

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { replayIntro } = useIntro();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border/80 py-10">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Brand Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <Link
            href="#home"
            className="inline-flex items-center gap-0 font-heading font-black text-xl tracking-[-0.04em] text-[#0A0A0A] dark:text-white antialiased transition-opacity duration-200 hover:opacity-80 select-none"
          >
            <span>OMKAR</span>
            <span>.</span>
            <span>SINGH</span>
          </Link>
          <span className="hidden sm:inline text-border">|</span>
          <p className="text-xs text-muted-foreground font-medium">
            &copy; 2026 Omkar Singh. All rights reserved.
          </p>
        </div>

        {/* Controls: Replay Intro + Social Icons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={replayIntro}
            className="rounded-full text-xs font-semibold px-3.5 py-1.5 h-9 gap-1.5 border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <RotateCcw className="w-3.5 h-3.5 text-primary" />
            <span>Replay Intro</span>
          </Button>
          <a
            href="https://linkedin.com/in/omkar-singh9192"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "rounded-full h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <a
            href="https://github.com/Omkarsingh07?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "rounded-full h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href="mailto:omkarssingh26@gmail.com"
            aria-label="Send Email"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "rounded-full h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full shadow-md z-40 bg-background/90 backdrop-blur-md hover:bg-muted border-border/80"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4 text-foreground" />
        </Button>
      )}
    </footer>
  );
}
