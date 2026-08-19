"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, Terminal, ChevronLeft, ChevronRight, Landmark } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { PROJECTS } from "@/data/projects";

// BMRCL Metro Train SVG model (pointing right, Purple/Green stripe)
const BMRCLTrain = () => (
  <svg
    viewBox="0 0 65 20"
    fill="none"
    className="w-[65px] h-[20px]"
  >
    {/* Train body */}
    <path d="M0,4 L48,4 C55,4 62,6 65,10 C62,14 55,16 48,16 L0,16 Z" fill="#DFDFE5" />
    {/* Wheels */}
    <circle cx="8" cy="17" r="2" fill="#222" />
    <circle cx="20" cy="17" r="2" fill="#222" />
    <circle cx="36" cy="17" r="2" fill="#222" />
    <circle cx="48" cy="17" r="2" fill="#222" />
    {/* Window glass pane */}
    <rect x="4" y="6" width="7" height="3" rx="0.5" fill="#181820" />
    <rect x="13" y="6" width="7" height="3" rx="0.5" fill="#181820" />
    <rect x="22" y="6" width="7" height="3" rx="0.5" fill="#181820" />
    <rect x="31" y="6" width="7" height="3" rx="0.5" fill="#181820" />
    <rect x="40" y="6" width="7" height="3" rx="0.5" fill="#181820" />
    {/* Cab Windshield */}
    <path d="M49,5 C53,5 58,6 61,10 L49,10 Z" fill="#0A0A0C" />
    {/* Purple & Green stripes */}
    <rect x="0" y="10" width="50" height="1.5" fill="#5A2D82" />
    <rect x="0" y="11.5" width="50" height="1.5" fill="#008450" />
    {/* Yellow details */}
    <circle cx="61" cy="13" r="0.8" fill="#FBBF24" />
    <circle cx="63" cy="11" r="0.6" fill="#FBBF24" />
  </svg>
);

