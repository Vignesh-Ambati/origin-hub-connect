import { Mail, Phone, Linkedin, Instagram, Twitter, Github, Send } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="animate-fade-up font-display text-5xl font-bold md:text-6xl">
          Get in <span className="text-gradient">touch</span>
        </h1>
        <p className="animate-fade-up mt-4 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.1s" }}>
          Questions, ideas, or just saying hi — every message lands at the origin.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card className="glass border-primary/20 p-8 animate-fade-up">
            <h2 className="font-display text-2xl font-semibold">Send a message</h2>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="bg-input/60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" className="bg-input/60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} className="bg-input/60" />
              </div>
              <Button className="w-full bg-gradient-to-r from-secondary via-primary to-accent shadow-glow">
                Send <Send className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="glass border-primary/20 p-6 animate-fade-up">
              <h3 className="font-display text-lg font-semibold">Direct</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:hello@originhub.dev" className="hover:text-foreground">hello@originhub.dev</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+10000000000" className="hover:text-foreground">+1 (000) 000-0000</a>
                </li>
              </ul>
            </Card>

            <Card className="glass border-primary/20 p-6 animate-fade-up">
              <h3 className="font-display text-lg font-semibold">Social</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
