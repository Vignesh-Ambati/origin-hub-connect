import { ArrowRight, Layers, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SiteLayout from "@/components/SiteLayout";

const Index = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-28">
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
            <Link to="/register">
              Get Started
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="hover:bg-primary/10">
            <Link to="/about">Learn more</Link>
          </Button>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow blur-3xl" />
      </section>

      {/* Features */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-20">
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

      {/* About teaser */}
      <section className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          One <span className="text-gradient">origin</span>. Every connection.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Origin Hub is a constellation of services woven into a single, beautiful experience.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-gradient-to-r from-secondary via-primary to-accent shadow-glow">
            <Link to="/register">Create account</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/40">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
