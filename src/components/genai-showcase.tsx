"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
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
  videoUrl?: string;
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
    videoUrl: "https://res.cloudinary.com/ldqr0eny/video/upload/v1785592124/video_1_dwgdew.mp4",
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
    videoUrl: "https://res.cloudinary.com/ldqr0eny/video/upload/v1785592156/story_zimqw2.mp4",
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
    videoUrl: "https://res.cloudinary.com/ldqr0eny/video/upload/v1785592136/video_3_ap23ll.mp4",
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
    videoUrl: "https://res.cloudinary.com/ldqr0eny/video/upload/v1785592127/Video_2_rexyrs.mp4",
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
    videoUrl: "https://res.cloudinary.com/ldqr0eny/video/upload/v1785592142/video_5_lc8ppi.mp4",
  },
];

interface AiVideoCardProps {
  project: AiVideoProject;
  activePlayingId: string | null;
  onStartPlaying: (id: string) => void;
  onStopPlaying: (id: string) => void;
  onSelect: (project: AiVideoProject) => void;
}

function AiVideoCard({
  project,
  activePlayingId,
  onStartPlaying,
  onStopPlaying,
  onSelect,
}: AiVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const savedTimeRef = useRef<number>(0);

  const isCurrentActive = activePlayingId === project.id;

  // 1. Detect Desktop + hover capability + reduced motion preference
  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setCanHoverPreview(!isTouchDevice && !isReducedMotion);
  }, []);

  // Helper function to immediately pause video and store current timestamp
  const pauseVideo = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (videoRef.current) {
      try {
        if (!videoRef.current.paused) {
          savedTimeRef.current = videoRef.current.currentTime;
          videoRef.current.pause();
        }
      } catch {
        // ignore play/pause abort errors
      }
    }
    setIsPlaying(false);
    onStopPlaying(project.id);
  }, [onStopPlaying, project.id]);

  // 2. Pause video if another card starts playing
  useEffect(() => {
    if (!isCurrentActive && isPlaying) {
      pauseVideo();
    }
  }, [isCurrentActive, isPlaying, pauseVideo]);

  // 3. Mouse Enter: Wait 1000ms before starting video playback
  const handleMouseEnter = () => {
    if (!canHoverPreview || !project.videoUrl) return;

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    hoverTimerRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = savedTimeRef.current || 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              onStartPlaying(project.id);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      }
    }, 1000);
  };

  // 4. Mouse Leave: Pause immediately & preserve timestamp
  const handleMouseLeave = () => {
    if (!canHoverPreview) return;
    pauseVideo();
  };

  // 5. Intersection Observer & Window / Tab Blur Listeners
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            pauseVideo();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(cardEl);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseVideo();
      }
    };

    const handleWindowBlur = () => {
      pauseVideo();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [pauseVideo]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="group relative aspect-[9/16] rounded-2xl border border-white/10 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-end p-4 sm:p-5 cursor-pointer bg-neutral-950"
    >
      {/* Fallback Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${project.gradient} transition-opacity duration-[250ms] ${
          isPlaying ? "opacity-0" : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
        }`}
      />

      {/* Hero Video Element (Muted hover preview, lazy metadata, 250ms fade transition) */}
      {project.videoUrl && (
        <video
          ref={videoRef}
          src={project.videoUrl}
          preload="metadata"
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[250ms] pointer-events-none ${
            isPlaying
              ? "opacity-100 scale-105"
              : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
          }`}
        />
      )}

      {/* Subtle dark gradient overlay near bottom for button contrast */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-[250ms] pointer-events-none ${
          isPlaying ? "opacity-30" : "opacity-80 group-hover:opacity-90"
        }`}
      />

      {/* Premium Glass Pill "Play Video" Button (Fades out when video plays, fades back in when paused) */}
      <div
        className={`relative z-10 w-full transition-all duration-[250ms] ${
          isPlaying
            ? "opacity-0 translate-y-3 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <button
          type="button"
          className="w-full rounded-full font-semibold text-xs sm:text-sm py-2.5 px-4 bg-white/90 backdrop-blur-md text-neutral-950 hover:bg-white shadow-lg flex items-center justify-center gap-2 group-hover:scale-105 transition-all duration-300"
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-neutral-950 text-neutral-950" />
          <span>Play Video</span>
        </button>
      </div>
    </div>
  );
}

export function GenAiShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<AiVideoProject | null>(null);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const handleStartPlaying = useCallback((id: string) => {
    setActivePlayingId(id);
  }, []);

  const handleStopPlaying = useCallback((id: string) => {
    setActivePlayingId((prev) => (prev === id ? null : prev));
  }, []);

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
              <AiVideoCard
                project={project}
                activePlayingId={activePlayingId}
                onStartPlaying={handleStartPlaying}
                onStopPlaying={handleStopPlaying}
                onSelect={setSelectedVideo}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Video Lightbox Modal Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-3xl bg-neutral-950 text-white border border-neutral-800 p-6 rounded-2xl">
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

                {/* Video Player Frame */}
                <div className="relative w-full max-h-[65vh] aspect-video flex items-center justify-center bg-black rounded-xl overflow-hidden border border-neutral-800 shadow-2xl">
                  {selectedVideo.videoUrl ? (
                    <video
                      src={selectedVideo.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center group">
                      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg mb-3">
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                      <span className="text-sm font-semibold text-white">AI Video Showcase Reel Preview</span>
                      <span className="text-xs text-slate-400 mt-1">
                        Rendered with {selectedVideo.tools.join(" · ")}
                      </span>
                    </div>
                  )}
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
