import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";

const posts = [
  { title: "Designing the Constellation", date: "May 1, 2026", read: "6 min", tag: "Design", excerpt: "How I landed on a star-network metaphor for connecting every part of your digital life." },
  { title: "Edge-First, Always", date: "Apr 18, 2026", read: "8 min", tag: "Engineering", excerpt: "Why every Origin Hub request hits an edge before it hits a server, and how that shaped our stack." },
  { title: "The Privacy Math", date: "Mar 30, 2026", read: "5 min", tag: "Security", excerpt: "A friendly tour of zero-knowledge encryption — and why you should expect it from every modern app." },
  { title: "Shipping in Public", date: "Mar 12, 2026", read: "4 min", tag: "Journal", excerpt: "Lessons from building Origin Hub one tiny commit at a time, in front of an audience." },
];

const Blog = () => (
  <PageShell
    eyebrow="Blog"
    title={<>Notes from the <span className="text-gradient">workshop</span></>}
    subtitle="Essays on design, code and the craft of shipping software with soul."
    prev={{ label: "Projects", to: "/projects" }}
    next={{ label: "Back Home", to: "/" }}
  >
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((p, i) => (
        <Card
          key={p.title}
          className="glass animate-fade-up group border-primary/20 p-7 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          style={{ animationDelay: `${0.07 * i}s` }}
        >
          <span className="text-xs uppercase tracking-widest text-accent">{p.tag}</span>
          <h3 className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-gradient">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {p.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.read}</span>
          </div>
        </Card>
      ))}
    </div>
  </PageShell>
);

export default Blog;
