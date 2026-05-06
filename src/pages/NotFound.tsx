import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl" />

      <div className="text-center max-w-xl">
        
        {/* Big 404 */}
        <h1 className="font-display text-7xl md:text-8xl font-bold text-gradient animate-fade-in">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
          Lost in the network
        </h2>

        {/* Description */}
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The page you're looking for doesn’t exist or hasn’t been connected yet.
          It might still be under construction as Origin Hub continues to evolve.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-white shadow-glow transition hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

        </div>

        {/* Extra Note */}
        <p className="mt-10 text-xs text-muted-foreground italic">
          This part of Origin Hub is still being built. New routes and features are added continuously.
        </p>

      </div>
    </div>
  );
};

export default NotFound;