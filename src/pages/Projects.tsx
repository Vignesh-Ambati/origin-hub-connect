import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Origin-Hub (Core System)",
    status: "Active Development",
    desc: "A central system designed to act as an integration layer for multiple tools and workflows. The goal is to connect standalone utilities and applications into a unified interface where tools can be accessed and extended from a single platform.",
    stack: ["React", "TypeScript", "System Design"],
  },
  {
    title: "NMEA Analyzer",
    status: "Ongoing",
    desc: "A data parsing tool for analyzing structured NMEA GPS streams. Focused on decoding, validation, and interpretation of real-time navigation data with plans for integration into Origin-Hub as a connected tool.",
    stack: ["Python", "Data Parsing", "Protocols"],
  },
  {
    title: "Helmet Compliance Detection System",
    status: "Completed",
    desc: "Computer vision-based safety verification system for detecting helmet compliance in two-wheeler riders using YOLO object detection models. Designed for automated analysis over video and static image inputs.",
    stack: ["Python", "YOLO", "Computer Vision"],
  },
];

const statusTone: Record<string, string> = {
  "Active Development": "bg-primary/15 text-primary border-primary/30",
  Ongoing: "bg-accent/15 text-accent border-accent/30",
  Completed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
};

const Projects = () => (
  <PageShell
    eyebrow="Engineering Projects"
    title="Systems, Protocols & Tools"
    subtitle="A collection of core system design projects, protocol parsers, and computer vision utilities."
    prev={{ label: "Vault", to: "/vault" }}
    next={{ label: "Portfolio", to: "/portfolio" }}
  >
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p) => (
        <Card
          key={p.title}
          className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-card-foreground">
              {p.title}
            </h3>

            <Badge variant="outline" className={`font-medium ${statusTone[p.status]}`}>
              {p.status}
            </Badge>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {p.desc}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium text-muted-foreground"
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
