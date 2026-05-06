import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Code2, Palette, Rocket } from "lucide-react";

const About = () => {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="animate-fade-up font-display text-5xl font-bold md:text-6xl">
          About <span className="text-gradient">Origin Hub</span>
        </h1>
        <p className="animate-fade-up mt-6 text-lg text-muted-foreground" style={{ animationDelay: "0.1s" }}>
          Origin Hub is the constellation that ties every tool, contact and workflow together.
          Born from the idea that great experiences should feel inevitable, it brings calm to digital chaos.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Rocket, title: "Mission", desc: "Make every connection effortless and beautiful." },
            { icon: Palette, title: "Design", desc: "Cosmic minimalism with purposeful motion." },
            { icon: Code2, title: "Craft", desc: "Built with React, Tailwind and a love for detail." },
          ].map((f, i) => (
            <Card
              key={f.title}
              className="glass animate-fade-up border-primary/20 p-6"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <f.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl font-bold">About the Developer</h2>
          <p className="mt-4 text-muted-foreground">
            A solo developer obsessed with thoughtful interfaces, performant code, and the quiet
            magic that happens when design and engineering align. Origin Hub is a personal universe
            built to connect everything that matters.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
