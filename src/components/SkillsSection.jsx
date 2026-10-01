import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Code, Cpu, Database, Wrench, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/ui/RevealText";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const skills = [
  { name: "Ethical Hacking", level: 85, category: "Cyber Security", icon: Shield },
  { name: "Vulnerability Assessment", level: 80, category: "Cyber Security", icon: Shield },
  { name: "Penetration Testing", level: 75, category: "Cyber Security", icon: Shield },
  { name: "Scanning & Enumeration", level: 85, category: "Cyber Security", icon: Shield },
  { name: "OSINT Intelligence", level: 70, category: "Cyber Security", icon: Shield },
  { name: "Malware Analysis", level: 65, category: "Cyber Security", icon: Shield },
  { name: "JavaScript / TypeScript", level: 90, category: "Programming Languages", icon: Code },
  { name: "Python", level: 85, category: "Programming Languages", icon: Code },
  { name: "C++", level: 70, category: "Programming Languages", icon: Code },
  { name: "React.js", level: 90, category: "Frameworks", icon: Cpu },
  { name: "Node.js", level: 85, category: "Frameworks", icon: Cpu },
  { name: "Express.js", level: 85, category: "Frameworks", icon: Cpu },
  { name: "NestJS", level: 70, category: "Frameworks", icon: Cpu },
  { name: "PostgreSQL", level: 80, category: "Databases", icon: Database },
  { name: "SQL & Query Tuning", level: 85, category: "Databases", icon: Database },
  { name: "Git / GitHub DevOps", level: 90, category: "Tools", icon: Wrench },
  { name: "Docker & Container Security", level: 80, category: "Tools", icon: Wrench },
  { name: "Wazuh / Suricata / MISP", level: 85, category: "Tools", icon: Wrench },
];

const categories = [
  "All",
  "Cyber Security",
  "Programming Languages",
  "Frameworks",
  "Databases",
  "Tools",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-28 px-4 relative overflow-hidden bg-secondary/20">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">
            Capabilities &amp; Tooling
          </span>
          <RevealText tag="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Technical Stack &amp; Expertise
          </RevealText>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Equipped with both offensive security toolchains and robust full-stack web
            frameworks for comprehensive digital security.
          </p>
        </div>

        {/* Animated Category Pills with Framer Motion layoutId */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 outline-none",
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground bg-card/60 border border-border/70 backdrop-blur-md"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategoryPill"
                    className="absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_rgba(139,92,246,0.6)] z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Skill Cards Grid with Layout Reordering */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon || Layers;
              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpotlightCard className="p-5 bg-card/70 backdrop-blur-md border-border/60">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base text-foreground">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] text-muted-foreground">
                            {skill.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-primary">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Animated Progress Meter on Viewport Entrance */}
                    <div className="w-full bg-secondary/60 h-2 rounded-full overflow-hidden p-0.5 border border-border/40">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      />
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};