export function ProjectGrid() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Bengaluru Namma Metro stations map corresponding to projects
  const stations = [
    { name: "Majestic Interchange (St. 1)", leftPercent: 15 },
    { name: "MG Road Terminal (St. 2)", leftPercent: 38 },
    { name: "Vidhana Soudha (St. 3)", leftPercent: 61 },
    { name: "Whitefield Terminal (St. 4)", leftPercent: 85 }
  ];

  const currentProject = PROJECTS[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
  };

  const getStatusColor = (status: typeof currentProject.status) => {
    switch (status) {
      case "Live":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Prototype":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Hackathon Build":
        return "bg-violet-500/10 text-[#8B5CF6] border-violet-500/20";
      default:
        return "bg-text-muted/10 text-text-muted border-border-dark";
    }
  };

  return (
    <section id="projects" className="py-24 relative border-b border-border-gold bg-[#0A0A0C]">
      {/* Decorative vertical grid lines */}
      <div className="absolute inset-y-0 left-6 border-l border-border-gold/5 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-6 border-r border-border-gold/5 pointer-events-none hidden xl:block" />

      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-[#008450] uppercase block">
            01 // TRANSIT STATIONS & SYSTEM WORK
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            Featured Deployments
          </h2>
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-lg">
            Ride the BMRCL Purple Line: click on any transit station or use the controls below to navigate between system modules.
          </p>
          <div className="h-[1px] w-24 bg-[#5A2D82]/50" />
        </div>

        {/* BMRCL METRO TRACK INTERACTIVE SELECTION BAR */}
        <div className="relative bg-[#111113] border border-border-dark rounded-xl p-8 py-12 gold-glow">
          
          {/* Faint Kannada helper text in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none font-bold text-4xl sm:text-6xl font-heading">
            ನಮ್ಮ ನೇರಳೆ ಮಾರ್ಗ // PURPLE LINE
          </div>

          {/* The Purple Line Track */}
          <div className="relative w-full h-[4px] bg-[#5A2D82]/30 rounded-full my-6">
            
            {/* Active track color fill */}
            <div 
              className="absolute left-0 top-0 h-full bg-[#5A2D82] rounded-full transition-all duration-500" 
              style={{ width: `${stations[activeIdx].leftPercent}%` }}
            />

            {/* BMRCL Train Silhouette gliding along the track */}
            <div 
              className="absolute -top-[19px] transition-all duration-500 ease-out z-10"
              style={{ 
                left: `${stations[activeIdx].leftPercent}%`, 
                transform: `translateX(-32px)` 
              }}
            >
              <BMRCLTrain />
            </div>

            {/* Station circular nodes */}
            {stations.map((st, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className="absolute -top-[6px] -translate-x-1/2 flex flex-col items-center group cursor-pointer focus:outline-none z-20"
                  style={{ left: `${st.leftPercent}%` }}
                  aria-label={`Select ${PROJECTS[idx].title} at ${st.name}`}
                >
                  {/* Outer circle */}
                  <span 
                    className={`w-[16px] h-[16px] rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isActive 
                        ? "bg-[#5A2D82] border-[#F4B223] scale-110 shadow-lg shadow-[#5A2D82]/40" 
                        : "bg-zinc-800 border-zinc-700 hover:border-[#5A2D82] group-hover:scale-105"
                    }`}
                  >
                    {/* Inner core */}
                    <span 
                      className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
                        isActive ? "bg-[#F4B223]" : "bg-zinc-600 group-hover:bg-[#5A2D82]"
                      }`}
                    />
                  </span>
                  
                  {/* Station Label */}
                  <span 
                    className={`mt-3 font-mono text-[9px] tracking-wider text-center max-w-[90px] leading-tight transition-colors duration-300 ${
                      isActive ? "text-[#F4B223] font-semibold" : "text-text-muted group-hover:text-text-offwhite"
                    }`}
                  >
                    {PROJECTS[idx].title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STATION BOARD / ADVERTISEMENT MODAL DISPLAY */}
        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-[#111113] border border-border-gold/30 hover:border-[#5A2D82]/40 rounded-lg p-6 sm:p-8 flex flex-col justify-between gold-glow relative overflow-hidden"
            >
              {/* Station terminal header board */}
              <div className="absolute top-0 left-0 right-0 h-[24px] bg-[#5A2D82] px-6 flex items-center justify-between text-[9px] font-mono font-semibold text-text-offwhite tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Landmark size={8} />
                  <span>CURRENT STATION: {stations[activeIdx].name.toUpperCase()}</span>
                </div>
                <div className="hidden sm:block">
                  <span>NEXT DEPARTURE: {activeIdx < 3 ? stations[activeIdx + 1].name.toUpperCase() : "TERMINAL END"}</span>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                {/* Meta details header */}
                <div className="flex items-center justify-between gap-4 flex-wrap mt-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${getStatusColor(currentProject.status)}`}>
                      {currentProject.status}
                    </span>
                    {currentProject.award && (
                      <span className="text-[9px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-[#F4B223]/30 bg-[#F4B223]/5 text-[#F4B223] flex items-center gap-1">
                        <Award size={10} />
                        {currentProject.award}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-text-muted">{currentProject.date}</span>
                </div>

                {/* Project Header */}
                <div className="space-y-1.5">
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-offwhite tracking-tight">
                    {currentProject.title}
                  </h3>
                  <p className="font-heading text-xs font-semibold text-[#8B5CF6] tracking-wide">
                    {currentProject.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-text-muted font-light leading-relaxed max-w-3xl">
                  {currentProject.description}
                </p>

                {/* Technical highlights code block */}
                <div className="bg-[#0A0A0C] border border-border-dark p-4 rounded font-mono text-[11px] text-text-muted space-y-2 relative">
                  <div className="absolute top-2.5 right-3 text-[9px] text-[#008450] font-semibold tracking-wider flex items-center gap-1">
                    <Terminal size={8} /> METRO_TRANSIT.LOG
                  </div>
                  {currentProject.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <span className="text-[#5A2D82]/60 shrink-0">&gt;&gt;</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack and Action Links */}
              <div className="mt-8 space-y-4 pt-4 border-t border-border-dark flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 max-w-xl">
                  {currentProject.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-text-offwhite/70 bg-[#16161A] border border-border-dark px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 shrink-0 justify-end">
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5 font-heading text-xs tracking-wider font-semibold"
                      aria-label={`${currentProject.title} GitHub repository`}
                    >
                      <GithubIcon size={14} />
                      <span>SRC</span>
                    </a>
                  )}
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B5CF6] hover:text-[#A78BFA] hover:underline transition-all flex items-center gap-1.5 font-heading text-xs tracking-wider font-semibold"
                      aria-label={`${currentProject.title} Live URL`}
                    >
                      <ExternalLink size={14} />
                      <span>LIVE TRANSIT</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* METRO TRANSIT CONTROLS / NAVIGATOR BUTTONS */}
        <div className="flex items-center justify-between border border-border-dark bg-[#111113]/60 py-3.5 px-6 rounded-lg max-w-md mx-auto gold-glow">
          <button
            onClick={handlePrev}
            className="p-2 border border-border-dark hover:border-[#5A2D82]/50 rounded-md text-text-muted hover:text-text-offwhite transition-all cursor-pointer focus:outline-none"
            aria-label="Previous station"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="font-mono text-[10px] tracking-wider text-text-muted flex flex-col items-center">
            <span className="text-[8px] text-[#008450]">NOW AT STATION</span>
            <span className="text-text-offwhite font-bold mt-0.5">{currentProject.title.toUpperCase()}</span>
          </div>

          <button
            onClick={handleNext}
            className="p-2 border border-border-dark hover:border-[#5A2D82]/50 rounded-md text-text-muted hover:text-text-offwhite transition-all cursor-pointer focus:outline-none"
            aria-label="Next station"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
