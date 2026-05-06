import { ArrowRight, Github, Linkedin, Mail, Phone, Instagram, Twitter, Sparkles, Layers, Shield, Zap, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConstellationBackground from "@/components/ConstellationBackground";

const Index = () => {
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ConstellationBackground />

      {/* Nav */}
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#" className="flex items-center gap-2 font-display text-xl font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-secondary via-primary to-accent shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-gradient">Origin Hub</span>
          </a>
          <div className="hidden items-center gap-8 text-base text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#auth" className="transition-colors hover:text-foreground">Login</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
          {/* <Button asChild variant="outline" size="sm" className="border-primary/40 bg-transparent hover:bg-primary/10">
            <a href="#auth">Get Started</a>
          </Button> */}
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-28">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
          Welcome to Origin Hub....
        </div>

        <h1
          className="animate-fade-up mt-8 font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-gradient animate-gradient">Origin Hub</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-lg text-muted-foreground md:text-2xl"
          style={{ animationDelay: "0.25s" }}
        >
          Where all your needs connect.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-secondary via-primary to-accent text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
          >
            <a href="#auth">
              Get Started
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="hover:bg-primary/10">
            <a href="#about">Learn more</a>
          </Button>
        </div>

        {/* Glow orb */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow blur-3xl" />
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Layers,
              title: "Smart Workspace",
              desc: "Create a fully customizable workspace where your tools, services, and workflows live in one place. Organize everything into structured layouts that adapt to your working style, reducing clutter and eliminating the need to switch between multiple applications.",
              to: "/workspace"
            },
            {
              icon: Zap,
              title: "Quick Actions",
              desc: "Execute tasks instantly with intelligent shortcuts, unified search, and context-aware actions. Whether you're launching tools, navigating workflows, or triggering operations, everything happens in milliseconds with minimal friction.",
              to: "/actions"
            },
            {
              icon: Shield,
              title: "Secure Vault",
              desc: "Store and manage credentials, sensitive data, and service connections within a secure, encrypted environment. Built with a privacy-first approach, giving you full control over access while ensuring your data remains protected at all times.",
              to: "/vault"
            },
          ].map((f, i) => (
            <Link key={f.title} to={f.to}>
              <Card
                className="glass animate-fade-up group relative h-full overflow-hidden border-primary/20 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-secondary/30 to-accent/30 ring-1 ring-primary/30">
                  <f.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-28 text-center">
        <div className="space-y-8">
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            One <span className="text-gradient">origin</span>. Infinite possibilities.
          </h2>

          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-muted-foreground">
            Origin Hub is being built as a unified digital ecosystem — a single intelligent layer
            where workflows, tools, communication, and identity come together without fragmentation.
            In a world filled with disconnected platforms and constant context switching, Origin Hub
            reimagines how digital interaction should feel: fluid, intentional, and deeply connected.
          </p>

          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-muted-foreground/90">
            Instead of forcing users to adapt to scattered systems, Origin Hub adapts to the way
            people naturally think and work. It is designed to reduce friction, simplify complexity,
            and create an environment where access, action, and insight happen seamlessly.
          </p>
        </div>

        {/* Vision Statement */}
        <div className="mt-20 rounded-3xl border border-primary/20 bg-background/40 p-10 backdrop-blur-xl shadow-glow">
          <h3 className="font-display text-2xl font-semibold md:text-3xl">
            Building the future of connected digital experiences
          </h3>

          <p className="mx-auto mt-6 max-w-4xl text-lg text-muted-foreground leading-relaxed">
            Origin Hub is currently in active development, with each iteration focused on creating
            a more intelligent, secure, and adaptable platform. Every component is being designed
            with long-term scalability in mind — from seamless integrations and modular workflows
            to privacy-first architecture and performance-driven systems.
          </p>

          <p className="mx-auto mt-6 max-w-4xl text-lg text-muted-foreground leading-relaxed">
            This is more than a product in progress. It is an evolving foundation for a digital
            ecosystem where every connection has purpose, every interaction has context, and every
            experience begins from one unified origin.
          </p>
        </div>

      {/* Development Status */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <span className="rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
          Currently in Development
        </span>

        <p className="max-w-2xl text-sm italic text-muted-foreground">
        Origin Hub is currently under active development. Features are evolving rapidly as we shape
          a more connected, efficient, and intelligent ecosystem.
        </p>
      </div>
      </section>

      {/* Auth */}
      <section id="auth" className="relative z-10 mx-auto max-w-md px-6 py-20">
        <Card className="glass shadow-elegant border-primary/30 p-8">
          <div className="mb-6 text-center">
            <h2 className="font-display text-2xl font-bold">Step inside</h2>
            <p className="mt-1 text-sm text-muted-foreground">Login or create your account</p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/40">
              <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-primary-foreground">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
                <UserPlus className="mr-2 h-4 w-4" /> Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6 space-y-4">
              {/* Google Login */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="you@origin.hub" className="bg-input/60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-pass">Password</Label>
                <Input id="login-pass" type="password" placeholder="••••••••" className="bg-input/60" />
              </div>
              <Button className="w-full bg-gradient-to-r from-secondary via-primary to-accent shadow-glow hover:opacity-90">
                Login <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="register" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Name</Label>
                <Input id="reg-name" placeholder="Ada Lovelace" className="bg-input/60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="you@origin.hub" className="bg-input/60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pass">Password</Label>
                <Input id="reg-pass" type="password" placeholder="Create a password" className="bg-input/60" />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary via-accent to-secondary shadow-glow hover:opacity-90">
                Create account <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              {/* Divider */}
              <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
              </div>

              {/* Google Login */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Continue with Google
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 border-t border-border/50 bg-background/40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-semibold">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-secondary via-primary to-accent">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
                <span className="text-gradient">Origin Hub</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Where all your needs connect — a single luminous origin for everything you do.
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                About the Dev
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/about" className="text-foreground/80 transition-colors hover:text-foreground">About</Link></li>
                <li><Link to="/portfolio" className="text-foreground/80 transition-colors hover:text-foreground">Portfolio</Link></li>
                <li><Link to="/projects" className="text-foreground/80 transition-colors hover:text-foreground">Projects</Link></li>
                <li><Link to="/Lab_Gallery" className="text-foreground/80 transition-colors hover:text-foreground">Labs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Contact
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground/80">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:saivigneswar123123@gmail.com" className="hover:text-foreground">saivigneswar123123@gmail.com</a>
                </li>
                <li className="flex items-center gap-2 text-foreground/80">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+917674898208" className="hover:text-foreground">+91-7674898208</a>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-3">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/vigneshambati/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:saivigneswar123123@gmail.com", label: "Email" },
                  { icon: Github, href: "https://github.com/Vignesh-Ambati", label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/40 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/50 pt-6 text-xs text-muted-foreground md:flex-row">
            <p>© {year} Origin Hub. Crafted and Designed For Need.</p>
            <p>Where all your needs connect.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
