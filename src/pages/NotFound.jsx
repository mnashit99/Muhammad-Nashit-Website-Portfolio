import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { StarBackground } from "@/components/StarBackground";

export const NotFound = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground overflow-hidden">
      <StarBackground />
      <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
        <div className="inline-flex p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">
            Access Restricted // Vector Unresolved
          </h2>
          <p className="text-sm text-muted-foreground">
            The destination you requested does not exist on this host or has been
            decommissioned by security policies.
          </p>
        </div>
        <div className="pt-2">
          <Magnetic strength={0.3}>
            <Link to="/" className="cosmic-button inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Base</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};