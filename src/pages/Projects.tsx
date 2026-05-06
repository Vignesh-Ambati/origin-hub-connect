import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  { title: "Origin Hub Core", status: "In Progress", desc: "The constellation engine — the unifying layer that powers every node.", stack: ["React", "TypeScript", "Edge"] },
  { title: "Hub Mobile", status: "Beta", desc: "Native companion for iOS & Android with offline-first sync.", stack: ["React Native", "Expo"] },
  { title: "Hub Connect", status: "Planning", desc: "Plugin SDK so anyone can bring their own service into the hub.", stack: ["TS SDK", "OAuth"] },
  { title: "Hub Insights", status: "Concept", desc: "Personal analytics dashboard with privacy-respecting telemetry.", stack: ["DuckDB", "WASM"] },
];

const statusTone: Record<string, string> = {
  "In Progress": "bg-primary/20 text-primary-foreground border-primary/40",
  Beta: "bg-accent/20 text-accent-foreground border-accent/40",
  Planning: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  Concept: "bg-muted text-muted-foreground border-border",
};

const Projects = () => (
  <PageShell
    eyebrow="Active Projects"
    title={<>What I'm <span className="text-gradient">building</span> now</>}
    subtitle="A live snapshot of the work happening inside the workshop."
    prev={{ label: "Portfolio", to: "/portfolio" }}
    next={{ label: "Read the Blog", to: "/blog" }}
  >
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <Card
          key={p.title}
          className="glass animate-fade-up border-primary/20 p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          style={{ animationDelay: `${0.08 * i}s` }}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold">{p.title}</h3>
            <Badge variant="outline" className={statusTone[p.status]}>{p.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md border border-border bg-card/40 px-2 py-0.5 text-xs text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  </PageShell>
);

export default Projects;
