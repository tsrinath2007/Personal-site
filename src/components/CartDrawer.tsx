"use client";

import React, { useEffect, useRef } from "react";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/db-mock";
import Image from "next/image";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isOpen,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    cartTotal,
    shippingProgress,
    amountToFreeShipping,
    freeShippingThreshold,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  // Suggest products to cross-sell (not already in cart)
  const crossSellProducts = PRODUCTS.filter(
    (product) => !cartItems.some((item) => item.product.id === product.id)
  ).slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-espresso"
          />

          {/* Cart Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col border-l border-beige-border"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-beige-border flex justify-between items-center bg-sand/20">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-espresso" />
                <h2 className="font-editorial text-xl font-semibold text-espresso">YOUR BAG</h2>
                <span className="font-functional text-xs font-semibold px-2 py-0.5 bg-sand text-espresso rounded-full">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1 hover:bg-sand rounded-full transition-colors text-espresso"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Shipping Progress */}
            <div className="p-6 bg-sand/10 border-b border-beige-border">
              {amountToFreeShipping > 0 ? (
                <p className="font-functional text-xs text-espresso/80 mb-3 text-center">
                  You are <span className="font-semibold text-clay">₹{amountToFreeShipping}</span> away from free shipping.
                </p>
              ) : (
                <p className="font-functional text-xs text-clay mb-3 font-semibold text-center">
                  ✨ You qualify for free shipping!
                </p>
              )}
              <div className="h-1 w-full bg-sand rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-clay"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-editorial text-lg text-espresso/60 italic">Your bag is empty.</p>
                  <button
                    onClick={closeCart}
                    className="font-functional text-xs uppercase tracking-widest font-semibold border-b border-espresso pb-1 text-espresso hover:text-clay hover:border-clay transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.product.id}-${item.variantName}-${idx}`} className="flex gap-4 items-start border-b border-beige-border/50 pb-6">
                      <div className="relative w-20 h-20 bg-sand flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-functional text-sm font-medium text-espresso">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.product.id, item.variantName)}
                              className="text-espresso/40 hover:text-clay transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="font-functional text-xs text-espresso/60 mt-1">
                            {item.variantName}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-beige-border rounded">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantName, item.quantity - 1)}
                              className="p-1.5 hover:bg-sand text-espresso transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-functional text-xs font-semibold px-3 text-espresso">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variantName, item.quantity + 1)}
                              className="p-1.5 hover:bg-sand text-espresso transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-functional text-sm font-semibold text-espresso">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cross-Sell Section */}
              {crossSellProducts.length > 0 && (
                <div className="pt-6 border-t border-beige-border">
                  <h3 className="font-functional text-xs font-semibold tracking-wider text-espresso/60 uppercase mb-4">
                    Pair It With
                  </h3>
                  <div className="space-y-4">
                    {crossSellProducts.map((product) => {
                      const defaultVariant = product.variants[0]?.name || "Standard";
                      return (
                        <div key={product.id} className="flex gap-4 items-center bg-sand/10 p-3 border border-beige-border/50 hover:border-beige-border transition-colors">
                          <div className="relative w-12 h-12 bg-sand overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-functional text-xs font-medium text-espresso truncate">
                              {product.name}
                            </h4>
                            <p className="font-functional text-xs font-semibold text-espresso/80 mt-0.5">
                              ₹{product.price}
                            </p>
                          </div>
                          <button
                            onClick={() => addItem(product, defaultVariant, 1)}
                            className="font-functional text-[10px] font-semibold tracking-widest uppercase border border-espresso/40 px-3 py-1.5 hover:bg-espresso hover:text-white transition-colors cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer / Checkout summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-beige-border bg-sand/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-functional text-sm text-espresso/60">Subtotal</span>
                  <span className="font-functional text-lg font-bold text-espresso">₹{cartTotal}</span>
                </div>
                <p className="font-functional text-[10px] text-espresso/50">
                  Taxes and shipping calculated at checkout. Free shipping on orders over ₹{freeShippingThreshold}.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 bg-espresso hover:bg-clay text-white font-functional text-xs font-semibold tracking-widest uppercase py-4 transition-all duration-300 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
