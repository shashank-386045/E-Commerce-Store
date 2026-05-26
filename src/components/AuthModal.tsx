/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, ShieldAlert, Sparkles, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, pass: string) => Promise<void>;
  onRegister: (name: string, email: string, pass: string) => Promise<void>;
  initialEmail?: string;
  initialPassword?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  initialEmail = "",
  initialPassword = "",
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      setEmail(initialEmail);
      setPassword(initialPassword);
      setActiveTab("login");
      setErrorMessage("");
    }
  }, [isOpen, initialEmail, initialPassword]);

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    setErrorMessage("");
    if (tab === "register") {
      setName("");
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (activeTab === "register" && !name)) {
      setErrorMessage("Please fill out all mandatory inputs.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (activeTab === "login") {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password);
      }
      onClose();
      // Reset inputs
      setName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setErrorMessage(err.response?.data?.error || err.message || "Credential verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurry Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Dialog Frame */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-md bg-[#141414] border border-white/5 rounded-2xl overflow-hidden shadow-2xl z-10"
        id="auth-modal-dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-auth-modal"
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Accent Segment */}
        <div className="bg-[#0D0D0D] px-6 py-8 text-center text-white relative border-b border-white/5">
          <div className="absolute inset-x-0 -bottom-1 h-3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          <h2 className="font-serif text-2xl italic font-bold tracking-[0.25em] text-white">
            AURA
          </h2>
          <p className="font-serif italic text-white/60 text-xs mt-1.5">
            Indian Heritage. Curated Living.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-white/5 bg-black/20">
          <button
            onClick={() => handleTabChange("login")}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest text-center border-b-2 transition cursor-pointer ${
              activeTab === "login"
                ? "border-indigo-500 text-white font-bold bg-[#141414]"
                : "border-transparent text-white/40 hover:text-white/60"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleTabChange("register")}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest text-center border-b-2 transition cursor-pointer ${
              activeTab === "register"
                ? "border-indigo-500 text-white font-bold bg-[#141414]"
                : "border-transparent text-white/40 hover:text-white/60"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Main Auth Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4" id="credentials-form">
            
            {activeTab === "register" && (
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-3.5 w-3.5 text-white/30" />
                  <input
                    type="text"
                    required
                    maxLength={32}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shashank Nuthalapati"
                    className="w-full bg-black/30 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition font-sans"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                E-mail address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-3.5 w-3.5 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. buyer@example.com"
                  className="w-full bg-black/30 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-3.5 w-3.5 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/30 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-xs placeholder-white/20 text-white focus:border-indigo-500/50 focus:bg-black/50 transition font-mono"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-[10px] text-red-400 font-mono" id="auth-error-msg">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              id="submit-auth-btn"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-mono text-[10px] uppercase tracking-wider hover:bg-indigo-700 flex items-center justify-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeTab === "login" ? "Accredit Account" : "Initiate Account"}
                </>
              )}
            </button>
          </form>


        </div>
      </motion.div>
    </div>
  );
}
