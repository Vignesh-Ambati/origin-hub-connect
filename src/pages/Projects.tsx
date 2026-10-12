import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Cpu,
  Layers,
  Terminal,
  Activity,
  Play,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

interface ProjectDetail {
  id: string;
  title: string;
  status: "Active Development" | "Production Ready" | "Completed" | "Ongoing";
  desc: string;
  architecture: string[];
  highlights: string[];
  stack: string[];
}

const detailedProjects: ProjectDetail[] = [
  {
    id: "origin-hub",
    title: "Origin-Hub (Core Unified Ecosystem)",
    status: "Active Development",
    desc: "A centralized, client-encrypted operational platform integrating developer tools, protocol utilities, and secret management into an enterprise SaaS surface.",
    architecture: [
      "Vite + React 18 SPA with TypeScript strict typing",
      "Tailwind CSS with shared CSS variable tokens (Light & Dark)",
      "Zero-dependency client-side Web Crypto AES/SHA-256 storage",
      "Multi-environment deployment: Docker, Cloud Run, and GitHub Pages",
    ],
    highlights: [
      "Dynamic subpath routing for custom domains and GitHub Pages",
      "Strict Content-Security-Policy & HSTS enforcement",
      "Accessible WCAG AA contrast ratios and reduced-motion detection",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Docker", "Node 22"],
  },
  {
    id: "nmea-parser",
    title: "NMEA 0183 Real-Time GPS Protocol Analyzer",
    status: "Ongoing",
    desc: "A stream decoding engine designed to parse, validate, and extract real-time navigation telemetry from NMEA 0183 GPS/GNSS receiver streams.",
    architecture: [
      "Custom XOR checksum validator for talker sentences",
      "Multi-sentence parsing: $GPGGA (Fix), $GPRMC (Navigation), $GPVTG (Speed)",
      "Coordinate conversion: DDMM.MMMM to Decimal Degrees (WGS 84)",
      "High-throughput serial and UDP socket ingestion stream",
    ],
    highlights: [
      "Calculates UTC fix time, latitude/longitude, altitude, and HDOP",
      "Detects GPS fix quality (Autonomous, DGPS, RTK)",
    ],
    stack: ["Python", "C", "NMEA 0183", "Sockets", "Data Parsing"],
  },
  {
    id: "helmet-yolo",
    title: "Two-Wheeler Helmet Compliance Detection System",
    status: "Completed",
    desc: "An automated computer vision surveillance system utilizing YOLO object detection to identify helmet compliance for both rider and pillion passengers in video streams.",
    architecture: [
      "Trained on custom annotated traffic dataset of 12,000+ bounding boxes",
      "Multi-class classification: Rider, Pillion, Helmet, No-Helmet",
      "Real-time inference optimization achieving 32+ FPS on edge GPU hardware",
      "Temporal tracking to eliminate duplicate camera trigger events",
    ],
    highlights: [
      "Achieved 91.4% mAP@0.5 precision on varied lighting conditions",
      "Automated license plate region cropping upon violation trigger",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "PyTorch", "Computer Vision"],
  },
  {
    id: "arINC-system",
    title: "ARINC 615A/665 Protocol Data Loader System",
    status: "Completed",
    desc: "Systems engineering implementation of avionics standard data loading protocols over Ethernet and wireless networks using C and Python.",
    architecture: [
      "ARINC 615A protocol state machine (FIND, INFORMATION, UPLOAD, DOWNLOAD)",
      "ARINC 665 loadable software part file formatting and integrity validation",
      "Multi-threaded POSIX socket architecture with sliding window timeouts",
      "Packet-level byte alignment and network-to-host endianness conversions",
    ],
    highlights: [
      "Reliable TFTP / UDP packet retransmission with exponential backoff",
      "Zero packet corruption verified over 100+ GB stress load tests",
    ],
    stack: ["C", "Python", "POSIX Threads", "ARINC 615A/665", "UDP/IP"],
  },
];

const statusTones: Record<string, string> = {
  "Active Development": "bg-primary/15 text-primary border-primary/30",
  "Production Ready": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  Ongoing: "bg-accent/15 text-accent border-accent/30",
  Completed: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
};

interface ParsedNmeaResult {
  talker: string;
  timeUTC: string;
  latitude: string;
  longitude: string;
  fixQuality: string;
  satellites: string;
  hdop: string;
  altitude: string;
}

const Projects = () => {
  // Interactive NMEA parser demo
  const [nmeaSample, setNmeaSample] = useState("$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47");
  const [parsedNmea, setParsedNmea] = useState<ParsedNmeaResult | null>(null);

  const testParseNmea = () => {
    try {
      const parts = nmeaSample.trim().split(",");
      if (parts[0] !== "$GPGGA") {
        toast.error("Please provide a valid $GPGGA sentence.");
        return;
      }

      // Latitude: 4807.038, N -> 48 deg 07.038 min
      const rawLat = parts[2] || "";
      const latDir = parts[3] || "N";
      const latDeg = rawLat.slice(0, 2);
      const latMin = rawLat.slice(2);
      const decimalLat = (parseFloat(latDeg) + parseFloat(latMin) / 60) * (latDir === "S" ? -1 : 1);

      // Longitude: 01131.000, E
      const rawLon = parts[4] || "";
      const lonDir = parts[5] || "E";
      const lonDeg = rawLon.slice(0, 3);
      const lonMin = rawLon.slice(3);
      const decimalLon = (parseFloat(lonDeg) + parseFloat(lonMin) / 60) * (lonDir === "W" ? -1 : 1);

      const fixQualityMap: Record<string, string> = {
        "0": "Invalid Fix",
        "1": "GPS SPS Mode (Standard)",
        "2": "Differential GPS (DGPS)",
        "3": "PPS Mode",
        "4": "RTK Fixed",
        "5": "RTK Float",
      };

      setParsedNmea({
        talker: parts[0],
        timeUTC: `${parts[1]?.slice(0, 2)}:${parts[1]?.slice(2, 4)}:${parts[1]?.slice(4, 6)} UTC`,
        latitude: `${decimalLat.toFixed(6)}° (${rawLat} ${latDir})`,
        longitude: `${decimalLon.toFixed(6)}° (${rawLon} ${lonDir})`,
        fixQuality: fixQualityMap[parts[6]] || `Code ${parts[6]}`,
        satellites: parts[7] || "0",
        hdop: parts[8] || "N/A",
        altitude: `${parts[9]} ${parts[10] || "M"}`,
      });
      toast.success("NMEA $GPGGA decoded successfully");
    } catch {
      toast.error("Error parsing NMEA sentence structure");
    }
  };

  return (
    <PageShell
      eyebrow="Engineering Portfolio & Systems"
      title="Systems, Protocols & Architectures"
      subtitle="Detailed technical breakdowns of core system designs, avionic protocols, GPS parsing pipelines, and computer vision models."
      prev={{ label: "Vault", to: "/vault" }}
      next={{ label: "Portfolio", to: "/portfolio" }}
    >
      {/* Interactive NMEA Parser Tool Demo */}
      <Card className="mb-10 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold text-card-foreground">
              Interactive Test: NMEA 0183 Telemetry Parser
            </h3>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">Real-Time Coordinate Conversion</span>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Test the live decoding algorithm used in the NMEA GPS Analyzer project. Paste or inspect the sample GPS sentence below:
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={nmeaSample}
            onChange={(e) => setNmeaSample(e.target.value)}
            className="font-mono text-xs bg-background"
            placeholder="$GPGGA,..."
          />
          <Button size="sm" onClick={testParseNmea} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 text-xs">
            <Play className="h-3 w-3" />
            <span>Decode Sentence</span>
          </Button>
        </div>

        {parsedNmea && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 rounded-lg border border-border/80 bg-muted/40 p-4 font-mono text-xs">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-sans font-semibold">UTC Fix Time</span>
              <p className="font-semibold text-foreground mt-0.5">{parsedNmea.timeUTC}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-sans font-semibold">Decoded Latitude</span>
              <p className="font-semibold text-foreground mt-0.5">{parsedNmea.latitude}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-sans font-semibold">Decoded Longitude</span>
              <p className="font-semibold text-foreground mt-0.5">{parsedNmea.longitude}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-sans font-semibold">Altitude & Sats</span>
              <p className="font-semibold text-foreground mt-0.5">{parsedNmea.altitude} · {parsedNmea.satellites} Sats</p>
            </div>
          </div>
        )}
      </Card>

      {/* Projects Deep Dive */}
      <div className="space-y-6">
        {detailedProjects.map((p) => (
          <Card
            key={p.id}
            className="rounded-xl border border-border bg-card p-6 shadow-xs transition-all hover:border-primary/40"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <Badge variant="outline" className={`shrink-0 font-medium ${statusTones[p.status]}`}>
                {p.status}
              </Badge>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 border-t border-border/60 pt-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Architecture Specifications
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {p.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {p.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-mono text-muted-foreground"
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
};

export default Projects;
