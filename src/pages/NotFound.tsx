import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-16 text-foreground">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm font-semibold text-primary">404 ERROR</p>

        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The requested route <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{location.pathname}</code> does not exist in Origin-Hub.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => window.history.back()}
            className="border-border text-foreground hover:bg-muted"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Origin-Hub — Where all your needs connect.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
