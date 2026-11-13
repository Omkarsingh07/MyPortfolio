import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { Code2, Terminal, Sparkles, Brain, BarChart3, Database } from "lucide-react";

export const skillGroups = [
  {
    icon: Code2,
    title: "Software Engineering",
    skills: ["System Architecture", "REST APIs", "OOP Design", "Clean Code", "ETL Pipelines"],
  },
  {
    icon: Terminal,
    title: "Programming Languages",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "HTML5 & CSS3"],
  },
  {
    icon: Sparkles,
    title: "Generative AI & Video",
    skills: [
      "Prompt Engineering",
      "Sora",
      "Kling AI",
      "Runway",
      "ElevenLabs",
      "DaVinci Resolve",
      "Flow AI",
      "Midjourney",
      "Freepik AI",
      "Higgsfield",
    ],
  },
  {
    icon: Brain,
    title: "Machine Learning",
    skills: ["PyTorch", "Scikit-Learn", "Pandas", "NumPy", "Feature Engineering", "SER Audio Processing"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics & BI",
    skills: ["Tableau Desktop", "Power BI", "Advanced Excel", "Plotly", "Financial Auditing"],
  },
  {
    icon: Database,
    title: "Databases & Tools",
    skills: ["MySQL", "PostgreSQL", "Git & GitHub", "Jupyter Notebook", "Docker", "Linux Shell"],
  },
];

export function Skills() {
  return (
    <section className="py-20 bg-muted/40 border-y border-border" id="skills">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            badge="Technical Competencies"
            title="Technical Skills Matrix"
            subtitle="Grouped skill set spanning full stack development, AI media workflows, machine learning, and data intelligence."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 0.1}>
              <Card className="h-full border-border/80 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
                    <group.icon className="h-5 w-5 text-primary" />
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="px-3 py-1.5 text-xs font-medium bg-background"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
