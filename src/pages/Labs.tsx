import PageShell from "@/components/PageShell";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const projects = [
  {
    title: "Origin Hub UI Evolution",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80",
    ],
  },
  {
    title: "NMEA Analyser Output",
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

const AUTO_SCROLL_MS = 3500;
const RESUME_DELAY_MS = 4500;

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

    setProjectIndex((prev) => {
      const next = (prev - 1 + projects.length) % projects.length;
      return next;
    });

    setImageIndex(0);
  };

  const nextProject = () => {
    pauseAutoScroll();

    setProjectIndex((prev) => {
      const next = (prev + 1) % projects.length;
      return next;
    });

    setImageIndex(0);
  };

  const previousImage = () => {
    pauseAutoScroll();

    setImageIndex((prev) =>
      prev === 0 ? activeProject.images.length - 1 : prev - 1
    );
  };

  const forwardImage = () => {
    pauseAutoScroll();

    setImageIndex((prev) =>
      prev === activeProject.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <PageShell
      eyebrow="Lab Gallery"
      title={
        <>
          Experimental <span className="text-gradient">visual stream</span>
        </>
      }
      subtitle="A visual console of ongoing experiments, interfaces, workflows, and system explorations across Origin Hub and related projects."
      prev={{ label: "Projects", to: "/projects" }}
      next={{ label: "Back Home", to: "/" }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl">
        <div className="grid min-h-[78vh] lg:grid-cols-[300px_1fr]">
          {/* LEFT SIDEBAR */}
          <aside className="relative border-b border-border/30 bg-black/20 lg:border-b-0 lg:border-r">
            <div className="flex h-full flex-col">
              {/* HEADER */}
              <div className="border-b border-border/30 px-6 py-6">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Active Streams
                </p>

                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  Project Console
                </h3>
              </div>

              {/* PROJECT LIST */}
              <div className="flex-1 space-y-3 overflow-hidden px-4 py-5">
                {projects.map((project, idx) => {
                  const active = idx === projectIndex;

                  return (
                    <button
                      key={project.title}
                      onClick={() => changeProject(idx)}
                      className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                        active
                          ? "border-primary/40 bg-primary/10 shadow-[0_0_30px_rgba(120,120,255,0.12)]"
                          : "border-border/30 bg-background/20 hover:border-primary/20 hover:bg-background/40"
                      }`}
                    >
                      <div
                        className={`absolute left-0 top-0 h-full w-1 rounded-full transition-all ${
                          active ? "bg-primary" : "bg-transparent"
                        }`}
                      />

                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </p>

                      <h4
                        className={`mt-2 text-sm font-medium leading-relaxed transition-colors ${
                          active
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {project.title}
                      </h4>
                    </button>
                  );
                })}
              </div>

              {/* NAVIGATION */}
              <div className="flex gap-3 border-t border-border/30 p-4">
                <button
                  onClick={prevProject}
                  className="flex h-12 flex-1 items-center justify-center rounded-xl border border-border/30 bg-background/40 transition-all hover:border-primary/30 hover:bg-primary/10"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>

                <button
                  onClick={nextProject}
                  className="flex h-12 flex-1 items-center justify-center rounded-xl border border-border/30 bg-background/40 transition-all hover:border-primary/30 hover:bg-primary/10"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT VIEWER */}
          <section className="relative flex flex-col">
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-border/30 px-5 py-5 sm:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Current Preview
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                  {activeProject.title}
                </h2>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-border/30 bg-background/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex">
                <span
                  className={`h-2 w-2 rounded-full ${
                    paused ? "bg-muted" : "bg-primary"
                  }`}
                />

                {paused ? "Paused" : "Live"}
              </div>
            </div>

            {/* IMAGE AREA */}
            <div className="relative flex-1 overflow-hidden">
              {/* LEFT ARROW */}
              <button
                onClick={previousImage}
                className="absolute left-3 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-border/30 bg-black/50 opacity-0 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-black/70 group-hover:opacity-100 md:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* RIGHT ARROW */}
              <button
                onClick={forwardImage}
                className="absolute right-3 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-border/30 bg-black/50 opacity-0 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-black/70 group-hover:opacity-100 md:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* IMAGE SLIDER */}
              <div className="group relative h-full w-full overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${imageIndex * 88}%)`,
                  }}
                >
                  {activeProject.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex h-full w-[88%] flex-shrink-0 items-center justify-center px-4 py-4 sm:px-6 sm:py-6"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/20 bg-black">
                        <img
                          src={img}
                          alt={`${activeProject.title}-${idx}`}
                          className="h-full w-full object-cover"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">
                            Experiment Snapshot
                          </p>

                          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                            {activeProject.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/30 px-5 py-4 sm:px-8">
              {/* DOTS */}
              <div className="flex items-center gap-2">
                {activeProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      pauseAutoScroll();
                      setImageIndex(idx);
                    }}
                    className={`transition-all duration-300 ${
                      idx === imageIndex
                        ? "h-2 w-10 rounded-full bg-primary"
                        : "h-2 w-2 rounded-full bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>
                  {String(imageIndex + 1).padStart(2, "0")}
                </span>

                <span className="opacity-40">/</span>

                <span>
                  {String(activeProject.images.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default Lab_Gallery;