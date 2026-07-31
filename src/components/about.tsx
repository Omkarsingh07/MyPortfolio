import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { User, GraduationCap, BookOpen, CheckCircle2 } from "lucide-react";

const coursework = [
  "Software Engineering",
  "Data Structures & Algorithms",
  "DBMS (SQL & Database Design)",
  "Operating Systems",
  "Computer Networks",
  "Machine Learning",
];

export function About() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30 border-y border-border/80" id="about">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Who I Am & What I Do */}
            <div className="lg:col-span-7 space-y-8">
              <Badge variant="outline" className="gap-2 px-3.5 py-1.5 text-xs font-semibold">
                <User className="w-3.5 h-3.5 text-primary" /> About Me
              </Badge>

              {/* Apple SF Headline */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.12]">
                Engineering Modern Software &{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Intelligent Solutions.
                </span>
              </h2>

              {/* 1. Who I Am */}
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Who I Am
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I am <strong className="text-foreground font-semibold">Omkar Singh</strong>, a Software Engineer and Generative AI Engineer focused on building scalable applications, AI-powered solutions, and modern digital products that solve real-world business problems.
                </p>
              </div>

              {/* 2. What I Do */}
              <div className="space-y-3 pt-2">
                <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  What I Do
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  My work spans full-stack software development, generative AI applications, machine learning systems, automated data processing engines, and modern web platforms. I design resilient codebases and automated pipelines that translate complex technical requirements into high-performing engineering products.
                </p>
              </div>
            </div>

            {/* Right Column: 3. Qualifications Card */}
            <div className="lg:col-span-5">
              <Card className="border border-border/80 shadow-md bg-card rounded-3xl p-8 sm:p-10 space-y-6">
                <CardContent className="p-0 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-border/60 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          Qualifications
                        </h3>
                        <p className="text-xs text-muted-foreground">Education & Academic Foundation</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs px-3 py-1 font-semibold">
                      2022 – 2026
                    </Badge>
                  </div>

                  {/* Degree Info */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Degree Program
                    </span>
                    <h4 className="font-heading text-lg font-bold text-foreground leading-snug">
                      Bachelor of Technology (B.Tech)
                    </h4>
                    <p className="text-sm font-semibold text-muted-foreground">
                      Information Technology
                    </p>
                    <p className="text-xs text-muted-foreground pt-1">
                      Rajasthan Technical University
                    </p>
                  </div>

                  {/* Coursework */}
                  <div className="space-y-3 pt-4 border-t border-border/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-primary" /> Key Relevant Coursework
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {coursework.map((course) => (
                        <div
                          key={course}
                          className="flex items-center gap-2 text-xs text-foreground font-medium bg-muted/50 rounded-lg px-3 py-2 border border-border/50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
