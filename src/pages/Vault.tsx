import { Shield, Lock, Eye, KeyRound } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";

const items = [
  {
    icon: Lock,
    title: "Client-Side Encryption",
    desc: "Sensitive data is encrypted locally before storage or transmission, ensuring it remains protected throughout its lifecycle.",
  },
  {
    icon: Eye,
    title: "Restricted Visibility",
    desc: "Data is designed so that only the user can access and decrypt it, minimizing exposure at every layer of the system.",
  },
  {
    icon: KeyRound,
    title: "User-Controlled Access",
    desc: "Users retain control over their credentials and access methods, with support for secure authentication mechanisms.",
  },
  {
    icon: Shield,
    title: "Security-Focused Design",
    desc: "Built with a security-first architecture that emphasizes safe storage, controlled access, and reduced attack surface.",
  },
];

const Vault = () => (
  <PageShell
    eyebrow="Feature — Secure Vault"
    title={
      <>
        <span className="text-gradient">Secure Vault</span>
      </>
    }
    subtitle="A secure storage layer for sensitive data, credentials, and service connections with a privacy-first design approach."
    prev={{ label: "Quick Actions", to: "/instant" }}
    next={{ label: "About", to: "/about" }}
  >
    {/* Intro */}
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-muted-foreground leading-relaxed">
        Secure Vault is the protected layer of Origin Hub, designed for storing and
        managing sensitive information such as credentials and service connections.
        It is built with a privacy-first approach where data control remains with the user.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        The long-term goal is to evolve this into a full password manager system with
        secure storage, authentication workflows, and encrypted synchronization.
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

    {/* System Context Header */}
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-semibold">
        Security Model
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        How Secure Vault is designed within Origin Hub
      </p>
    </div>

    {/* System Context */}
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-border/50 bg-background/40 p-8 backdrop-blur">
        <h3 className="text-lg font-semibold">Data Protection</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Data is encrypted before leaving the client environment, ensuring that stored
          information remains protected during storage and transmission.
        </p>
      </div>

      <div className="rounded-2xl border border-border/50 bg-background/40 p-8 backdrop-blur">
        <h3 className="text-lg font-semibold">Architecture Role</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Secure Vault acts as the protected layer of the system, complementing Workspace
          (organization) and Quick Actions (execution).
        </p>
      </div>
    </div>

    {/* Footer Note */}
    <div className="mt-16 text-center">
      <p className="text-sm italic text-muted-foreground max-w-2xl mx-auto">
        This module is under active development and will evolve into a full-featured
        secure credential and data management system.
      </p>
    </div>
  </PageShell>
);

export default Vault;