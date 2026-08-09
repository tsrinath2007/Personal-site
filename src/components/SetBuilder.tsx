"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PRODUCTS, Product } from "@/lib/db-mock";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface SetItem {
  product: Product;
  selectedVariant: string;
  quantity: number;
  isActive: boolean;
}

export const SetBuilder: React.FC = () => {
  const { addItem } = useCart();
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [items, setItems] = useState<SetItem[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);

  // Initialize items from database
  useEffect(() => {
    const defaultSlugs = ["salad-plate", "earth-bowl", "morning-mug"];
    const initialItems: SetItem[] = defaultSlugs
      .map((slug) => {
        const prod = PRODUCTS.find((p) => p.slug === slug);
        if (!prod) return null;
        return {
          product: prod,
          selectedVariant: prod.variants[0]?.name || "Standard",
          quantity: peopleCount,
          isActive: true,
        };
      })
      .filter((item): item is SetItem => item !== null);

    setItems(initialItems);
  }, []);

  // Update item quantities when peopleCount changes
  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.isActive ? { ...item, quantity: peopleCount } : item
      )
    );
  }, [peopleCount]);

  const toggleItemActive = (idx: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const isActive = !newItems[idx].isActive;
      newItems[idx].isActive = isActive;
      newItems[idx].quantity = isActive ? peopleCount : 0;
      return newItems;
    });
  };

  const updateItemQty = (idx: number, qty: number) => {
    if (qty < 0) return;
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[idx].quantity = qty;
      if (qty === 0) {
        newItems[idx].isActive = false;
      } else {
        newItems[idx].isActive = true;
      }
      return newItems;
    });
  };

  const updateItemVariant = (idx: number, variantName: string) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[idx].selectedVariant = variantName;
      return newItems;
    });
  };

  // Pricing calculations
  const subtotal = items.reduce((sum, item) => {
    if (!item.isActive) return sum;
    const variant = item.product.variants.find((v) => v.name === item.selectedVariant);
    const itemPrice = item.product.price + (variant ? variant.priceModifier : 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountRate = 0.15; // 15% discount for sets
  const savings = Math.round(subtotal * discountRate);
  const bundleTotal = subtotal - savings;

  const handleAddBundle = () => {
    const activeItems = items.filter((item) => item.isActive && item.quantity > 0);
    if (activeItems.length === 0) return;

    activeItems.forEach((item) => {
      // Add each item in the bundle
      addItem(item.product, item.selectedVariant, item.quantity);
    });

    setAddedToCart(true);
    
    // Trigger confetti celebrating custom set creation!
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#C56E52", "#FAF8F5", "#1C1613"],
    });

    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
      {/* Configuration Column */}
      <div className="lg:col-span-2 space-y-10">
        <div className="space-y-4">
          <h2 className="font-editorial text-2xl md:text-3xl text-espresso font-light">
            Build Your Table Set
          </h2>
          <p className="font-functional text-xs text-espresso/60 max-w-xl leading-relaxed">
            Curate your ceramic dinnerware settings. Select how many settings you need, toggle matching bowls, dinner plates, and breakfast mugs, and customize their clay finishes.
          </p>
        </div>

        {/* 1. Select Table Size */}
        <div className="space-y-4">
          <span className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/50">
            01 / Select Settings
          </span>
          <div className="flex gap-4">
            {[2, 4, 6].map((num) => (
              <button
                key={num}
                onClick={() => setPeopleCount(num as 2 | 4 | 6)}
                className={`flex-1 py-4 font-functional text-xs font-semibold tracking-widest uppercase border cursor-pointer transition-all ${
                  peopleCount === num
                    ? "bg-espresso text-white border-espresso"
                    : "bg-transparent text-espresso border-beige-border hover:border-espresso/40"
                }`}
              >
                Set of {num}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Customise Items */}
        <div className="space-y-6">
          <span className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/50">
            02 / Select Pieces & Colors
          </span>
          <div className="space-y-4">
            {items.map((item, idx) => {
              const activeVar = item.product.variants.find((v) => v.name === item.selectedVariant);
              const pricePerItem = item.product.price + (activeVar ? activeVar.priceModifier : 0);
              
              return (
                <div
                  key={item.product.id}
                  className={`border p-6 flex flex-col md:flex-row gap-6 items-center transition-all ${
                    item.isActive
                      ? "border-beige-border bg-sand/10"
                      : "border-beige-border/40 opacity-50 bg-transparent"
                  }`}
                >
                  {/* Toggle Checkbox */}
                  <button
                    onClick={() => toggleItemActive(idx)}
                    className={`w-6 h-6 border flex items-center justify-center cursor-pointer transition-colors ${
                      item.isActive
                        ? "bg-clay border-clay text-white"
                        : "bg-transparent border-espresso/20 text-transparent"
                    }`}
                  >
                    <Check size={14} />
                  </button>

                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-sand overflow-hidden shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info & Customization */}
                  <div className="flex-1 text-center md:text-left space-y-3 min-w-0">
                    <div>
                      <h4 className="font-functional text-sm font-semibold text-espresso">
                        {item.product.name}
                      </h4>
                      <p className="font-functional text-[11px] text-espresso/50">
                        ₹{pricePerItem} each
                      </p>
                    </div>

                    {/* Variant dropdown */}
                    {item.isActive && (
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {item.product.options.find((o) => o.name === "Color" || o.name === "Finish")?.values.map((val) => (
                          <button
                            key={val}
                            onClick={() => updateItemVariant(idx, val)}
                            className={`px-3 py-1.5 font-functional text-[10px] font-medium border cursor-pointer transition-colors ${
                              item.selectedVariant.includes(val)
                                ? "bg-espresso text-white border-espresso"
                                : "bg-ivory text-espresso border-beige-border hover:border-espresso/30"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity selector */}
                  {item.isActive && (
                    <div className="flex items-center border border-beige-border bg-ivory rounded shrink-0">
                      <button
                        onClick={() => updateItemQty(idx, item.quantity - 1)}
                        className="p-2 hover:bg-sand text-espresso transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-functional text-xs font-bold px-4 text-espresso">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateItemQty(idx, item.quantity + 1)}
                        className="p-2 hover:bg-sand text-espresso transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Box Column */}
      <div className="lg:col-span-1">
        <div className="border border-beige-border bg-sand/20 p-6 sticky top-28 space-y-6">
          <h3 className="font-editorial text-xl font-medium text-espresso pb-4 border-b border-beige-border">
            Set Summary
          </h3>
          
          <div className="space-y-4 text-xs font-functional">
            {items.filter(item => item.isActive && item.quantity > 0).map((item) => {
              const activeVar = item.product.variants.find((v) => v.name === item.selectedVariant);
              const pricePerItem = item.product.price + (activeVar ? activeVar.priceModifier : 0);
              return (
                <div key={item.product.id} className="flex justify-between text-espresso/80">
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span className="font-semibold">₹{pricePerItem * item.quantity}</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-beige-border pt-4 space-y-3 text-xs font-functional">
            <div className="flex justify-between text-espresso/70">
              <span>Subtotal</span>
              <span className="font-semibold text-espresso">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-clay font-medium">
              <span>Set Discount (15%)</span>
              <span>-₹{savings}</span>
            </div>
            <div className="flex justify-between text-espresso/60 text-[10px]">
              <span>Shipping</span>
              <span className="uppercase text-clay font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-beige-border/50">
              <span>Total Price</span>
              <span>₹{bundleTotal}</span>
            </div>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={subtotal === 0}
            className={`w-full flex items-center justify-center gap-2 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
              subtotal === 0
                ? "bg-espresso/20 text-espresso/40 cursor-not-allowed border-transparent"
                : addedToCart
                ? "bg-clay text-white border-clay"
                : "bg-espresso hover:bg-clay text-white border-espresso cursor-pointer"
            }`}
          >
            {addedToCart ? (
              <>
                <Check size={14} />
                Set Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                Add Bundle to Bag
              </>
            )}
          </button>
          
          <p className="text-[10px] text-espresso/45 font-functional text-center italic">
            Each ceramic piece in your custom set is handpacked securely in eco-friendly protective sleeves.
          </p>
        </div>
      </div>
    </div>
  );
};
