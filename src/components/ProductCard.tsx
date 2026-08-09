"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { Product } from "@/lib/db-mock";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const defaultVariant = product.variants[0]?.name || "Standard";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultVariant, 1);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery Wrapper */}
      <div className="relative aspect-[4/5] w-full bg-sand/30 overflow-hidden mb-4 border border-beige-border/10">
        {/* Main Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          className={`object-cover image-zoom-hover transition-all duration-700 ease-in-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100"
          }`}
        />

        {/* Hover / Lifestyle Image */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} lifestyle`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover image-zoom-hover absolute top-0 left-0 transition-all duration-700 ease-in-out ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-10 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-espresso hover:bg-clay text-white font-functional text-[10px] font-bold tracking-widest uppercase py-3 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Plus size={12} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-1.5 text-left px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-functional text-sm font-medium text-espresso group-hover:text-clay transition-colors leading-tight">
            {product.name}
          </h3>
          <span className="font-functional text-sm font-semibold text-espresso/90 shrink-0">
            ₹{product.price}
          </span>
        </div>
        
        <p className="font-functional text-xs text-espresso/50 line-clamp-1">
          {product.description}
        </p>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="flex text-clay">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "text-clay" : "text-espresso/20"}
              />
            ))}
          </div>
          <span className="font-functional text-[10px] text-espresso/45">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Mobile Quick Add */}
        <div className="pt-2 sm:hidden">
          <button
            onClick={handleQuickAdd}
            className="w-full border border-espresso/40 hover:bg-espresso hover:text-white text-espresso font-functional text-[10px] font-bold tracking-widest uppercase py-2.5 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus size={10} />
            Add to Bag
          </button>
        </div>
      </div>
    </Link>
  );
};
