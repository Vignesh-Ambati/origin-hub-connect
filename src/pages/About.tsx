import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Code2, Server, Workflow } from "lucide-react";

const About = () => (
  <PageShell
    eyebrow="Engineering Background"
    title="Systems & Full-Stack Engineering"
    subtitle="Origin-Hub is an engineering project focused on designing and building a unified productivity architecture for workflows, tools, and credentials. Developed to explore and apply concepts in system design, distributed data protocols, and resilient software layers."
    prev={{ label: "Portfolio", to: "/portfolio" }}
    next={{ label: "Experiment Labs", to: "/Lab_Gallery" }}
  >
    {/* Core Focus */}
    <div className="grid gap-6 md:grid-cols-3">
      {[
        {
          icon: Code2,
          title: "Systems Programming",
          desc: "Experience working with C and Python in systems-level environments, focusing on communication protocols, multithreading, and performance-critical components. These principles directly influence the architecture used in Origin-Hub.",
        },
        {
          icon: Server,
          title: "Backend & Data Pipelines",
          desc: "Built backend services and data processing workflows involving APIs, log parsing, file rotation, and network-based communication systems. Origin-Hub extends these concepts into a structured, unified application architecture.",
        },
        {
          icon: Workflow,
          title: "Networking & Protocols",
          desc: "Worked with TCP/UDP and SSH-based communication systems involving packet-level debugging, message parsing, and reliable data transmission. These experiences inform how data flow and interaction layers are structured in Origin-Hub.",
        },
      ].map((it) => (
        <Card
          key={it.title}
          className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <it.icon className="h-5 w-5" />
          </div>

          <h3 className="font-display text-base font-semibold text-card-foreground">
            {it.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {it.desc}
          </p>
        </Card>
      ))}
    </div>

    {/* Motivation Story Section */}
    <Card className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <h3 className="font-display text-xl font-semibold text-card-foreground">
        Motivation & Architecture Goals
      </h3>

      <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Origin-Hub began as a direct response to fragmented workflows: switching between isolated utilities,
        managing disconnected dashboards, and lacking a single intentional operational surface for everyday engineering tasks.
        This project designs a coherent digital workspace where tools, actions, and security are intentionally connected.
      </p>

      <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
        It serves as a testbed for modular architecture, client-side encryption models, and lightweight dashboard design,
        progressing from an organized hub into an automated execution layer.
      </p>
    </Card>

    {/* Engineer Note */}
    <div className="mt-12 flex justify-center">
      <div className="max-w-2xl rounded-xl border border-border bg-card/60 p-6 text-center shadow-sm">
        <blockquote className="text-base sm:text-lg font-medium leading-relaxed text-foreground">
          “This project is an initiative to make day-to-day workflows organized and friction-free, while providing hands-on engineering experience in building robust, performant web and system architectures.”
        </blockquote>
        <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
          — Lead Engineer & Builder
        </p>
      </div>
    </div>
  </PageShell>
);

export default About;
