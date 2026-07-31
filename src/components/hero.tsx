"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HeroIllustration } from "@/components/hero-illustration";
import { Sparkles, ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="py-20 md:py-32 min-h-[82vh] flex items-center justify-center relative overflow-hidden" id="home">
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(11,15,23,0))] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
        {/* Left Column: One Message, One Focus (60% Width Occupancy) */}
        <ScrollReveal className="lg:col-span-7 space-y-6">
          <Badge
            variant="outline"
            className="gap-2 px-4 py-1.5 text-xs font-semibold rounded-full border-border/80 bg-background/80 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Software Engineer & Generative AI Engineer
          </Badge>

          {/* Apple SF 2-Line Headline */}
          <h1 className="font-heading text-[3.25rem] sm:text-[4.5rem] lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]">
            Building Intelligent{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent font-extrabold">
              Software Products.
            </span>
          </h1>

          {/* 2-Sentence Subtitle */}
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl font-normal pt-1">
            Software Engineer focused on building scalable web applications and Generative AI solutions that solve real-world business problems.
          </p>

          {/* Exactly Two Action Controls */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#software"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full text-base font-semibold px-8 py-3.5 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 gap-2.5"
              )}
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full text-base font-semibold px-8 py-3.5 hover:bg-muted hover:-translate-y-0.5 transition-all duration-300 gap-2"
              )}
            >
              <Mail className="h-4 w-4 text-primary" />
              <span>Get In Touch</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Right Column: Premium High-Res Vector Doraemon Illustration (35-40% Width Occupancy) */}
        <ScrollReveal className="lg:col-span-5 flex items-center justify-center" delay={0.15}>
          <HeroIllustration />
        </ScrollReveal>
      </div>
    </section>
  );
}
