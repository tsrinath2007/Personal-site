import React from "react";
import { SesOpeningAnimation } from "@/components/SesOpeningAnimation";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { HackerHouseSection } from "@/components/HackerHouseSection";
import { Timeline } from "@/components/Timeline";
import { SkillsDashboard } from "@/components/SkillsDashboard";
import { AboutSection } from "@/components/AboutSection";
import { ConnectSection } from "@/components/ConnectSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-text-offwhite selection:bg-gold-accent/20 selection:text-gold-accent font-sans relative">
      {/* Start Page SES Cut-in-Half Opening Animation */}
      <SesOpeningAnimation />

      {/* Sleek navigation header with SRINATH.DEV branding */}
      <Header />

      {/* Main sections */}
      <main className="flex-grow">
        {/* Section 0: Hero landing */}
        <Hero />

        {/* Section 1: Projects card grid */}
        <ProjectGrid />

        {/* Section 2.A: Hacker House Goa 2026 Sprint (#hackathons) */}
        <HackerHouseSection />

        {/* Section 2.B: Hackathons & Achievements Timeline */}
        <Timeline />

        {/* Section 3: Tech Stack tags */}
        <SkillsDashboard />

        {/* Section 4: Bio / Education context */}
        <AboutSection />

        {/* Section 5: Connect & Collaborate */}
        <ConnectSection />
      </main>

      {/* Minimal technical footer */}
      <Footer />
    </div>
  );
}
