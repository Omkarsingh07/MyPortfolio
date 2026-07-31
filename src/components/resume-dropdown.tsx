"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Code2, Brain, Sparkles, BarChart3, Download, ChevronDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const resumeOptions = [
  {
    id: "se",
    title: "Software Engineer Resume",
    description: "Modern web applications, backend systems, APIs and scalable software.",
    meta: "PDF · 420 KB",
    badge: "Latest",
    filePath: "/resumes/software-engineer.pdf",
    icon: Code2,
  },
  {
    id: "aiml",
    title: "AI / ML Engineer Resume",
    description: "Machine Learning, Deep Learning, PyTorch, and AI model pipelines.",
    meta: "PDF · 380 KB",
    badge: "Latest",
    filePath: "/resumes/ai-ml-engineer.pdf",
    icon: Brain,
  },
  {
    id: "genai",
    title: "Generative AI Engineer Resume",
    description: "LLMs, Prompt Engineering, AI Video Creation and Generative AI workflows.",
    meta: "PDF · 450 KB",
    badge: "Latest",
    filePath: "/resumes/genai-engineer.pdf",
    icon: Sparkles,
  },
  {
    id: "da",
    title: "Data Analyst Resume",
    description: "SQL, Python, Power BI, Tableau and Analytics projects.",
    meta: "PDF · 390 KB",
    badge: "Latest",
    filePath: "/resumes/data-analyst.pdf",
    icon: BarChart3,
  },
];

interface ResumeDropdownProps {
  className?: string;
  buttonVariant?: "default" | "outline" | "gradient";
}

export function ResumeDropdown({ className, buttonVariant = "gradient" }: ResumeDropdownProps) {
  const triggerStyles =
    buttonVariant === "gradient"
      ? "group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_auto] hover:bg-right shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
      : "group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border/80 bg-background hover:bg-muted transition-all duration-200 cursor-pointer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(triggerStyles, className)}>
        <FileText className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
        <span>Resume</span>
        <ChevronDown className="w-3.5 h-3.5 text-white/80 group-data-[state=open]:rotate-180 transition-transform duration-200" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[360px] sm:w-[400px] p-2.5 border border-border/80 bg-background/95 backdrop-blur-2xl shadow-xl rounded-2xl space-y-1 z-50"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span>Document Center</span>
            <Badge variant="outline" className="text-[10px] font-mono px-2 py-0.5">
              4 Resumes Available
            </Badge>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-border/60" />

          {resumeOptions.map((res) => (
            <DropdownMenuItem
              key={res.id}
              className="p-0 focus:bg-transparent cursor-pointer outline-none"
            >
              <a
                href={res.filePath}
                download
                className="flex items-start gap-3.5 p-3 w-full rounded-xl hover:bg-muted/80 transition-colors duration-200 group/item border border-transparent hover:border-border/60"
              >
                {/* Option Icon */}
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-200">
                  <res.icon className="w-4.5 h-4.5" />
                </div>

                {/* Text & Description */}
                <div className="flex-grow min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors duration-200 truncate">
                      {res.title}
                    </h4>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-medium px-2 py-0.5 shrink-0 bg-primary/10 text-primary border-none"
                    >
                      {res.badge}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                    {res.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-muted-foreground/80">
                      {res.meta}
                    </span>
                    <span className="text-xs font-semibold text-primary flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                      Download <Download className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
