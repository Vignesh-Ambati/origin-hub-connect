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
    desc: "Connect external services like search engines, engineering utilities, and data transforms into a unified action panel.",
  },
  {
    icon: Timer,
    title: "Fast Interaction Flow",
    desc: "Optimized interaction layer designed to reduce delays and simplify repetitive operations through quick keyboard execution patterns.",
  },
];

const Actions = () => (
  <PageShell
    eyebrow="Execution Layer"
    title="Quick Actions & Utility Dispatch"
    subtitle="A central place to access and run tools, searches, and connected services without switching context."
    prev={{ label: "Workspace", to: "/workspace" }}
    next={{ label: "Secure Vault", to: "/vault" }}
  >
    {/* Intro */}
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-base text-muted-foreground leading-relaxed">
        Quick Actions is the execution layer of Origin-Hub. It allows you to directly
        run tools, perform searches, and access connected services from a single interface,
        reducing the need to switch between multiple tabs or applications.
      </p>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        It complements the Workspace layer — where Workspace organizes, Quick Actions executes.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((it) => (
        <Card
          key={it.title}
          className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <it.icon className="h-5 w-5" />
          </div>

          <h3 className="font-display text-lg font-semibold text-card-foreground">
            {it.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {it.desc}
          </p>
        </Card>
      ))}
    </div>

    {/* Section Header */}
    <div className="mt-14 text-center">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        System Overview
      </h3>
      <p className="mt-1 font-display text-xl font-semibold text-foreground">
        How Quick Actions fits into the Origin-Hub architecture
      </p>
    </div>

    {/* System Context */}
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-base font-semibold text-card-foreground">Unified Interface</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Provides a consistent operational interface for executing actions across tools, internal services, and external integrations in one location.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-base font-semibold text-card-foreground">Workspace Integration</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Workspace structures your links and dashboards; Quick Actions provides the high-velocity execution surface to operate on them in real time.
        </p>
      </div>
    </div>

    {/* Footer Note */}
    <div className="mt-12 rounded-xl border border-border bg-card/60 p-6 text-center">
      <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        This module is part of an evolving system and will expand to support custom CLI macros, hotkey binds, and workflow pipeline triggers.
      </p>
    </div>
  </PageShell>
);

export default Actions;
