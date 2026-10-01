import { ArrowUp, Shield } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

export const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-border/60 bg-card/40 backdrop-blur-xl">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <span className="p-1 rounded-lg bg-primary/10 text-primary">
              <Shield className="w-3.5 h-3.5" />
            </span>
            <span>Muhammad Nashit</span>
          </div>
          <span className="hidden sm:inline text-border">•</span>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Muhammad Nashit. Secured &amp; Crafted with
            Precision.
          </p>
        </div>

        {/* System Status & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Optimal</span>
          </div>

          <Magnetic strength={0.35}>
            <a
              href="#hero"
              className="p-3 rounded-2xl bg-secondary/80 hover:bg-primary hover:text-primary-foreground border border-border/80 text-foreground transition-all duration-300 flex items-center justify-center shadow-xs"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};