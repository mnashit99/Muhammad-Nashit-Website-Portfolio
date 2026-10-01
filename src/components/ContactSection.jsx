import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Instagram,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copiedField, setCopiedField] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-28 px-4 relative overflow-hidden bg-secondary/20">
      {/* Background ambient light */}
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">
            Initiate Communication
          </span>
          <RevealText tag="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Let's Build &amp; Secure Together
          </RevealText>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind, need a security vulnerability assessment, or looking
            to hire? Reach out directly or dispatch a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Connections */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Contact Channels
              </h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                I typically respond within 24 hours. For urgent security vulnerability
                reports, please contact via direct email.
              </p>
            </ScrollReveal>

            {/* Email Card - Perfectly Aligned Horizontal Row */}
            <ScrollReveal delay={0.1}>
              <SpotlightCard className="p-4 bg-card/75 backdrop-blur-md">
                <div className="flex items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1 pr-1">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                        Direct Email
                      </span>
                      <a
                        href="mailto:muhammadnashit3@gmail.com"
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors block truncate"
                        title="muhammadnashit3@gmail.com"
                      >
                        muhammadnashit3@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard("muhammadnashit3@gmail.com", "email")}
                    className="shrink-0 p-2.5 rounded-xl border border-border/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Phone Card - Perfectly Aligned Horizontal Row */}
            <ScrollReveal delay={0.15}>
              <SpotlightCard className="p-4 bg-card/75 backdrop-blur-md">
                <div className="flex items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1 pr-1">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                        Phone / WhatsApp
                      </span>
                      <a
                        href="tel:+923209462332"
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors block truncate"
                      >
                        +92-320-9462332
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard("+923209462332", "phone")}
                    className="shrink-0 p-2.5 rounded-xl border border-border/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Copy phone to clipboard"
                    aria-label="Copy phone number"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Location Card - Perfectly Aligned Horizontal Row */}
            <ScrollReveal delay={0.2}>
              <SpotlightCard className="p-4 bg-card/75 backdrop-blur-md">
                <div className="flex items-center gap-3.5 w-full">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-foreground leading-snug block">
                      Wadala Sandhuan, Sialkot, Pakistan (Remote Worldwide)
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Social Network Connect Pills */}
            <ScrollReveal delay={0.25}>
              <div className="pt-3">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">
                  Online Profiles
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <Magnetic strength={0.3}>
                    <a
                      href="https://www.linkedin.com/in/muhammad-nashit-39bb8b271/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md text-foreground hover:text-primary hover:border-primary/50 text-xs font-medium flex items-center gap-2 transition-all shadow-xs"
                    >
                      <Linkedin className="w-4 h-4 text-primary" />
                      <span>LinkedIn</span>
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.3}>
                    <a
                      href="https://medium.com/@muhammadnashit3"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md text-foreground hover:text-primary hover:border-primary/50 text-xs font-medium flex items-center gap-2 transition-all shadow-xs"
                    >
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>Medium</span>
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.3}>
                    <a
                      href="https://www.instagram.com/muhammad.nashit.904/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md text-foreground hover:text-primary hover:border-primary/50 text-xs font-medium flex items-center gap-2 transition-all shadow-xs"
                    >
                      <Instagram className="w-4 h-4 text-primary" />
                      <span>Instagram</span>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Secure Message Terminal */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <SpotlightCard className="p-7 sm:p-9 bg-card/80 backdrop-blur-2xl border-border/80">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Send an Encrypted Note
                </h3>
                <p className="text-muted-foreground text-sm mb-7">
                  Fill in your details below. Your message will be formatted and routed
                  securely.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@enterprise.com"
                      className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Message or Project Brief
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Provide brief details about your inquiry, penetration test request, or full-stack project..."
                      className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                    />
                  </div>

                  <Magnetic strength={0.2} className="w-full">
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileTap={{ scale: 0.98 }}
                      className="cosmic-button w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Signal...</span>
                        </>
                      ) : status === "sent" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                          <span>Transmission Received!</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </Magnetic>
                </form>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};