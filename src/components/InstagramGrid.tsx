"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, X, Heart, ShoppingBag } from "lucide-react";
import { PRODUCTS, Product } from "@/lib/db-mock";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface TaggedPost {
  id: string;
  username: string;
  image: string;
  likes: number;
  productSlug: string;
  quote: string;
}

const INSTA_POSTS: TaggedPost[] = [
  {
    id: "post_1",
    username: "@kavita_living",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    likes: 342,
    productSlug: "morning-mug",
    quote: "My morning coffee has never felt more grounding. Heavy clay, beautiful oat glaze."
  },
  {
    id: "post_2",
    username: "@tablescapes_by_me",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop",
    likes: 189,
    productSlug: "salad-plate",
    quote: "Setting the table for Sunday brunch. Earthy plates from Ceramelle stealing the show."
  },
  {
    id: "post_3",
    username: "@slow_home_india",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop",
    likes: 412,
    productSlug: "earth-bowl",
    quote: "Late night noodles in the most perfect textured clay bowl."
  },
  {
    id: "post_4",
    username: "@minimalist.space",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&auto=format&fit=crop",
    likes: 275,
    productSlug: "blossom-vase",
    quote: "Golden hour catches the curves of this ceramic bud vase so beautifully."
  }
];

export const InstagramGrid: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<TaggedPost | null>(null);
  const { addItem } = useCart();

  const handleShopLook = (product: Product) => {
    const defaultVariant = product.variants[0]?.name || "Standard";
    addItem(product, defaultVariant, 1);
    setSelectedPost(null);
  };

  return (
    <div className="space-y-12">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {INSTA_POSTS.map((post) => {
          const product = PRODUCTS.find((p) => p.slug === post.productSlug);
          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square w-full bg-sand/30 overflow-hidden cursor-pointer group"
            >
              <Image
                src={post.image}
                alt={`Ceramics styled by ${post.username}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Blur Overlay & Tag on Hover */}
              <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 md:p-6 text-white z-10">
                <span className="font-functional text-xs font-semibold tracking-wider self-start bg-espresso/50 backdrop-blur-sm px-2.5 py-1">
                  {post.username}
                </span>
                
                {product && (
                  <div className="flex justify-between items-center bg-ivory text-espresso p-3 shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div>
                      <h4 className="font-functional text-[10px] font-bold tracking-wider uppercase truncate max-w-[120px]">
                        {product.name}
                      </h4>
                      <p className="font-functional text-[11px] font-semibold text-espresso/70 mt-0.5">
                        ₹{product.price}
                      </p>
                    </div>
                    <div className="p-1.5 bg-sand rounded-full text-espresso shrink-0">
                      <Plus size={14} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Social proof Call-out */}
      <div className="text-center pt-4">
        <p className="font-functional text-xs text-espresso/60 tracking-wider">
          SHARE YOUR TABLE STORIES ON INSTAGRAM
        </p>
        <a
          href="https://www.instagram.com/ceramelle.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-editorial text-lg md:text-xl text-espresso hover:text-clay font-medium tracking-wide underline underline-offset-4 mt-2 inline-block transition-colors"
        >
          Tag @ceramelle.in
        </a>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (() => {
          const product = PRODUCTS.find((p) => p.slug === selectedPost.productSlug);
          return (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="fixed inset-0 z-50 bg-espresso"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-3xl bg-ivory shadow-2xl flex flex-col md:flex-row border border-beige-border overflow-hidden"
              >
                {/* Left: Image */}
                <div className="relative flex-1 aspect-square md:aspect-auto md:h-[450px] bg-sand">
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.username}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 left-4 p-1.5 bg-ivory/80 backdrop-blur rounded-full text-espresso md:hidden shadow"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Right: Product & Details */}
                <div className="w-full md:w-[320px] p-6 flex flex-col justify-between bg-ivory">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-beige-border/50 pb-4">
                      <div>
                        <p className="font-functional text-sm font-semibold text-espresso">
                          {selectedPost.username}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-espresso/45 mt-0.5">
                          <Heart size={10} className="fill-clay text-clay" />
                          <span>{selectedPost.likes} likes</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPost(null)}
                        className="hidden md:block p-1 hover:bg-sand rounded-full text-espresso"
                        aria-label="Close modal"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Quote */}
                    <p className="font-editorial text-sm italic text-espresso/80 leading-relaxed font-medium">
                      &ldquo;{selectedPost.quote}&rdquo;
                    </p>

                    {/* Product Card */}
                    {product && (
                      <div className="border border-beige-border bg-sand/10 p-3.5 flex gap-3 items-center">
                        <div className="relative w-14 h-14 bg-sand shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-functional text-xs font-semibold text-espresso truncate">
                            {product.name}
                          </h4>
                          <p className="font-functional text-xs text-espresso/50 mt-0.5 truncate">
                            {product.description}
                          </p>
                          <p className="font-functional text-xs font-bold text-espresso mt-1">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {product && (
                    <button
                      onClick={() => handleShopLook(product)}
                      className="w-full mt-6 bg-espresso hover:bg-clay text-white font-functional text-xs font-semibold tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                      Shop the Look
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
