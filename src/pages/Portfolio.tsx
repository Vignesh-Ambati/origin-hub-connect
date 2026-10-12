import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface WorkItem {
  id: string;
  title: string;
  tag: string;
  metric: string;
  desc: string;
  keyResponsibilities: string[];
  techStack: string[];
}

const detailedWorks: WorkItem[] = [
  {
    id: "work-1",
    title: "Protocol-Based Communication System",
    tag: "Systems Engineering",
    metric: "100+ GB Stress Tested",
    desc: "Engineered Python and C-based data loading implementations for ARINC 615A/665/826 avionics protocols over Ethernet and wireless transmission mediums.",
    keyResponsibilities: [
      "Designed sliding window UDP packet structuring and timeout retransmission loops",
      "Built multi-threaded socket pipelines to support simultaneous target unit communication",
      "Implemented CRC-16 and CRC-32 checksum calculations to prevent file transmission corruption",
    ],
    techStack: ["C", "Python", "ARINC 615A/665", "UDP/IP Sockets", "Wireshark"],
  },
  {
    id: "work-2",
    title: "Real-Time Data Monitoring & Control UI",
    tag: "Systems + UI",
    metric: "<5ms IPC Latency",
    desc: "Built a Linux-based real-time telemetry display and control interface for hardware validation systems using POSIX shared memory and virtual serial pipelines.",
    keyResponsibilities: [
      "Engineered inter-process communication (IPC) through POSIX shared memory and message queues",
      "Implemented live sensor parameter visualization and real-time state machine graphing",
      "Integrated udev USB hotplug event triggers and OTA firmware validation workflows",
    ],
    techStack: ["Linux IPC", "Python", "Virtual PTY", "Shared Memory", "POSIX"],
  },
  {
    id: "work-3",
    title: "Secure Embedded Web System Hardening",
    tag: "Security Engineering",
    metric: "OWASP Top 10 Mitigated",
    desc: "Audited and secured an embedded Linux web service against OWASP Top 10 vulnerabilities including LFI, XSS, insecure ports, and plaintext token exposure.",
    keyResponsibilities: [
      "Enforced TLS 1.3 cryptographic cipher suites and automated HTTP-to-HTTPS redirect",
      "Constructed Role-Based Access Control (RBAC) middleware with sanitized input boundaries",
      "Configured strict HTTP response headers: CSP, HSTS, X-Frame-Options, and Referrer-Policy",
    ],
    techStack: ["Security Hardening", "TLS 1.3", "RBAC", "Cryptographic Ciphers", "Linux"],
  },
  {
    id: "work-4",
    title: "High-Volume Data Backend Pipeline",
    tag: "Backend Engineering",
    metric: "~GB Daily Scale",
    desc: "Designed and operated a Flask-based backend daemon for high-throughput log ingestion, automated compression, and scheduled archival pipelines.",
    keyResponsibilities: [
      "Engineered automated log rotation with size thresholds and gzip compression buffers",
      "Built reliable asynchronous message delivery pipelines utilizing MQTT and SSH protocols",
      "Reduced disk I/O bottlenecks by implementing batch database writes and memory caches",
    ],
    techStack: ["Flask", "Python", "MQTT", "Log Rotation", "SQLite/PostgreSQL"],
  },
  {
    id: "work-5",
    title: "Protocol Integration & Satellite Layer",
    tag: "Networking Systems",
    metric: "Slotted-ALOHA Protocol",
    desc: "Developed application-layer communication models for satellite and TDMA/ALOHA-based packet networks over bandwidth-constrained links.",
    keyResponsibilities: [
      "Implemented message parsing and packet fragmentation for high-latency, low-bandwidth links",
      "Integrated lightweight payload encryption without exceeding maximum transmission units (MTU)",
      "Modeled collision recovery algorithms and exponential backoff retry mechanisms",
    ],
    techStack: ["Networking", "TDMA", "ALOHA", "Packet Slicing", "Encryption"],
  },
];

const Portfolio = () => {
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "Systems Engineering", "Systems + UI", "Security Engineering", "Backend Engineering", "Networking Systems"];

  const filtered = detailedWorks.filter((w) => selectedTag === "All" || w.tag === selectedTag);

  return (
    <PageShell
      eyebrow="Applied Portfolio"
      title="Engineering Experience & Systems"
      subtitle="A collection of system-level, backend, and security-critical engineering initiatives built through hands-on technical problem solving."
      prev={{ label: "Projects", to: "/projects" }}
      next={{ label: "About", to: "/about" }}
    >
      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            type="button"
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              selectedTag === t
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((w) => (
          <Card
            key={w.id}
            className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-all hover:border-primary/40"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {w.tag}
                </span>

                <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                  {w.metric}
                </Badge>
              </div>

              <h3 className="mt-3 font-display text-base font-semibold text-card-foreground">
                {w.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {w.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-border/60">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Core Technical Scope
                </h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {w.keyResponsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1 pt-3 border-t border-border/60">
              {w.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
};

export default Portfolio;
