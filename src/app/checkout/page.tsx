"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingBag, MapPin, CreditCard, CheckCircle, ArrowRight, ShieldCheck, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  
  // Checkout steps: 'summary' | 'shipping' | 'payment' | 'confirmation'
  const [step, setStep] = useState<"summary" | "shipping" | "payment" | "confirmation">("summary");
  
  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  // Shipping details state
  const [shippingForm, setShippingForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  // Razorpay payment state
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [paymentProcessingState, setPaymentProcessingState] = useState<"idle" | "loading" | "success">("idle");
  const [simulatedOrderNumber, setSimulatedOrderNumber] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "WELCOME10") {
      const discount = Math.round(cartTotal * 0.1);
      setDiscountAmount(discount);
      setCouponApplied("WELCOME10 (10% Off)");
      setCouponCode("");
    } else {
      setCouponError("Invalid promo code. Try 'WELCOME10'.");
    }
  };

  const finalTotal = cartTotal - discountAmount;
  const shippingFee = cartTotal >= 2500 ? 0 : 150;
  const grandTotal = finalTotal + shippingFee;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const triggerRazorpayCheckout = () => {
    setIsRazorpayModalOpen(true);
    setPaymentProcessingState("idle");
  };

  const handleConfirmSimulatedPayment = () => {
    setPaymentProcessingState("loading");
    
    // Simulate Razorpay Gateway delay (2.5s)
    setTimeout(() => {
      setPaymentProcessingState("success");
      
      // Simulate Order ID generation
      const orderId = `CRML-${Math.floor(100000 + Math.random() * 900000)}`;
      setSimulatedOrderNumber(orderId);
      
      // Clear Cart
      setTimeout(() => {
        setIsRazorpayModalOpen(false);
        setStep("confirmation");
        clearCart();
        
        // Celebrate success order purchase!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C56E52", "#FAF8F5", "#1C1613"],
        });
      }, 1500);
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-24 text-espresso w-full flex-1 flex flex-col justify-start">
        
        {/* Checkout Header Progress */}
        {step !== "confirmation" && (
          <div className="flex items-center justify-between max-w-lg mx-auto w-full mb-12 border-b border-beige-border pb-6 font-functional text-[10px] font-bold tracking-widest uppercase">
            <button
              onClick={() => setStep("summary")}
              className={`pb-1 ${step === "summary" ? "text-clay border-b-2 border-clay" : "text-espresso/45"}`}
            >
              01 / Summary
            </button>
            <span className="text-espresso/20">&rarr;</span>
            <button
              onClick={() => step !== "summary" && setStep("shipping")}
              disabled={step === "summary"}
              className={`pb-1 ${step === "shipping" ? "text-clay border-b-2 border-clay" : "text-espresso/45 disabled:opacity-40"}`}
            >
              02 / Address
            </button>
            <span className="text-espresso/20">&rarr;</span>
            <span
              className={`pb-1 ${step === "payment" ? "text-clay border-b-2 border-clay" : "text-espresso/45 opacity-40"}`}
            >
              03 / Payment
            </span>
          </div>
        )}

        {/* Outer Split Columns */}
        {step !== "confirmation" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Stage Form Inputs (7 cols) */}
            <div className="lg:col-span-7">
              {/* STEP 1: SUMMARY ITEMS LIST */}
              {step === "summary" && (
                <div className="space-y-6 text-left">
                  <h2 className="font-editorial text-2xl font-light border-b border-beige-border pb-4 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-clay" />
                    Review Your Bag
                  </h2>
                  
                  {cartItems.length === 0 ? (
                    <div className="py-12 text-center space-y-4">
                      <p className="font-editorial italic text-espresso/60">Your bag is empty.</p>
                      <Link href="/shop" className="inline-block bg-espresso text-white px-6 py-3 font-functional text-xs font-semibold tracking-widest uppercase">
                        Start Browsing
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center border-b border-beige-border/40 pb-4">
                          <div className="relative w-16 h-16 bg-sand flex-shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-functional text-sm font-semibold truncate text-espresso">
                              {item.product.name}
                            </h4>
                            <p className="font-functional text-xs text-espresso/50">
                              {item.variantName} &middot; Qty {item.quantity}
                            </p>
                          </div>
                          <span className="font-functional text-sm font-bold text-espresso">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                      
                      <div className="pt-4">
                        <button
                          onClick={() => setStep("shipping")}
                          className="w-full bg-espresso hover:bg-clay text-white py-4.5 font-functional text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                        >
                          Provide Shipping Address
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: SHIPPING DETAILS FORM */}
              {step === "shipping" && (
                <form onSubmit={handleShippingSubmit} className="space-y-6 text-left">
                  <h2 className="font-editorial text-2xl font-light border-b border-beige-border pb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-clay" />
                    Delivery Information
                  </h2>

                  <div className="space-y-4 font-functional text-xs">
                    {/* Email */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-bold tracking-wider uppercase text-espresso/60">Email Address</label>
                      <input
                        type="email"
                        required
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Names Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-bold tracking-wider uppercase text-espresso/60">First Name</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                          className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-bold tracking-wider uppercase text-espresso/60">Last Name</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                          className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                        />
                      </div>
                    </div>

                    {/* Address Line 1 */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-bold tracking-wider uppercase text-espresso/60">Shipping Address</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                        placeholder="Street address, house number"
                      />
                    </div>

                    {/* Apartment details */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-bold tracking-wider uppercase text-espresso/60">Apartment / Suite (Optional)</label>
                      <input
                        type="text"
                        value={shippingForm.apartment}
                        onChange={(e) => setShippingForm({ ...shippingForm, apartment: e.target.value })}
                        className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                        placeholder="Apartment, building unit"
                      />
                    </div>

                    {/* City, State, Pin */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-bold tracking-wider uppercase text-espresso/60">City</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-bold tracking-wider uppercase text-espresso/60">State</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.state}
                          onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                          className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                          placeholder="e.g. Karnataka"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-bold tracking-wider uppercase text-espresso/60">Pin Code</label>
                        <input
                          type="text"
                          required
                          pattern="[0-9]{6}"
                          value={shippingForm.pinCode}
                          onChange={(e) => setShippingForm({ ...shippingForm, pinCode: e.target.value })}
                          className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                          placeholder="6 digits"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-bold tracking-wider uppercase text-espresso/60">Mobile Number (Indian Standard)</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="border border-beige-border p-3.5 bg-sand/10 outline-none focus:border-espresso text-sm"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep("summary")}
                      className="w-1/3 border border-espresso hover:bg-espresso/5 font-functional text-xs font-semibold tracking-widest uppercase transition-colors text-center"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-espresso hover:bg-clay text-white py-4.5 font-functional text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: PAYMENT OPTION SELECTOR */}
              {step === "payment" && (
                <div className="space-y-6 text-left">
                  <h2 className="font-editorial text-2xl font-light border-b border-beige-border pb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-clay" />
                    Select Payment Gateway
                  </h2>

                  <div className="space-y-4 font-functional">
                    <div className="bg-sand/10 border border-beige-border p-5 space-y-4">
                      <p className="text-xs text-espresso/60">
                        Payments for Ceramelle in India are securely processed using the Razorpay payment gateway.
                      </p>
                      
                      {/* Gateways selector */}
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 bg-ivory border border-beige-border hover:border-clay cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="payment_select"
                            checked={paymentMethod === "upi"}
                            onChange={() => setPaymentMethod("upi")}
                            className="accent-clay"
                          />
                          <div>
                            <span className="text-xs font-bold uppercase text-espresso">UPI (GPay / PhonePe / Paytm)</span>
                            <p className="text-[10px] text-espresso/50">Instant checkout via UPI app scanner or ID</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 bg-ivory border border-beige-border hover:border-clay cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="payment_select"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="accent-clay"
                          />
                          <div>
                            <span className="text-xs font-bold uppercase text-espresso">Credit / Debit Card</span>
                            <p className="text-[10px] text-espresso/50">Visa, Mastercard, RuPay, Amex</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => setStep("shipping")}
                        className="w-1/3 border border-espresso hover:bg-espresso/5 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={triggerRazorpayCheckout}
                        disabled={cartItems.length === 0}
                        className="w-2/3 bg-espresso hover:bg-clay text-white py-4.5 font-functional text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <ShieldCheck size={16} />
                        Pay with Razorpay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Order Summary totals (5 cols) */}
            <div className="lg:col-span-5 border border-beige-border bg-sand/20 p-6 sticky top-28 space-y-6">
              <h3 className="font-editorial text-xl font-medium text-espresso pb-4 border-b border-beige-border">
                Order Summary
              </h3>

              {/* Coupon form (only before checkout completes) */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo code (e.g. WELCOME10)"
                  className="flex-1 font-functional text-xs bg-ivory border border-beige-border p-3 focus:outline-none focus:border-espresso text-espresso uppercase"
                />
                <button
                  type="submit"
                  className="bg-espresso hover:bg-clay text-white font-functional text-[10px] font-bold tracking-widest uppercase px-5 py-3.5 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              
              {couponError && <p className="text-[10px] text-red-500 font-functional text-left">{couponError}</p>}
              {couponApplied && (
                <div className="flex justify-between font-functional text-xs text-clay font-semibold">
                  <span>Promo Code Applied:</span>
                  <span>{couponApplied}</span>
                </div>
              )}

              {/* Totals */}
              <div className="border-t border-b border-beige-border/50 py-4 space-y-3 font-functional text-xs">
                <div className="flex justify-between text-espresso/70">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-espresso">₹{cartTotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-clay font-medium">
                    <span>Discount Code</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-espresso/70">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? <span className="text-clay font-bold uppercase">Free</span> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-espresso pt-3 border-t border-beige-border/40">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Shipping brief */}
              {step === "payment" && (
                <div className="text-left font-functional text-[10px] text-espresso/60 space-y-1">
                  <p className="font-bold uppercase tracking-wider text-espresso/45">Shipping to:</p>
                  <p>{shippingForm.firstName} {shippingForm.lastName}</p>
                  <p className="truncate">{shippingForm.address}, {shippingForm.city}</p>
                  <p>Pin {shippingForm.pinCode} &middot; Mob {shippingForm.phone}</p>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* STEP 4: ORDER CONFIRMATION */
          <div className="max-w-xl mx-auto w-full text-center bg-sand/15 border border-beige-border p-8 md:p-12 space-y-8 animate-slide-up">
            <div className="flex justify-center text-clay">
              <CheckCircle size={64} className="fill-clay/10 text-clay" />
            </div>

            <div className="space-y-3">
              <h2 className="font-editorial text-3xl font-light text-espresso uppercase">
                Order Confirmed
              </h2>
              <p className="font-functional text-xs text-clay font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
                <Sparkles size={12} />
                Order ID: {simulatedOrderNumber}
              </p>
              <p className="font-functional text-sm text-espresso/75 leading-relaxed pt-2">
                Thank you for choosing slow-made craftsmanship. We have received your order, and our studio artisans are packaging your ceramic pieces.
              </p>
            </div>

            <div className="border-t border-beige-border/50 pt-6 text-left space-y-4 font-functional text-xs">
              <h4 className="font-bold uppercase tracking-widest text-espresso/50">Delivery Estimates</h4>
              <p className="text-espresso/70 leading-relaxed">
                A verification link and tracking code will be mailed to <strong>{shippingForm.email}</strong>. Delivery will take approximately <strong>5–7 business days</strong> across India.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-block bg-espresso hover:bg-clay text-white px-8 py-4 font-functional text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Return to Shop Catalog
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* RAZORPAY SIMULATED MODAL GATEWAY FRAME */}
      <AnimatePresence>
        {isRazorpayModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black"
            />

            {/* Razorpay frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-md bg-white text-slate-800 shadow-2xl flex flex-col overflow-hidden"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {/* Razorpay header (real styling) */}
              <div className="bg-[#1C2541] text-white p-5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="bg-[#00B4D8] text-white w-7 h-7 rounded flex items-center justify-center font-extrabold text-sm">
                    R
                  </div>
                  <div>
                    <h3 className="font-bold text-xs tracking-wide uppercase">Razorpay Secure</h3>
                    <p className="text-[9px] text-slate-300">Ceramelle Studio Billing</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-300">Amount to Pay</span>
                  <p className="font-bold text-base">₹{grandTotal}.00</p>
                </div>
              </div>

              {/* simulated payment methods detail */}
              <div className="p-6 flex-1 space-y-6">
                
                {paymentProcessingState === "idle" && (
                  <div className="space-y-4">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Simulating payment method: {paymentMethod.toUpperCase()}
                    </p>
                    
                    {paymentMethod === "upi" ? (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-4 border rounded flex items-center justify-between text-xs">
                          <span className="font-medium">Selected UPI:</span>
                          <span className="font-bold text-[#00b4d8]">googlepay@okaxis</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          This simulator will trigger a mock transaction authentication representing a real Android/iOS UPI application token callback.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        <div className="flex flex-col space-y-1">
                          <label className="font-semibold text-slate-500">Card Number (Simulated)</label>
                          <input
                            type="text"
                            disabled
                            value="4111 2222 3333 4444"
                            className="bg-slate-50 border p-3 text-slate-600 rounded"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col space-y-1">
                            <label className="font-semibold text-slate-500">Expiry</label>
                            <input type="text" disabled value="12 / 29" className="bg-slate-50 border p-3 rounded" />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="font-semibold text-slate-500">CVV</label>
                            <input type="password" disabled value="***" className="bg-slate-50 border p-3 rounded" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t flex gap-3">
                      <button
                        onClick={() => setIsRazorpayModalOpen(false)}
                        className="w-1/2 py-3 border text-slate-600 rounded text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                      >
                        Cancel Payment
                      </button>
                      <button
                        onClick={handleConfirmSimulatedPayment}
                        className="w-1/2 py-3 bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                )}

                {paymentProcessingState === "loading" && (
                  <div className="h-44 flex flex-col items-center justify-center text-center space-y-4">
                    {/* spinner */}
                    <div className="w-10 h-10 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Processing Transaction...</p>
                      <p className="text-[10px] text-slate-500 mt-1">Verifying UPI token credentials from client bank</p>
                    </div>
                  </div>
                )}

                {paymentProcessingState === "success" && (
                  <div className="h-44 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <Check size={28} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Payment Successful</p>
                      <p className="text-[10px] text-slate-500 mt-1">Razorpay transaction ID: pay_sim_{Math.floor(100000 + Math.random() * 900000)}</p>
                    </div>
                  </div>
                )}

              </div>
              
              {/* Razorpay Footer */}
              <div className="bg-slate-50 px-6 py-4 flex justify-between items-center shrink-0 border-t text-[10px] text-slate-400">
                <span>Powering Indian e-commerce</span>
                <span className="font-semibold uppercase tracking-wider text-slate-500">Secure 256-Bit SSL</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
