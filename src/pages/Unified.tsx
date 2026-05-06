import { Layers, Link2, Workflow, Users } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";

const items = [
  { icon: Layers, title: "One Dashboard", desc: "All your apps, contacts and tools converge into a single, beautifully orchestrated surface." },
  { icon: Link2, title: "Universal Links", desc: "Cross-link any node to any other — your data flows where it needs to, instantly." },
  { icon: Workflow, title: "Smart Workflows", desc: "Automate repetitive sequences with composable, drag-and-drop blocks." },
  { icon: Users, title: "Shared Spaces", desc: "Collaborate with teams, families or communities under one secure roof." },
];

const Unified = () => (
  <PageShell
    eyebrow="Step 01 — Unified"
    title={<><span className="text-gradient">Unified</span> by design</>}
    subtitle="Bring every tool, contact and workflow into one luminous hub."
    prev={{ label: "Home", to: "/" }}
    next={{ label: "Next: Instant", to: "/instant" }}
  >
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
          <h3 className="font-display text-xl font-semibold">{it.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
        </Card>
      ))}
    </div>
  </PageShell>
);

export default Unified;
