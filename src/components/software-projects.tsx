"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import {
  Globe,
  Server,
  // FileCheck,
  Activity,
  Train,
  Utensils,
  // PieChart,
  ExternalLink,
  Code2,
  Filter,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const filterCategories = [
  "All",
  "Web Applications",
  "AI & Machine Learning",
  "Data Engineering",
  "Analytics & Dashboards",
  "Automation",
];

const allProjects = [
  {
    title: "Ashapura Metal Art E-Commerce & Catalog Platform",
    filterCategory: "Web Applications",
    badge: "Web Application",
    icon: Globe,
    problem:
      "Craft manufacturing business required digital presence, product catalog management, and automated client inquiry processing for international buyers.",
    solution:
      "Engineered a full-stack Next.js web application featuring dynamic catalog rendering, responsive UI components, and API route query processing.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "REST API", "Node.js"],
    impact: "Expanded global buyer reach and streamlined product inquiry workflows with 100% digital uptime.",
    githubUrl: "https://github.com/Omkarsingh07",
    demoUrl: "https://ashapura-metal-art.vercel.app/",
  },
  {
    title: "E-Commerce ETL & Revenue Analytics Pipeline",
    filterCategory: "Data Engineering",
    badge: "Data Engineering",
    icon: Server,
    problem:
      "E-commerce transactions generated unstructured raw log files requiring automated ingestion, data validation, and real-time sales performance tracking.",
    solution:
      "Engineered a Python/Pandas automated ETL pipeline that ingests, cleans, and transforms raw transaction logs, emitting analytical Plotly reports and JSON API feeds.",
    techStack: ["Python", "Pandas", "Plotly", "REST API", "ETL Architecture"],
    impact: "Streamlined sales performance tracking and reduced manual data preparation overhead by 60%.",
    githubUrl: "https://github.com/Omkarsingh07/e-commerce-sales-analysis",
    demoUrl: null,
  },
  /*
  {
    // Financial Ledger Reconciliation & Audit Engine
    title: "Financial Ledger Reconciliation & Audit Engine",
    filterCategory: "Automation",
    badge: "Automation Engine",
    icon: FileCheck,
    problem:
      "Banking audit assignments (IDBI Bank) required manual line-item verification across thousands of client transaction records to identify ledger discrepancies.",
    solution:
      "Architected automated Python scripts and complex SQL queries to cross-verify ledgers, flag anomalies, verify tax liabilities, and generate audit summary reports.",
    techStack: ["Python", "SQL", "MySQL", "Audit Automation", "Excel VBA"],
    impact: "Reduced manual audit verification time by 40% with zero calculation error.",
    githubUrl: "https://github.com/Omkarsingh07",
    demoUrl: null,
  },
  */
  {
    title: "Speech Emotion Recognizer (SER) PyTorch Pipeline",
    filterCategory: "AI & Machine Learning",
    badge: "AI & Machine Learning",
    icon: Activity,
    problem:
      "Automated vocal emotion detection from speech audio signals for call center quality assurance and customer sentiment analysis.",
    solution:
      "Developed deep neural network classification models in PyTorch trained on Librosa audio spectrogram features with real-time inference capability.",
    techStack: ["Python", "PyTorch", "Librosa", "Scikit-Learn", "Audio ML"],
    impact: "Achieved high classification precision across 7 vocal emotional states for automated audio QA.",
    githubUrl: "https://github.com/Omkarsingh07",
    demoUrl: "https://omkarsingh07-speech-recognizer-app-x0kqba.streamlit.app/",
  },
  {
    title: "IRCTC Travel Analytics Dashboard",
    filterCategory: "Analytics & Dashboards",
    badge: "Full-Stack Analytics",
    icon: Train,
    problem:
      "Tracking IRCTC booking, cancellation, and refund data across fragmented confirmation emails required manual record keeping and lacked consolidated analytics.",
    solution:
      "Engineered a full-stack travel analytics platform using React, FastAPI, and SQLite that automatically synchronizes IRCTC confirmation emails via Gmail API (OAuth 2.0) and parses journey, fare, and refund details using BeautifulSoup & Regex.",
    techStack: [
      "React",
      "FastAPI",
      "Python",
      "SQLite",
      "Gmail API",
      "OAuth 2.0",
      "BeautifulSoup",
      "Regex",
    ],
    impact:
      "Eliminated manual tracking of IRCTC bookings, automated email ingestion & duplicate detection, reduced redundant API requests via incremental sync, and delivered comprehensive travel analytics.",
    githubUrl: "https://github.com/Omkarsingh07",
    demoUrl: null,
  },
  {
    title: "Zomato Restaurant Analytics & Market Intelligence",
    filterCategory: "Analytics & Dashboards",
    badge: "Analytics & Intelligence",
    icon: Utensils,
    problem:
      "Uncovering pricing distribution, customer sentiment ratings, and delivery density across restaurant networks to guide expansion.",
    solution:
      "Extracted API location data, executed statistical EDA with Seaborn/Pandas, and authored interactive BI analytics reports.",
    techStack: ["Python", "Pandas", "Tableau", "SQL", "Seaborn"],
    impact: "Isolated high-margin cuisine categories and optimized location recommendations for cloud kitchens.",
    githubUrl: "https://github.com/Omkarsingh07",
    demoUrl: null,
  },
  /*
  {
    // Global Superstore Profitability & Logistics Engine
    title: "Global Superstore Profitability & Logistics Engine",
    filterCategory: "Analytics & Dashboards",
    badge: "Analytics & Dashboard",
    icon: PieChart,
    problem:
      "Multi-region retail sales tracking, profit margin analysis, and shipping delay identification across global operations.",
    solution:
      "Constructed enterprise Power BI reporting dashboards powered by DAX measures and automated data transformations.",
    techStack: ["Power BI", "DAX", "Advanced Excel", "SQL"],
    impact: "Identified top 10 unprofitable product categories and reduced regional logistics bottlenecks via custom DAX measures.",
    githubUrl: "https://github.com/Omkarsingh07",
    demoUrl: null,
  },
  */
];

