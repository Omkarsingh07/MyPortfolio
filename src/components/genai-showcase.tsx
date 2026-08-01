"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { Play, Film, Mic, Image as ImageIcon, Layers, Video, X } from "lucide-react";

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

/**
 * Cloudinary performance helpers
 * Generates lightweight image thumbnails & streaming-optimized video URLs.
 */
function getCloudinaryThumbnailUrl(videoUrl?: string): string | undefined {
  if (!videoUrl) return undefined;
  return videoUrl
    .replace("/upload/", "/upload/c_scale,w_500,q_auto,f_auto,so_0/")
    .replace(/\.[^/.]+$/, ".jpg");
}

function getCloudinaryOptimizedVideoUrl(videoUrl?: string): string | undefined {
  if (!videoUrl) return undefined;
  return videoUrl.replace("/upload/", "/upload/q_auto,f_auto/");
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
  activeHoverId: string | null;
  setActiveHoverId: (id: string | null) => void;
  isModalOpen: boolean;
  onSelect: (project: AiVideoProject) => void;
  getTimestamp: (id: string) => number;
  setTimestamp: (id: string, time: number) => void;
}

const AiVideoCard = memo(function AiVideoCard({
  project,
  activeHoverId,
  setActiveHoverId,
  isModalOpen,
  onSelect,
  getTimestamp,
  setTimestamp,
}: AiVideoCardProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isHoveredRef = useRef(false);

  const isCurrentActive = activeHoverId === project.id;
  const thumbnailUrl = getCloudinaryThumbnailUrl(project.videoUrl);
  const optimizedVideoUrl = getCloudinaryOptimizedVideoUrl(project.videoUrl);

  // 1. Detect Desktop pointer capabilities (fine pointer, no touch, no reduced motion)
  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsDesktop(!isTouchDevice && !isReducedMotion);
  }, []);

  // Helper to safely pause video & save timestamp
  const stopAndResetVideo = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (videoRef.current) {
      const vid = videoRef.current;
      try {
        if (!vid.paused) {
          setTimestamp(project.id, vid.currentTime);
          vid.pause();
        }
      } catch {
        // ignore play/pause abort errors
      }
    }
    setIsPlaying(false);
  }, [project.id, setTimestamp]);

  // 2. Pause video immediately if another card becomes active or modal opens
  useEffect(() => {
    if ((!isCurrentActive || isModalOpen) && (isPlaying || hoverTimerRef.current)) {
      isHoveredRef.current = false;
      stopAndResetVideo();
    }
  }, [isCurrentActive, isModalOpen, isPlaying, stopAndResetVideo]);

  // 3. Play trigger when 400ms hover intent completes
  const attemptPlay = useCallback(() => {
    if (!isHoveredRef.current || isModalOpen) return;

    if (!shouldLoadVideo) {
      setShouldLoadVideo(true);
    } else if (videoRef.current) {
      const vid = videoRef.current;
      const savedTime = getTimestamp(project.id);
      if (savedTime > 0) {
        try {
          vid.currentTime = savedTime;
        } catch {
          // ignore seek error before metadata
        }
      }
      playPromiseRef.current = vid.play();
      if (playPromiseRef.current !== undefined) {
        playPromiseRef.current
          .then(() => {
            if (isHoveredRef.current && !isModalOpen) {
              setIsPlaying(true);
            } else {
              vid.pause();
              setIsPlaying(false);
            }
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [getTimestamp, isModalOpen, project.id, shouldLoadVideo]);

  // Auto-play when video element renders after shouldLoadVideo becomes true
  useEffect(() => {
    if (shouldLoadVideo && isHoveredRef.current && !isModalOpen && videoRef.current) {
      attemptPlay();
    }
  }, [shouldLoadVideo, attemptPlay, isModalOpen]);

  // 4. Mouse Enter (Desktop only, 400ms hover intent timer)
  const handleMouseEnter = () => {
    if (!isDesktop || !project.videoUrl || isModalOpen) return;

    isHoveredRef.current = true;
    setActiveHoverId(project.id);

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    hoverTimerRef.current = setTimeout(() => {
      if (isHoveredRef.current && !isModalOpen) {
        attemptPlay();
      }
    }, 400);
  };

  // 5. Mouse Leave
  const handleMouseLeave = () => {
    if (!isDesktop) return;

    isHoveredRef.current = false;
    if (activeHoverId === project.id) {
      setActiveHoverId(null);
    }
    stopAndResetVideo();
  };

  // 6. Viewport Intersection Observer & Tab/Window Focus Listeners
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            isHoveredRef.current = false;
            stopAndResetVideo();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(cardEl);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isHoveredRef.current = false;
        stopAndResetVideo();
      }
    };

    const handleWindowBlur = () => {
      isHoveredRef.current = false;
      stopAndResetVideo();
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
  }, [stopAndResetVideo]);

  const handleClick = () => {
    isHoveredRef.current = false;
    stopAndResetVideo();
    if (activeHoverId === project.id) {
      setActiveHoverId(null);
    }
    onSelect(project);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative aspect-[9/16] rounded-2xl border border-white/10 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-end p-4 sm:p-5 cursor-pointer bg-neutral-950 select-none"
    >
      {/* 1. Fast Cloudinary JPG/WebP Thumbnail Image */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
            isPlaying
              ? "opacity-0 scale-100"
              : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
          }`}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-b ${project.gradient} transition-all duration-300 ${
            isPlaying ? "opacity-0" : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
          }`}
        />
      )}

      {/* 2. Optimized Video Element (Loaded ONLY after 400ms hover intent) */}
      {shouldLoadVideo && optimizedVideoUrl && (
        <video
          ref={videoRef}
          src={optimizedVideoUrl}
          preload="none"
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[250ms] pointer-events-none ${
            isPlaying
              ? "opacity-100 scale-105"
              : "opacity-0 scale-100"
          }`}
        />
      )}

      {/* Subtle dark gradient overlay near bottom for button contrast */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-[250ms] pointer-events-none ${
          isPlaying ? "opacity-30" : "opacity-80 group-hover:opacity-90"
        }`}
      />

      {/* Premium Glass Pill "Play Video" Button */}
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
});

