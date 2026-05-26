/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, ChevronRight, Sparkles, AlertCircle } from "lucide-react";
import { CartItem, Product, User } from "../types";
import { motion } from "motion/react";
import { useLanguage } from "../lib/translations";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (shippingAddress: any, paymentMethod: string) => Promise<void>;
  currentUser: User | null;
  onOpenAuth: () => void;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currentUser,
  onOpenAuth,
}: CartDrawerProps) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<"cart" | "shipping">("cart");
  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Telangana");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI ID");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCharge = subtotal > 2000 ? 0 : 150; // free shipping on orders above ₹2000
  const totalAmount = subtotal + shippingCharge;

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !addressLine || !city || !postalCode || !phone) {
      setCheckoutError("Please fill out all address fields.");
      return;
    }
    if (!/^\+?91[6789]\d{9}$|^[6789]\d{9}$/.test(phone.replace(/\s/g, ""))) {
      setCheckoutError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setCheckoutError("");
    setShowConfirm(true); // show localized popup
  };

  const confirmPlaceOrder = async () => {
    setIsSubmitting(true);
    setCheckoutError("");
    setShowConfirm(false);

    try {
      await onCheckout({
        fullName,
        addressLine,
        city,
        state,
        postalCode,
        phone
      }, paymentMethod);
      onClose();
      setStep("cart");
      // Reset form fields
      setAddressLine("");
      setCity("");
      setPostalCode("");
      setPhone("");
    } catch (err: any) {
      setCheckoutError(err.message || "Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-wrapper">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
          className="w-screen max-w-md bg-[#141414] border-l border-white/5 shadow-2xl flex flex-col justify-between"
          id="cart-drawer-body"
        >
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h2 className="text-md font-serif italic font-bold text-white tracking-tight">
                {step === "cart" ? t("cartTitle") : t("guestCheckout")}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
              id="close-cart-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {step === "cart" ? (
              cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <span className="text-3xl mb-4">🍂</span>
                  <p className="text-sm font-serif italic text-white/90">Your shopping bag is clean and empty</p>
                  <p className="text-xs text-white/40 mt-1.5 max-w-[200px] leading-relaxed">
                    Browse our curated selection and find pieces carrying authentic Indian craftsmanship.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-750 text-white font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      id={`cart-item-${item.productId}`}
                      className="p-3.5 rounded-xl border border-white/5 bg-black/20 flex space-x-4 hover:border-white/10 transition-colors duration-255"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-black/20 border border-white/5 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-semibold text-white font-display line-clamp-1">
                              {t(`p_${item.product.id}`, item.product.name)}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.productId)}
                              id={`remove-cart-item-${item.productId}`}
                              className="text-white/40 hover:text-red-400 p-0.5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-white/40 font-mono block mt-0.5">
                            {item.product.category}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-2.5">
                          {/* Quantity modifiers */}
                          <div className="flex items-center border border-white/10 bg-[#0d0d0d] rounded-md">
                            <button
                              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                              className="p-1 text-white/40 hover:text-white disabled:opacity-30 cursor-pointer"
                              disabled={item.quantity <= 1}
                              id={`qty-minus-${item.productId}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-medium text-indigo-400">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                              className="p-1 text-white/40 hover:text-white cursor-pointer"
                              id={`qty-plus-${item.productId}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-xs font-mono font-medium text-white">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              // STEP 2: Checkout / Shipping form
              <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="checkout-form">
                <div className="p-3 bg-indigo-950/20 rounded-lg border border-indigo-500/10 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <p className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider">
                    FREE Shipping available for orders over {formatPrice(2000)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shashank Nuthalapati"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Flat/House No., Street, Locality"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition-all font-serif"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hyderabad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        State
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-indigo-500/50 focus:bg-black/50 transition-all font-mono"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st} className="bg-[#141414] text-white">{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="6-digit PIN"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Phone (Mobile)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 or 10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">
                       Payment Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["UPI ID (GPay/PhonePe)", "Credit/Deb Card", "Net Banking", "Cash On Delivery"].map((method) => (
                        <label
                          key={method}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-all duration-200 ${
                            paymentMethod === method
                              ? "bg-indigo-950/30 border-indigo-500 text-indigo-300 font-semibold"
                              : "bg-black/20 border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method}
                            checked={paymentMethod === method}
                            onChange={() => setPaymentMethod(method)}
                            className="sr-only"
                          />
                          <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-[10px] truncate">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {checkoutError && (
                  <p className="text-[10px] text-red-500 font-mono mt-2" id="checkout-error">
                    {checkoutError}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-white/5 bg-black/40 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/50">
                  <span>{t("subTotal")}</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/50">
                  <span>{t("taxInsurance")}</span>
                  <span className="font-mono">
                    {shippingCharge === 0 ? (
                      <span className="text-emerald-500 font-medium">FREE</span>
                    ) : (
                      formatPrice(shippingCharge)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/5">
                  <span>{t("totalToAuthorise")}</span>
                  <span className="font-mono text-white font-bold">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {step === "cart" ? (
                currentUser ? (
                  <button
                    onClick={() => setStep("shipping")}
                    id="go-to-shipping-btn"
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {t("checkoutNow")}
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                ) : (
                  <div className="space-y-2.5">
                    <button
                      onClick={onOpenAuth}
                      id="cart-login-required-btn"
                      className="w-full py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Sign In to Checkout
                    </button>
                    <p className="text-[10px] text-center text-white/30 font-serif italic">
                      You are checking out as guest. Please authenticate first.
                    </p>
                  </div>
                )
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    disabled={isSubmitting}
                    className="px-4 border border-white/10 text-white/60 hover:bg-white/5 text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={isSubmitting}
                    id="submit-order-btn"
                    className="flex-1 py-3.5 rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Securing Order...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        {t("placeOrder")}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

        </motion.div>
      </div>

      {/* Localized Order Confirmation Dialog Popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" id="localized-order-confirm-modal">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-2xl bg-[#141414] border border-white/10 shadow-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-indigo-500 to-emerald-500" />
            <h3 className="text-base font-serif italic font-bold text-white mb-2 leading-snug">
              {t("askConfirmOrderTitle")}
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              {t("askConfirmOrderDesc")}
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={confirmPlaceOrder}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                id="modal-confirm-order-btn"
              >
                {t("yesPlaceOrder")}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-3 text-white/50 hover:text-white border border-white/10 hover:bg-white/5 font-mono text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                id="modal-cancel-order-btn"
              >
                {t("noGoBack")}
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
