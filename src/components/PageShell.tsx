import { ArrowLeft, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConstellationBackground from "@/components/ConstellationBackground";
import ThemeToggle from "@/components/ThemeToggle";
import { ReactNode, useState } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  next?: { label: string; to: string };
  prev?: { label: string; to: string };
}

const navItems = [
  { label: "Home", to: "/" },
  { label: "Workspace", to: "/workspace" },
  { label: "Actions", to: "/actions" },
  { label: "Vault", to: "/vault" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Labs", to: "/Lab_Gallery" },
];

const PageShell = ({ eyebrow, title, subtitle, children, next, prev }: PageShellProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-200">
      <ConstellationBackground />

      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
            aria-label="Origin-Hub Home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <span className="font-bold text-sm">O</span>
            </span>
            <span className="font-semibold text-foreground">Origin-Hub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.toLowerCase().startsWith(item.to.toLowerCase());

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Actions: Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-background px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.toLowerCase().startsWith(item.to.toLowerCase());

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
        <div className="text-center">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </div>
          )}

          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-10 animate-fade-up">
          {children}
        </div>

        {/* Pagination Prev / Next */}
        {(prev || next) && (
          <div className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              {prev && (
                <Button asChild variant="outline" size="sm" className="gap-1.5 border-border">
                  <Link to={prev.to}>
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>{prev.label}</span>
                  </Link>
                </Button>
              )}
            </div>
            <div>
              {next && (
                <Button asChild size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to={next.to}>
                    <span>{next.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
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
