import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Origin Hub (Core System)",
    status: "Active Development",
    desc: "A central system designed to act as an integration layer for multiple tools and workflows. The goal is to connect standalone utilities and applications into a unified interface where tools can be accessed and extended from a single platform.",
    stack: ["React", "TypeScript", "System Design"],
  },
  {
    title: "NMEA Analyzer",
    status: "Ongoing",
    desc: "A data parsing tool for analyzing structured NMEA GPS streams. Focused on decoding, validation, and interpretation of real-time navigation data with plans for integration into Origin Hub as a connected tool.",
    stack: ["Python", "Data Parsing", "Protocols"],
  },
  {
    title: "Final Year Project — Helmet Detection System",
    status: "Completed",
    desc: "Computer vision-based system for detecting helmet usage in riders using YOLO-based object detection. Designed for identifying both rider and pillion helmet compliance using video/image input.",
    stack: ["Python", "YOLO", "Computer Vision"],
  },
];

const statusTone: Record<string, string> = {
  "Active Development": "bg-primary/20 text-primary-foreground border-primary/40",
  Ongoing: "bg-accent/20 text-accent-foreground border-accent/40",
  Completed: "bg-secondary/20 text-secondary-foreground border-secondary/40",
};

const Projects = () => (
  <PageShell
    eyebrow="Projects"
    title={
      <>
        Systems & <span className="text-gradient">Tools</span>
      </>
    }
    subtitle="A mix of core system design work, standalone engineering tools, and academic projects."
    prev={{ label: "Portfolio", to: "/portfolio" }}
    next={{ label: "Lab_Gallery", to: "/Lab_Gallery" }}
  >
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <Card
          key={p.title}
          className="glass animate-fade-up border-primary/20 p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          style={{ animationDelay: `${0.08 * i}s` }}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold">
              {p.title}
            </h3>

            <Badge variant="outline" className={statusTone[p.status]}>
              {p.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {p.desc}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-card/40 px-2 py-0.5 text-xs text-muted-foreground"
              >
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