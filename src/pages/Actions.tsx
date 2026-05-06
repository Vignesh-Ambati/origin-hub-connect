import { Zap, Gauge, Bolt, Timer } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";

const items = [
  {
    icon: Zap,
    title: "Quick Access Actions",
    desc: "Run frequently used tools, links, and workflows directly from a single interface without switching between applications.",
  },
  {
    icon: Gauge,
    title: "Side-by-Side View",
    desc: "Open tools and results together in a split layout to compare outputs or work across multiple resources simultaneously.",
  },
  {
    icon: Bolt,
    title: "Integrated Tools",
    desc: "Connect external services like search engines, AI assistants, and utilities into a unified action panel.",
  },
  {
    icon: Timer,
    title: "Fast Interaction Flow",
    desc: "Optimized interaction layer designed to reduce delays and simplify repetitive operations through quick execution patterns.",
  },
];

const Actions = () => (
  <PageShell
    eyebrow="Feature — Quick Actions"
    title={
      <>
        Quick <span className="text-gradient">Actions</span>
      </>
    }
    subtitle="A central place to access and run tools, searches, and connected services without switching context."
    prev={{ label: "Workspace", to: "/workspace" }}
    next={{ label: "Secure Vault", to: "/vault" }}
  >
    {/* Intro */}
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-muted-foreground leading-relaxed">
        Quick Actions is the execution layer of Origin Hub. It allows you to directly
        run tools, perform searches, and access connected services from a single interface,
        reducing the need to switch between multiple tabs or applications.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        It is designed to complement the Workspace layer — where Workspace organizes,
        Quick Actions executes.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((it, i) => (
        <Card
          key={it.title}
          className="glass animate-fade-up group border-primary/20 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          style={{ animationDelay: `${0.1 * i}s` }}
        >
          <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-secondary/30 to-accent/30 ring-1 ring-primary/30">
            <it.icon className="h-5 w-5" />
          </div>

          <h3 className="font-display text-xl font-semibold">
            {it.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {it.desc}
          </p>
        </Card>
      ))}
    </div>

    {/* Section Header */}
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-semibold">
        System Overview
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        How Quick Actions fits into the Origin Hub architecture
      </p>
    </div>

    {/* System Context */}
    <div className="mt-16 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-border/50 bg-background/40 p-8 backdrop-blur">
        <h3 className="text-lg font-semibold">Purpose</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Provides a unified interface for executing actions across tools, services,
          and external integrations in one place.
        </p>
      </div>

      <div className="rounded-2xl border border-border/50 bg-background/40 p-8 backdrop-blur">
        <h3 className="text-lg font-semibold">Relationship to Workspace</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Workspace is used for organizing tools and links, while Quick Actions is used
          for actively using them in day-to-day workflows.
        </p>
      </div>
    </div>

    {/* Footer Note */}
    <div className="mt-16 text-center">
      <p className="text-sm italic text-muted-foreground max-w-2xl mx-auto">
        This module is part of an evolving system and will expand to support more
        integrations and workflow capabilities over time.
      </p>
    </div>
  </PageShell>
);

export default Actions;