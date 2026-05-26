/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  User as UserIcon, 
  ShieldAlert, 
  Truck, 
  X, 
  ChevronRight,
  Sparkle
} from "lucide-react";
import { User, Product, Order, CartItem, OrderStatus } from "./types";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";
import OrderTracker from "./components/OrderTracker";
import AdminPanel from "./components/AdminPanel";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./lib/translations";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function App() {
  const { language, t } = useLanguage();

  const getTranslatedCategoryName = (cat: string) => {
    switch (cat) {
      case "All": return t("all") + " Collection";
      case "Home & Living": return t("homeLiving");
      case "Wellness": return t("wellness");
      case "Tea & Spice": return t("teaSpice");
      case "Decor": return t("decor");
      case "Electronics": return t("electronics");
      case "Books": return t("books");
      case "Beauty & Cosmetics": return t("beautyCosmetics");
      case "Handicrafts": return t("handicrafts");
      default: return cat;
    }
  };

  // Core API State
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("AURA_AUTH_TOKEN"));

  // UI Flow State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [authInitialEmail, setAuthInitialEmail] = useState("");
  const [authInitialPassword, setAuthInitialPassword] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCheckoutSuccess, setActiveCheckoutSuccess] = useState<Order | null>(null);
  
  // Local Shopping Bag
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("AURA_CART");
    return saved ? JSON.parse(saved) : [];
  });

  // Ambient Notifications State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Helpers to fire notifications
  const triggerToast = (message: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Sync Cart to storage
  useEffect(() => {
    localStorage.setItem("AURA_CART", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync auth token
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("AURA_AUTH_TOKEN", authToken);
      bootstrapProfile();
    } else {
      localStorage.removeItem("AURA_AUTH_TOKEN");
      setCurrentUser(null);
      setOrders([]);
      setIsAdminMode(false);
    }
  }, [authToken]);

  // Bootstrapping Profile details
  const bootstrapProfile = async () => {
    if (!authToken) return;
    try {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        if (data.user.role === "admin") {
          setIsAdminMode(true);
        } else {
          setIsAdminMode(false);
        }
      } else {
        setAuthToken(null);
      }
    } catch (e) {
      console.error("Auth verification failed:", e);
      setAuthToken(null);
    }
  };

  // Fetch product catalog & orders
  useEffect(() => {
    fetchProducts();
    if (currentUser) {
      fetchOrders();
    }
  }, [selectedCategory, currentUser]);

  const fetchProducts = async () => {
    try {
      const url = selectedCategory && selectedCategory !== "All"
        ? `/api/products?category=${encodeURIComponent(selectedCategory)}`
        : "/api/products";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        
        // Load user-created products fallback backup from localStorage
        const storedLocal = localStorage.getItem("aura_user_products");
        let localProducts: any[] = [];
        if (storedLocal) {
          try {
            localProducts = JSON.parse(storedLocal);
          } catch (err) {
            console.error("Local storage parse error:", err);
          }
        }

        // Filter local products by selectedCategory if active
        if (selectedCategory && selectedCategory !== "All") {
          localProducts = localProducts.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Filter out retired products via local storage tracker
        const storedRetired = localStorage.getItem("aura_retired_products");
        let retiredList: string[] = [];
        if (storedRetired) {
          try {
            retiredList = JSON.parse(storedRetired);
          } catch (err) {
            console.error(err);
          }
        }

        // Load client-edited specifications cache
        const storedEdited = localStorage.getItem("aura_edited_products");
        let editedProductsMap: Record<string, any> = {};
        if (storedEdited) {
          try {
            const parsed = JSON.parse(storedEdited);
            if (Array.isArray(parsed)) {
              for (const p of parsed) {
                if (p && p.id) {
                  editedProductsMap[p.id] = p;
                }
              }
            } else if (typeof parsed === "object" && parsed !== null) {
              editedProductsMap = parsed;
            }
          } catch (err) {
            console.error(err);
          }
        }

        // Filter both server-side and client-side fallback list
        const activeServerProducts = data.filter((p: any) => !retiredList.includes(p.id));
        const activeLocalProducts = localProducts.filter((p: any) => !retiredList.includes(p.id));

        // Merge, avoiding duplicates (server-side data takes precedence)
        const serverIds = new Set(activeServerProducts.map((p: any) => p.id));
        const merged = [...activeServerProducts];
        for (const lp of activeLocalProducts) {
          if (!serverIds.has(lp.id)) {
            merged.unshift(lp); // new user-created items appear at the start of lists
          }
        }

        // Overlay any locally updated product specifications
        const finalProducts = merged.map((p: any) => {
          if (editedProductsMap[p.id]) {
            return { ...p, ...editedProductsMap[p.id] };
          }
          return p;
        });

        setProducts(finalProducts);
      }
    } catch (e) {
      triggerToast("Error connecting to catalog service", "error");
    }
  };

  const fetchOrders = async () => {
    if (!authToken) return;
    try {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error("Error loading order log:", e);
    }
  };

  // Filter products by search dynamically
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // API Callbacks
  const handleLogin = async (email: string, pass: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass })
    });
    
    if (res.ok) {
      const data = await res.json();
      setAuthToken(data.token);
      setCurrentUser(data.user);
      if (data.user.role === "admin") {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
      triggerToast(`Welcome back, ${data.user.name}`);
    } else {
      const err = await res.json();
      throw new Error(err.error || "Login validation failed");
    }
  };

  const handleRegister = async (name: string, email: string, pass: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: pass })
    });

    if (res.ok) {
      const data = await res.json();
      setAuthToken(data.token);
      setCurrentUser(data.user);
      triggerToast(`Welcome, details registered successfully!`);
    } else {
      const err = await res.json();
      throw new Error(err.error || "Profile initialization failed");
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    setOrders([]);
    triggerToast("Signed out securely");
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      triggerToast("This fine artisanal block is currently sold out", "error");
      return;
    }
    const exists = cartItems.find((item) => item.productId === product.id);
    if (exists) {
      triggerToast(`${product.name} is already in your bag`);
      return;
    }

    setCartItems((prev) => [...prev, { productId: product.id, product, quantity: 1 }]);
    triggerToast(`Added ${product.name} to curated bag`);
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    if (qty > item.product.stock) {
      triggerToast(`Only ${item.product.stock} units currently left in our studio`, "info");
      return;
    }

    setCartItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
    triggerToast("Item removed from bag");
  };

  const handleCheckout = async (shippingAddress: any, paymentMethod: string) => {
    if (!authToken) return;
    
    const itemsPayload = cartItems.map((i) => ({
      productId: i.productId,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      image: i.product.image
    }));

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalAmount = subtotal + (subtotal > 2000 ? 0 : 150);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        items: itemsPayload,
        totalAmount,
        shippingAddress,
        paymentMethod
      })
    });

    if (res.ok) {
      const completedOrder = await res.json();
      setCartItems([]); // Clear cart
      setActiveCheckoutSuccess(completedOrder);
      triggerToast("Order placed successfully in INR! Tracking loaded.");
      fetchOrders(); // Refetch logs
      fetchProducts(); // Update stocks
    } else {
      const err = await res.json();
      throw new Error(err.error || "Order validation declined");
    }
  };

  // --- ADMIN ACTIONS (requires Authorization) ---
  const handleAdminAddProduct = async (productData: any) => {
    if (!authToken) return;
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(productData)
    });

    if (res.ok) {
      const newProduct = await res.json();

      // Mirror user creation backup in client localStorage
      try {
        const storedLocal = localStorage.getItem("aura_user_products");
        const localProducts = storedLocal ? JSON.parse(storedLocal) : [];
        localProducts.unshift(newProduct);
        localStorage.setItem("aura_user_products", JSON.stringify(localProducts));
      } catch (err) {
        console.error("Local storage save error:", err);
      }

      triggerToast("New creation added to gallery catalog!");
      fetchProducts();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Failed to commit product");
    }
  };

  const handleAdminUpdateProduct = async (id: string, productData: any) => {
    if (!authToken) return;
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(productData)
    });

    if (res.ok) {
      const updatedProduct = await res.json();

      // Mirror update in client localStorage
      try {
        const storedLocal = localStorage.getItem("aura_user_products");
        if (storedLocal) {
          const localProducts = JSON.parse(storedLocal);
          const idx = localProducts.findIndex((p: any) => p.id === id);
          if (idx !== -1) {
            localProducts[idx] = { ...localProducts[idx], ...updatedProduct };
            localStorage.setItem("aura_user_products", JSON.stringify(localProducts));
          }
        }

        // Save to edited products tracker
        const storedEdited = localStorage.getItem("aura_edited_products");
        let editedMap: Record<string, any> = {};
        if (storedEdited) {
          try {
            editedMap = JSON.parse(storedEdited);
            if (Array.isArray(editedMap)) {
              // convert legacy array to map
              const temp: Record<string, any> = {};
              for (const p of editedMap) {
                if (p && p.id) temp[p.id] = p;
              }
              editedMap = temp;
            }
          } catch (e) {
            editedMap = {};
          }
        }
        editedMap[id] = updatedProduct;
        localStorage.setItem("aura_edited_products", JSON.stringify(editedMap));
      } catch (err) {
        console.error("Local storage update error:", err);
      }

      triggerToast("Modification successfully recorded!");
      fetchProducts();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Failed to modify blueprint");
    }
  };

  const handleAdminDeleteProduct = async (id: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (res.ok) {
      // Retract from client localStorage too
      try {
        const storedLocal = localStorage.getItem("aura_user_products");
        if (storedLocal) {
          let localProducts = JSON.parse(storedLocal);
          localProducts = localProducts.filter((p: any) => p.id !== id);
          localStorage.setItem("aura_user_products", JSON.stringify(localProducts));
        }
      } catch (err) {
        console.error("Local storage clean error:", err);
      }

      // Appending to retired list to prevent local fallback merge issues on refresh
      try {
        const storedRetired = localStorage.getItem("aura_retired_products");
        const retiredList = storedRetired ? JSON.parse(storedRetired) : [];
        if (!retiredList.includes(id)) {
          retiredList.push(id);
          localStorage.setItem("aura_retired_products", JSON.stringify(retiredList));
        }
      } catch (err) {
        console.error("Local storage retired update error:", err);
      }

      triggerToast("Artisanal creation permanently retired");
      fetchProducts();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete item");
    }
  };

  const handleAdminDeleteAllProducts = async () => {
    if (!authToken) return;
    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (res.ok) {
      try {
        localStorage.removeItem("aura_retired_products");
        localStorage.removeItem("aura_edited_products");
      } catch (err) {
        console.error(err);
      }
      triggerToast("Entire product catalog successfully wiped");
      fetchProducts();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Failed to wipe catalog");
    }
  };

  const handleAdminRestoreSeedProducts = async () => {
    if (!authToken) return;
    const res = await fetch("/api/products/restore", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (res.ok) {
      try {
        localStorage.removeItem("aura_retired_products");
        localStorage.removeItem("aura_edited_products");
      } catch (err) {
        console.error(err);
      }
      triggerToast("Curated default seed catalog successfully restored");
      fetchProducts();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Failed to restore seed catalog");
    }
  };

  const handleAdminUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    if (!authToken) return;
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      triggerToast(`Order ${orderId} shifted to ${status} status!`);
      fetchOrders();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Status update rejected");
    }
  };

  const handleUserUpdateOrder = async (orderId: string, updatedFields: any) => {
    if (!authToken) return;
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedFields)
    });

    if (res.ok) {
      triggerToast("Order details successfully updated!");
      fetchOrders();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Failed to update order");
    }
  };

  const handleUserDeleteOrder = async (orderId: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (res.ok) {
      triggerToast("Order cancelled & removed successfully");
      fetchOrders();
    } else {
      const err = await res.json();
      throw new Error(err.error || "Failed to cancel order");
    }
  };

  const handleAddReview = async (productId: string, rating: number, comment: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/products/${productId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ rating, comment })
    });

    if (res.ok) {
      const updatedProduct = await res.json();
      
      // Update entry in client localStorage if exists
      try {
        const storedLocal = localStorage.getItem("aura_user_products");
        if (storedLocal) {
          const localProducts = JSON.parse(storedLocal);
          const idx = localProducts.findIndex((p: any) => p.id === productId);
          if (idx !== -1) {
            localProducts[idx] = { ...localProducts[idx], ...updatedProduct };
            localStorage.setItem("aura_user_products", JSON.stringify(localProducts));
          }
        }

        // Save to edited products tracker
        const storedEdited = localStorage.getItem("aura_edited_products");
        let editedMap: Record<string, any> = {};
        if (storedEdited) {
          try {
            editedMap = JSON.parse(storedEdited);
            if (Array.isArray(editedMap)) {
              const temp: Record<string, any> = {};
              for (const p of editedMap) {
                if (p && p.id) temp[p.id] = p;
              }
              editedMap = temp;
            }
          } catch (e) {
            editedMap = {};
          }
        }
        editedMap[productId] = updatedProduct;
        localStorage.setItem("aura_edited_products", JSON.stringify(editedMap));
      } catch (err) {
        console.error("Local storage review update error:", err);
      }

      // Update quickview modal in-memory state
      setQuickViewProduct(updatedProduct);

      // Re-fetch products to sync ratings indices on home
      fetchProducts();
      triggerToast("Thank you! Review appended dynamically.");
    } else {
      const err = await res.json();
      throw new Error(err.error || "Review rejected");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] flex flex-col justify-between selection:bg-indigo-600 selection:text-white" id="main-app-shell">
      
      {/* 1. Universal header */}
      <Header
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthInitialEmail("");
          setAuthInitialPassword("");
          setIsAuthOpen(true);
        }}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        onLogout={handleLogout}
        onSelectRole={(role) => {
          if (role === "admin") {
            setAuthInitialEmail("admin@aura.in");
            setAuthInitialPassword("admin");
            setIsAuthOpen(true);
          } else {
            setAuthInitialEmail("shashank.nuthalapati06@gmail.com");
            setAuthInitialPassword("user123");
            setIsAuthOpen(true);
          }
        }}
      />

      {/* 2. Primary layout zone */}
      <main className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          
          <AnimatePresence mode="wait">
            
            {/* If Admin panel mode is activated */}
            {isAdminMode && currentUser?.role === "admin" ? (
              <motion.div
                key="admin-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
                id="admin-module"
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="p-1 px-2.5 bg-indigo-600 text-white font-mono text-[9px] uppercase tracking-wider rounded-md font-bold">Executive control suite</span>
                  <p className="text-xs text-white/40 font-mono tracking-wide">Aura Studio System Administration</p>
                </div>
                
                <AdminPanel
                  products={products}
                  orders={orders}
                  onAddProduct={handleAdminAddProduct}
                  onUpdateProduct={handleAdminUpdateProduct}
                  onDeleteProduct={handleAdminDeleteProduct}
                  onUpdateOrderStatus={handleAdminUpdateOrderStatus}
                />
              </motion.div>
            ) : (
              // DEFAULT: Buyer Storefront
              <motion.div
                key="storefront-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                
                {/* A. Dynamic Success notification drawer post-checkout */}
                {activeCheckoutSuccess && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4"
                    id="order-success-banner"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-indigo-600 text-white rounded-full flex-shrink-0 animate-bounce">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-md font-serif italic text-white font-bold">Your order has been locked in!</h2>
                        <p className="text-xs text-white/60 mt-1 max-w-md leading-relaxed">
                          We are preparing your parcel: <span className="font-mono font-bold text-indigo-400">{activeCheckoutSuccess.id}</span>.
                          Track transit details and logistics steps dynamically on this dashboard below.
                        </p>
                        <div className="flex gap-3 items-center mt-3">
                          <span className="text-[10px] font-mono bg-[#141414] border border-white/5 py-1 px-2.5 rounded text-indigo-400 font-bold">
                            AWB: {activeCheckoutSuccess.trackingNumber}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">
                            Payment: {activeCheckoutSuccess.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveCheckoutSuccess(null)}
                      className="px-4 py-2 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg text-xs font-mono tracking-wider text-white/80 uppercase cursor-pointer"
                    >
                      Dismiss View
                    </button>
                  </motion.div>
                )}

                {/* B. Large Curated Hero Stage */}
                {!searchQuery && selectedCategory === "All" && (
                  <div
                    id="aura-hero-banner"
                    className="relative rounded-3xl overflow-hidden bg-stone-900 text-white px-6 py-16 sm:px-12 sm:py-24 shadow-lg border border-stone-800"
                  >
                    {/* Dark artistic overlay */}
                    <div className="absolute inset-0 bg-stone-950/20 mix-blend-multiply" />

                    <div className="relative max-w-2xl space-y-6">
                      <div className="flex items-center space-x-2">
                        <Sparkle className="w-3.5 h-3.5 text-stone-300 animate-spin" style={{ animationDuration: "12s" }} />
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-300">
                          {t("curatedCollectives")}
                        </span>
                      </div>
                      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
                        {t("heroHeading")} <br /><span className="font-serif italic font-normal text-stone-300">{t("heroHeadingSub")}</span>
                      </h1>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg font-light">
                        {t("heroSubheading")}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-4">
                        <button
                          onClick={() => setSelectedCategory("Home & Living")}
                          className="flex items-center gap-2 bg-white text-stone-900 border border-white hover:bg-stone-105 rounded-full px-5 py-2.5 text-xs tracking-wider uppercase font-mono font-semibold shadow transition-all cursor-pointer"
                        >
                          {t("exploreHome")}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedCategory("Wellness")}
                          className="flex items-center gap-2 bg-transparent text-stone-100 border border-stone-500 hover:border-white rounded-full px-5 py-2.5 text-xs tracking-wider uppercase font-mono transition-all cursor-pointer"
                        >
                          {t("reviewWellness")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* C. Primary Grid: Left Category Catalogs, Right Products showcase */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-3xl font-serif italic text-white tracking-wide">
                        {searchQuery ? `Search Results for "${searchQuery}"` : getTranslatedCategoryName(selectedCategory)}
                      </h2>
                      <p className="text-xs text-white/40 mt-1">
                        {filteredProducts.length} {t("curatedCreations")}
                      </p>
                    </div>

                    {!searchQuery && (
                      <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-[#6366f1] font-semibold">
                        {t("pricedInInr")}
                      </span>
                    )}
                  </div>

                  {/* Grid of cards */}
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-24 bg-[#141414] border border-white/5 rounded-3xl p-6">
                      <span className="text-3xl">🍂</span>
                      <h3 className="mt-4 text-sm font-serif italic text-white font-semibold">
                        {products.length === 0 ? "Boutique Displays Updating" : t("noMatchFound")}
                      </h3>
                      <p className="mt-2 text-xs text-white/40 max-w-xs mx-auto leading-relaxed">
                        {products.length === 0 
                          ? t("boutiqueEmpty")
                          : "No creations match your query at the moment. Try selecting another filter tag or adjusting spelling constraints."}
                      </p>
                      {products.length === 0 && currentUser?.role === "admin" && (
                        <div className="mt-6">
                          <button
                            onClick={() => setIsAdminMode(true)}
                            className="px-5 py-2 hover:bg-indigo-700 bg-indigo-600 text-white rounded-lg font-mono text-[10px] uppercase tracking-wider cursor-pointer font-semibold animate-pulse"
                          >
                            Open Admin Workbench
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7" id="product-grid">
                      {filteredProducts.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          onQuickView={(prod) => setQuickViewProduct(prod)}
                          onAddToCart={(prod) => handleAddToCart(prod)}
                          isInCart={!!cartItems.find((ci) => ci.productId === p.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* D. Live Order Tracking Panel for standard users */}
                {currentUser && currentUser.role === "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="pt-10 border-t border-white/10 space-y-6"
                    id="user-order-tracking"
                  >
                    <div>
                      <span className="p-1 px-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[9px] uppercase tracking-wider rounded-md font-bold">
                        Live Tracking Core
                      </span>
                      <h2 className="text-2xl font-serif italic text-white mt-2">
                        Track Your Dispatched Packages
                      </h2>
                      <p className="text-xs text-white/40 mt-0.5">
                        Review steps for consignments packed at our Jaipur and Bangalore distribution points
                      </p>
                    </div>

                    <OrderTracker
                      orders={orders}
                      onUpdateOrder={handleUserUpdateOrder}
                      onDeleteOrder={handleUserDeleteOrder}
                    />
                  </motion.div>
                )}

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>

      {/* 3. Aesthetic Footer credit */}
      <footer className="h-16 border-t border-white/5 bg-black/40 px-4 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 tracking-[0.15em] uppercase gap-2 py-4 sm:py-0" id="footer">
        <div className="flex gap-4 sm:gap-8 items-center">
          <span className="font-serif italic font-bold text-sm text-white">Aura<span className="text-indigo-400">.</span></span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Artisanal systems live
          </span>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center">
          <span className="text-indigo-400 hidden md:inline">Logistic corridors active: Jaipur → Bangalore</span>
          <span className="text-white/60">Tax inclusive • India active</span>
        </div>
      </footer>

      {/* --- FLOATING OVERLAY CAROUSELS & MODALS --- */}

      {/* Drawer: Shopping Bag Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            currentUser={currentUser}
            onOpenAuth={() => {
              setIsCartOpen(false);
              setIsAuthOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Modal: Client QuickView */}
      <AnimatePresence>
        {quickViewProduct && (
          <ProductModal
            product={quickViewProduct}
            currentUser={currentUser}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={handleAddToCart}
            isInCart={!!cartItems.find((ci) => ci.productId === quickViewProduct.id)}
            onAddReview={handleAddReview}
          />
        )}
      </AnimatePresence>

      {/* Modal: Auth/Login */}
      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLogin={handleLogin}
            onRegister={handleRegister}
            initialEmail={authInitialEmail}
            initialPassword={authInitialPassword}
          />
        )}
      </AnimatePresence>

      {/* 4. Ambient floating notifications (toasts) stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none" id="toast-stack">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`p-3.5 px-4 rounded-xl shadow-2xl border text-xs font-sans flex items-center justify-between gap-3 pointer-events-auto min-w-[240px] ${
                toast.type === "error"
                  ? "bg-red-950/80 text-red-200 border-red-500/20 backdrop-blur-md"
                  : toast.type === "info"
                  ? "bg-[#141414]/90 text-white/80 border-white/10 backdrop-blur-md"
                  : "bg-indigo-950/90 border-indigo-500/20 text-indigo-200 backdrop-blur-md"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-400 rotate-12 flex-shrink-0" />
                <span className="font-semibold">{toast.message}</span>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-stone-400 hover:text-stone-100 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
