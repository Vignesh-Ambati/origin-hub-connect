import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConstellationBackground from "@/components/ConstellationBackground";
import { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  next?: { label: string; to: string };
  prev?: { label: string; to: string };
}

const PageShell = ({ eyebrow, title, subtitle, children, next, prev }: PageShellProps) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ConstellationBackground />

      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-secondary via-primary to-accent shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-gradient">Origin Hub</span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Home</Link>
          </Button>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-10">
        <div className="text-center">
          {eyebrow && (
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
              {eyebrow}
            </div>
          )}
          <h1
            className="animate-fade-up mt-6 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl"
            style={{ animationDelay: "0.1s" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="animate-fade-up mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
              style={{ animationDelay: "0.2s" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="animate-fade-up mt-14" style={{ animationDelay: "0.3s" }}>
          {children}
        </div>

        {(prev || next) && (
          <div className="mt-20 flex items-center justify-between gap-4 border-t border-border/50 pt-8">
            <div>
              {prev && (
                <Button asChild variant="ghost" className="hover:bg-primary/10">
                  <Link to={prev.to}><ArrowLeft className="mr-1 h-4 w-4" /> {prev.label}</Link>
                </Button>
              )}
            </div>
            <div>
              {next && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-secondary via-primary to-accent text-primary-foreground shadow-glow hover:opacity-90"
                >
                  <Link to={next.to}>{next.label} →</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PageShell;
