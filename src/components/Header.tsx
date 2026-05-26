/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ShoppingBag, User as UserIcon, Search, ShieldCheck, LogOut, ChevronDown, Fingerprint, KeyRound, Globe } from "lucide-react";
import { User } from "../types";
import { useLanguage, LANGUAGES } from "../lib/translations";

interface HeaderProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  onLogout: () => void;
  onSelectRole?: (role: "admin" | "user") => void;
}

const CATEGORIES = ["All", "Home & Living", "Wellness", "Tea & Spice", "Decor", "Electronics", "Books", "Beauty & Cosmetics", "Handicrafts"];

export default function Header({
  currentUser,
  onOpenAuth,
  onOpenCart,
  cartCount,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isAdminMode,
  setIsAdminMode,
  onLogout,
  onSelectRole,
}: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();

  const getTranslatedCategory = (cat: string) => {
    switch (cat) {
      case "All": return t("all");
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

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setIsAdminMode(false);
              }}
              id="brand-logo"
              className="font-serif italic text-2xl tracking-tighter text-white focus:outline-none cursor-pointer"
            >
              Aura<span className="text-indigo-400">.</span>
            </button>
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-mono self-end mb-1 font-semibold">
              {t("brandLoc")}
            </span>
          </div>

          {/* Search bar - hidden in Admin Mode */}
          {!isAdminMode && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-white/40" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchAesthetics")}
                  id="search-input"
                  className="block w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:border-indigo-500/50 focus:bg-black/40 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Right Area Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Language Selection Switcher */}
            <div className="relative" id="lang-selector-container">
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowProfileMenu(false);
                  setShowRoleMenu(false);
                }}
                id="lang-menu-trigger"
                className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 text-white/70 hover:text-white hover:bg-white/5 rounded-full border border-white/10 transition-colors focus:outline-none cursor-pointer"
                title="Change Language / భాషను ఎంచుకోండి / भाषा चुनें"
              >
                <Globe className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wide">
                  {LANGUAGES.find(l => l.code === language)?.nativeLabel || "EN"}
                </span>
                <ChevronDown className="h-3 w-3 text-white/30" />
              </button>

              {showLangMenu && (
                <div
                  id="lang-menu-dropdown"
                  className="absolute right-0 mt-3 w-36 rounded-xl bg-[#141414] shadow-2xl border border-white/10 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="space-y-0.5">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        id={`lang-opt-${lang.code}`}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-sans flex items-center justify-between hover:bg-white/5 transition duration-150 cursor-pointer ${
                          language === lang.code ? "text-indigo-400 font-semibold bg-indigo-500/10" : "text-white/70"
                        }`}
                      >
                        <span>{lang.nativeLabel}</span>
                        {language === lang.code && <span className="h-1 w-1 rounded-full bg-indigo-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Switch */}
            {currentUser?.role === "admin" && (
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                id="admin-toggle-btn"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border transition-all duration-200 ${
                  isAdminMode
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-white/5 border-white/10 text-white/80 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAdminMode ? t("storefront") : t("adminPanel")}
              </button>
            )}

            {/* Shopping Cart button - hidden in Admin mode */}
            {!isAdminMode && (
              <button
                onClick={onOpenCart}
                id="cart-trigger"
                className="relative p-2 text-white/80 hover:text-white transition-colors focus:outline-none"
              >
                <ShoppingBag className="h-5 w-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span
                    id="cart-count-badge"
                    className="absolute -top-1 -right-1 block h-[18px] w-[18px] text-[10px] font-mono font-bold rounded-full bg-indigo-600 text-white flex items-center justify-center border border-indigo-400/30 shadow-lg"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Role Gateway Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowRoleMenu(!showRoleMenu);
                  setShowLangMenu(false);
                  setShowProfileMenu(false);
                }}
                id="role-gateway-trigger"
                className="p-2 text-white/75 hover:text-white hover:bg-white/5 rounded-full transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                title={t("rolePortals")}
              >
                <Fingerprint className="h-5 w-5 stroke-[1.8] text-indigo-400" />
              </button>

              {showRoleMenu && (
                <div
                  id="role-gateway-dropdown"
                  className="absolute right-0 mt-3 w-64 rounded-xl bg-[#141414] shadow-2xl border border-white/10 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="pb-2.5 mb-2.5 border-b border-white/5">
                    <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mb-0.5">{t("rolePortals")}</p>
                    <p className="text-xs text-white/60 font-sans">{t("roleSelectorDesc")}</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    {/* Admin Access option */}
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        onSelectRole?.("admin");
                      }}
                      id="role-option-admin"
                      className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 transition duration-200 cursor-pointer flex items-start gap-2.5 group"
                    >
                      <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition flex-shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{t("adminWorkspace")}</p>
                        <p className="text-[10px] text-white/40 font-sans mt-0.5">{t("jaipurBangalore")}</p>
                      </div>
                    </button>

                    {/* User Access option */}
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        onSelectRole?.("user");
                      }}
                      id="role-option-user"
                      className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 transition duration-200 cursor-pointer flex items-start gap-2.5 group"
                    >
                      <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition flex-shrink-0">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{t("customerHub")}</p>
                        <p className="text-[10px] text-white/40 font-sans mt-0.5">Artisanal storefront & tracking logs</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Profile Menu */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowLangMenu(false);
                      setShowRoleMenu(false);
                    }}
                    id="profile-menu-trigger"
                    className="flex items-center space-x-2 text-sm font-medium text-white/80 hover:text-white focus:outline-none cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-xs font-mono text-indigo-300 font-bold">
                      {currentUser.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-white/70 text-xs font-sans tracking-wide">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="h-3 w-3 text-white/40" />
                  </button>

                  {showProfileMenu && (
                    <div
                      id="profile-dropdown"
                      className="absolute right-0 mt-3 w-56 rounded-lg bg-[#141414] shadow-2xl border border-white/10 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-4 py-2.5 border-b border-white/5">
                        <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mb-0.5">Logged in as</p>
                        <p className="text-xs font-semibold text-white truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-indigo-950/40 text-indigo-300 border border-indigo-500/20">
                          Role: {currentUser.role}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                        id="logout-btn"
                        className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors duration-150 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        {t("signOut")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  id="auth-trigger"
                  className="flex items-center gap-2 text-white/80 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-full py-1.5 px-4 text-xs tracking-wider uppercase font-mono transition-all duration-200"
                >
                  <UserIcon className="h-3.5 w-3.5" />
                  {t("login")}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Categories Bar & Search on mobile */}
      {!isAdminMode && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none border-t border-white/5">
            <div className="flex space-x-2 md:space-x-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  id={`cat-btn-${cat.toLowerCase().replace(/\s/g, "-")}`}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white font-medium border border-indigo-500"
                      : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/5 hover:text-white"
                  }`}
                >
                  {getTranslatedCategory(cat)}
                </button>
              ))}
            </div>

            {/* Mobile Search input trigger */}
            <div className="md:hidden relative w-32 sm:w-48 ml-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholderMobile")}
                id="search-input-mobile"
                className="w-full rounded-full border border-white/10 bg-white/5 py-1 pl-7 pr-3 text-xs text-white placeholder-white/30 focus:border-indigo-500/50 focus:bg-[#141414]"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
