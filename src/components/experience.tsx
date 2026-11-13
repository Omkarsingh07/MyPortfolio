import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location?: string;
  techStack: string[];
  achievements: string[];
}

export const experiences: WorkExperience[] = [
  {
    company: "On The Rise Media Agency",
    role: "AI Video Creator",
    period: "Feb 2026 – Apr 2026",
    location: "Remote",
    techStack: [
      "Generative AI",
      "Kling AI",
      "Runway",
      "Flow AI",
      "ElevenLabs",
      "DaVinci Resolve",
      "Prompt Engineering",
    ],
    achievements: [
      "Pioneered end-to-end AI video production workflows for agency clients, generating commercial clips and brand promos.",
      "Engineered prompt sequences and multi-camera motion parameters across Kling AI and Runway to maintain strict visual consistency.",
      "Synthesized voice tracks via ElevenLabs with final color grading and timeline assembly in DaVinci Resolve.",
    ],
  },
  {
    company: "Weather Films",
    role: "Generative AI Creator",
    period: "Dec 2025 – Feb 2026",
    location: "Remote",
    techStack: [
      "Generative AI",
      "Midjourney",
      "Freepik AI",
      "Higgsfield",
      "DaVinci Resolve",
      "Storyboarding",
    ],
    achievements: [
      "Developed concept storyboards and visual asset libraries leveraging Midjourney v6 and Freepik AI for film pre-visualization.",
      "Transformed static concept art into cinematic video sequences using motion diffusion models and neural upscaling.",
      "Collaborated with creative directors to streamline rendering cycles, accelerating pre-production turnarounds by 50%.",
    ],
  },
  {
    company: "Tax-O-Smart & IDBI Bank Audit",
    role: "Data Analyst & Software Intern",
    period: "June 2025 – July 2025",
    location: "Mumbai, India",
    techStack: [
      "Python",
      "SQL",
      "MySQL",
      "Excel VBA",
      "Audit Automation",
      "ETL Pipelines",
    ],
    achievements: [
      "Engineered automated data extraction, cleaning, and financial structuring pipelines using Python, SQL, and Excel.",
      "Participated in IDBI Bank audit assignment, conducting ledger reconciliation and reducing verification cycles by 40%.",
      "Constructed reusable SQL scripts and Excel macros to streamline client tax data ingestion with 100% precision.",
    ],
  },
];

export function Experience() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30 border-y border-border/80" id="experience">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
        <ScrollReveal>
          <SectionHeader
            badge="Career History"
            title="Professional Experience"
            subtitle="My professional journey across Software Engineering and Generative AI."
          />
        </ScrollReveal>

        {/* Horizontal Experience Cards Grid */}
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.company + exp.role} delay={index * 0.1} className="w-[85vw] sm:w-[400px] md:w-auto shrink-0 snap-align-start flex">
              <Card className="border border-border/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-card rounded-2xl flex flex-col justify-between p-8 w-full">
                <CardContent className="p-0 space-y-5 flex flex-col h-full">
                  {/* Top: Role & Period Badge */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="font-mono text-xs px-3 py-1 font-semibold bg-background">
                        <Calendar className="w-3 h-3 mr-1.5 text-primary inline" />
                        {exp.period}
                      </Badge>
                      {exp.location && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-xl font-bold text-foreground pt-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-primary">
                      {exp.company}
                    </p>
                  </div>

                  <Separator className="my-1" />

                  {/* Achievements List */}
                  <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed flex-grow">
                    {exp.achievements.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Badges */}
                  <div className="pt-4 flex flex-wrap gap-1.5 mt-auto">
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* FUTURE EXPERIENCE CARDS (COMMENTED OUT FOR EASY FUTURE EXPANSION)    */}
      {/* ==================================================================== */}

      {/*
      {/* Experience Card 04 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="font-mono text-xs">2026</Badge>
            <span className="text-xs text-muted-foreground">Remote</span>
          </div>
          <h3 className="font-heading text-xl font-bold">Senior Software Engineer</h3>
          <p className="text-sm font-semibold text-primary">Future Tech Corp</p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Architected scalable microservices and real-time backend API engines.</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-[10px]">Python</Badge>
            <Badge variant="secondary" className="text-[10px]">Next.js</Badge>
          </div>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 05 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="font-mono text-xs">2026</Badge>
          </div>
          <h3 className="font-heading text-xl font-bold">AI Product Engineer</h3>
          <p className="text-sm font-semibold text-primary">Future AI Studio</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 06 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Lead Full-Stack Architect</h3>
          <p className="text-sm font-semibold text-primary">Enterprise SaaS Inc</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 07 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Machine Learning Specialist</h3>
          <p className="text-sm font-semibold text-primary">AI Research Lab</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 08 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Generative AI Consultant</h3>
          <p className="text-sm font-semibold text-primary">Media Tech Group</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 09 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Data Automation Lead</h3>
          <p className="text-sm font-semibold text-primary">Audit Intelligence Solutions</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 10 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Solutions Architect</h3>
          <p className="text-sm font-semibold text-primary">Global Cloud Systems</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 11 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Backend Engineer</h3>
          <p className="text-sm font-semibold text-primary">High-Throughput Labs</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 12 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Technical Lead</h3>
          <p className="text-sm font-semibold text-primary">Innovate Software Agency</p>
        </CardContent>
      </Card>
      */}

      {/* {/* Experience Card 13 */}
      {/*
      <Card className="border border-border/80 shadow-sm bg-card rounded-2xl p-8">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-heading text-xl font-bold">Software Architect</h3>
          <p className="text-sm font-semibold text-primary">NextGen Platform Studio</p>
        </CardContent>
      </Card>
      */}
    </section>
  );
}
