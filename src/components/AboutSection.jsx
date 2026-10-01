import { Bug, FileSpreadsheet, Lock, Download, Mail } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const highlights = [
  {
    icon: Bug,
    title: "Ethical Hacking & Vulnerability Assessment",
    description:
      "Identifying critical vulnerabilities, misconfigurations, and attack vectors through authorized adversarial simulations and security audits.",
    badge: "Offensive Security",
  },
  {
    icon: FileSpreadsheet,
    title: "SOC Telemetry & Activity Reporting",
    description:
      "Configuring Wazuh, Suricata, and SIEM pipelines to parse raw network logs and generate high-fidelity threat intelligence reports.",
    badge: "Defensive Operations",
  },
  {
    icon: Lock,
    title: "Penetration Testing & Hardening",
    description:
      "Executing rigorous penetration tests across web applications and containers to eliminate risks and fortify infrastructure.",
    badge: "Infrastructure",
  },
];

const metrics = [
  { value: "100%", label: "System Uptime & Hardening Focus" },
  { value: "50+", label: "Vulnerabilities Audited & Remediated" },
  { value: "Full-Stack", label: "Front-to-Back Engineering" },
  { value: "SOC/SIEM", label: "Automated Threat Pipeline" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-4 relative overflow-hidden">
      {/* Background ambient accent */}
      <div className="pointer-events-none absolute bottom-10 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">
            About The Specialist
          </span>
          <RevealText tag="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Protecting Systems. Crafting Tomorrow.
          </RevealText>
        </div>

        {/* Two-Column Grid: Narrative & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative & Metrics */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <ScrollReveal>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Cybersecurity Analyst &amp; Full-Stack Builder
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                In today's interconnected digital landscape, security cannot be an afterthought. 
                I operate at the intersection of offensive threat analysis and resilient software architecture, 
                diagnosing architectural flaws before adversaries can exploit them.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                Whether deploying automated intrusion detection systems with Wazuh and Suricata, 
                auditing network telemetry, or developing performant React and Node.js solutions, 
                my approach prioritizes data integrity, compliance, and uncompromised UX.
              </p>
            </ScrollReveal>

            {/* Metrics Grid */}
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4 pt-1">
                {metrics.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-md text-left"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">
                      <span className="text-gradient">{item.value}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Responsive Compact Spotlight Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <SpotlightCard className="p-5 bg-card/75 backdrop-blur-xl group">
                    <div className="flex items-start gap-4">
                      {/* Compact non-stretching icon */}
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content with precisely fitted badge */}
                      <div className="min-w-0 flex-1 text-left">
                        <div className="mb-1.5">
                          <span className="w-fit inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-primary/10 text-primary border border-primary/25 shrink-0">
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors mb-1">
                          {item.title}
                        </h4>
                        
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Dedicated Centered Action Bar Below Both Left and Right Sections */}
        <ScrollReveal delay={0.25} className="mt-14 pt-6 text-center border-t border-border/40">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Magnetic strength={0.3}>
              <a href="#contact" className="cosmic-button flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="/Muhammad_Nashit_CV.pdf"
                download
                className="px-6 py-3 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 font-medium text-sm flex items-center gap-2 shadow-xs hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </Magnetic>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};