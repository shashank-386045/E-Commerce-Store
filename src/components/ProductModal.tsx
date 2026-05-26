/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, X, ShieldAlert, Sparkles, Send, ShoppingBag } from "lucide-react";
import { Product, User, Review } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../lib/translations";

interface ProductModalProps {
  product: Product;
  currentUser: User | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  isInCart: boolean;
  onAddReview: (productId: string, rating: number, comment: string) => Promise<void>;
}

export default function ProductModal({
  product,
  currentUser,
  onClose,
  onAddToCart,
  isInCart,
  onAddReview,
}: ProductModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const { t } = useLanguage();

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmittingReview(true);
    setReviewError("");
    try {
      await onAddReview(product.id, rating, comment);
      setComment("");
      setRating(5);
    } catch (err: any) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div id="quickview-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      
      {/* Backdrop with elegant blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog Body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative bg-[#141414] border border-white/5 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-[85vh]"
        id={`product-modal-dialog-${product.id}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-modal-btn"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#141414]/90 backdrop-blur-md text-white/70 hover:text-white shadow-lg border border-white/10 hover:scale-105 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Column 1: Image Frame */}
        <div className="relative bg-black/20 overflow-hidden min-h-[250px] md:h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-h-[40vh] md:max-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          <span className="absolute bottom-4 left-4 font-mono text-[10px] text-white/70 uppercase tracking-widest bg-black/60 backdrop-blur-md py-1 px-3 rounded-full border border-white/10">
            {product.category}
          </span>
        </div>

        {/* Column 2: Specifics and reviews */}
        <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto h-full max-h-[50vh] md:max-h-full">
          <div>
            {/* Rating summary */}
            <div className="flex items-center space-x-1.5 font-mono text-xs text-white/40 mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
              <span>•</span>
              <span>{product.reviews?.length || 0} reviews</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif italic font-bold text-white tracking-tight">
              {t(`p_${product.id}`, product.name)}
            </h2>

            <div className="mt-3 text-lg font-mono font-bold text-white">
              {formatPrice(product.price)}
            </div>

            <p className="mt-3 text-xs sm:text-sm text-white/60 leading-relaxed">
              {product.description}
            </p>

            {/* Spec details strip */}
            {product.details && (
              <div className="mt-5 p-3.5 rounded-xl bg-black/20 border border-white/5 text-xs text-white/80 font-sans tracking-wide">
                <div className="flex items-center gap-1.5 font-semibold text-[10px] uppercase font-mono text-white/40 tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Product Specifications
                </div>
                <div className="leading-relaxed text-white/60 font-serif italic whitespace-pre-line">
                  {product.details}
                </div>
              </div>
            )}

            {/* Stock Alarm Indicator */}
            <div className="mt-4 flex items-center space-x-2">
              <span className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs font-mono text-white/40">
                {product.stock > 0 ? `In Stock: ${product.stock} units available` : "Out of Stock"}
              </span>
            </div>
            
            {/* --- REVIEWS ZONE --- */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-xs font-mono font-medium tracking-widest uppercase text-white/40 mb-3.5">
                Customer Reviews ({product.reviews?.length || 0})
              </h3>
              
              <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-1">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-black/20 rounded-lg border border-white/5 flex flex-col gap-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white/80">{rev.userName}</span>
                        <div className="flex items-center space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? "fill-amber-400 stroke-amber-400" : "text-white/20 stroke-white/20"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/60 leading-normal">{rev.comment}</p>
                      <span className="text-[9px] text-white/40 font-mono self-end">
                        {new Date(rev.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-white/40 font-serif italic">This artisanal product has no reviews yet. Be the first to leave one.</p>
                )}
              </div>

              {/* Review submit form */}
              {currentUser ? (
                <form onSubmit={handleReviewSubmit} className="mt-5 pt-4 border-t border-white/5 flex flex-col gap-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Share Your Experience</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-white/40 font-sans">Rating:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-0.5 focus:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 cursor-pointer ${
                                starValue <= (hoverRating ?? rating)
                                  ? "fill-amber-400 stroke-amber-400"
                                  : "text-white/20 stroke-white/20"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an aesthetic review..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1 bg-black/30 border border-white/10 px-3 py-2 rounded-lg text-xs placeholder-white/30 text-white focus:border-indigo-500/50 focus:bg-black/50 focus:ring-1 focus:ring-indigo-500/20"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingReview || !comment.trim()}
                      className="px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {reviewError && (
                    <span className="text-[10px] text-red-500 font-mono mt-1">{reviewError}</span>
                  )}
                </form>
              ) : (
                <div className="mt-5 p-3 rounded-lg bg-black/30 border border-white/5 flex items-center gap-2 text-xs text-white/60">
                  <ShieldAlert className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>Please sign in to write a review.</span>
                </div>
              )}
            </div>

          </div>

          {/* Checkout/Add to Cart Bar */}
          <div className="mt-8 pt-5 border-t border-white/5 flex items-center gap-4">
            <button
              onClick={() => {
                onAddToCart(product);
              }}
              disabled={product.stock <= 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-mono tracking-widest uppercase rounded-xl transition-all duration-300 cursor-pointer ${
                product.stock <= 0
                  ? "bg-[#1f1f1f] text-white/30 cursor-not-allowed border border-[#2a2a2a]"
                  : isInCart
                  ? "bg-black/20 border border-white/10 text-indigo-400 hover:bg-[#1a1a1a]"
                  : "bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-700 hover:scale-[1.01]"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {product.stock <= 0 ? "Out of Stock" : isInCart ? "In Shopping Bag" : "Add to Shopping Bag"}
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
