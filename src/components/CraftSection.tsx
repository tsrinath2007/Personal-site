"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CraftStep {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const CRAFT_STEPS: CraftStep[] = [
  {
    title: "THE CLAY",
    subtitle: "Sourced from the Earth",
    description: "Earthy, high-quality clay sourced locally in India. Each batch is refined, filtered, and aged to achieve the perfect tactile elasticity for the wheel.",
    image: "https://images.unsplash.com/photo-1595181768407-3537c3850759?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "THE HANDS",
    subtitle: "Thrown on the Wheel",
    description: "Individually thrown by master potters. With patience and rhythmic flow, wet clay is shaped. Trimming and carving add the organic irregularities that define our style.",
    image: "https://images.unsplash.com/photo-1565192647048-f997ded87958?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "THE GLAZE",
    subtitle: "Dipped in Mineral Tones",
    description: "Every piece is hand-dipped in mineral glazes formulated in-house. Natural drips, speckles, and flows emerge uniquely on every item.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "THE FIRE",
    subtitle: "Vitrefied at 1220°C",
    description: "Fired twice in high-temperature gas kilns. The intense heat permanently bonds the glaze and vitrifies the stoneware, making it highly durable for everyday use.",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "YOUR HOME",
    subtitle: "Objects for Slow Rituals",
    description: "Arriving at your table, these objects cease to be just clay. They become silent, comforting companions for your slow mornings, dinners, and daily celebrations.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"
  }
];

export const CraftSection: React.FC = () => {
  return (
    <section className="py-24 bg-sand/15 border-t border-b border-beige-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
          <h2 className="font-editorial text-xs font-semibold tracking-[0.25em] text-clay uppercase">
            MADE SLOWLY. MADE TO LAST.
          </h2>
          <p className="font-editorial text-3xl md:text-4xl text-espresso font-light">
            The Journey of a Ceramelle Piece
          </p>
          <div className="h-0.5 w-12 bg-clay/35 mx-auto mt-6" />
        </div>

        {/* Steps Grid */}
        <div className="space-y-16">
          {CRAFT_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-[4/3] relative bg-sand/20 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 font-functional text-[10px] font-bold tracking-widest bg-ivory px-3 py-1.5 shadow text-espresso">
                    STAGE 0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 space-y-4 text-left max-w-lg">
                  <h3 className="font-functional text-xs font-bold tracking-widest text-clay uppercase">
                    {step.title}
                  </h3>
                  <h4 className="font-editorial text-2xl md:text-3xl text-espresso font-light">
                    {step.subtitle}
                  </h4>
                  <p className="font-functional text-sm text-espresso/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
