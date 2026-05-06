import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const works = [
  { title: "Lumen Notes", tag: "Productivity", desc: "A keyboard-first note-taking app with a gorgeous dark canvas." },
  { title: "Nimbus Pay", tag: "Fintech", desc: "Lightning checkout flow with embedded multi-currency wallets." },
  { title: "Atlas Maps", tag: "GIS", desc: "Real-time collaborative cartography for distributed teams." },
  { title: "Echo Studio", tag: "Audio", desc: "Browser-based DAW with WebAudio synths and live sessions." },
  { title: "Pulse Health", tag: "Wellness", desc: "Daily ritual tracker that gamifies your inner astronaut." },
  { title: "Forge CLI", tag: "DevTools", desc: "An opinionated scaffolder for shipping side projects in a weekend." },
];

const Portfolio = () => (
  <PageShell
    eyebrow="Portfolio"
    title={<>A <span className="text-gradient">selection</span> of past work</>}
    subtitle="A handful of projects that shaped the philosophy behind Origin Hub."
    prev={{ label: "About", to: "/about" }}
    next={{ label: "Active Projects", to: "/projects" }}
  >
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {works.map((w, i) => (
        <Card
          key={w.title}
          className="glass animate-fade-up group border-primary/20 p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          style={{ animationDelay: `${0.06 * i}s` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-accent">{w.tag}</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold">{w.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
        </Card>
      ))}
    </div>
  </PageShell>
);

export default Portfolio;
