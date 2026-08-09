"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PRODUCTS, Product } from "@/lib/db-mock";
import { Upload, RotateCcw, ZoomIn, Layers, Move, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface PresetRoom {
  id: string;
  name: string;
  image: string;
}

const PRESET_ROOMS: PresetRoom[] = [
  {
    id: "room_1",
    name: "Oak Dining Table",
    image: "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "room_2",
    name: "Linen Runner Table",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "room_3",
    name: "Sunlit Kitchen Ledge",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
  }
];

export const SpaceVisualizer: React.FC = () => {
  const { addItem } = useCart();
  const [background, setBackground] = useState(PRESET_ROOMS[0].image);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  
  // Interactive properties
  const [scale, setScale] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [shadowDepth, setShadowDepth] = useState(40);
  
  // Position coordinates on canvas
  const [position, setPosition] = useState({ x: 150, y: 180 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);


  // File Upload Handler
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBackground(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const container = containerRef.current;
      if (!container) return;
      
      const bounds = container.getBoundingClientRect();
      let newX = e.clientX - dragStart.current.x;
      let newY = e.clientY - dragStart.current.y;
      
      // Keep boundaries inside canvas roughly
      newX = Math.max(0, Math.min(newX, bounds.width - 100));
      newY = Math.max(0, Math.min(newY, bounds.height - 100));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const resetVisualizer = () => {
    setPosition({ x: 150, y: 180 });
    setScale(100);
    setBrightness(100);
    setShadowDepth(40);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
      {/* Interactive Visualizer Canvas (left 2 cols) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-3">
          <h2 className="font-editorial text-2xl md:text-3xl text-espresso font-light">
            See It In Your Space
          </h2>
          <p className="font-functional text-xs text-espresso/60 max-w-xl leading-relaxed">
            Drag the ceramic piece around the table, resize it to match the perspective, and adjust lighting options. Upload a photo of your own dining area or counter to test.
          </p>
        </div>

        {/* Canvas Container */}
        <div
          ref={containerRef}
          className="relative aspect-[4/3] w-full bg-sand/20 border border-beige-border overflow-hidden select-none shadow"
        >
          {/* Background Room Image */}
          <img
            src={background}
            alt="Space Backdrop"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Draggable Product Layer */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: `scale(${scale / 100})`,
              filter: `brightness(${brightness}%)`,
              width: "150px",
              height: "150px",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            className="relative transition-shadow flex items-center justify-center group"
          >
            {/* Ceramic Product Image with dynamic shadows */}
            <div className="relative w-full h-full">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain pointer-events-none select-none relative z-10"
                style={{
                  // Dynamic filter drop-shadow to make it merge with the backdrop photo realistically
                  filter: `drop-shadow(0px ${shadowDepth * 0.25}px ${shadowDepth * 0.4}px rgba(28,22,19,${0.15 + shadowDepth * 0.005}))`
                }}
              />
              
              {/* Placement Helper Rings */}
              <div className="absolute inset-0 border border-clay/30 border-dashed rounded-full scale-105 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <Move className="text-clay/80" size={16} />
              </div>
            </div>
          </div>
          
          {/* Upload Indicator Tag */}
          <div className="absolute bottom-4 right-4 bg-ivory/80 backdrop-blur px-3 py-1.5 text-[9px] font-functional font-semibold tracking-wider text-espresso/60 uppercase shadow">
            Visual Canvas
          </div>
        </div>

        {/* Backdrop Presets Selector & Image Upload */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-sand/15 p-4 border border-beige-border">
          <div className="flex gap-3">
            {PRESET_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => setBackground(room.image)}
                className={`px-3 py-2 font-functional text-[10px] font-semibold uppercase tracking-wider border cursor-pointer transition-colors ${
                  background === room.image
                    ? "bg-espresso text-white border-espresso"
                    : "bg-ivory text-espresso border-beige-border hover:border-espresso/45"
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-1.5 px-4 py-2 bg-clay text-white hover:bg-clay-dark font-functional text-[10px] font-semibold uppercase tracking-wider cursor-pointer shadow transition-colors">
            <Upload size={12} />
            Upload Table Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>
      </div>

      {/* Control Panel Column (right 1 col) */}
      <div className="lg:col-span-1 space-y-6">
        {/* Product selector grid */}
        <div className="border border-beige-border bg-sand/20 p-6 space-y-4">
          <h3 className="font-editorial text-lg font-medium text-espresso border-b border-beige-border pb-3">
            Select Piece
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`relative p-2 border transition-all text-left flex flex-col items-center bg-ivory cursor-pointer ${
                  selectedProduct.id === prod.id
                    ? "border-clay shadow-md"
                    : "border-beige-border hover:border-espresso/35"
                }`}
              >
                <div className="relative w-14 h-14 bg-sand mb-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-functional text-[10px] font-bold text-espresso text-center truncate w-full">
                  {prod.name}
                </span>
                <span className="font-functional text-[9px] text-espresso/60 text-center">
                  ₹{prod.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Adjustments Sliders */}
        <div className="border border-beige-border bg-sand/20 p-6 space-y-5">
          <h3 className="font-editorial text-lg font-medium text-espresso border-b border-beige-border pb-3 flex justify-between items-center">
            Adjust Settings
            <button
              onClick={resetVisualizer}
              className="text-espresso/50 hover:text-clay transition-colors"
              aria-label="Reset visualizer"
            >
              <RotateCcw size={14} />
            </button>
          </h3>

          {/* Scale Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-functional text-[10px] uppercase font-bold text-espresso/60">
              <span className="flex items-center gap-1"><ZoomIn size={12} /> Scale</span>
              <span>{scale}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="200"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full accent-clay"
            />
          </div>

          {/* Shadow Depth */}
          <div className="space-y-2">
            <div className="flex justify-between font-functional text-[10px] uppercase font-bold text-espresso/60">
              <span className="flex items-center gap-1"><Layers size={12} /> Shadow Blur</span>
              <span>{shadowDepth}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={shadowDepth}
              onChange={(e) => setShadowDepth(Number(e.target.value))}
              className="w-full accent-clay"
            />
          </div>

          {/* Brightness */}
          <div className="space-y-2">
            <div className="flex justify-between font-functional text-[10px] uppercase font-bold text-espresso/60">
              <span>Lighting (Brightness)</span>
              <span>{brightness}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-clay"
            />
          </div>
          
          <div className="pt-2 border-t border-beige-border/50">
            <button
              onClick={() => {
                const defaultVariant = selectedProduct.variants[0]?.name || "Standard";
                addItem(selectedProduct, defaultVariant, 1);
              }}
              className="w-full flex items-center justify-center gap-2 bg-espresso hover:bg-clay text-white py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
            >
              <Plus size={14} />
              Add This Piece
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
