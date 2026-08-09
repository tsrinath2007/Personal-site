"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

const ARTICLES: JournalArticle[] = [
  {
    slug: "slow-morning-rituals",
    title: "Slow Mornings: The Art of the Pour-Over",
    excerpt: "Why manual coffee brewing is the ultimate meditation. How a ceramic dripper guides the flow of water and forces us to pause.",
    date: "June 24, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "dinnerware-color-guide",
    title: "Table Palette: Styling Clay and Textiles",
    excerpt: "Mixing satin glazes, raw sand textures, and linen runner coordinates to frame shared dinner stories at home.",
    date: "May 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "caring-for-pottery",
    title: "Caring for Handthrown Stoneware",
    excerpt: "Best practices in heating, handwashing, and storing handmade ceramics to ensure they serve you for generations.",
    date: "April 05, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=600&auto=format&fit=crop"
  }
];

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-32 pb-24 text-espresso">
        {/* 1. Header Hero */}
        <section className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 mb-20">
          <h1 className="font-functional text-xs font-bold tracking-[0.3em] text-clay uppercase">
            OUR PURPOSE
          </h1>
          <p className="font-editorial text-4xl md:text-6xl text-espresso font-light tracking-wide leading-tight uppercase">
            Made Slowly. <br /> Made to Last.
          </p>
          <div className="h-0.5 w-12 bg-clay/35 mx-auto my-6" />
          <p className="font-editorial text-lg md:text-xl text-espresso/70 italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;We shape organic, durable ceramic objects that celebrate slow rituals, domestic tables, and everyday moments of presence.&rdquo;
          </p>
        </section>

        {/* 2. Visual Story Blocks */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-24 mb-28">
          
          {/* Block 1 */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 aspect-[16/10] relative bg-sand overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565192647048-f997ded87958?q=80&w=800&auto=format&fit=crop"
                alt="Master potter shaping clay vessel on wheel"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 text-left max-w-xl">
              <h2 className="font-editorial text-2xl md:text-3xl font-light">
                The Clay We Shape
              </h2>
              <p className="font-functional text-sm text-espresso/70 leading-relaxed">
                We shape local clay to connect modern homes with raw, Indian soil. Every piece is twice-kilned at 1220°C, leaving raw textures exposed for a tactile connection to the earth.
              </p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="w-full md:w-1/2 aspect-[16/10] relative bg-sand overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1535401991746-da3d9055713e?q=80&w=800&auto=format&fit=crop"
                alt="Fresh dipped pots drying in clay studio"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 text-left max-w-xl">
              <h2 className="font-editorial text-2xl md:text-3xl font-light">
                Unique Glaze Fingerprints
              </h2>
              <p className="font-functional text-sm text-espresso/70 leading-relaxed">
                Our in-house glazes react organically to intense kiln flames. Natural iron speckles bloom uniquely on every piece, ensuring no two objects are identical.
              </p>
            </div>
          </div>
        </section>

        {/* 3. The Journal section */}
        <section id="journal" className="py-20 bg-sand/15 border-t border-b border-beige-border/50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-clay">
                <BookOpen size={16} />
                <span className="font-functional text-xs font-bold tracking-widest uppercase">
                  THE STUDIO JOURNAL
                </span>
              </div>
              <h2 className="font-editorial text-3xl md:text-4xl text-espresso font-light">
                Slow Living & Creative Insights
              </h2>
              <div className="h-0.5 w-12 bg-clay/35 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {ARTICLES.map((art) => (
                <div key={art.slug} className="group flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="relative aspect-[16/11] w-full bg-sand overflow-hidden">
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between font-functional text-[10px] text-espresso/45 uppercase font-bold tracking-wider">
                        <span>{art.date}</span>
                        <span>&middot;</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="font-editorial text-xl font-light text-espresso group-hover:text-clay transition-colors leading-tight">
                        {art.title}
                      </h3>
                      <p className="font-functional text-xs text-espresso/60 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Journal article "${art.title}" is currently a preview.`)}
                    className="font-functional text-xs font-bold tracking-widest uppercase border-b border-espresso pb-1 text-espresso hover:text-clay hover:border-clay transition-colors w-max flex items-center gap-1 cursor-pointer"
                  >
                    Read Story
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Bottom CTA */}
        <section className="mt-20 text-center space-y-6 max-w-xl mx-auto px-6">
          <h2 className="font-editorial text-2xl md:text-3xl text-espresso font-light">
            Bring Art to Your Table
          </h2>
          <p className="font-functional text-xs text-espresso/60 leading-relaxed">
            Our catalog changes throughout the year as our master artisans design new shapes and blend new glazes.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block bg-espresso hover:bg-clay text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
