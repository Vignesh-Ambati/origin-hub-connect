import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Server,
  Workflow,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  ExternalLink,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import { toast } from "sonner";

const skillCategories = [
  {
    title: "Systems & Networking",
    icon: Cpu,
    skills: ["C", "Python", "TCP/UDP Sockets", "POSIX Threads", "ARINC 615A/665", "Packet Sniffing", "Linux IPC", "Virtual Serial (PTY)"],
  },
  {
    title: "Full-Stack & Frontend",
    icon: Code2,
    skills: ["TypeScript", "React 18", "Vite", "Tailwind CSS", "HTML5 / CSS3", "REST APIs", "Web Crypto API", "Radix UI"],
  },
  {
    title: "Backend & Data Pipelines",
    icon: Server,
    skills: ["Flask", "Node.js", "Express", "NMEA 0183 Decoders", "Log Rotation", "MQTT", "PostgreSQL", "JSON Schema"],
  },
  {
    title: "DevOps & Engineering Tools",
    icon: Terminal,
    skills: ["Git", "Docker", "GitHub Actions CI/CD", "Wireshark", "GDB", "Linux Shell / Bash", "VS Code"],
  },
];

const About = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  return (
    <PageShell
      eyebrow="Engineer Profile"
      title="Vignesh Ambati — Systems & Software Engineer"
      subtitle="Engineering systems-level communication protocols, high-volume telemetry backends, and unified productivity interfaces."
      prev={{ label: "Portfolio", to: "/portfolio" }}
      next={{ label: "Experiment Labs", to: "/Lab_Gallery" }}
    >
      {/* Bio Card */}
      <Card className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl font-bold text-foreground">Sai Vigneswar Ambati</h3>
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-xs">
                Systems Engineer
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Software and systems engineer with hands-on experience in C, Python, and TypeScript. Specializing in low-level communication protocols (ARINC 615A/665, NMEA 0183), network-socket pipelines, and secure full-stack software architecture.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Origin-Hub is an independently engineered platform designed to eliminate fragmented workflows by providing a single, luminous, client-encrypted interface for tools, credentials, and telemetry streams.
            </p>
          </div>

          {/* Quick Contact Card */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2.5 shrink-0 text-xs sm:w-64">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Direct Contact</span>

            <div className="flex items-center justify-between text-foreground">
              <span className="truncate max-w-[170px]">saivigneswar123123@gmail.com</span>
              <button
                type="button"
                onClick={() => copyToClipboard("saivigneswar123123@gmail.com", "Email")}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Copy email"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-foreground">
              <span>+91-7674898208</span>
              <button
                type="button"
                onClick={() => copyToClipboard("+917674898208", "Phone")}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Copy phone"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="pt-2 border-t border-border/80 flex items-center gap-2">
              <a
                href="https://github.com/Vignesh-Ambati"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <span className="opacity-40">·</span>
              <a
                href="https://www.linkedin.com/in/vigneshambati/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* Technical Skills Matrix */}
      <div className="mb-8">
        <h3 className="font-display text-base font-semibold text-foreground mb-4">
          Technical Competencies & Matrix
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => (
            <Card key={cat.title} className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary">
                  <cat.icon className="h-3.5 w-3.5" />
                </div>
                <h4 className="text-xs font-semibold text-card-foreground">{cat.title}</h4>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Engineering Story */}
      <Card className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <h3 className="font-display text-lg font-semibold text-card-foreground">
          Origin-Hub Vision & Engineering Approach
        </h3>

        <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Origin-Hub began as a direct response to context switching in engineering workflows: switching between isolated API consoles, managing credentials in disparate files, and lacking a structured operational layer.
          </p>
          <p>
            By consolidating quick action utilities, encrypted client-side storage, and custom workspace hubs, Origin-Hub serves as an active daily driver for development, protocol parsing, and telemetry experiments.
          </p>
        </div>

        <div className="mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">
            “Built for speed, reliability, and security — from byte-level packet loaders to modern reactive web interfaces.”
          </p>
          <p className="mt-1">— Vignesh Ambati, Lead Engineer</p>
        </div>
      </Card>
    </PageShell>
  );
};

export default About;
