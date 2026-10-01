import { useState, useEffect } from "react";
import { Menu, X, Shield, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "py-3 bg-background/75 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo with Magnetic effect */}
          <Magnetic strength={0.25}>
            <a
              href="#hero"
              className="group flex items-center gap-2 text-foreground font-semibold tracking-tight text-lg"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                <Shield className="h-4 w-4" />
              </span>
              <span className="font-bold tracking-tight">
                Muhammad <span className="text-primary">Nashit</span>
              </span>
            </a>
          </Magnetic>

          {/* Desktop Nav with Floating Glass Capsule */}
          <nav className="hidden md:flex items-center gap-1 rounded-full p-1.5 px-3 bg-card/60 backdrop-blur-lg border border-border/60 shadow-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <Magnetic key={item.name} strength={0.2}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-primary/10 border border-primary/25 z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                </Magnetic>
              );
            })}
          </nav>

          {/* Right Action Group: ThemeToggle + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Integrated Theme Toggle (Cleanly positioned on all screen sizes, zero overlap!) */}
            <ThemeToggle />

            {/* Desktop Let's Talk CTA */}
            <div className="hidden md:flex items-center">
              <Magnetic strength={0.3}>
                <a
                  href="#contact"
                  className="px-5 py-2 text-sm font-medium rounded-full bg-secondary hover:bg-secondary/80 text-foreground border border-border/80 transition-all duration-300 flex items-center gap-2 hover:border-primary/40 shadow-xs"
                >
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  Let's Talk
                </a>
              </Magnetic>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden relative z-50 p-2.5 rounded-xl bg-card/80 border border-border/70 text-foreground flex items-center justify-center hover:border-primary/40 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center space-y-6 text-2xl font-semibold w-full max-w-xs"
            >
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  className="w-full text-center py-3 rounded-2xl border border-border/50 bg-card/40 text-foreground/90 hover:text-primary hover:border-primary/40 transition-all"
                >
                  {item.name}
                </motion.a>
              ))}

              <div className="pt-4 w-full">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="cosmic-button w-full"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};