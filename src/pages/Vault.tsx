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
    eyebrow="Security & Credentials"
    title="Secure Vault & Secrets Storage"
    subtitle="A secure storage layer for sensitive data, credentials, and service connections with a privacy-first design approach."
    prev={{ label: "Quick Actions", to: "/actions" }}
    next={{ label: "Engineering Projects", to: "/projects" }}
  >
    {/* Intro */}
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-base text-muted-foreground leading-relaxed">
        Secure Vault is the protected layer of Origin-Hub, designed for storing and
        managing sensitive information such as credentials and service connections.
        It is built with a privacy-first approach where data control remains with the user.
      </p>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        The long-term goal is to evolve this into a client-encrypted password and token management system with
        secure storage, authentication workflows, and encrypted synchronization.
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

    {/* System Context Header */}
    <div className="mt-14 text-center">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Security Architecture
      </h3>
      <p className="mt-1 font-display text-xl font-semibold text-foreground">
        How Secure Vault is designed within Origin-Hub
      </p>
    </div>

    {/* System Context */}
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-base font-semibold text-card-foreground">Zero-Knowledge Storage</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Data is encrypted before leaving the client environment, ensuring that stored credentials remain protected without unencrypted intermediaries.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-base font-semibold text-card-foreground">Architectural Role</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Secure Vault acts as the protected credential vault, complementing Workspace (organization) and Quick Actions (execution).
        </p>
      </div>
    </div>

    {/* Footer Note */}
    <div className="mt-12 rounded-xl border border-border bg-card/60 p-6 text-center">
      <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        This module is under active development and will evolve into a full-featured secure credential and encrypted key-value management system.
      </p>
    </div>
  </PageShell>
);

export default Vault;
