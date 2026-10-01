import { useRef } from "react";
import { ArrowDown, ArrowUpRight, ShieldCheck, Terminal, Download } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "@/components/ui/Magnetic";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const HeroSection = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          ".hero-title-line",
          { y: 60, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo(
          ".hero-description",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          ".hero-terminal",
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.0 },
          "-=0.6"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.3"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Ambient background glow orb */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-primary/15 rounded-full blur-[140px] z-0" />

      <div className="container relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="hero-badge mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/70 border border-border/80 backdrop-blur-md shadow-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
            Cybersecurity Analyst &amp; Full-Stack Engineer
          </span>
        </div>

        {/* Cinematic Headline */}
        <div className="space-y-2 mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <div className="overflow-hidden pb-1">
              <span className="hero-title-line inline-block">
                Defending Systems.
              </span>
            </div>
            <div className="overflow-hidden pb-2">
              <span className="hero-title-line inline-block text-gradient">
                Building Resilient Apps.
              </span>
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-description max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          Hi, I'm{" "}
          <strong className="text-foreground font-semibold">Muhammad Nashit</strong>
          . I combine deep cybersecurity analysis—vulnerability assessment, penetration
          testing, and automated incident response—with scalable full-stack web
          architecture.
        </p>

        {/* Interactive Magnetic CTAs */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mb-14">
          <Magnetic strength={0.3}>
            <a href="#projects" className="cosmic-button flex items-center gap-2 group">
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="/Muhammad_Nashit_CV.pdf"
              download
              className="px-6 py-3 rounded-full border border-border/80 bg-card/60 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/50 hover:bg-card/90 transition-all duration-300 flex items-center gap-2 shadow-xs hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            >
              <Download className="w-4 h-4 text-primary" />
              Download CV
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-border/80 bg-card/40 backdrop-blur-md text-muted-foreground hover:text-foreground font-medium text-sm transition-all duration-300"
            >
              Get in Touch
            </a>
          </Magnetic>
        </div>

        {/* High-Tech Interactive Terminal Pill */}
        <div className="hero-terminal w-full max-w-3xl">
          <SpotlightCard className="p-4 sm:p-6 text-left border-primary/20 bg-card/60 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-muted-foreground ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-primary" />
                  nashit@cyber-soc:~$
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                SEC_TELEMETRY: ACTIVE
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                <span className="text-muted-foreground block mb-1">DEFENSE METRIC</span>
                <span className="text-sm font-bold text-foreground">Zero Critical Flags</span>
              </div>
              <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                <span className="text-muted-foreground block mb-1">SECURITY STACK</span>
                <span className="text-sm font-bold text-primary">Wazuh • Suricata • MISP</span>
              </div>
              <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                <span className="text-muted-foreground block mb-1">DEV STACK</span>
                <span className="text-sm font-bold text-accent">React • Node • PostgreSQL</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <div className="hero-scroll-indicator mt-12 flex flex-col items-center">
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="Scroll down to About section"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="p-2 rounded-full border border-border/70 bg-card/60 backdrop-blur-md group-hover:border-primary/40"
          >
            <ArrowDown className="h-4 w-4 text-primary" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};