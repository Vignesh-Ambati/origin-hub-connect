import { Layers, Link2, Workflow, Users } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";

const items = [
  {
    icon: Layers,
    title: "Custom Workspace",
    desc: "Build your own workspace by adding the tools and links you use daily. From platforms like LeetCode or GitHub to internal tools, everything lives in one place for instant access.",
  },
  {
    icon: Link2,
    title: "Quick Access Links",
    desc: "Add, organize, and access your frequently used resources without friction. No more searching through tabs — everything is structured and available exactly where you need it.",
  },
  {
    icon: Workflow,
    title: "Evolving Workflows",
    desc: "Start simple with manual organization, and gradually move towards smarter workflows. The system is designed to evolve from static links to dynamic, automated interactions.",
  },
  {
    icon: Users,
    title: "Scalable Foundation",
    desc: "Designed to grow beyond personal use — future iterations will support shared workspaces, integrations, and real-time data-driven experiences.",
  },
];

const WorkSpace = () => (
  <PageShell
    eyebrow="Feature — Workspace"
    title={
      <>
        <span className="text-gradient">Smart Workspace</span> for everything you use
      </>
    }
    subtitle="Create a personalized hub where your tools, links, and workflows are organized for fast, structured access — built to evolve into a dynamic system."
    prev={{ label: "Home", to: "/" }}
    next={{ label: "Next: Actions", to: "/Actions" }}
  >
    {/* Intro Section */}
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-muted-foreground leading-relaxed">
        The workspace is your central control layer. Instead of relying on scattered bookmarks
        or multiple tabs, you define what matters — and bring it into one structured interface.
        Add platforms, tools, or resources you frequently use, and access them instantly.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        This starts as a customizable quick-access hub and is designed to evolve into a more
        intelligent system with dynamic data, integrations, and workflow automation.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((it, i) => (
        <Card
          key={it.title}
          className="glass animate-fade-up group border-primary/20 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
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

    {/* Future Note */}
    <div className="mt-16 text-center">
      <p className="text-sm italic text-muted-foreground max-w-2xl mx-auto">
        Currently in development — the workspace will progressively support dynamic data,
        integrations, and intelligent actions based on user behavior and connected services.
      </p>
    </div>
  </PageShell>
);

export default WorkSpace;