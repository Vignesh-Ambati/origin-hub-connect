import { Zap, Gauge, Bolt, Timer } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";

const items = [
  { icon: Zap, title: "Sub-100ms", desc: "Edge routing brings every action within a heartbeat of your fingertip." },
  { icon: Gauge, title: "Lightweight", desc: "A featherweight runtime that respects your device and your battery." },
  { icon: Bolt, title: "Live Sync", desc: "Changes ripple across every device the moment you make them." },
  { icon: Timer, title: "Zero Wait", desc: "Optimistic updates and smart caching mean the UI never makes you pause." },
];

const Instant = () => (
  <PageShell
    eyebrow="Step 02 — Instant"
    title={<>Built for the <span className="text-gradient">Instant</span></>}
    subtitle="Connect to what matters in milliseconds. No friction, just flow."
    prev={{ label: "Unified", to: "/unified" }}
    next={{ label: "Next: Secure", to: "/secure" }}
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

export default Instant;
