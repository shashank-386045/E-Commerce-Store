/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  AlertCircle,
  Edit2,
  Trash2,
  X,
  Plus,
  Minus,
  MapPin,
  ShieldAlert
} from "lucide-react";
import { Order, OrderStatus, OrderItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface OrderTrackerProps {
  orders: Order[];
  onUpdateOrder?: (id: string, updatedFields: any) => Promise<void>;
  onDeleteOrder?: (id: string) => Promise<void>;
}

export default function OrderTracker({ orders, onUpdateOrder, onDeleteOrder }: OrderTrackerProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(orders[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // User Actions State
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  const [editItems, setEditItems] = useState<OrderItem[]>([]);
  const [orderToDeleteId, setOrderToDeleteId] = useState<string | null>(null);
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenEdit = (order: Order) => {
    setEditingOrder(order);
    setEditForm({
      fullName: order.shippingAddress.fullName,
      addressLine: order.shippingAddress.addressLine,
      city: order.shippingAddress.city,
      state: order.shippingAddress.state,
      postalCode: order.shippingAddress.postalCode,
      phone: order.shippingAddress.phone,
    });
    setEditItems([...order.items]);
    setErrorText("");
  };

  const adjustItemQuantity = (productId: string, amount: number) => {
    setEditItems(prev => {
      return prev.map(item => {
        if (item.productId === productId) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  const removeItemFromEdit = (productId: string) => {
    setEditItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleCommitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateOrder || !editingOrder) return;
    if (editItems.length === 0) {
      setErrorText("An order must have at least one item. Or please cancel the order completely.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorText("");
      
      const subtotal = editItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalAmount = subtotal + (subtotal > 2000 ? 0 : 150);

      await onUpdateOrder(editingOrder.id, {
        shippingAddress: editForm,
        items: editItems,
        totalAmount
      });
      setEditingOrder(null);
    } catch (err: any) {
      setErrorText(err.error || err.message || "Failed to edit order details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!onDeleteOrder || !orderToDeleteId) return;
    try {
      setIsSubmitting(true);
      await onDeleteOrder(orderToDeleteId);
      setOrderToDeleteId(null);
    } catch (err: any) {
      alert(err.message || "Failed to cancel order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const copyTracking = (tracking: string) => {
    navigator.clipboard.writeText(tracking);
    setCopiedId(tracking);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);
  };

  const getStatusStep = (status: OrderStatus): number => {
    switch (status) {
      case "Pending": return 1;
      case "Processing": return 2;
      case "Shipped": return 3;
      case "Delivered": return 4;
      default: return 0; // Cancelled
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-[#141414] rounded-2xl border border-white/5 p-6">
        <span className="text-3xl">📦</span>
        <h3 className="mt-4 text-sm font-serif italic font-semibold text-white">No Custom Orders Placed</h3>
        <p className="mt-2 text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
          You haven't ordered any custom curated pieces yet. Place an item in your checkout bag to start tracking live delivery!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4" id="order-tracker-container">
      {orders.map((order, orderIdx) => {
        const isExpanded = expandedOrderId === order.id;
        const currentStep = getStatusStep(order.status);
        const steps: { name: string; desc: string; icon: any }[] = [
          { name: "Ordered", desc: "Awaiting approval", icon: Package },
          { name: "Processing", desc: "Preparing parcel", icon: Package },
          { name: "Shipped", desc: "In transit", icon: Truck },
          { name: "Delivered", desc: "At your doorstep", icon: CheckCircle2 },
        ];

        return (
          <div
            key={order.id}
            id={`order-card-${order.id}`}
            className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-sm hover:border-white/10 transition-colors"
          >
            {/* Header / Summary row */}
            <div
              onClick={() => toggleExpand(order.id)}
              className="px-5 py-4 sm:px-6 flex flex-wrap items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex gap-4 items-center">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <Package className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      ID: {order.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider ${
                        order.status === "Delivered"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : order.status === "Cancelled"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-white/10 text-white/80 border border-white/10"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">
                    On {new Date(order.createdAt).toLocaleString("en-IN")} • {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <div className="text-right">
                  <span className="text-[10px] block font-mono text-white/40 uppercase tracking-wider">Total</span>
                  <span className="text-sm font-mono font-semibold text-white">{formatPrice(order.totalAmount)}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-white/40" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/40" />
                )}
              </div>
            </div>

            {/* Expandable details area */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="border-t border-white/5 bg-black/20"
                >
                  <div className="px-5 py-6 sm:px-6 space-y-6">
                    {/* Visual Stepper tracker bar */}
                    {order.status === "Cancelled" ? (
                      <div className="p-4 bg-red-950/20 rounded-xl border border-red-500/10 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-red-350 font-serif italic">Order Cancelled</h4>
                          <p className="text-[10px] text-white/40 font-mono mt-0.5">
                            This transaction was cancelled and refunded. We apologize for any inconvenience caused.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative py-4">
                        {/* Stepper horizontal/vertical line connector */}
                        <div className="absolute top-[34px] left-[15px] right-[15px] h-[2px] bg-white/10 hidden md:block" />
                        <div className="absolute left-[20px] top-[24px] bottom-[24px] w-[2px] bg-white/10 md:hidden" />

                        {/* Stepper nodes list */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 position-relative">
                          {steps.map((st, sIdx) => {
                            const stepId = sIdx + 1;
                            const isCompleted = stepId <= currentStep;
                            const isCurrent = stepId === currentStep;
                            const IconComp = st.icon;

                            return (
                              <div
                                key={st.name}
                                className="flex md:flex-col items-start md:items-center text-left md:text-center z-10 space-x-3.5 md:space-x-0"
                              >
                                <div
                                  className={`w-[36px] h-[36px] rounded-full border-2 flex items-center justify-center transition-colors shadow-sm ${
                                    isCompleted
                                      ? "bg-indigo-600 border-indigo-500 text-white"
                                      : "bg-[#141414] border-white/10 text-white/20"
                                  } ${isCurrent ? "ring-4 ring-indigo-500/25 animate-pulse" : ""}`}
                                >
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="mt-0 md:mt-2.5">
                                  <h4
                                    className={`text-xs font-serif italic font-semibold ${
                                      isCompleted ? "text-white" : "text-white/30"
                                    }`}
                                  >
                                    {st.name}
                                  </h4>
                                  <p className="text-[10px] text-white/40 font-mono mt-0.5">
                                    {isCompleted ? st.desc : "Pending step"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Meta Section columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                      
                      {/* Shipping Info Card */}
                      <div className="p-4 bg-black/30 border border-white/5 rounded-xl space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Recipient Details</span>
                        <div className="text-xs">
                          <p className="font-semibold text-white">{order.shippingAddress.fullName}</p>
                          <p className="text-white/60 mt-1 leading-normal italic font-serif">
                            {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                          </p>
                          <p className="text-white/40 font-mono mt-1 text-[11px]">
                            Mob: {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>

                      {/* Package Tracking details */}
                      <div className="p-4 bg-black/30 border border-white/5 rounded-xl space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Consignment Logistics</span>
                        <div className="text-xs flex flex-col justify-between h-[80%]">
                          <div>
                            <span className="text-[10px] text-white/40 uppercase font-mono">Carrier Service</span>
                            <p className="font-semibold text-white mt-0.5 font-serif">Blue Dart India Premium</p>
                          </div>
                          <div className="mt-2 flex items-center justify-between bg-black/40 border border-white/10 px-2.5 py-1.5 rounded-lg">
                            <span className="font-mono text-[10px] font-semibold text-indigo-400 uppercase">
                              {order.trackingNumber}
                            </span>
                            <button
                              onClick={() => copyTracking(order.trackingNumber)}
                              className="text-white/40 hover:text-white cursor-pointer"
                              title="Copy Tracking ID"
                            >
                              {copiedId === order.trackingNumber ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Payment Overview */}
                      <div className="p-4 bg-black/30 border border-white/5 rounded-xl space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Payment Mode</span>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-white/40">Method</span>
                            <span className="font-mono font-medium text-white/80">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40">Status</span>
                            <span className="font-mono text-emerald-400 font-semibold uppercase text-[10px]">SUCCESS</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-white/5 text-sm font-semibold text-white mt-2">
                            <span>Settled INR</span>
                            <span className="font-mono">{formatPrice(order.totalAmount)}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Order Goods Content Grid */}
                    <div className="space-y-3.5 pt-4 border-t border-white/5">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Itemized Cargo</span>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.productId}
                            className="bg-black/40 p-3 rounded-lg border border-white/5 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-cover rounded-md bg-black/20 border border-white/5"
                              />
                              <div>
                                <h5 className="text-xs font-semibold text-white font-display">
                                  {item.name}
                                </h5>
                                <span className="text-[10px] font-mono text-white/40 mt-0.5 block">
                                  SKU: SKU-IN-{item.productId}
                                </span>
                              </div>
                            </div>
                            <div className="text-right text-xs">
                              <span className="text-white/40 mr-4">Qty: {item.quantity}</span>
                              <span className="font-mono text-white font-semibold">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* User Actions Panel (Edit shipping details, cancel order) */}
                    {(order.status === "Pending" || order.status === "Processing") && (
                      <div className="flex flex-wrap gap-3.5 pt-4 border-t border-white/5 justify-end">
                        <button
                          onClick={() => handleOpenEdit(order)}
                          className="flex items-center gap-1.5 px-4.5 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-mono tracking-wider uppercase rounded-lg transition-colors cursor-pointer font-bold"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit Order Details & Items
                        </button>
                        <button
                          onClick={() => setOrderToDeleteId(order.id)}
                          className="flex items-center gap-1.5 px-4.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-mono tracking-wider uppercase rounded-lg transition-colors cursor-pointer font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Cancel & Delete Order
                        </button>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>

    {/* 1. Modal for Editing Order Shipping Details and Quantities */}
    <AnimatePresence>
      {editingOrder && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-5"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div>
                <h3 className="text-sm font-serif italic font-bold uppercase tracking-wider text-white">
                  Modifying Dispatch Instructions
                </h3>
                <span className="text-[10px] text-white/40 font-mono mt-0.5 block">
                  ORDER ID: {editingOrder.id} • STATUS: {editingOrder.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="p-1 px-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white/40 hover:text-white text-[10px] font-mono uppercase cursor-pointer transition-colors font-bold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCommitEdit} className="space-y-4 text-xs" id="edit-user-order-form">
              
              {/* A. Shipping address updates */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block border-b border-white/5 pb-1">Delivery Destination</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-1">
                      Contact Mobile Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.addressLine}
                    onChange={(e) => setEditForm({ ...editForm, addressLine: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.state}
                      onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-1">
                      PIN / Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.postalCode}
                      onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* B. Items lists and quantity modifiers */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block border-b border-white/5 pb-1">Included Consignment Cargo</span>
                
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {editItems.map((item) => (
                    <div
                      key={item.productId}
                      className="bg-black/30 p-2.5 rounded-xl border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 object-cover rounded bg-black/20 border border-white/5"
                        />
                        <div>
                          <h5 className="text-[11px] font-semibold text-white font-sans">
                            {item.name}
                          </h5>
                          <span className="text-[9px] font-mono text-white/40">
                            {formatPrice(item.price)} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Quantity control */}
                        <div className="flex items-center bg-[#0d0d0d] border border-white/10 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => adjustItemQuantity(item.productId, -1)}
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-[11px] font-mono text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => adjustItemQuantity(item.productId, 1)}
                            className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItemFromEdit(item.productId)}
                          className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {editItems.length === 0 && (
                    <div className="text-center py-6 text-red-450 font-mono text-[10px]">
                      No items remaining. Close editor or use 'Cancel Order' to terminate order.
                    </div>
                  )}
                </div>
              </div>

              {/* C. Live calculation panel */}
              {editItems.length > 0 && (
                <div className="bg-black/40 border border-white/5 p-3 rounded-lg flex justify-between items-center text-xs font-mono">
                  <span className="text-white/40">Adjusted Bill total amount:</span>
                  <div>
                    <span className="text-white/40 text-[10px] mr-2">
                      {editItems.reduce((sum, i) => sum + i.price * i.quantity, 0) > 2000 ? "(Free Shipping)" : "(+ ₹150 Delivery fee)"}
                    </span>
                    <span className="text-white font-bold text-sm">
                      {formatPrice(
                        editItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                        (editItems.reduce((sum, item) => sum + item.price * item.quantity, 0) > 2000 ? 0 : 150)
                      )}
                    </span>
                  </div>
                </div>
              )}

              {errorText && <p className="text-[10px] text-red-400 font-mono">{errorText}</p>}

              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-white/60 hover:bg-white/5 font-mono text-[10px] uppercase tracking-wider cursor-pointer font-bold"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || editItems.length === 0}
                  className="px-5 py-2 bg-indigo-600 border border-indigo-500 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-colors font-bold"
                >
                  {isSubmitting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}
                  Commit Order Updates
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* 2. Modal for Confirming Order Cancellation & Deletion */}
    <AnimatePresence>
      {orderToDeleteId && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-[#141414] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-3 text-red-400">
              <ShieldAlert className="w-6 h-6" />
              <h4 className="text-sm font-serif italic font-bold uppercase tracking-wider text-white">
                Cancel dispatch sequence?
              </h4>
            </div>
            
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              Are you sure you want to cancel and permanently delete order <span className="font-bold text-white font-mono">{orderToDeleteId}</span>? All stocked items will be re-assigned to catalog warehouses immediately. This cannot be undone.
            </p>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setOrderToDeleteId(null)}
                className="px-4 py-2 border border-white/10 rounded-lg text-white/60 hover:bg-white/5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer font-bold"
              >
                Leave Intact
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 hover:bg-red-750 text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 font-bold"
              >
                {isSubmitting ? (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Terminate Order
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
);
}
