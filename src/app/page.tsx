"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Star, ChevronDown, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { InstagramGrid } from "@/components/InstagramGrid";
import { CraftSection } from "@/components/CraftSection";
import { PRODUCTS, COLLECTIONS } from "@/lib/db-mock";
import { motion } from "framer-motion";

export default function Home() {
  const bestsellers = PRODUCTS.slice(0, 4);
  const featuredCollections = COLLECTIONS;

  const reviews = [
    {
      id: "rev_1",
      rating: 5,
      comment: "The Morning Mug has completely transformed my tea ritual. It feels substantial, warm, and the oatmeal glaze is breathtaking. I find myself holding it with both hands just to feel the clay texture.",
      author: "Aditi Sharma",
      verified: true
    },
    {
      id: "rev_2",
      rating: 5,
      comment: "Ordered the set of salad plates for hosting dinner. Our guests couldn't stop asking where we got them. They look like pieces from an art gallery, yet they survive the dishwasher perfectly.",
      author: "Rohan Kapoor",
      verified: true
    },
    {
      id: "rev_3",
      rating: 5,
      comment: "Each item has its own fingerprint. You can see the thumb rests, the slight variations in iron speckles. It feels like buying an object with a soul, not just mass-manufactured homeware.",
      author: "Priya Nair",
      verified: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 bg-espresso/25 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1600&auto=format&fit=crop"
          alt="Ceramelle cinematic pottery lifestyle background"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-4xl px-6 space-y-6 md:space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-functional text-xs font-bold tracking-[0.3em] text-white uppercase"
          >
            HANDSHAPED IN INDIA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-wide uppercase leading-tight"
          >
            Objects made to be <br className="hidden sm:inline" /> lived with.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-editorial text-base sm:text-xl text-white/90 font-light max-w-2xl mx-auto italic leading-relaxed"
          >
            &ldquo;Handcrafted ceramics designed for slow mornings, beautiful tables and everyday rituals.&rdquo;
          </motion.p>
          
          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-ivory hover:bg-clay text-espresso hover:text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-xl"
            >
              Shop the Collection
            </Link>
            <Link
              href="/story"
              className="w-full sm:w-auto border border-white hover:bg-white hover:text-espresso text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Discover Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="font-functional text-[9px] font-semibold tracking-[0.2em] uppercase">
            Scroll Down
          </span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-16">
        <div className="space-y-4 max-w-xl mx-auto">
          <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
            MADE FOR EVERYDAY RITUALS
          </h2>
          <p className="font-editorial text-3xl md:text-4xl text-espresso font-light">
            Curated Collections
          </p>
          <div className="h-0.5 w-12 bg-clay/35 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredCollections.map((col) => (
            <Link
              key={col.slug}
              href={`/shop?collection=${col.slug}`}
              className="group relative h-[380px] w-full bg-sand/35 overflow-hidden flex flex-col justify-end p-6 border border-beige-border/10 focus:outline-none"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/15 to-transparent z-10" />
              
              <div className="relative z-20 text-left text-white space-y-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-functional text-xs text-white/70 tracking-widest uppercase">
                  Collection
                </span>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-editorial text-2xl font-light tracking-wide">{col.name}</h3>
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
                </div>
                <p className="font-functional text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                  {col.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS */}
      <section className="py-24 border-t border-beige-border bg-sand/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-beige-border pb-6">
            <div className="space-y-3 text-left">
              <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
                THE PIECES YOU KEEP COMING BACK TO
              </h2>
              <p className="font-editorial text-3xl md:text-4xl text-espresso font-light">
                Customer Favorites
              </p>
            </div>
            <Link
              href="/shop"
              className="font-functional text-xs font-bold tracking-widest uppercase border-b border-espresso pb-1 text-espresso hover:text-clay hover:border-clay transition-colors flex items-center gap-1 shrink-0"
            >
              View All Products
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. STORYTELLING CRAFT PROCESS */}
      <CraftSection />

      {/* 5. SHOP BY MOOD */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-16">
        <div className="space-y-4 max-w-xl mx-auto">
          <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
            CHOOSE YOUR ATMOSPHERE
          </h2>
          <p className="font-editorial text-3xl md:text-4xl text-espresso font-light">
            Shop by Mood
          </p>
          <div className="h-0.5 w-12 bg-clay/35 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredCollections.map((col) => (
            <Link
              key={col.slug}
              href={`/shop?collection=${col.slug}`}
              className="bg-sand/30 hover:bg-clay/5 border border-beige-border p-8 md:p-12 flex flex-col items-center justify-center group transition-colors focus:outline-none"
            >
              <span className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                {col.moodEmoji}
              </span>
              <h3 className="font-editorial text-xl font-light text-espresso uppercase tracking-wider group-hover:text-clay transition-colors">
                {col.name}
              </h3>
              <p className="font-functional text-[10px] text-espresso/45 uppercase tracking-widest mt-2">
                Explore Atmosphere
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. SEE IT IN YOUR SPACE (AI Visualizer Concept Banner) */}
      <section className="py-16 bg-espresso text-ivory border-y border-beige-border/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-left max-w-2xl">
            <div className="flex items-center gap-2 text-clay">
              <Sparkles size={16} />
              <span className="font-functional text-xs font-bold tracking-widest uppercase">
                Interactive Studio Canvas
              </span>
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl font-light tracking-wide leading-tight">
              See Our Ceramics <br /> in Your Space
            </h2>
            <p className="font-functional text-sm text-ivory/70 leading-relaxed">
              Upload a snapshot of your dining room, kitchen counter, or breakfast table. Layer and position our handthrown mugs, plates, and teapots dynamically to visualize their colors and scale on your own surfaces.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/shop?tab=visualizer"
              className="w-full md:w-auto inline-flex items-center justify-center bg-ivory hover:bg-clay text-espresso hover:text-white font-functional text-xs font-semibold tracking-widest uppercase px-10 py-5 transition-colors cursor-pointer"
            >
              Open Space Visualizer
            </Link>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS */}
      <section className="py-24 bg-sand/10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center space-y-12">
          <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
            STORY LETTERS
          </h2>
          <p className="font-editorial text-3xl md:text-4xl text-espresso font-light">
            Customer Reflections
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-ivory border border-beige-border p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex text-clay">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" className="text-clay" />
                    ))}
                  </div>
                  <p className="font-editorial text-sm italic text-espresso/80 leading-relaxed font-medium">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-beige-border/50 pt-4 text-[11px] font-functional">
                  <span className="font-semibold text-espresso">{rev.author}</span>
                  {rev.verified && (
                    <span className="text-clay bg-clay/5 px-2 py-0.5 rounded-full text-[9px] font-bold">
                      Verified Owner
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BRAND STORY CARD */}
      <section className="relative h-[480px] w-full flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 bg-espresso/35 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1200&auto=format&fit=crop"
          alt="Clay studio process background"
          fill
          className="object-cover"
        />
        <div className="relative z-20 max-w-2xl px-6 md:px-16 text-left text-white space-y-6">
          <p className="font-functional text-xs font-bold tracking-widest text-clay uppercase">
            Our Philosophy
          </p>
          <h2 className="font-editorial text-3xl md:text-5xl font-light tracking-wide uppercase leading-tight">
            MADE SLOWLY. <br /> MADE TO LAST.
          </h2>
          <p className="font-editorial text-sm md:text-base text-white/90 font-light italic leading-relaxed">
            &ldquo;In a world of fast production, we choose the potter&apos;s wheel. We clay-refine, shape, glaze, and fire objects with slow, deliberate attention. Our ceramics carry the thumb marks, the breath, and the stories of the artisans who shaped them.&rdquo;
          </p>
          <Link
            href="/story"
            className="inline-flex items-center gap-2 font-functional text-xs font-bold tracking-widest uppercase border-b border-white pb-1 text-white hover:text-clay hover:border-clay transition-colors"
          >
            OUR STORY
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* 9. GIFTING */}
      <section className="py-20 bg-sand/15 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
            CURATED CELEBRATIONS
          </h2>
          <p className="font-editorial text-3xl md:text-4xl text-espresso font-light">
            For Someone Who Loves Beautiful Things
          </p>
          <p className="font-functional text-xs text-espresso/60 max-w-md mx-auto leading-relaxed">
            Beautifully boxed gift bundles, custom set configurations, and studio gift cards. Hand-wrapped in linen and recycled paper tags.
          </p>
          <div className="pt-2">
            <Link
              href="/shop?tab=set-builder"
              className="inline-block bg-espresso hover:bg-clay text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Shop Curated Sets
            </Link>
          </div>
        </div>
      </section>

      {/* 10. SOCIAL PROOF INSTAGRAM GRID */}
      <section className="py-20 border-t border-beige-border bg-ivory">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
              INSTAGRAM LIFESTYLE
            </h2>
            <p className="font-editorial text-2xl md:text-3xl text-espresso font-light">
              As Seen in Your Homes
            </p>
          </div>
          <InstagramGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
