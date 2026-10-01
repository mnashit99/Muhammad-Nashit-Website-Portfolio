import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { StarBackground } from "@/components/StarBackground";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const Home = () => {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/25 selection:text-primary">
        {/* 60 FPS Cosmic Canvas (Twinkling Stars & Shooting Meteors) */}
        <StarBackground />

        {/* Global Glassmorphic Navbar with Integrated ThemeToggle */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        {/* Modern Minimalist Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};