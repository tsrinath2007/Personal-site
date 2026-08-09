"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "@/lib/db-mock";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      setResults([]);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle dynamic search filter
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const cleanQuery = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(cleanQuery) ||
        product.category.toLowerCase().includes(cleanQuery) ||
        product.description.toLowerCase().includes(cleanQuery)
    );
    setResults(filtered);
  }, [query]);

  const suggestions = ["Mugs", "Bowls", "Vases", "Teapots", "Plates"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-ivory flex flex-col p-6 md:p-12 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center w-full max-w-6xl mx-auto mb-16">
            <Link href="/" onClick={onClose} className="font-editorial text-2xl font-semibold tracking-wider text-espresso">
              CERAMELLE
            </Link>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sand rounded-full transition-colors text-espresso"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col justify-start">
            <h2 className="font-editorial text-3xl md:text-5xl text-espresso/40 font-light mb-8">
              WHAT ARE YOU LOOKING FOR?
            </h2>

            {/* Input Bar */}
            <div className="relative border-b border-espresso/20 pb-4 mb-12 flex items-center">
              <Search className="text-espresso/40 mr-4" size={28} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, collections, categories..."
                className="w-full text-xl md:text-3xl font-functional font-light bg-transparent border-none outline-none text-espresso placeholder:text-espresso/20"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-sand rounded-full text-espresso/60"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Suggestions & Results Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Popular Suggestions (left column) */}
              <div className="md:col-span-1 border-r border-beige-border/30 pr-0 md:pr-8">
                <h3 className="font-functional text-xs font-semibold tracking-wider text-espresso/40 uppercase mb-4">
                  POPULAR SEARCHES
                </h3>
                <ul className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        onClick={() => setQuery(suggestion)}
                        className="font-functional text-lg text-espresso/80 hover:text-clay transition-colors hover:underline underline-offset-4"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Results (right 2 columns) */}
              <div className="md:col-span-2">
                {query === "" ? (
                  <div className="text-espresso/40 font-functional text-sm italic">
                    Start typing to see matching ceramic objects...
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-6">
                    <h3 className="font-functional text-xs font-semibold tracking-wider text-espresso/40 uppercase mb-4">
                      PRODUCTS ({results.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={onClose}
                          className="flex gap-4 group items-center hover:bg-sand/30 p-2 rounded transition-colors"
                        >
                          <div className="relative w-16 h-16 bg-sand flex-shrink-0 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-functional text-sm font-medium text-espresso group-hover:text-clay transition-colors">
                              {product.name}
                            </h4>
                            <p className="font-functional text-xs text-espresso/60 mt-0.5">
                              {product.description}
                            </p>
                            <p className="font-functional text-xs font-semibold text-espresso mt-1">
                              ₹{product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-espresso/60 font-functional text-sm italic">
                    No ceramic pieces found matching &ldquo;{query}&rdquo;. Try checking your spelling or search for standard terms like &ldquo;mug&rdquo; or &ldquo;plate&rdquo;.
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
