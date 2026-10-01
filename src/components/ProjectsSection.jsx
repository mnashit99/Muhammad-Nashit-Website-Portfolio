import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowUpRight,
  Github,
  ShieldAlert,
  FileText,
  Smartphone,
  Network,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCw,
} from "lucide-react";
import { motion, useMotionValue, animate } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";

const projects = [
  {
    id: 1,
    title: "Security Automation & Detection Lab",
    subtitle: "Enterprise SOC / SOAR Pipeline",
    description:
      "Full incident response pipeline in Docker: Automated SQL Injection and brute-force detection using Suricata IDS, Wazuh SIEM, MISP threat intelligence, and Shuffle/N8N automated orchestration.",
    tags: ["SOC / SIEM", "Suricata", "Wazuh", "MISP", "Docker", "N8N"],
    type: "cyber",
    demoUrl: "https://github.com/mnashit99",
    githubUrl: "https://github.com/mnashit99",
  },
  {
    id: 2,
    title: "Anime Info Discovery App",
    subtitle: "Cross-Platform Mobile Application",
    description:
      "A fast and fluid mobile experience providing real-time data on anime releases, character bios, user ratings, and episodic breakdown with cloud sync.",
    tags: ["Flutter", "Dart", "Firebase", "REST API", "State Management"],
    type: "mobile",
    demoUrl: "https://github.com/mnashit99",
    githubUrl: "https://github.com/mnashit99",
  },
  {
    id: 3,
    title: "Invoice Generator Pro",
    subtitle: "Financial Web Utility",
    description:
      "A client-side billing application enabling businesses to dynamically generate, customize, preview, and export print-ready PDF invoices with real-time tax calculation.",
    tags: ["JavaScript", "HTML5", "CSS3", "Bootstrap", "jQuery", "PDF Engine"],
    type: "web",
    demoUrl: "https://github.com/mnashit99",
    githubUrl: "https://github.com/mnashit99",
  },
  {
    id: 4,
    title: "Network Threat Sniffer & Packet Analyzer",
    subtitle: "Automated Intrusion Detection",
    description:
      "Asynchronous network packet inspection capturing raw Ethernet frames, decoding TCP/UDP transport headers, and triggering automated alerts on suspicious scanning patterns.",
    tags: ["Python", "Scapy", "Wireshark", "Network Security", "Socket API"],
    type: "network",
    demoUrl: "https://github.com/mnashit99",
    githubUrl: "https://github.com/mnashit99",
  },
];

