"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { Play, Clock, Sparkles, Film, Mic, Image as ImageIcon, Layers, Video } from "lucide-react";

interface AiVideoProject {
  id: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  tools: string[];
  gradient: string;
  icon: typeof Play;
}

const aiVideoProjects: AiVideoProject[] = [
  {
    id: "project-1",
    category: "Cinematic",
    duration: "0:45",
    title: "Synthetic Motion & Cinematic Production",
    description:
      "High-fidelity generative AI video synthesis combining cinematic prompt engineering, multi-camera motion control, and temporal character consistency.",
    tools: ["Sora", "Kling AI", "Runway Gen-2", "DaVinci Resolve"],
    gradient: "from-slate-950 via-slate-900 to-blue-950",
    icon: Film,
  },
  {
    id: "project-2",
    category: "Storytelling",
    duration: "0:30",
    title: "Neural Audio & Voice Cloning Pipeline",
    description:
      "End-to-end voice synthesis and audio mastering workflow for automated AI media channels, multi-lingual dubbing, and voiceover synchronization.",
    tools: ["ElevenLabs", "Flow AI", "DaVinci Resolve"],
    gradient: "from-slate-950 via-slate-900 to-cyan-950",
    icon: Mic,
  },
  {
    id: "project-3",
    category: "Product Commercial",
    duration: "1:00",
    title: "Commercial Product Animation & Diffusion",
    description:
      "Automated visual concept art and 3D product render animation leveraging image-to-video diffusion models and neural upscaling.",
    tools: ["Midjourney v6", "Freepik AI", "Higgsfield"],
    gradient: "from-slate-950 via-slate-900 to-indigo-950",
    icon: ImageIcon,
  },
  {
    id: "project-4",
    category: "Marketing",
    duration: "0:50",
    title: "Automated AI Media Generation Engine",
    description:
      "Script-to-video automation pipeline utilizing LLM scripting, synthetic voiceovers, AI video rendering, and timeline assembly.",
    tools: ["Kling AI", "Runway", "ElevenLabs", "DaVinci"],
    gradient: "from-slate-950 via-slate-900 to-emerald-950",
    icon: Video,
  },
  {
    id: "project-5",
    category: "Animation",
    duration: "1:15",
    title: "Multimodal Diffusion Concept Design System",
    description:
      "Generative visual design system producing consistent digital branding assets, promotional video clips, and neural graphic banners.",
    tools: ["Midjourney", "Freepik AI", "Sora", "Flow AI"],
    gradient: "from-slate-950 via-slate-900 to-sky-950",
    icon: Layers,
  },
];

export function GenAiShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<AiVideoProject | null>(null);

  return (
    <section className="py-20 bg-muted/40 border-y border-border" id="genai">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14">
        <ScrollReveal>
          <SectionHeader
            badge="AI Video Showcase"
            title="Generative AI & Media Production"
            subtitle="Vertical video showcase of AI-generated cinematic motion, synthetic voice production, and multimodal visual storytellings."
          />
        </ScrollReveal>

        {/* 9:16 Vertical Video Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {aiVideoProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <div
                onClick={() => setSelectedVideo(project)}
                className="group relative aspect-[9/16] rounded-2xl border border-border/80 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between p-5 cursor-pointer hover:scale-[1.02] bg-neutral-950"
              >
                {/* Background Gradient & Animated Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Subtle Geometric Tech Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Card Top: Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-black/50 backdrop-blur-md text-white border-white/10 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1"
                  >
                    {project.category}
                  </Badge>

                  <div className="flex items-center gap-1 font-mono text-[10px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                    <Clock className="w-3 h-3 text-primary" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Card Center: Animated Play Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-xl">
                    <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                  </div>
                </div>

                {/* Card Bottom: Metadata & Action */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <h3 className="font-heading text-base font-bold text-white leading-tight mb-1 group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* AI Tools Badges */}
                  <div className="flex flex-wrap gap-1">
                    {project.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/15"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-white/10 text-white/70">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Play Video Button */}
                  <Button
                    size="sm"
                    className="w-full rounded-full font-semibold text-xs bg-white text-neutral-950 hover:bg-primary hover:text-white transition-colors duration-200 gap-2 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Video</span>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video Lightbox Modal Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-2xl bg-neutral-950 text-white border border-neutral-800 p-6 rounded-2xl">
            {selectedVideo && (
              <div className="space-y-5">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs">
                      {selectedVideo.category}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {selectedVideo.duration}
                    </span>
                  </div>
                  <DialogTitle className="font-heading text-xl sm:text-2xl font-bold text-white">
                    {selectedVideo.title}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400 text-sm mt-1">
                    {selectedVideo.description}
                  </DialogDescription>
                </DialogHeader>

                {/* 9:16 / 16:9 Video Player Frame Placeholder */}
                <div className="relative aspect-video rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center p-6 text-center group">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg mb-3">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <span className="text-sm font-semibold text-white">AI Video Showcase Reel Preview</span>
                  <span className="text-xs text-slate-400 mt-1">
                    Rendered with {selectedVideo.tools.join(" · ")}
                  </span>
                </div>

                {/* AI Tools Used */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Production Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="outline"
                        className="bg-neutral-900 border-neutral-700 text-slate-200 text-xs py-1 px-3"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
