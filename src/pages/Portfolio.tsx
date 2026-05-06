import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Nebula CRM",
    desc: "A luminous CRM with real-time pipelines and AI summaries.",
    tags: ["React", "Supabase", "AI"],
  },
  {
    title: "Pulse Analytics",
    desc: "Beautiful dashboards that turn raw data into stories.",
    tags: ["TypeScript", "D3", "Edge Functions"],
  },
  {
    title: "Lumen Chat",
    desc: "Encrypted messaging with cinematic transitions.",
    tags: ["WebRTC", "Tailwind", "Framer Motion"],
  },
  {
    title: "Atlas Notes",
    desc: "A spatial note-taking canvas for thinkers.",
    tags: ["Canvas", "React", "PWA"],
  },
];

const Portfolio = () => {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="animate-fade-up font-display text-5xl font-bold md:text-6xl">
          <span className="text-gradient">Portfolio</span>
        </h1>
        <p className="animate-fade-up mt-4 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.1s" }}>
          A selection of projects exploring connection, clarity and motion.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Card
              key={p.title}
              className="glass animate-fade-up group border-primary/20 p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Button size="sm" variant="outline" className="border-primary/40">
                  <ExternalLink className="mr-1 h-4 w-4" /> Live
                </Button>
                <Button size="sm" variant="ghost">
                  <Github className="mr-1 h-4 w-4" /> Code
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Portfolio;