export const ProjectsSection = () => {
  // Virtual index tracks movement infinitely: -1, 0, 1, 2, 3, 4, 5...
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Triple set ensures there are always cards to the left and to the right
  const triplicatedProjects = [...projects, ...projects, ...projects];
  const setLength = projects.length;

  // Responsive stride calculation
  const getStride = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 300 + 16; // 316px
      if (window.innerWidth < 768) return 340 + 20; // 360px
      return 390 + 24; // 414px
    }
    return 414;
  }, []);

  const stride = getStride();
  const setWidth = setLength * stride;

  // Track motion value: starts centered at the middle set (Set 1)
  const x = useMotionValue(-setWidth);

  // Calculate normalized index (0 to 3) for dots and highlights
  const activeIndex = ((virtualIndex % setLength) + setLength) % setLength;

  // Smooth spring transition to target virtual index with seamless boundary wrap
  const moveToVirtualIndex = useCallback(
    (targetIndex) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      setVirtualIndex(targetIndex);
      const targetX = -setWidth - targetIndex * stride;

      animate(x, targetX, {
        type: "spring",
        stiffness: 240,
        damping: 26,
        mass: 0.8,
        onComplete: () => {
          isAnimatingRef.current = false;

          // Silent normalization: wrap to middle set seamlessly
          if (targetIndex >= setLength || targetIndex < 0) {
            const normalized = ((targetIndex % setLength) + setLength) % setLength;
            setVirtualIndex(normalized);
            x.set(-setWidth - normalized * stride);
          }
        },
      });
    },
    [setLength, setWidth, stride, x]
  );

  const handleNext = useCallback(() => {
    moveToVirtualIndex(virtualIndex + 1);
  }, [moveToVirtualIndex, virtualIndex]);

  const handlePrev = useCallback(() => {
    moveToVirtualIndex(virtualIndex - 1);
  }, [moveToVirtualIndex, virtualIndex]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const newStride = getStride();
      const newSetWidth = setLength * newStride;
      x.set(-newSetWidth - virtualIndex * newStride);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getStride, setLength, virtualIndex, x]);

  // Continuous auto-orbit: advances endlessly forward without ever rewinding or leaving gaps
  useEffect(() => {
    if (!isAutoPlay || isDragging) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [handleNext, isAutoPlay, isDragging]);

  // Handle Drag gestures: natural flick left/right
  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const { offset, velocity } = info;

    if (offset.x < -50 || velocity.x < -250) {
      handleNext();
    } else if (offset.x > 50 || velocity.x > 250) {
      handlePrev();
    } else {
      // Snap back to current card
      moveToVirtualIndex(virtualIndex);
    }
  };

  return (
    <section id="projects" className="py-28 px-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">
            Portfolio Showcase
          </span>
          <RevealText tag="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured Projects &amp; Labs
          </RevealText>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Engineered with deep attention to system integrity, defense logic, and
            delightful interactions. Continuously loops with 1:1 drag gestures and orbital controls.
          </p>

          {/* Interactive Navigation & Infinite Auto-Rotation Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            {/* Prev Button */}
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-full border border-border/80 bg-card/75 text-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-xs cursor-pointer flex items-center justify-center active:scale-95"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </Magnetic>

            {/* Auto-Rotation Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="px-4 py-2.5 rounded-full border border-border/80 bg-card/75 backdrop-blur-md text-foreground text-xs font-mono flex items-center gap-2 hover:border-primary/50 transition-colors cursor-pointer shadow-xs active:scale-95"
              aria-label={isAutoPlay ? "Pause auto-rotation" : "Resume auto-rotation"}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause Orbit</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume Orbit</span>
                </>
              )}
            </button>

            {/* Next Button */}
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-full border border-border/80 bg-card/75 text-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-xs cursor-pointer flex items-center justify-center active:scale-95"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </Magnetic>

            {/* Orbit Live Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/50 border border-border/60 text-xs font-mono text-muted-foreground">
              <RotateCw className={`w-3.5 h-3.5 text-primary ${isAutoPlay && !isDragging ? "animate-spin" : ""}`} style={{ animationDuration: "5s" }} />
              <span>
                {isDragging
                  ? "Dragging Project"
                  : isAutoPlay
                  ? "Infinite Seamless Loop"
                  : "Manual Mode"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Looping Kinetic Track */}
      <div
        ref={containerRef}
        className="w-full relative overflow-hidden py-6 select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Soft edge blur masks so cards emerge and fade smoothly */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-background to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-background to-transparent z-20" />

        <div className="max-w-6xl mx-auto px-4 overflow-visible">
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -setWidth * 2 - 200,
              right: 200,
            }}
            dragElastic={0.12}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="flex gap-4 sm:gap-5 md:gap-6 will-change-transform"
          >
            {triplicatedProjects.map((project, idx) => {
              // Map continuous track index to 0..3 to highlight active card
              const projectIndex = idx % setLength;
              const isCurrent = activeIndex === projectIndex;

              return (
                <motion.div
                  key={`${project.id}-${idx}`}
                  animate={{
                    scale: isCurrent ? 1.02 : 0.95,
                    opacity: isCurrent ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-[300px] sm:w-[340px] md:w-[390px] h-[520px] shrink-0"
                  onClick={() => {
                    if (!isDragging && activeIndex !== projectIndex) {
                      // Move in direction of click
                      const diff = projectIndex - activeIndex;
                      moveToVirtualIndex(virtualIndex + diff);
                    }
                  }}
                >
                  <SpotlightCard
                    className={`w-full h-full flex flex-col justify-between p-0 overflow-hidden bg-card/85 border-border/80 backdrop-blur-xl group transition-all duration-300 ${
                      isCurrent
                        ? "border-primary/50 shadow-[0_16px_50px_-10px_rgba(139,92,246,0.35)] ring-1 ring-primary/40"
                        : "hover:border-primary/40 hover:opacity-90"
                    }`}
                  >
                    {/* 1. Uniform Visual Banner */}
                    <div className="h-48 relative overflow-hidden bg-gradient-to-br from-secondary/80 to-background border-b border-border/50 p-4 flex flex-col justify-center items-center shrink-0">
                      {project.type === "cyber" && (
                        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
                          <div className="flex items-center justify-between pb-2 border-b border-border/40">
                            <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[11px]">
                              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                              <span>SOC DETECT // IR PIPELINE</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                              Active
                            </span>
                          </div>

                          <div className="space-y-1.5 text-[11px] bg-background/80 p-2.5 rounded-xl border border-border/60">
                            <div className="flex items-center justify-between text-foreground">
                              <span className="text-primary font-bold">[1] Ingestion:</span>
                              <span className="truncate ml-1">Suricata Telemetry</span>
                            </div>
                            <div className="flex items-center justify-between text-foreground">
                              <span className="text-accent font-bold">[2] SIEM Alert:</span>
                              <span className="truncate ml-1">Wazuh Rule 2010144</span>
                            </div>
                            <div className="flex items-center justify-between text-foreground">
                              <span className="text-rose-400 font-bold">[3] Threat Intel:</span>
                              <span className="truncate ml-1">MISP Match &amp; Escalation</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                            <span>Docker Compose</span>
                            <span className="text-primary font-medium">N8N Webhook</span>
                          </div>
                        </div>
                      )}

                      {project.type === "mobile" && (
                        <div className="w-full h-full flex flex-col justify-center items-center text-center p-3">
                          <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
                            <Smartphone className="w-7 h-7" />
                          </div>
                          <div className="text-[11px] font-mono text-primary font-semibold tracking-wider">
                            FLUTTER &amp; DART ENGINE
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Real-Time Anime Database &amp; Cloud Sync
                          </div>
                        </div>
                      )}

                      {project.type === "web" && (
                        <div className="w-full h-full flex flex-col justify-center items-center text-center p-3">
                          <div className="p-3.5 rounded-2xl bg-accent/10 border border-accent/20 text-accent mb-2 transition-transform duration-300 group-hover:scale-110">
                            <FileText className="w-7 h-7" />
                          </div>
                          <div className="text-[11px] font-mono text-accent font-semibold tracking-wider">
                            SaaS BILLING ENGINE
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Dynamic PDF Generator &amp; Financial Ledger
                          </div>
                        </div>
                      )}

                      {project.type === "network" && (
                        <div className="w-full h-full flex flex-col justify-center items-center text-center p-3">
                          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                            <Network className="w-7 h-7" />
                          </div>
                          <div className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider">
                            PACKET INSPECTION &amp; IDS
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Low-Level Frame Sniffer &amp; Port Scan Alerting
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 2. Uniform Card Body & Text Alignment */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 text-left">
                      <div>
                        <span className="text-[11px] font-mono text-primary tracking-wider uppercase font-semibold block mb-1">
                          {project.subtitle}
                        </span>
                        <h3 className="text-lg font-bold text-foreground leading-snug mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4">
                          {project.description}
                        </p>

                        {/* Tag Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.slice(0, 5).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-secondary/80 border border-border/80 text-foreground/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3. Bottom Aligned Action Links */}
                      <div className="flex items-center gap-3 pt-3 border-t border-border/50 mt-auto">
                        <Magnetic strength={0.25}>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground hover:text-primary hover:border-primary/40 text-xs font-medium flex items-center gap-1.5 transition-colors duration-200"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source</span>
                          </a>
                        </Magnetic>

                        <Magnetic strength={0.25}>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs font-medium flex items-center gap-1.5 transition-all duration-300"
                          >
                            <span>Explore</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Pagination Dot Navigation */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              const diff = i - activeIndex;
              moveToVirtualIndex(virtualIndex + diff);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === i
                ? "w-8 h-2 bg-primary shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                : "w-2 h-2 bg-border hover:bg-muted-foreground"
            }`}
            aria-label={`Jump to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Global GitHub CTA with Magnetic effect */}
      <div className="text-center mt-12">
        <Magnetic strength={0.35}>
          <a
            href="https://github.com/mnashit99"
            target="_blank"
            rel="noreferrer"
            className="cosmic-button inline-flex items-center gap-2.5"
          >
            <Github className="w-4 h-4" />
            <span>Explore All Repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </Magnetic>
      </div>
    </section>
  );
};