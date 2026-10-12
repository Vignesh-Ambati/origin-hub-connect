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
    eyebrow="Workspace Architecture"
    title="Smart Workspace for everything you use"
    subtitle="Create a personalized hub where your tools, links, and workflows are organized for fast, structured access — built to evolve into a dynamic productivity system."
    prev={{ label: "Home", to: "/" }}
    next={{ label: "Quick Actions", to: "/actions" }}
  >
    {/* Intro Section */}
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-base text-muted-foreground leading-relaxed">
        The workspace is your central control layer. Instead of relying on scattered bookmarks
        or multiple browser tabs, you define what matters — and bring it into one structured interface.
        Add platforms, tools, or resources you frequently use, and access them instantly.
      </p>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        This starts as a customizable quick-access hub and is designed to evolve into a more
        intelligent system with dynamic data, integrations, and workflow automation.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((it) => (
        <Card
          key={it.title}
          className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <it.icon className="h-5 w-5" />
          </div>

          <h3 className="font-display text-lg font-semibold text-card-foreground">
            {it.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {it.desc}
          </p>
        </Card>
      ))}
    </div>

    {/* Status Note */}
    <div className="mt-12 rounded-xl border border-border bg-card/60 p-6 text-center">
      <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        <span className="font-semibold text-foreground">In active development:</span> The workspace will progressively support dynamic data streams, direct API hooks, and intelligent task grouping based on user workflows.
      </p>
    </div>
  </PageShell>
);

export default WorkSpace;
