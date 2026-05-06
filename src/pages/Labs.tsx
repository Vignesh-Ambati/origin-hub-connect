import PageShell from "@/components/PageShell";
import { useEffect, useRef, useState, useCallback } from "react";

const projects = [
  {
    title: "Origin Hub UI Evolution",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=80",
    ],
  },
  {
    title: "NMEA Analyser Output",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=80",
    ],
  },
  {
    title: "Backend Flow Experiments",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80",
    ],
  },
];

const AUTO_MS = 2800;
const PAUSE_MS = 2500;

const Lab_Gallery = () => {
  const [pIndex, setPIndex] = useState(0);
  const [iIndex, setIIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(null);

  const activeProject = projects[pIndex];

  const tempPause = useCallback(() => {
    setPaused(true);
    if (pauseRef.current) clearTimeout(pauseRef.current);
    pauseRef.current = setTimeout(() => setPaused(false), PAUSE_MS);
  }, []);

  const advanceAuto = useCallback(() => {
    setIIndex((i) => {
      if (i < projects[pIndex].images.length - 1) return i + 1;
      setPIndex((p) => (p + 1) % projects.length);
      return 0;
    });
  }, [pIndex]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(advanceAuto, AUTO_MS);
    return () => clearInterval(t);
  }, [paused, advanceAuto]);

  const selectProject = (idx) => {
    tempPause();
    setPIndex(idx);
    setIIndex(0);
  };

  const prevProject = () => {
    tempPause();
    setPIndex((p) => (p - 1 + projects.length) % projects.length);
    setIIndex(0);
  };

  const nextProject = () => {
    tempPause();
    setPIndex((p) => (p + 1) % projects.length);
    setIIndex(0);
  };

  const prevImage = () => {
    tempPause();
    setIIndex((i) => (i - 1 + activeProject.images.length) % activeProject.images.length);
  };

  const nextImage = () => {
    tempPause();
    setIIndex((i) => (i + 1) % activeProject.images.length);
  };

  const goToImage = (idx) => {
    tempPause();
    setIIndex(idx);
  };

  return (
    <PageShell
      eyebrow="Lab Console"
      title={<>Experiment <span className="text-gradient">Stream</span></>}
      subtitle="Auto-driven visual system showing live experimental outputs."
    >
      <div
        className="grid overflow-hidden rounded-2xl border border-white/5"
        style={{ gridTemplateColumns: "220px 1fr", height: "80vh", background: "#0a0a0b" }}
      >
        {/* SIDEBAR */}
        <div
          className="flex flex-col"
          style={{ background: "#111113", borderRight: "1px solid #242428" }}
        >
          {/* Header */}
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #1e1e22" }}>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#555560",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              Projects
            </p>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#c8c6c0" }}>
              Experiment Stream
            </p>
          </div>

          {/* Project list */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => selectProject(i)}
                className="relative text-left rounded-lg px-3 py-2.5 w-full transition-all duration-200"
                style={{
                  background: i === pIndex ? "#1c1c22" : "transparent",
                  border: `1px solid ${i === pIndex ? "#2e2e38" : "transparent"}`,
                  opacity: i === pIndex ? 1 : 0.4,
                  cursor: "pointer",
                }}
              >
                {i === pIndex && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 2,
                      height: "55%",
                      background: "#6b6bff",
                      borderRadius: 2,
                    }}
                  />
                )}
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: i === pIndex ? "#6b6bff" : "#44444e",
                    marginBottom: 2,
                  }}
                >
                  0{i + 1}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: i === pIndex ? "#e2e0d8" : "#b0aead",
                    lineHeight: 1.4,
                  }}
                >
                  {p.title}
                </p>
              </button>
            ))}
          </div>

          {/* Prev / Next project nav */}
          <div
            className="flex gap-1.5 p-3"
            style={{ borderTop: "1px solid #1e1e22" }}
          >
            {[
              { label: "↑", action: prevProject, aria: "Previous project" },
              { label: "↓", action: nextProject, aria: "Next project" },
            ].map(({ label, action, aria }) => (
              <button
                key={aria}
                onClick={action}
                aria-label={aria}
                className="flex-1 flex items-center justify-center rounded-md transition-all duration-150"
                style={{
                  background: "#1a1a1f",
                  border: "1px solid #2a2a30",
                  color: "#888",
                  padding: "8px 0",
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#222228";
                  e.currentTarget.style.color = "#ddd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#1a1a1f";
                  e.currentTarget.style.color = "#888";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* VIEWER */}
        <div className="flex flex-col overflow-hidden">
          {/* Viewer header */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid #1a1a1e" }}
          >
            <p style={{ fontSize: 15, fontWeight: 600, color: "#e0deda", letterSpacing: "0.01em" }}>
              {activeProject.title}
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#44444e", letterSpacing: "0.05em" }}>
              {String(iIndex + 1).padStart(2, "0")} / {String(activeProject.images.length).padStart(2, "0")}
            </p>
          </div>

          {/* Image stage */}
          <div className="flex-1 relative overflow-hidden">
            {/* Left arrow */}
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-all duration-150"
              style={{
                width: 36, height: 36,
                background: "rgba(15,15,18,0.85)",
                border: "1px solid #2e2e38",
                color: "#aaa",
                fontSize: 16,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(30,30,38,0.95)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#5050ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15,15,18,0.85)";
                e.currentTarget.style.color = "#aaa";
                e.currentTarget.style.borderColor = "#2e2e38";
              }}
            >
              ←
            </button>

            {/* Right arrow */}
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-all duration-150"
              style={{
                width: 36, height: 36,
                background: "rgba(15,15,18,0.85)",
                border: "1px solid #2e2e38",
                color: "#aaa",
                fontSize: 16,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(30,30,38,0.95)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#5050ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15,15,18,0.85)";
                e.currentTarget.style.color = "#aaa";
                e.currentTarget.style.borderColor = "#2e2e38";
              }}
            >
              →
            </button>

            {/* Image track — FIX: each slide is 100% of stage width, track translates by iIndex * 100% */}
            <div
              className="flex h-full"
              style={{
                width: `${activeProject.images.length * 100}%`,
                transform: `translateX(-${(iIndex / activeProject.images.length) * 100}%)`,
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "transform",
              }}
            >
              {activeProject.images.map((src, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{ width: `${100 / activeProject.images.length}%`, height: "100%", padding: "20px 44px" }}
                >
                  <img
                    src={src}
                    alt={`${activeProject.title} image ${i + 1}`}
                    loading="lazy"
                    className="rounded-xl w-full h-full"
                    style={{ objectFit: "cover", border: "1px solid #1e1e24" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer — dots + auto status */}
          <div
            className="flex items-center gap-2 px-6 py-3 flex-shrink-0"
            style={{ borderTop: "1px solid #1a1a1e" }}
          >
            {activeProject.images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToImage(i)}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  width: i === iIndex ? 18 : 5,
                  height: 5,
                  borderRadius: i === iIndex ? 3 : "50%",
                  background: i === iIndex ? "#6b6bff" : "#333338",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  padding: 0,
                }}
              />
            ))}

            <div
              className="ml-auto flex items-center gap-1.5"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#33333a",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 5, height: 5,
                  borderRadius: "50%",
                  background: paused ? "#333" : "#6b6bff",
                  animation: paused ? "none" : "glowPulse 1.8s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              {paused ? "paused" : "auto"}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </PageShell>
  );
};

export default Lab_Gallery;