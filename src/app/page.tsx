import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Timeline } from "@/components/Timeline";
import { SkillsDashboard } from "@/components/SkillsDashboard";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-text-offwhite selection:bg-gold-accent/20 selection:text-gold-accent font-sans">
      {/* Sleek navigation header */}
      <Header />

      {/* Main sections */}
      <main className="flex-grow">
        {/* Section 0: Hero landing */}
        <Hero />

        {/* Section 1: Projects card grid */}
        <ProjectGrid />

        {/* Section 2: Competitive Timeline */}
        <Timeline />

        {/* Section 3: Tech Stack tags */}
        <SkillsDashboard />

        {/* Section 4: Bio / Education context */}
        <AboutSection />
      </main>

      {/* Minimal technical footer */}
      <Footer />
    </div>
  );
}