export function GenAiShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<AiVideoProject | null>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Preserve timestamps per video ID across hover and modal views
  const videoTimestampsRef = useRef<Record<string, number>>({});
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const getTimestamp = useCallback((id: string) => {
    return videoTimestampsRef.current[id] || 0;
  }, []);

  const setTimestamp = useCallback((id: string, time: number) => {
    if (time > 0) {
      videoTimestampsRef.current[id] = time;
    }
  }, []);

  // Sync timestamp & play modal video when opened
  useEffect(() => {
    if (selectedVideo && modalVideoRef.current) {
      const savedTime = videoTimestampsRef.current[selectedVideo.id] || 0;
      if (savedTime > 0) {
        try {
          modalVideoRef.current.currentTime = savedTime;
        } catch {
          // ignore seek errors before metadata is ready
        }
      }
      const playPromise = modalVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [selectedVideo]);

  const handleCloseModal = useCallback(() => {
    if (modalVideoRef.current && selectedVideo) {
      setTimestamp(selectedVideo.id, modalVideoRef.current.currentTime);
      try {
        modalVideoRef.current.pause();
      } catch {
        // ignore pause errors
      }
    }
    setSelectedVideo(null);
  }, [selectedVideo, setTimestamp]);

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
                activeHoverId={activeHoverId}
                setActiveHoverId={setActiveHoverId}
                isModalOpen={!!selectedVideo}
                onSelect={setSelectedVideo}
                getTimestamp={getTimestamp}
                setTimestamp={setTimestamp}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Apple-Inspired Ultra-Minimal Video Modal (Video + Close Button Only) */}
        <Dialog open={!!selectedVideo} onOpenChange={(open) => { if (!open) handleCloseModal(); }}>
          <DialogContent
            showCloseButton={false}
            aria-label="Video Player"
            className="max-w-[92vw] sm:w-[90vw] md:w-[88vw] lg:w-[85vw] xl:max-w-6xl p-0 bg-neutral-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center outline-none border-0 ring-0"
          >
            {/* Floating Apple-Inspired Glass Close Button (X) */}
            <button
              onClick={handleCloseModal}
              type="button"
              aria-label="Close video player"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-xl border border-white/20 transition-all duration-200 shadow-xl group cursor-pointer"
            >
              <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110" />
            </button>

            {/* Video Player Only */}
            {selectedVideo && selectedVideo.videoUrl && (
              <div className="relative w-full max-h-[85vh] flex items-center justify-center bg-black rounded-2xl sm:rounded-3xl overflow-hidden">
                <video
                  ref={modalVideoRef}
                  src={getCloudinaryOptimizedVideoUrl(selectedVideo.videoUrl)}
                  controls
                  autoPlay
                  playsInline
                  onLoadedMetadata={() => {
                    if (modalVideoRef.current && selectedVideo) {
                      const savedTime = videoTimestampsRef.current[selectedVideo.id] || 0;
                      if (savedTime > 0) {
                        modalVideoRef.current.currentTime = savedTime;
                      }
                    }
                  }}
                  onPause={() => {
                    if (modalVideoRef.current && selectedVideo) {
                      setTimestamp(selectedVideo.id, modalVideoRef.current.currentTime);
                    }
                  }}
                  className="w-full h-full max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
