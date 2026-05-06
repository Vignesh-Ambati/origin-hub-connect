import { ArrowRight, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-6 py-20">
        <Card className="glass shadow-elegant border-primary/30 p-8 animate-fade-up">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary shadow-glow">
              <UserPlus className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold">Join Origin Hub</h1>
            <p className="mt-1 text-sm text-muted-foreground">Create your account in seconds</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Ada Lovelace" className="bg-input/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@origin.hub" className="bg-input/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" className="bg-input/60" />
            </div>
            <Button className="w-full bg-gradient-to-r from-primary via-accent to-secondary shadow-glow hover:opacity-90">
              Create account <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </section>
    </SiteLayout>
  );
};

export default Register;
