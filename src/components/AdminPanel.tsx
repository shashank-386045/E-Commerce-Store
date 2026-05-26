/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Package, IndianRupee, ShieldAlert, Plus, Edit3, Trash2, ShoppingBag, Eye, TrendingUp, Check, Save } from "lucide-react";
import { Product, Order, OrderStatus } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (productData: any) => Promise<void>;
  onUpdateProduct: (id: string, productData: any) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
}

export default function AdminPanel({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "catalog">("orders");
  const [isEditing, setIsEditing] = useState<string | null>(null); // holds product ID being edited or "new"
  const [itemToRetire, setItemToRetire] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    details: "",
    price: "",
    image: "",
    category: "Home & Living" as Product["category"],
    stock: "",
  });
  const [adminError, setAdminError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computed Metrics
  const totalRevenue = orders
    .filter(o => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  
  const lowStockItems = products.filter(p => p.stock <= 5);
  
  const undeliveredOrdersCount = orders.filter(o => o.status !== "Delivered").length;

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);
  };

  const handleOpenNewProduct = () => {
    setFormData({
      name: "",
      description: "",
      details: "",
      price: "",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
      category: "Home & Living",
      stock: "15",
    });
    setAdminError("");
    setIsEditing("new");
  };

  const handleOpenEditProduct = (p: Product) => {
    setFormData({
      name: p.name,
      description: p.description,
      details: p.details || "",
      price: p.price.toString(),
      image: p.image,
      category: p.category,
      stock: p.stock.toString(),
    });
    setAdminError("");
    setIsEditing(p.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, details, price, image, category, stock } = formData;
    if (!name || !description || !price || !image || !stock) {
      setAdminError("Please fill out all mandatory fields.");
      return;
    }

    setIsSubmitting(true);
    setAdminError("");

    try {
      const payload = {
        name,
        description,
        details,
        price: Number(price),
        image,
        category,
        stock: Number(stock),
      };

      if (isEditing === "new") {
        await onAddProduct(payload);
      } else if (isEditing) {
        await onUpdateProduct(isEditing, payload);
      }
      setIsEditing(null);
    } catch (err: any) {
      setAdminError(err.message || "Failed to save product specification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8" id="admin-workbench">
      
      {/* 1. Administrative Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Metric 1 */}
        <div className="bg-[#141414] p-5 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Gross Settled Revenue</span>
            <span className="text-xl font-mono font-extrabold text-white mt-1 block">
              {formatPrice(totalRevenue)}
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/15 text-emerald-400">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#141414] p-5 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Active Logistics load</span>
            <span className="text-xl font-mono font-extrabold text-white mt-1 block">
              {orders.length} orders
            </span>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-55/15 text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#141414] p-5 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Critical Stock Alarms</span>
            <span className="text-xl font-mono font-extrabold text-white mt-1 block">
              {lowStockItems.length} references
            </span>
          </div>
          <div className={`p-3 rounded-lg border ${
            lowStockItems.length > 0 
              ? "bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse" 
              : "bg-white/5 border-white/10 text-white/30"
          }`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 2. Admin Panels Selectors */}
      <div className="flex flex-wrap gap-2 justify-between items-center bg-black/20 p-2.5 rounded-xl border border-white/5 shadow-sm">
        <div className="flex space-x-1">
          <button
            onClick={() => { setActiveTab("orders"); setIsEditing(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/10"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            Manage Customer Orders{undeliveredOrdersCount > 0 ? ` (${undeliveredOrdersCount})` : ""}
          </button>
          <button
            onClick={() => { setActiveTab("catalog"); setIsEditing(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "catalog"
                ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/10"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            Create Product Catalog ({products.length})
          </button>
        </div>

        {activeTab === "catalog" && !isEditing && (
          <button
            onClick={handleOpenNewProduct}
            id="add-product-trigger"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add To Catalog
          </button>
        )}
      </div>

      {/* 3. Panel Views */}
      <AnimatePresence mode="wait">
        
        {/* Tab 1: Orders tracking management list */}
        {activeTab === "orders" && (
          <motion.div
            key="orders-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-sm"
          >
            {orders.length === 0 ? (
              <div className="p-8 text-center italic text-white/40 text-xs py-14">
                No orders have been placed in the store yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/5">
                  <thead className="bg-[#0c0c0c]/90">
                    <tr className="font-mono text-[10px] text-white/40 uppercase tracking-widest text-left">
                      <th className="px-5 py-3.5">Invoice ID</th>
                      <th className="px-5 py-3.5">Buyer Email</th>
                      <th className="px-5 py-3.5">Consignment summary</th>
                      <th className="px-5 py-3.5">Total INR</th>
                      <th className="px-5 py-3.5">Logistics Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-white/80">
                    {orders.map((o) => (
                      <tr key={o.id} id={`admin-order-row-${o.id}`} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-white">{o.id}</td>
                        <td className="px-5 py-4 tracking-wide font-sans">
                          <div>
                            <span className="font-semibold block text-white font-serif italic">{o.shippingAddress.fullName}</span>
                            <span className="text-[10px] text-white/40">{o.userEmail}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="max-w-xs space-y-1">
                            {o.items.map((i) => (
                              <div key={i.productId} className="flex justify-between text-white/60 text-[11px]">
                                <span className="truncate max-w-[150px]">{i.name}</span>
                                <span className="font-mono font-medium text-indigo-400">x{i.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-4 font-mono font-semibold text-white">
                          {formatPrice(o.totalAmount)}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={o.status}
                            onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                            id={`status-select-${o.id}`}
                            className={`w-34 bg-black/40 border border-white/10 text-white rounded-md py-1 px-2.5 text-[10px] font-mono tracking-wider uppercase font-semibold ${
                              o.status === "Delivered"
                                ? "text-emerald-450 bg-emerald-500/10 border-emerald-500/20"
                                : o.status === "Cancelled"
                                ? "text-red-400 bg-red-500/10 border-red-500/20"
                                : "text-white/80 bg-[#1c1c1c] border-white/10"
                            }`}
                          >
                            <option value="Pending" className="bg-[#141414] text-white">Pending</option>
                            <option value="Processing" className="bg-[#141414] text-white">Processing</option>
                            <option value="Shipped" className="bg-[#141414] text-white">Shipped</option>
                            <option value="Delivered" className="bg-[#141414] text-white">Delivered</option>
                            <option value="Cancelled" className="bg-[#141414] text-white">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Tab 2: Catalog specifications management list and editors */}
        {activeTab === "catalog" && (
          <motion.div
            key="catalog-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Modal dialogue for editing/adding new products */}
            <AnimatePresence>
              {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
                  >
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
                      <h3 className="text-sm font-serif italic font-bold uppercase tracking-wider text-white">
                        {isEditing === "new" ? "Add Curated Creation Specs" : "Edit Specification Blueprint"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsEditing(null)}
                        className="text-white/40 hover:text-white text-xs font-mono uppercase cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs" id="admin-product-form">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                            Product Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Handmade Terracotta Lamp Holder"
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                            Consignment Category
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as Product["category"] })}
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 font-sans"
                          >
                            <option value="Home & Living" className="bg-[#141414] text-white">Home & Living</option>
                            <option value="Wellness" className="bg-[#141414] text-white">Wellness</option>
                            <option value="Tea & Spice" className="bg-[#141414] text-white">Tea & Spice</option>
                            <option value="Decor" className="bg-[#141414] text-white">Decor</option>
                            <option value="Electronics" className="bg-[#141414] text-white">Electronics</option>
                            <option value="Books" className="bg-[#141414] text-white">Books</option>
                            <option value="Beauty & Cosmetics" className="bg-[#141414] text-white">Beauty & Cosmetics</option>
                            <option value="Handicrafts" className="bg-[#141414] text-white">Handicrafts</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                            Price in Indian Rupees (INR)
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="₹ Price"
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                            Available Warehouse Stock
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            placeholder="Units"
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                          High-Quality Curated Image URL
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-1.5 font-mono text-[11px] text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                          Curator Summary (Plaintext desc)
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Write a charming summary carrying local Indian heritage accents."
                          className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 font-serif text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                          Composition Specifications Details (Size, weight, clean instructions, material)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          placeholder="e.g. Composition: 100% Terracotta. Width: 18cm. Fragile. Suitable for ambient lighting."
                          className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 leading-relaxed text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 font-sans"
                        />
                      </div>

                      {adminError && <p className="text-[10px] text-red-400 font-mono">{adminError}</p>}

                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setIsEditing(null)}
                          className="px-4 py-2 border border-white/10 rounded-lg text-white/60 hover:bg-white/5 text-xs cursor-pointer"
                        >
                          Abort
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          id="save-specs"
                          className="px-5 py-2 bg-indigo-600 border border-indigo-500 text-white rounded-lg flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-40 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Save className="w-3 h-3" />
                          )}
                          Commit Spec Changes
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Flat list of all current catalog items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => (
                <div
                  key={p.id}
                  id={`admin-spec-item-${p.id}`}
                  className="bg-[#141414] border border-white/5 rounded-xl p-4 flex gap-4 shadow-sm hover:border-white/10 transition-all duration-200"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-black/20 border border-white/5 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-serif italic font-bold text-white truncate max-w-[150px]" title={p.name}>
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-white/40 font-mono tracking-wider uppercase mt-0.5">
                        {p.category} • {formatPrice(p.price)}
                      </p>
                      <span className={`inline-block mt-1 font-mono text-[9px] px-1.5 py-0.5 rounded-full ${
                        p.stock <= 5 
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold"
                          : "bg-white/10 text-white/50 border border-white/5"
                      }`}>
                        Warehouse: {p.stock} units
                      </span>
                    </div>

                    <div className="flex gap-4 pt-2 border-t border-white/5 mt-2">
                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        id={`edit-p-btn-${p.id}`}
                        className="flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-white/60 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit Spec
                      </button>
                      <button
                        onClick={() => setItemToRetire(p)}
                        id={`delete-p-btn-${p.id}`}
                        className="flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-red-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        Retire Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Custom confirmation dialog for retiring items */}
      <AnimatePresence>
        {itemToRetire && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-red-400">
                <ShieldAlert className="w-6 h-6" />
                <h4 className="text-sm font-serif italic font-bold uppercase tracking-wider">
                  Retire Artisanal Specimen?
                </h4>
              </div>
              
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Are you sure you want to permanently remove <span className="font-bold text-white">"{itemToRetire.name}"</span> from the catalog? This action will archive the specimen specs and cannot be undone.
              </p>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setItemToRetire(null)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-white/60 hover:bg-white/5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const id = itemToRetire.id;
                    setItemToRetire(null);
                    await onDeleteProduct(id);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Retire Specimen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
