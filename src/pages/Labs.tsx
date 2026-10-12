import PageShell from "@/components/PageShell";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Pause,
  Play,
} from "lucide-react";

const projects = [
  {
    title: "Origin-Hub UI Evolution",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80",
    ],
  },
  {
    title: "NMEA Analyzer Output",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80",
    ],
  },
  {
    title: "Backend Flow Experiments",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80",
    ],
  },
];

const AUTO_SCROLL_MS = 4500;
const RESUME_DELAY_MS = 6000;

const Lab_Gallery = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const resumeRef = useRef<NodeJS.Timeout | null>(null);
  const activeProject = projects[projectIndex];

  const pauseAutoScroll = useCallback(() => {
    setPaused(true);

    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
    }

    resumeRef.current = setTimeout(() => {
      setPaused(false);
    }, RESUME_DELAY_MS);
  }, []);

  const nextImage = useCallback(() => {
    setImageIndex((prev) => {
      if (prev < activeProject.images.length - 1) {
        return prev + 1;
      }
      setProjectIndex((p) => (p + 1) % projects.length);
      return 0;
    });
  }, [activeProject.images.length]);

  useEffect(() => {
    // Respect prefers-reduced-motion by keeping carousel static unless manually navigated
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
      return;
    }

    if (paused) return;

    const interval = setInterval(() => {
      nextImage();
    }, AUTO_SCROLL_MS);

    return () => clearInterval(interval);
  }, [paused, nextImage]);

  const changeProject = (idx: number) => {
    pauseAutoScroll();
    setProjectIndex(idx);
    setImageIndex(0);
  };

  const prevProject = () => {
    pauseAutoScroll();
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setImageIndex(0);
  };

  const nextProject = () => {
    pauseAutoScroll();
    setProjectIndex((prev) => (prev + 1) % projects.length);
    setImageIndex(0);
  };

  const previousImage = () => {
    pauseAutoScroll();
    setImageIndex((prev) => (prev === 0 ? activeProject.images.length - 1 : prev - 1));
  };

  const forwardImage = () => {
    pauseAutoScroll();
    setImageIndex((prev) => (prev === activeProject.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <PageShell
      eyebrow="Experimental Console"
      title="Labs & Visual Stream"
      subtitle="A console of ongoing telemetry, prototype interface concepts, and system workflow experiments across Origin-Hub."
      prev={{ label: "About", to: "/about" }}
      next={{ label: "Home", to: "/" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid min-h-[70vh] lg:grid-cols-[280px_1fr]">
          {/* LEFT SIDEBAR */}
          <aside className="border-b border-border bg-muted/30 lg:border-b-0 lg:border-r">
            <div className="flex h-full flex-col">
              {/* HEADER */}
              <div className="border-b border-border px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Active Streams
                </p>
                <h2 className="mt-1 text-sm font-semibold text-foreground">
                  Project Console
                </h2>
              </div>

              {/* PROJECT LIST */}
              <div className="flex-1 space-y-2 p-3">
                {projects.map((project, idx) => {
                  const active = idx === projectIndex;

                  return (
                    <button
                      key={project.title}
                      onClick={() => changeProject(idx)}
                      type="button"
                      className={`group relative w-full rounded-lg border p-3.5 text-left transition-all ${
                        active
                          ? "border-primary/50 bg-background shadow-xs"
                          : "border-transparent bg-transparent hover:bg-background/60 hover:border-border text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          STREAM #{String(idx + 1).padStart(2, "0")}
                        </span>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </div>

                      <h3
                        className={`mt-1.5 text-xs font-semibold leading-relaxed ${
                          active ? "text-foreground font-bold" : "text-foreground/80 group-hover:text-foreground"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </button>
                  );
                })}
              </div>

              {/* SIDEBAR NAVIGATION BUTTONS */}
              <div className="flex gap-2 border-t border-border p-3">
                <button
                  onClick={prevProject}
                  type="button"
                  aria-label="Previous project stream"
                  className="flex h-9 flex-1 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>

                <button
                  onClick={nextProject}
                  type="button"
                  aria-label="Next project stream"
                  className="flex h-9 flex-1 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT VIEWER */}
          <section className="relative flex flex-col bg-background">
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5 sm:px-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Current Stream
                </p>
                <h3 className="text-base font-semibold text-foreground">
                  {activeProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                  <span>{paused ? "Paused" : "Live"}</span>
                </button>
              </div>
            </div>

            {/* IMAGE PREVIEW AREA */}
            <div className="relative flex-1 p-4 sm:p-6 flex items-center justify-center bg-muted/20">
              {/* LEFT ARROW */}
              <button
                onClick={previousImage}
                type="button"
                aria-label="Previous image"
                className="absolute left-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-transform hover:scale-105 hover:bg-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* RIGHT ARROW */}
              <button
                onClick={forwardImage}
                type="button"
                aria-label="Next image"
                className="absolute right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-transform hover:scale-105 hover:bg-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* IMAGE FRAME */}
              <div className="relative aspect-video max-h-[500px] w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <img
                  src={activeProject.images[imageIndex]}
                  alt={`${activeProject.title} frame ${imageIndex + 1}`}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-6 text-white">
                  <p className="text-[11px] uppercase tracking-wider text-slate-300">
                    Telemetry Snapshot
                  </p>
                  <h4 className="mt-1 text-base font-semibold sm:text-lg">
                    {activeProject.title} — Frame {imageIndex + 1}
                  </h4>
                </div>
              </div>
            </div>

            {/* VIEWER FOOTER */}
            <div className="flex items-center justify-between border-t border-border px-5 py-3 sm:px-6">
              {/* DOT INDICATORS */}
              <div className="flex items-center gap-1.5">
                {activeProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => {
                      pauseAutoScroll();
                      setImageIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === imageIndex ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <div className="text-xs font-mono text-muted-foreground">
                {String(imageIndex + 1).padStart(2, "0")} / {String(activeProject.images.length).padStart(2, "0")}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default Lab_Gallery;
