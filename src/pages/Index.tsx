import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Layers,
  Shield,
  Zap,
  LogIn,
  UserPlus,
  Menu,
  X,
  Compass,
  FolderGit2,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConstellationBackground from "@/components/ConstellationBackground";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Workspace", to: "/workspace" },
  { label: "Actions", to: "/actions" },
  { label: "Vault", to: "/vault" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Labs", to: "/Lab_Gallery" },
];

const Index = () => {
  const year = new Date().getFullYear();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-200">
      <ConstellationBackground />

      {/* Navigation */}
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

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Header: ThemeToggle & Auth anchor */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex border-border text-foreground hover:bg-muted"
            >
              <a href="#auth">Sign in</a>
            </Button>

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

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-background px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-border">
                <a
                  href="#auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 md:pt-24">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Unified Workflow Hub
        </div>

        <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Where all your needs <span className="text-gradient">connect</span>.
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          A clean, luminous workspace bringing together your tools, workflows, credentials, and engineering projects in one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
            <Link to="/workspace">
              Explore Workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
            <Link to="/actions">
              Quick Actions
            </Link>
          </Button>

          <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <a href="#about">Learn more</a>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Core Capabilities
          </h2>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Designed for structured productivity
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Layers,
              title: "Smart Workspace",
              desc: "Create a structured environment where tools, services, and daily workflows live together. Eliminate tab sprawl and organize by task.",
              to: "/workspace",
            },
            {
              icon: Zap,
              title: "Quick Actions",
              desc: "Execute operations and run utilities instantly with streamlined shortcuts and integrated tool actions without context switching.",
              to: "/actions",
            },
            {
              icon: Shield,
              title: "Secure Vault",
              desc: "Store and manage credentials and service connections in a protected client-side environment built on privacy-first design principles.",
              to: "/vault",
            },
            {
              icon: FolderGit2,
              title: "Engineering Projects",
              desc: "Explore core system architectures, communication protocols, NMEA stream parsers, and computer vision projects.",
              to: "/projects",
            },
            {
              icon: Compass,
              title: "Applied Portfolio",
              desc: "Review system-level, backend engineering, and security hardening experience with real-world technical breakdowns.",
              to: "/portfolio",
            },
            {
              icon: Terminal,
              title: "Experimental Labs",
              desc: "Visual console streaming iterative interface concepts, system experiments, and ongoing telemetry exploration.",
              to: "/Lab_Gallery",
            },
          ].map((f) => (
            <Link key={f.title} to={f.to} className="group block focus-visible:outline-none">
              <Card className="h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                  Open module
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Ecosystem Philosophy
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            One origin. Infinite connections.
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Origin-Hub is built as a unified digital ecosystem — a single intelligent layer where workflows, tools, and identity come together without fragmentation. In a world filled with disconnected services, Origin-Hub provides an intentional, friction-free foundation.
          </p>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Instead of forcing users to adapt to scattered systems, Origin-Hub adapts to the natural way people think and work: organizing what matters, executing with precision, and maintaining secure access across everyday workflows.
          </p>
        </div>

        {/* Development Status banner */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 text-left shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Active Iteration
              </span>
              <h3 className="mt-1 text-base font-semibold text-card-foreground">
                Origin-Hub Engineering Roadmap
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              In Development
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Each iteration focuses on creating a modular, privacy-first platform with client-side credential security, responsive productivity workflows, and unified external service hooks.
          </p>
        </div>
      </section>

      {/* Auth / Account Access Section */}
      <section id="auth" className="relative z-10 mx-auto max-w-md px-4 py-16 sm:px-6">
        <Card className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="font-display text-2xl font-bold text-card-foreground">Account Access</h2>
            <p className="mt-1 text-xs text-muted-foreground">Sign in to your Origin-Hub workspace</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger
                value="login"
                className="text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <LogIn className="mr-1.5 h-3.5 w-3.5" /> Sign in
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-5 space-y-4">
              <Button
                variant="outline"
                type="button"
                className="w-full border-border bg-background text-foreground hover:bg-muted"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-xs font-medium">Email address</Label>
                <Input id="login-email" type="email" placeholder="name@company.com" className="bg-background text-sm" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-pass" className="text-xs font-medium">Password</Label>
                <Input id="login-pass" type="password" placeholder="••••••••" className="bg-background text-sm" />
              </div>

              <Button type="button" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Sign in to Hub
              </Button>
            </TabsContent>

            <TabsContent value="register" className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="reg-name" className="text-xs font-medium">Full name</Label>
                <Input id="reg-name" placeholder="Alex Morgan" className="bg-background text-sm" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-email" className="text-xs font-medium">Email address</Label>
                <Input id="reg-email" type="email" placeholder="name@company.com" className="bg-background text-sm" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-pass" className="text-xs font-medium">Create password</Label>
                <Input id="reg-pass" type="password" placeholder="At least 8 characters" className="bg-background text-sm" />
              </div>

              <Button type="button" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Create account
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                <span className="grid h-6 w-6 place-items-center rounded bg-primary text-primary-foreground text-xs font-bold">
                  O
                </span>
                <span>Origin-Hub</span>
              </div>
              <p className="mt-2.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
                Where all your needs connect — a unified productivity and workflow interface for modern engineering.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Navigation
              </h4>
              <ul className="mt-3 space-y-1.5 text-xs">
                <li><Link to="/workspace" className="text-muted-foreground hover:text-foreground">Workspace</Link></li>
                <li><Link to="/actions" className="text-muted-foreground hover:text-foreground">Quick Actions</Link></li>
                <li><Link to="/vault" className="text-muted-foreground hover:text-foreground">Secure Vault</Link></li>
                <li><Link to="/projects" className="text-muted-foreground hover:text-foreground">Projects</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Developer & Research
              </h4>
              <ul className="mt-3 space-y-1.5 text-xs">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About the Dev</Link></li>
                <li><Link to="/portfolio" className="text-muted-foreground hover:text-foreground">Portfolio</Link></li>
                <li><Link to="/Lab_Gallery" className="text-muted-foreground hover:text-foreground">Experiment Labs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Contact & Links
              </h4>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <a href="mailto:saivigneswar123123@gmail.com" className="hover:text-foreground">saivigneswar123123@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <a href="tel:+917674898208" className="hover:text-foreground">+91-7674898208</a>
                </li>
              </ul>

              <div className="mt-4 flex items-center gap-2">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/vigneshambati/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:saivigneswar123123@gmail.com", label: "Email" },
                  { icon: Github, href: "https://github.com/Vignesh-Ambati", label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {year} Origin-Hub. Structured for productivity.</p>
            <p>Where all your needs connect.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