export function SoftwareProjects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.filterCategory === activeFilter);

  return (
    <section className="py-24 sm:py-32" id="software">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
        <ScrollReveal>
          <SectionHeader
            badge="Engineering Portfolio"
            title="Software Engineering Projects"
            subtitle="Full-stack web applications, AI/ML classifiers, data pipelines, automation tools, and analytics platforms."
          />
        </ScrollReveal>

        {/* Filter Tabs Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pb-4">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-muted-foreground border-border/80 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.08}>
              <Card className="h-full border border-border/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card rounded-2xl flex flex-col overflow-hidden">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <project.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs font-semibold">
                      {project.badge}
                    </Badge>
                  </div>

                  <h3 className="font-heading text-xl font-bold mb-3 leading-snug">
                    {project.title}
                  </h3>

                  <div className="space-y-3 text-sm text-muted-foreground flex-grow">
                    <p>
                      <strong className="text-foreground font-semibold">Problem:</strong>{" "}
                      {project.problem}
                    </p>
                    <p>
                      <strong className="text-foreground font-semibold">Solution:</strong>{" "}
                      {project.solution}
                    </p>
                    <p className="text-primary font-medium">
                      <strong className="text-foreground font-semibold">Business Impact:</strong>{" "}
                      {project.impact}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-6">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[11px] font-medium px-2.5 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {(project.githubUrl || project.demoUrl) && (
                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto pt-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "w-full flex-1 rounded-full font-semibold text-xs transition-all duration-300 hover:-translate-y-0.5"
                          )}
                        >
                          <GithubIcon className="h-4 w-4" />
                          GitHub Code
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ size: "sm" }),
                            "w-full flex-1 rounded-full font-semibold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-0 shadow-sm hover:shadow transition-all duration-300 hover:-translate-y-0.5"
                          )}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
