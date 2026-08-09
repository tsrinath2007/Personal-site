"use client";

import React, { Suspense } from "react";
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

  const categories = [
    { name: "Mugs", slug: "mugs", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop" },
    { name: "Plates", slug: "plates", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop" },
    { name: "Bowls", slug: "bowls", image: "https://images.unsplash.com/photo-1612195973809-f1a5bb0f4886?q=80&w=600&auto=format&fit=crop" },
    { name: "Teapots", slug: "teapots", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&auto=format&fit=crop" },
    { name: "Vases", slug: "vases", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&auto=format&fit=crop" },
    { name: "Sets", slug: "sets", href: "/shop?tab=set-builder", image: "https://images.unsplash.com/photo-1574926053821-79c5e338a933?q=80&w=600&auto=format&fit=crop" },
  ];

  const reviews = [
    {
      id: "rev_1",
      rating: 5,
      comment: "The Morning Mug has transformed my morning ritual. It feels substantial, warm, and the oatmeal glaze is breathtaking.",
      author: "Aditi Sharma",
      verified: true
    },
    {
      id: "rev_2",
      rating: 5,
      comment: "Our dinner guests couldn't stop asking where we got these plates. They look like pieces from a fine art gallery.",
      author: "Rohan Kapoor",
      verified: true
    },
    {
      id: "rev_3",
      rating: 5,
      comment: "You can see the thumb rests and the unique glaze flecks. These carry a soul unlike mass homeware.",
      author: "Priya Nair",
      verified: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      {/* 1. CINEMATIC PRODUCT HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-espresso/20 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop"
          alt="Ceramelle slow morning ceramic tableware background"
          fill
          priority
          className="object-cover"
        />

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-4xl px-6 space-y-6">
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
            Objects made to be <br /> lived with.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-editorial text-base sm:text-lg text-white/90 font-light max-w-xl mx-auto italic"
          >
            Handcrafted ceramics designed for slow mornings, beautiful tables and everyday rituals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-ivory hover:bg-clay text-espresso hover:text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors shadow-xl"
            >
              Shop Ceramics
            </Link>
            <Link
              href="/story"
              className="w-full sm:w-auto border border-white hover:bg-white hover:text-espresso text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Explore Our Story
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

      {/* 2. FIND YOUR PIECE (EARLY SHOP CATEGORY GRID) */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-12">
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
            FIND YOUR PIECE
          </h2>
          <p className="font-editorial text-2xl md:text-3xl text-espresso font-light">
            Shop by Category
          </p>
          <div className="h-0.5 w-12 bg-clay/35 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href || `/shop?category=${cat.slug}`}
              className="group flex flex-col items-center focus:outline-none"
            >
              <div className="relative aspect-square w-full bg-sand/30 overflow-hidden mb-3">
                <Image
                  src={cat.image}
                  alt={`${cat.name} Category`}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-espresso/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <span className="font-functional text-xs font-bold tracking-widest uppercase text-espresso group-hover:text-clay transition-colors flex items-center gap-0.5">
                {cat.name}
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS */}
      <section className="py-24 border-t border-beige-border bg-sand/15">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-beige-border pb-6">
            <div className="space-y-2 text-left">
              <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
                THE PIECES YOU KEEP COMING BACK TO
              </h2>
              <p className="font-editorial text-2xl md:text-3xl text-espresso font-light">
                Studio Bestsellers
              </p>
            </div>
            <Link
              href="/shop"
              className="font-functional text-xs font-bold tracking-widest uppercase border-b border-espresso pb-1 text-espresso hover:text-clay hover:border-clay transition-colors flex items-center gap-1 shrink-0"
            >
              View Catalog
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

      {/* 4. IMMERSIVE "SET THE TABLE" BANNER */}
      <section className="relative h-[550px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-espresso/30 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1535401991746-da3d9055713e?q=80&w=1600&auto=format&fit=crop"
          alt="Earthy Ceramelle tableware dining setting"
          fill
          className="object-cover"
        />
        
        <div className="relative z-20 max-w-2xl px-6 text-center text-white space-y-6">
          <h2 className="font-editorial text-4xl md:text-6xl font-light tracking-wide uppercase leading-tight">
            SET THE TABLE.
          </h2>
          <p className="font-editorial text-base md:text-lg text-white/90 font-light italic leading-relaxed max-w-lg mx-auto">
            Explore rustic, twice-kilned dinnerware created to elevate daily dining and hosting rituals.
          </p>
          <div className="pt-2">
            <Link
              href="/shop?category=plates"
              className="inline-block bg-ivory hover:bg-clay text-espresso hover:text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors shadow-lg"
            >
              Shop Dinnerware
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CURATED ATMOSPHERE / COLLECTIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-16">
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
            CHOOSE YOUR ATMOSPHERE
          </h2>
          <p className="font-editorial text-2xl md:text-3xl text-espresso font-light">
            Explore Curated Collections
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
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent z-10" />
              
              <div className="relative z-20 text-left text-white space-y-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-functional text-[10px] text-white/60 tracking-widest uppercase">
                  {col.moodEmoji} Collection
                </span>
                <div className="flex items-center gap-1">
                  <h3 className="font-editorial text-xl font-light tracking-wide">{col.name}</h3>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
                </div>
                <p className="font-functional text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-1">
                  {col.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. THE POTTERY PROCESS TIMELINE */}
      <CraftSection />

      {/* 7. SPACE VISUALIZER OPTIONAL BANNER */}
      <section className="py-16 bg-espresso text-ivory border-y border-beige-border/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left max-w-2xl">
            <div className="flex items-center gap-2 text-clay">
              <Sparkles size={16} />
              <span className="font-functional text-xs font-bold tracking-widest uppercase">
                See It In Your Space
              </span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-light tracking-wide leading-tight">
              Test Ceramelle Ceramics at Home
            </h2>
            <p className="font-functional text-xs text-ivory/70 leading-relaxed">
              Upload a snapshot of your table or counter, and drag our mugs, teapots, and plates dynamically to verify their colors and sizes.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/shop?tab=visualizer"
              className="w-full md:w-auto inline-flex items-center justify-center bg-ivory hover:bg-clay text-espresso hover:text-white font-functional text-xs font-semibold tracking-widest uppercase px-8 py-4.5 transition-colors cursor-pointer"
            >
              Try Visualizer
            </Link>
          </div>
        </div>
      </section>

      {/* 8. REVIEWS */}
      <section className="py-24 bg-sand/10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center space-y-12">
          <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
            STUDIO LETTERS
          </h2>
          <p className="font-editorial text-2xl md:text-3xl text-espresso font-light">
            Customer Reflections
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-ivory border border-beige-border p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-clay">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" className="text-clay" />
                    ))}
                  </div>
                  <p className="font-editorial text-sm italic text-espresso/80 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-beige-border/50 pt-3 text-[10px] font-functional">
                  <span className="font-semibold text-espresso">{rev.author}</span>
                  <span className="text-clay font-bold">Verified Owner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SOCIAL PROOF INSTAGRAM GRID */}
      <section className="py-20 border-t border-beige-border bg-ivory">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-2">
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
