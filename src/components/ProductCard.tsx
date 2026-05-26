/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, Eye, Plus, Check } from "lucide-react";
import { Product } from "../types";
import { motion } from "motion/react";
import { useLanguage } from "../lib/translations";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  isInCart: boolean;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  isInCart,
}: ProductCardProps) {
  const { t } = useLanguage();

  // Format the price in Indian Rupees with thousands commas
  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative bg-[#141414] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between h-full hover:shadow-2xl hover:border-white/15 transition-all duration-300"
      id={`product-card-${product.id}`}
    >
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-square overflow-hidden bg-black/20 border-b border-white/5">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Transparent Overlay for Interactive CTAs */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3.5">
            <button
              onClick={() => onQuickView(product)}
              className="p-3.5 rounded-full bg-[#141414] border border-white/10 text-white shadow hover:bg-indigo-600 hover:border-indigo-500 transition-colors focus:ring-2 focus:ring-indigo-500 group/btn"
              title={t("quickView")}
              id={`quick-view-btn-${product.id}`}
            >
              <Eye className="w-5 h-5 stroke-[1.8] group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>

          {/* Stocks and Badges */}
          {isOutOfStock ? (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono tracking-wider text-white bg-red-600/85 rounded-full uppercase">
              {t("soldOut")}
            </span>
          ) : product.stock <= 5 ? (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono tracking-wider text-white bg-amber-600/85 rounded-full uppercase">
              {t("only")} {product.stock} {t("left")}
            </span>
          ) : null}

          {/* Category Tag */}
          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#e0e0e0] bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            {product.category}
          </span>
        </div>

        {/* Info Area */}
        <div className="p-4 sm:p-5">
          {/* Reviews Star Indicator */}
          <div className="flex items-center space-x-1.5 mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span className="text-[11px] font-mono font-semibold text-white/50">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <h3 className="text-base font-serif italic font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
            {t(`p_${product.id}`, product.name)}
          </h3>
          <p className="mt-1 text-xs text-white/60 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing and Action Drawer */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
            {t("price")}
          </span>
          <span className="text-[15px] font-mono font-semibold text-white">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={() => !isOutOfStock && onAddToCart(product)}
          disabled={isOutOfStock}
          id={`add-to-cart-btn-${product.id}`}
          className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-lg border transition-all duration-300 ${
            isOutOfStock
              ? "bg-[#1f1f1f] border-[#2a2a2a] text-white/30 cursor-not-allowed"
              : isInCart
              ? "bg-[#1f1f1f] border-white/10 text-indigo-400 hover:bg-[#252525] cursor-pointer"
              : "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-700 cursor-pointer"
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-3.5 h-3.5" />
              {t("inCart")}
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              {t("add")}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
