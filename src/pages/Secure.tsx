import { Shield, Lock, Eye, KeyRound } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";

const items = [
  { icon: Lock, title: "End-to-End", desc: "Your data is encrypted on your device before it ever leaves it." },
  { icon: Eye, title: "Zero-Knowledge", desc: "We can't read what we can't decrypt — privacy is mathematical, not promised." },
  { icon: KeyRound, title: "Your Keys", desc: "Hold your own keys with optional self-custody and hardware key support." },
  { icon: Shield, title: "Hardened", desc: "Independently audited, SOC2-ready, with every dependency hash-pinned." },
];

const Secure = () => (
  <PageShell
    eyebrow="Step 03 — Secure"
    title={<><span className="text-gradient">Secure</span> by default</>}
    subtitle="End-to-end encryption with privacy-first architecture out of the box."
    prev={{ label: "Instant", to: "/instant" }}
    next={{ label: "Meet the Dev", to: "/about" }}
  >
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
          <h3 className="font-display text-xl font-semibold">{it.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
        </Card>
      ))}
    </div>
  </PageShell>
);

export default Secure;
