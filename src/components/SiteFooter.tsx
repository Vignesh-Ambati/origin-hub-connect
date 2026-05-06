import { Github, Linkedin, Mail, Phone, Instagram, Twitter, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative z-10 border-t border-border/50 bg-background/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-secondary via-primary to-accent">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
              <span className="text-gradient">Origin Hub</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Where all your needs connect — a single luminous origin for everything you do.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              About the Dev
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-foreground/80 transition-colors hover:text-foreground">About</Link></li>
              <li><Link to="/portfolio" className="text-foreground/80 transition-colors hover:text-foreground">Portfolio</Link></li>
              <li><Link to="/login" className="text-foreground/80 transition-colors hover:text-foreground">Login</Link></li>
              <li><Link to="/register" className="text-foreground/80 transition-colors hover:text-foreground">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-foreground/80">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@originhub.dev" className="hover:text-foreground">hello@originhub.dev</a>
              </li>
              <li className="flex items-center gap-2 text-foreground/80">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+10000000000" className="hover:text-foreground">+1 (000) 000-0000</a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hello@originhub.dev", label: "Email" },
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
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/40 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/50 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {year} Origin Hub. Crafted with care.</p>
          <p>Where all your needs connect.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
