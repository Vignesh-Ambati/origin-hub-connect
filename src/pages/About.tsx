import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Code2, Server, Workflow } from "lucide-react";

const About = () => (
  <PageShell
    eyebrow="About the dev"
    title={
      <>
        Built by a <span className="text-gradient">software engineer</span>
      </>
    }
    subtitle={
      <>
        Origin Hub is a personal engineering project focused on designing and building
        a unified system for workflows, tools, and data to make myself convenient and making the worklife smooth and easier.
        It is developed independently to explore and apply concepts in{" "}
        <span className="text-gradient">
          system design, backend architecture,
        </span> and <span className="text-gradient"> try full-stack development</span>
      </>
    }
    prev={{ label: "Secure Vault", to: "/vault" }}
    next={{ label: "Portfolio", to: "/portfolio" }}
  >
    {/* Core Focus */}
    <div className="grid gap-6 md:grid-cols-3">
      {[
        {
          icon: Code2,
          title: "Systems Programming",
          desc: "Experience working with C and Python in systems-level environments, focusing on communication protocols, multithreading, and performance-critical components. These principles directly influence the design and implementation approach used in Origin Hub.",
        },
        {
          icon: Server,
          title: "Backend & Data Processing",
          desc: "Built backend services and data processing workflows involving APIs, log parsing, file handling, and network-based communication systems. Origin Hub extends these concepts into a structured, unified application architecture.",
        },
        {
          icon: Workflow,
          title: "Networking & Communication Systems",
          desc: "Worked with TCP/UDP and SSH-based communication systems involving packet-level debugging, message parsing, and reliable data transmission. These experiences inform how data flow and interaction layers are structured in Origin Hub.",
        },
      ].map((it, i) => (
        <Card
          key={it.title}
          className="glass animate-fade-up border-primary/20 p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          style={{ animationDelay: `${0.1 * i}s` }}
        >
          <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-secondary/30 to-accent/30 ring-1 ring-primary/30">
            <it.icon className="h-5 w-5" />
          </div>

          <h3 className="font-display text-xl font-semibold">
            {it.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {it.desc}
          </p>
        </Card>
      ))}
    </div>

    {/* Story Section */}
    <Card className="glass mt-10 border-primary/20 p-8">
      <h3 className="font-display text-2xl font-semibold">
        Motivation
      </h3>

      <p className="mt-3 text-muted-foreground leading-relaxed">
        Origin Hub began as a response to fragmented workflows — switching between tools,
        managing disconnected systems, and lacking a unified structure for everyday tasks.
        This project is an attempt to design a more coherent digital workspace where
        tools and actions are intentionally connected.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        It is also a hands-on exploration of system design principles, backend architecture,
        and practical full-stack engineering, built incrementally as features evolve.
      </p>
    </Card>
    <div className="mt-16 flex justify-center">
      <div className="max-w-3xl text-center">

        {/* Large Quote */}
        <p className="text-2xl md:text-2xl font-medium leading-relaxed text-foreground">
          “This project was an initiative to make my day-to-day workflows easier and more organized, while also giving me hands-on experience to learn and build things step by step as I progress.”
        </p>

        {/* Signature */}
        <div className="mt-8 flex items-center justify-end">
          <div className="text-right">
            <div className="h-px w-16 bg-gradient-to-l from-primary to-transparent ml-auto mb-2" />
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              —— DEV
            </p>
          </div>
        </div>

      </div>
    </div>
  </PageShell>
);

export default About;