"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SetBuilder } from "@/components/SetBuilder";
import { SpaceVisualizer } from "@/components/SpaceVisualizer";
import { PRODUCTS, COLLECTIONS, Product } from "@/lib/db-mock";
import { SlidersHorizontal, ArrowUpDown, Grid, LayoutGrid, Layers, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper component that reads URL parameters and sets local catalog states
const ShopContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active Tab: 'catalog' | 'collections' | 'set-builder' | 'visualizer'
  const [activeTab, setActiveTab] = useState<string>("catalog");
  
  // Catalog states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync tab, category, and collection from URL params
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    } else {
      setActiveTab("catalog");
    }

    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
      setActiveTab("catalog");
    }

    const colParam = searchParams.get("collection");
    if (colParam) {
      setSelectedCollection(colParam);
      setActiveTab("catalog");
    }
  }, [searchParams]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // update URL parameter
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    // remove others when switching tabs to avoid confusion
    if (tab !== "catalog") {
      params.delete("category");
      params.delete("collection");
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  // Unique categories list
  const categories = ["all", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  // Filtering products
  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const collectionMatch = selectedCollection === "all" || product.collection === selectedCollection;
    return categoryMatch && collectionMatch;
  });

  // Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default Featured (natural index)
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedCollection("all");
    setSortBy("featured");
    
    // Clear URL parameters
    router.push("/shop?tab=catalog", { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 text-espresso">
      
      {/* 1. Header & Tabs Toggles */}
      <div className="text-center space-y-8 mb-16">
        <h1 className="font-editorial text-4xl md:text-5xl font-light tracking-wide uppercase text-espresso">
          The Studio Catalog
        </h1>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-beige-border justify-center max-w-2xl mx-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleTabChange("catalog")}
            className={`px-6 py-4 font-functional text-xs font-semibold tracking-widest uppercase border-b-2 cursor-pointer whitespace-nowrap transition-all ${
              activeTab === "catalog"
                ? "border-clay text-clay"
                : "border-transparent text-espresso/60 hover:text-espresso"
            }`}
          >
            Browse Pieces
          </button>
          <button
            onClick={() => handleTabChange("collections")}
            className={`px-6 py-4 font-functional text-xs font-semibold tracking-widest uppercase border-b-2 cursor-pointer whitespace-nowrap transition-all ${
              activeTab === "collections"
                ? "border-clay text-clay"
                : "border-transparent text-espresso/60 hover:text-espresso"
            }`}
          >
            Curated Collections
          </button>
          <button
            onClick={() => handleTabChange("set-builder")}
            className={`px-6 py-4 font-functional text-xs font-semibold tracking-widest uppercase border-b-2 cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "set-builder"
                ? "border-clay text-clay"
                : "border-transparent text-espresso/60 hover:text-espresso"
            }`}
          >
            <Layers size={12} />
            Build Your Table
          </button>
          <button
            onClick={() => handleTabChange("visualizer")}
            className={`px-6 py-4 font-functional text-xs font-semibold tracking-widest uppercase border-b-2 cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "visualizer"
                ? "border-clay text-clay"
                : "border-transparent text-espresso/60 hover:text-espresso"
            }`}
          >
            <Sparkles size={12} />
            Space Visualizer
          </button>
        </div>
      </div>

      {/* 2. Render Active Tab */}
      
      {/* CATALOG TAB */}
      {activeTab === "catalog" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-10 pr-6 border-r border-beige-border/50 text-left">
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="font-functional text-xs font-bold tracking-widest uppercase text-espresso/50">
                Categories
              </h3>
              <div className="flex flex-col space-y-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-functional text-sm text-left capitalize transition-colors ${
                      selectedCategory === cat
                        ? "text-clay font-semibold underline underline-offset-4"
                        : "text-espresso/70 hover:text-espresso"
                    }`}
                  >
                    {cat === "all" ? "All Pieces" : cat.replace("-", " & ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div className="space-y-4">
              <h3 className="font-functional text-xs font-bold tracking-widest uppercase text-espresso/50">
                Collections
              </h3>
              <div className="flex flex-col space-y-2.5">
                <button
                  onClick={() => setSelectedCollection("all")}
                  className={`font-functional text-sm text-left transition-colors ${
                    selectedCollection === "all"
                      ? "text-clay font-semibold underline underline-offset-4"
                      : "text-espresso/70 hover:text-espresso"
                  }`}
                >
                  All Collections
                </button>
                {COLLECTIONS.map((col) => (
                  <button
                    key={col.slug}
                    onClick={() => setSelectedCollection(col.slug)}
                    className={`font-functional text-sm text-left transition-colors ${
                      selectedCollection === col.slug
                        ? "text-clay font-semibold underline underline-offset-4"
                        : "text-espresso/70 hover:text-espresso"
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-4">
              <h3 className="font-functional text-xs font-bold tracking-widest uppercase text-espresso/50">
                Sort By
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-sand/20 border border-beige-border p-3 font-functional text-xs text-espresso/80 focus:outline-none"
              >
                <option value="featured">Featured Favorites</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>

            {/* Clear All */}
            {(selectedCategory !== "all" || selectedCollection !== "all" || sortBy !== "featured") && (
              <button
                onClick={clearFilters}
                className="w-full py-3 bg-sand text-espresso hover:bg-espresso hover:text-white font-functional text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </aside>

          {/* Product Grid Panel (right 3 cols) */}
          <main className="lg:col-span-3 space-y-8 text-left">
            {/* Filter bar info & Mobile trigger */}
            <div className="flex justify-between items-center border-b border-beige-border/50 pb-4">
              <p className="font-functional text-xs text-espresso/60">
                Showing <span className="font-semibold text-espresso">{sortedProducts.length}</span> pieces
              </p>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 border border-beige-border text-espresso font-functional text-xs font-semibold tracking-wider uppercase bg-sand/10"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>

              {/* Desktop Quick Sort indicator */}
              <div className="hidden lg:flex items-center gap-2">
                <ArrowUpDown size={12} className="text-espresso/45" />
                <span className="font-functional text-xs text-espresso/45">Sorting:</span>
                <span className="font-functional text-xs font-semibold capitalize text-espresso">
                  {sortBy.replace("-", " ")}
                </span>
              </div>
            </div>

            {/* Product Card Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
                <p className="font-editorial text-lg italic text-espresso/60">
                  No products match your selected filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="font-functional text-xs font-semibold tracking-widest uppercase bg-espresso text-white px-6 py-3 hover:bg-clay transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      )}

      {/* COLLECTIONS TAB */}
      {activeTab === "collections" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {COLLECTIONS.map((col) => (
            <div key={col.slug} className="border border-beige-border p-6 bg-sand/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full bg-sand overflow-hidden">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{col.moodEmoji}</span>
                    <h3 className="font-editorial text-2xl font-light text-espresso">
                      {col.name}
                    </h3>
                  </div>
                  <p className="font-functional text-xs text-espresso/60 leading-relaxed">
                    {col.description}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSelectedCollection(col.slug);
                  setActiveTab("catalog");
                }}
                className="w-full py-4 bg-espresso hover:bg-clay text-white font-functional text-xs font-semibold tracking-widest uppercase transition-colors text-center"
              >
                Browse Collection
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SET BUILDER TAB */}
      {activeTab === "set-builder" && <SetBuilder />}

      {/* VISUALIZER TAB */}
      {activeTab === "visualizer" && <SpaceVisualizer />}

      {/* Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-espresso lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-ivory p-6 shadow-2xl flex flex-col justify-between border-l border-beige-border lg:hidden text-left"
            >
              <div className="space-y-8 overflow-y-auto pr-2 no-scrollbar">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-beige-border/50 pb-4">
                  <h2 className="font-editorial text-xl font-semibold text-espresso">Filters</h2>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1 hover:bg-sand rounded-full text-espresso"
                    aria-label="Close filters"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h3 className="font-functional text-xs font-bold tracking-widest uppercase text-espresso/50">
                    Categories
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsMobileFiltersOpen(false);
                        }}
                        className={`font-functional text-sm text-left capitalize ${
                          selectedCategory === cat ? "text-clay font-semibold underline underline-offset-4" : "text-espresso/70"
                        }`}
                      >
                        {cat === "all" ? "All Pieces" : cat.replace("-", " & ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collections */}
                <div className="space-y-3">
                  <h3 className="font-functional text-xs font-bold tracking-widest uppercase text-espresso/50">
                    Collections
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCollection("all");
                        setIsMobileFiltersOpen(false);
                      }}
                      className={`font-functional text-sm text-left ${
                        selectedCollection === "all" ? "text-clay font-semibold underline underline-offset-4" : "text-espresso/70"
                      }`}
                    >
                      All Collections
                    </button>
                    {COLLECTIONS.map((col) => (
                      <button
                        key={col.slug}
                        onClick={() => {
                          setSelectedCollection(col.slug);
                          setIsMobileFiltersOpen(false);
                        }}
                        className={`font-functional text-sm text-left ${
                          selectedCollection === col.slug ? "text-clay font-semibold underline underline-offset-4" : "text-espresso/70"
                        }`}
                      >
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                  <h3 className="font-functional text-xs font-bold tracking-widest uppercase text-espresso/50">
                    Sort By
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setIsMobileFiltersOpen(false);
                    }}
                    className="w-full bg-sand/20 border border-beige-border p-3 font-functional text-xs text-espresso/80 focus:outline-none"
                  >
                    <option value="featured">Featured Favorites</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Customer Rated</option>
                  </select>
                </div>
              </div>

              {/* Reset button at bottom */}
              <div className="pt-6 border-t border-beige-border/50">
                <button
                  onClick={() => {
                    clearFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full py-4 bg-espresso hover:bg-clay text-white font-functional text-xs font-semibold tracking-widest uppercase transition-colors text-center"
                >
                  Reset All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Shop() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center h-screen bg-ivory">
          <p className="font-editorial text-lg italic text-espresso/60 animate-pulse">Loading Ceramelle Studio Catalog...</p>
        </div>
      }>
        <ShopContent />
      </Suspense>
      <Footer />
    </div>
  );
}
