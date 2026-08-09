"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Minus, ArrowLeft, Heart, ChevronDown, Check, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getProductBySlug, PRODUCTS, Product } from "@/lib/db-mock";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-beige-border pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-left font-functional text-xs font-bold tracking-widest uppercase text-espresso hover:text-clay transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <ChevronDown size={14} className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 text-xs font-functional text-espresso/70 leading-relaxed text-left space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  // Gallery states
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center" });
  const [isZooming, setIsZooming] = useState(false);

  // Option states (e.g. Color, Size)
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // Initialize options with defaults
  useEffect(() => {
    if (product) {
      const defaults: { [key: string]: string } = {};
      product.options.forEach((opt) => {
        defaults[opt.name] = opt.values[0];
      });
      setSelectedOptions(defaults);
      setActiveImageIdx(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-ivory">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 pt-32">
          <h2 className="font-editorial text-2xl text-espresso mb-4">Object Not Found</h2>
          <p className="font-functional text-sm text-espresso/60 mb-6">This piece may have been removed or sold out.</p>
          <Link href="/shop" className="bg-espresso text-white px-6 py-3 font-functional text-xs font-semibold tracking-widest uppercase hover:bg-clay transition-colors">
            Return to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate dynamic variant selection details
  const getSelectedVariantName = () => {
    return product.options.map((opt) => selectedOptions[opt.name] || opt.values[0]).join(" / ");
  };

  const selectedVariantName = getSelectedVariantName();
  const activeVariant = product.variants.find((v) => v.name === selectedVariantName);
  
  const itemPrice = product.price + (activeVariant ? activeVariant.priceModifier : 0);
  const isOutOfStock = activeVariant ? activeVariant.stock === 0 : false;

  // Magnifying Zoom coordinates calculator
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  const handleAdd = () => {
    addItem(product, selectedVariantName, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariantName, quantity);
    router.push("/checkout");
  };

  // Cross-sell items
  const pairItems = product.pairWith
    .map((pairSlug) => PRODUCTS.find((p) => p.slug === pairSlug))
    .filter((p): p is Product => p !== undefined);

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      {/* Main product wrapper */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 text-espresso">
        
        {/* Breadcrumbs / Back button */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/shop"
            className="flex items-center gap-1.5 font-functional text-xs font-semibold tracking-widest uppercase text-espresso/60 hover:text-clay transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
          <div className="hidden sm:block text-[10px] font-functional font-medium tracking-wider text-espresso/40">
            HOME / SHOP / {product.category.toUpperCase()} / {product.name.toUpperCase()}
          </div>
        </div>

        {/* Product presentation grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Gallery & Magnifier Zoom (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Large Image Showcase with Hover Zoom */}
            <div
              className="relative aspect-[4/5] bg-sand/30 border border-beige-border/10 overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[activeImageIdx] || product.image}
                alt={`${product.name} primary angle`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                style={isZooming ? { ...zoomStyle, transform: "scale(1.8)" } : undefined}
                className="object-cover transition-transform duration-200 ease-out"
              />
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3 justify-center md:justify-start">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 bg-sand/30 border cursor-pointer overflow-hidden ${
                      activeImageIdx === idx ? "border-clay" : "border-beige-border hover:border-espresso/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Commerce Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Title & Price Header */}
            <div className="space-y-3">
              <h1 className="font-editorial text-3xl md:text-4xl font-light text-espresso leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3">
                <p className="font-functional text-xl font-semibold text-espresso">
                  ₹{itemPrice}
                </p>
                <div className="h-4 w-px bg-beige-border" />
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-clay">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        className={i < Math.floor(product.rating) ? "text-clay" : "text-espresso/25"}
                      />
                    ))}
                  </div>
                  <span className="font-functional text-[10px] font-bold text-espresso/50 uppercase tracking-widest pt-0.5">
                    {product.rating} &middot; {product.reviewCount} Reviews
                  </span>
                </div>
              </div>
              
              <p className="font-functional text-xs text-espresso/60 italic leading-relaxed pt-1">
                &ldquo;{product.description}&rdquo;
              </p>
            </div>

            {/* Option Customizers (e.g. Color Dropdown/Buttons, Sizes) */}
            <div className="border-t border-b border-beige-border/50 py-6 space-y-6">
              {product.options.map((opt) => (
                <div key={opt.name} className="space-y-3">
                  <span className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/50">
                    {opt.name}
                  </span>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {opt.values.map((val) => {
                      const isSelected = selectedOptions[opt.name] === val;
                      return (
                        <button
                          key={val}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))
                          }
                          className={`px-4 py-2.5 font-functional text-xs font-semibold tracking-wider border cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-espresso text-white border-espresso"
                              : "bg-ivory text-espresso border-beige-border hover:border-espresso/45"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity Counter */}
              <div className="space-y-3">
                <span className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/50">
                  Quantity
                </span>
                <div className="flex items-center border border-beige-border bg-sand/10 rounded w-max">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-sand text-espresso transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-functional text-xs font-bold px-5 text-espresso">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-sand text-espresso transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons CTAs */}
            <div className="space-y-3.5">
              <button
                onClick={handleAdd}
                disabled={isOutOfStock}
                className={`w-full py-4.5 font-functional text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  isOutOfStock
                    ? "bg-espresso/10 text-espresso/40 cursor-not-allowed border-transparent"
                    : addedMessage
                    ? "bg-clay text-white border-clay"
                    : "bg-espresso hover:bg-clay text-white border-espresso cursor-pointer"
                }`}
              >
                {isOutOfStock ? "Sold Out" : addedMessage ? "Added to Bag" : "Add to Bag"}
              </button>
              
              {!isOutOfStock && (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4.5 border border-espresso hover:bg-espresso/5 text-espresso font-functional text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Buy It Now
                </button>
              )}
            </div>

            {/* Product Accordion Specifications */}
            <div className="space-y-3 pt-4">
              <AccordionSection title="Description & Inspiration">
                <p>{product.details}</p>
              </AccordionSection>
              <AccordionSection title="Materials & Glazes">
                <p>{product.materials}</p>
              </AccordionSection>
              <AccordionSection title="Dimensions & Care">
                <ul className="space-y-1.5 list-disc pl-4">
                  <li><strong>Size:</strong> {product.dimensions}</li>
                  <li><strong>Care:</strong> {product.care}</li>
                </ul>
              </AccordionSection>
              <AccordionSection title="Shipping & Returns">
                <p>
                  Free secure shipping on orders above ₹2,500 across India. Every order is packed carefully in plastic-free recycled paper grids. Due to the handcrafted, unique nature of our studio pieces, we accept returns within 10 days only if damaged in transit.
                </p>
              </AccordionSection>
            </div>

            {/* Cross-sell recommendations */}
            {pairItems.length > 0 && (
              <div className="pt-8 border-t border-beige-border/50 space-y-4">
                <h3 className="font-functional text-xs font-bold tracking-widest uppercase text-espresso/50">
                  Pair It With
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {pairItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      className="border border-beige-border p-3 flex flex-col justify-between hover:border-clay hover:bg-sand/15 transition-all text-left"
                    >
                      <div className="space-y-2">
                        <div className="relative aspect-square w-full bg-sand overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-functional text-xs font-bold text-espresso truncate">
                            {item.name}
                          </h4>
                          <span className="font-functional text-xs text-espresso/60 mt-0.5">
                            ₹{item.price}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem(item, item.variants[0]?.name || "Standard", 1);
                        }}
                        className="w-full mt-3 border border-espresso/25 py-2 font-functional text-[9px] font-bold uppercase tracking-wider hover:bg-espresso hover:text-white transition-colors cursor-pointer text-center"
                      >
                        Add
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. "MEET THE PIECE" STORYTELLING SECTION */}
        <section className="mt-28 py-16 border-t border-beige-border flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6 text-left max-w-xl">
            <h2 className="font-functional text-xs font-bold tracking-[0.25em] text-clay uppercase">
              STUDIO STORIES
            </h2>
            <h3 className="font-editorial text-4xl font-light text-espresso uppercase leading-tight">
              {product.storyTitle}
            </h3>
            <p className="font-editorial text-base italic text-espresso/80 leading-relaxed font-medium">
              &ldquo;{product.storyDesc}&rdquo;
            </p>
            <div className="h-0.5 w-12 bg-clay/35" />
            <p className="font-functional text-xs text-espresso/60 leading-relaxed">
              Because each Ceramelle item is hand-thrown and individually glazed, small variations in glaze flow, iron spots, and clay coloration are standard. These fingerprints of the kiln ensure that no two mugs or plates are identical, bringing character to your daily ritual.
            </p>
          </div>
          <div className="w-full md:w-1/2 aspect-[4/3] relative bg-sand overflow-hidden">
            <Image
              src={product.storyImage || product.hoverImage}
              alt="Crafting Ceramelle tableware on potter wheel"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>
      </main>

      {/* Sticky Mobile Add To Bag CTA (hidden on desktop) */}
      <div className="fixed bottom-0 left-0 w-full z-30 bg-ivory border-t border-beige-border p-4 flex justify-between items-center md:hidden shadow-lg backdrop-blur bg-ivory/95">
        <div>
          <p className="font-functional text-[10px] text-espresso/50 uppercase tracking-widest">
            {product.name}
          </p>
          <p className="font-functional text-sm font-bold text-espresso mt-0.5">
            ₹{itemPrice}
          </p>
        </div>
        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="bg-espresso hover:bg-clay text-white px-6 py-3.5 font-functional text-xs font-semibold tracking-widest uppercase transition-colors"
        >
          {isOutOfStock ? "Sold Out" : addedMessage ? "Added" : "Add to Bag"}
        </button>
      </div>

      <Footer />
    </div>
  );
}
