import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Code2, Palette, Rocket } from "lucide-react";

const About = () => (
  <PageShell
    eyebrow="About the Dev"
    title={<>Crafted by a <span className="text-gradient">curious mind</span></>}
    subtitle="Origin Hub is a one-person love letter to thoughtful software — designed, engineered and refined with care."
    prev={{ label: "Secure", to: "/secure" }}
    next={{ label: "See Portfolio", to: "/portfolio" }}
  >
    <div className="grid gap-6 md:grid-cols-3">
      {[
        { icon: Code2, title: "Engineer", desc: "Full-stack craftsmanship across React, TypeScript, Node and edge runtimes." },
        { icon: Palette, title: "Designer", desc: "Pixel-pushing perfectionist with a soft spot for typography and motion." },
        { icon: Rocket, title: "Builder", desc: "Ships small, ships often, and obsesses over the last 10% nobody else does." },
      ].map((it, i) => (
        <Card
          key={it.title}
          className="glass animate-fade-up border-primary/20 p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          style={{ animationDelay: `${0.1 * i}s` }}
        >
          <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-secondary/30 to-accent/30 ring-1 ring-primary/30">
            <it.icon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl font-semibold">{it.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
        </Card>
      ))}
    </div>

    <Card className="glass mt-10 border-primary/20 p-8">
      <h3 className="font-display text-2xl font-semibold">The Story</h3>
      <p className="mt-3 text-muted-foreground">
        Origin Hub started as a simple frustration: too many tabs, too many tools, too many silos.
        It evolved into a constellation — a single point of origin where everything you use can finally
        find each other. This is software built for the way real people actually live and work.
      </p>
    </Card>
  </PageShell>
);

export default About;
