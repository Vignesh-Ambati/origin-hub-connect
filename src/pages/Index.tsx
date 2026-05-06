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
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#auth" className="transition-colors hover:text-foreground">Login</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
          <Button asChild variant="outline" size="sm" className="border-primary/40 bg-transparent hover:bg-primary/10">
            <a href="#auth">Get Started</a>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-28">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
          Welcome to the network
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
            { icon: Layers, title: "Unified", desc: "Bring every tool, contact and workflow into one luminous hub." },
            { icon: Zap, title: "Instant", desc: "Connect to what matters in milliseconds. No friction, just flow." },
            { icon: Shield, title: "Secure", desc: "End-to-end encryption with privacy-first architecture by default." },
          ].map((f, i) => (
            <Card
              key={f.title}
              className="glass animate-fade-up group relative overflow-hidden border-primary/20 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-secondary/30 to-accent/30 ring-1 ring-primary/30">
                <f.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          One <span className="text-gradient">origin</span>. Every connection.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Origin Hub is a constellation of services woven into a single, beautiful experience.
          From identity to communication, productivity to play — every node lights up the moment you arrive.
        </p>
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
                <li><a href="#about" className="text-foreground/80 transition-colors hover:text-foreground">About</a></li>
                <li><a href="#" className="text-foreground/80 transition-colors hover:text-foreground">Portfolio</a></li>
                <li><a href="#" className="text-foreground/80 transition-colors hover:text-foreground">Projects</a></li>
                <li><a href="#" className="text-foreground/80 transition-colors hover:text-foreground">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Contact
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground/80">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:hello@originhub.dev" className="hover:text-foreground">hello@originhub.dev</a>
                </li>
                <li className="flex items-center gap-2 text-foreground/80">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+10000000000" className="hover:text-foreground">+1 (000) 000-0000</a>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-3">
                {[
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:hello@originhub.dev", label: "Email" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Github, href: "#", label: "GitHub" },
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
            <p>© {year} Origin Hub. Crafted with care.</p>
            <p>Where all your needs connect.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
