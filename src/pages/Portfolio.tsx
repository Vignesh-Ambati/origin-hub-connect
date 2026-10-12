import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const works = [
  {
    title: "Protocol-Based Communication System",
    tag: "Systems Engineering",
    desc: "Developed Python and C-based systems for ARINC 615A/665/826 communication protocols using TCP/UDP over Ethernet and wireless channels. Included packet structuring, retry mechanisms, timeout handling, and multi-threaded data transmission workflows.",
  },
  {
    title: "Real-Time Data Monitoring & Control UI",
    tag: "Systems + UI",
    desc: "Built Linux-based real-time monitoring interfaces for hardware validation systems using shared memory, virtual serial pipelines, and IPC. Implemented live parameter visualization, USB detection, OTA software updates, and input handling systems.",
  },
  {
    title: "Secure Embedded Web System Hardening",
    tag: "Security Engineering",
    desc: "Worked on securing a Linux-based web system by mitigating OWASP Top 10 vulnerabilities including LFI, XSS, DoS, insecure ports, and plaintext exposure. Implemented TLS, RBAC, input validation, encryption, and security header enforcement.",
  },
  {
    title: "High-Volume Data Backend System",
    tag: "Backend Engineering",
    desc: "Designed and maintained Flask-based backend systems for high-volume log processing (~GB scale daily). Implemented scheduled file rotation, archival pipelines, MQTT/SSH-based communication, and large-scale data transfer workflows.",
  },
  {
    title: "Protocol Integration & Satellite Communication Layer",
    tag: "Networking Systems",
    desc: "Contributed to application-layer development for satellite and TDMA/ALOHA-based systems. Worked on message parsing, encryption integration, and reliable data transmission over constrained communication channels.",
  },
];

const Portfolio = () => (
  <PageShell
    eyebrow="Applied Portfolio"
    title="Engineering Experience & Systems"
    subtitle="A collection of system-level, backend, and data-driven work built through real-world engineering experience and applied problem solving."
    prev={{ label: "Projects", to: "/projects" }}
    next={{ label: "About", to: "/about" }}
  >
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {works.map((w) => (
        <Card
          key={w.title}
          className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {w.tag}
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>

          <h3 className="mt-3 font-display text-base font-semibold text-card-foreground">
            {w.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {w.desc}
          </p>
        </Card>
      ))}
    </div>
  </PageShell>
);

export default Portfolio;
