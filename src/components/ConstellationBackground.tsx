import { memo } from "react";

// Lightweight, accessible ambient background that dynamically responds to light/dark themes
// without expensive requestAnimationFrame canvas rendering or battery consumption.
const ConstellationBackground = memo(() => {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle top ambient radial glow */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-accent/5 to-transparent blur-3xl opacity-70 dark:opacity-40" />

      {/* Clean, lightweight dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          color: "var(--border)",
        }}
      />

      {/* Subtle bottom vignette to maintain readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
    </div>
  );
});

ConstellationBackground.displayName = "ConstellationBackground";

export default ConstellationBackground;
