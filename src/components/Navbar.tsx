"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          isScrolled
            ? "py-3 bg-ivory/80 backdrop-blur-md border-beige-border"
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Left: Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 flex-1">
            <div className="relative group py-2">
              <Link
                href="/shop"
                className="font-functional text-xs font-semibold tracking-widest uppercase text-espresso/80 hover:text-clay transition-colors"
              >
                Shop
              </Link>
              {/* Category Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-ivory border border-beige-border shadow-xl p-4 hidden group-hover:block transition-all z-50 text-left">
                <ul className="space-y-3">
                  <li>
                    <Link href="/shop?category=mugs" className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/70 hover:text-clay transition-colors block">
                      Mugs & Cups
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=plates" className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/70 hover:text-clay transition-colors block">
                      Plates
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=bowls" className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/70 hover:text-clay transition-colors block">
                      Bowls
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=teapots" className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/70 hover:text-clay transition-colors block">
                      Teapots
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=vases" className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/70 hover:text-clay transition-colors block">
                      Vases
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/70 hover:text-clay transition-colors block">
                      Dinnerware
                    </Link>
                  </li>
                  <li className="border-t border-beige-border/50 pt-2">
                    <Link href="/shop?tab=set-builder" className="font-functional text-[10px] font-bold tracking-widest uppercase text-clay hover:text-clay-dark transition-colors block">
                      Gift Sets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              href="/shop?tab=collections"
              className="font-functional text-xs font-semibold tracking-widest uppercase text-espresso/80 hover:text-clay transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/story"
              className="font-functional text-xs font-semibold tracking-widest uppercase text-espresso/80 hover:text-clay transition-colors"
            >
              Our Story
            </Link>
          </nav>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-espresso hover:text-clay transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-shrink-0 text-center">
            <Link
              href="/"
              className="font-editorial text-2xl md:text-3xl font-semibold tracking-[0.2em] text-espresso hover:opacity-80 transition-opacity"
            >
              CERAMELLE
            </Link>
          </div>

          {/* Right: Icon Actions */}
          <div className="flex items-center justify-end space-x-3 md:space-x-6 flex-1">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-espresso hover:text-clay transition-colors cursor-pointer"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            {/* Account (Desktop Only) */}
            <Link
              href="/story#journal"
              className="hidden md:block p-1.5 text-espresso hover:text-clay transition-colors"
              aria-label="Journal"
            >
              <span className="font-functional text-[10px] font-bold tracking-widest uppercase">Journal</span>
            </Link>

            {/* Account (Icon) */}
            <button
              onClick={() => alert("Account feature is currently simulated in this preview.")}
              className="hidden sm:block p-1.5 text-espresso hover:text-clay transition-colors cursor-pointer"
              aria-label="Account"
            >
              <User size={18} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => alert("Wishlist feature simulated. Products added to wishlist will appear here later.")}
              className="hidden sm:block p-1.5 text-espresso hover:text-clay transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="p-1.5 text-espresso hover:text-clay transition-colors relative cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-clay text-white font-functional text-[9px] font-semibold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links Slide Down */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-ivory border-b border-beige-border"
            >
              <div className="px-6 py-6 space-y-4 flex flex-col">
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-functional text-sm font-semibold tracking-wider uppercase text-espresso py-2 border-b border-beige-border/30"
                >
                  Shop
                </Link>
                <Link
                  href="/shop?tab=collections"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-functional text-sm font-semibold tracking-wider uppercase text-espresso py-2 border-b border-beige-border/30"
                >
                  Collections
                </Link>
                <Link
                  href="/story"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-functional text-sm font-semibold tracking-wider uppercase text-espresso py-2 border-b border-beige-border/30"
                >
                  Our Story
                </Link>
                <Link
                  href="/story#journal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-functional text-sm font-semibold tracking-wider uppercase text-espresso py-2"
                >
                  Journal
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Overlays */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
    </>
  );
};
