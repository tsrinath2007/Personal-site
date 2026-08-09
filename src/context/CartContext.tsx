"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/db-mock";

export interface CartItem {
  product: Product;
  variantName: string;
  quantity: number;
  price: number; // calculated item price (base + modifier)
}

interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variantName: string, quantity?: number) => void;
  removeItem: (productId: string, variantName: string) => void;
  updateQuantity: (productId: string, variantName: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  freeShippingThreshold: number;
  shippingProgress: number;
  amountToFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const freeShippingThreshold = 2500; // in INR (₹)

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ceramelle_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ceramelle_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product: Product, variantName: string, quantity = 1) => {
    // Find variant details to see priceModifier
    const variant = product.variants.find((v) => v.name === variantName);
    const itemPrice = product.price + (variant ? variant.priceModifier : 0);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.variantName === variantName
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { product, variantName, quantity, price: itemPrice }];
      }
    });
    
    // Auto-open cart drawer on item addition for premium checkout flow
    setIsOpen(true);
  };

  const removeItem = (productId: string, variantName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.variantName === variantName))
    );
  };

  const updateQuantity = (productId: string, variantName: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantName);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.variantName === variantName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        freeShippingThreshold,
        shippingProgress,
        amountToFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
