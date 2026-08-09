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
    subtitle: "Refined Earth",
    description: "Sourced locally, our grey stoneware clay is aged and refined to achieve organic tactile elasticity.",
    image: "https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "THE HANDS",
    subtitle: "Artisan Thrown",
    description: "Each individual vessel is hand-thrown on the potter's wheel with deliberate intention and patience.",
    image: "https://images.unsplash.com/photo-1565192647048-f997ded87958?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "THE GLAZE",
    subtitle: "Dipped in Minerals",
    description: "Every pot is hand-dipped in mineral glazes formulated in-house, creating natural, raw run patterns.",
    image: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "THE FIRE",
    subtitle: "Vitrified at 1220°C",
    description: "Twice kiln-fired under intense high heat to bond raw glazes and seal the durable stoneware.",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "YOUR HOME",
    subtitle: "Slow Living Companion",
    description: "A tactile, handformed companion for your quiet morning coffees and slow tablescape dinners.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop"
  }
];

export const CraftSection: React.FC = () => {
  return (
    <section id="craft" className="py-24 bg-sand/15 border-t border-b border-beige-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
          <h2 className="font-functional text-xs font-semibold tracking-[0.25em] text-clay uppercase">
            MADE SLOWLY. MADE TO LAST.
          </h2>
          <p className="font-editorial text-3xl md:text-4xl text-espresso font-light">
            The Pottery Process
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-[16/10] relative bg-sand/20 overflow-hidden">
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
