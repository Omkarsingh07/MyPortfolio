"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { ResumeDropdown, resumeOptions } from "@/components/resume-dropdown";
import { Download, Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Software", href: "#software" },
  { label: "GenAI", href: "#genai" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-5 z-50 px-4 sm:px-8 lg:px-12 max-w-[1500px] mx-auto w-full">
      <nav
        className={cn(
          "flex items-center justify-between border rounded-2xl lg:rounded-full transition-all duration-300 px-6 sm:px-10 lg:px-14",
          scrolled
            ? "h-20 bg-background/85 backdrop-blur-xl border-border/80 shadow-lg shadow-black/[0.04]"
            : "h-22 sm:h-24 bg-background/70 backdrop-blur-lg border-border/50 shadow-sm shadow-black/[0.02]"
        )}
      >
        {/* Logo (25% Width Occupancy) */}
        <div className="w-auto lg:w-1/4 flex items-center shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-0 font-heading font-black text-2xl sm:text-3xl tracking-[-0.04em] text-[#0A0A0A] dark:text-white antialiased transition-opacity duration-200 hover:opacity-80 select-none"
          >
            <span>OMKAR</span>
            <span>.</span>
            <span>SINGH</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <ul className="flex items-center gap-8 lg:gap-10 xl:gap-11">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative py-2.5 text-15px xl:text-base font-medium transition-colors duration-200 flex items-center",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}

                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-[2.5px] rounded-full bg-gradient-to-r from-primary via-blue-500 to-cyan-400 transition-transform duration-300 origin-left",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Actions: Theme Toggle + Resume Dropdown */}
        <div className="w-auto lg:w-1/4 flex items-center justify-end gap-3 sm:gap-4 shrink-0">
          {/* Animated Theme Toggle Switch */}
          <ThemeToggle />

          {/* Desktop Resume Dropdown Menu */}
          <div className="hidden sm:block">
            <ResumeDropdown />
          </div>

          {/* Mobile Sheet Trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full h-11 w-11 hover:bg-muted"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              }
            />
            <SheetContent
              side="right"
              className="w-full sm:w-96 border-l border-border/80 bg-background/95 backdrop-blur-xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <SheetTitle className="font-heading font-black text-xl mb-6 inline-flex items-center gap-0 tracking-[-0.04em] text-[#0A0A0A] dark:text-white antialiased select-none">
                  <span>OMKAR</span>
                  <span>.</span>
                  <span>SINGH</span>
                </SheetTitle>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile Drawer Resume Document Center */}
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium text-muted-foreground">Theme Mode</span>
                  <ThemeToggle />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
                    Download Specialized Resume
                  </span>
                  <div className="space-y-2">
                    {resumeOptions.map((res) => (
                      <a
                        key={res.id}
                        href={res.filePath}
                        download
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/60 hover:bg-muted transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <res.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-foreground truncate">{res.title}</p>
                            <p className="text-[10px] font-mono text-muted-foreground">{res.meta}</p>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-primary shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
