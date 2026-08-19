"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Trophy, ChevronRight, Train } from "lucide-react";
import { HACKATHONS } from "@/data/projects";

// BMRCL Transit Smart Token SVG node icon
const TokenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width="12"
    height="12"
  >
    {/* Token Round Core */}
    <circle cx="12" cy="12" r="10" />
    {/* Inner details representing transit tracks */}
    <path d="M7,12 L17,12" stroke="#0A0A0C" strokeWidth="1.5" />
    <path d="M12,7 L12,17" stroke="#0A0A0C" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="#F4B223" />
  </svg>
);

export function Timeline() {
  return (
    <section id="hackathons" className="py-24 relative border-b border-border-gold bg-[#111113]">
      <div className="absolute inset-0 dot-bg opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-[#008450] uppercase block">
            02 // TRANSIT MILESTONES & ACHIEVEMENTS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            Hackathons & Achievements
          </h2>
          <div className="h-[1px] w-24 bg-[#008450]/40" />
        </div>

        {/* Timeline Layout (Styled as BMRCL Green Line) */}
        <div className="max-w-4xl mx-auto relative border-l-2 border-[#008450]/40 ml-2 sm:ml-8 pl-6 sm:pl-10 space-y-12 py-2">
          {HACKATHONS.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 12, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Pulsing indicator smart token on timeline */}
              <span className="absolute -left-[32px] sm:-left-[49px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#0A0A0C] border border-[#008450]/50 group-hover:border-[#008450] group-hover:scale-110 transition-all duration-300">
                <TokenIcon className="text-[#008450] animate-pulse" />
              </span>

              {/* Card Container */}
              <div className="bg-[#0A0A0C] border border-border-gold/20 hover:border-[#008450]/30 rounded-lg p-5 sm:p-6 transition-all duration-300 gold-glow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Event & Project */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-text-offwhite">
                      <Trophy size={14} className="text-[#F4B223]" />
                      <h3 className="font-heading text-base sm:text-lg font-bold">
                        {event.event}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                      <Train size={11} className="text-text-muted/60" />
                      <span>MODULE ROUTE:</span>
                      <span className="text-text-offwhite/90 font-sans font-medium hover:text-[#008450] hover:underline cursor-pointer flex items-center gap-0.5">
                        {event.project}
                        <ChevronRight size={10} />
                      </span>
                    </div>
                  </div>

                  {/* Outcome Badge & Date */}
                  <div className="flex flex-row sm:flex-col sm:items-end items-center justify-between sm:justify-start gap-2">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#008450]/40 bg-[#008450]/5 text-[#008450] inline-flex items-center gap-1.5">
                      <Award size={10} />
                      {event.outcome}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-text-muted">
                      <Calendar size={11} className="text-text-muted/60" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
