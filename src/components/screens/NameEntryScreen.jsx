import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowLeft, AlertCircle, KeyRound } from "lucide-react";
import { useProfile } from "../../context/useProfile.js";
import { FloralCorner, FloralDivider } from "../common/FloralDecorations.jsx";

export const NameEntryScreen = () => {
  const { returnToWelcome, loginWithName } = useProfile();
  const [nameInput, setNameInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    setIsSubmitting(true);

    // Provide a brief romantic beat for smooth feedback
    setTimeout(() => {
      const result = loginWithName(nameInput);
      setIsSubmitting(false);

      if (!result.success) {
        setErrorMessage(result.message);
        setShakeKey((prev) => prev + 1);
      }
    }, 350);
  };

  // Quick helper to fill test names
  const handleQuickSelect = (name) => {
    setNameInput(name);
    setErrorMessage("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.35 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 romantic-gradient-bg overflow-hidden text-center"
    >
      {/* Decorative Floral Accents */}
      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />

      {/* Return to welcome button */}
      <motion.button
        variants={itemVariants}
        onClick={returnToWelcome}
        whileHover={{ scale: 1.05, x: -3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 left-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full romantic-glass text-xs font-medium text-[#731b31] border border-[#ffdbe2] shadow-sm hover:romantic-glow-subtle transition-all duration-300 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#e85d7b]" />
        <span>Return</span>
      </motion.button>

      {/* Ambient background blur */}
      <div className="absolute w-80 h-80 rounded-full bg-[#ffdbe2]/40 blur-3xl -top-20 pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <motion.div
          key={shakeKey}
          animate={shakeKey > 0 ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="romantic-glass-card rounded-3xl p-6 sm:p-9 shadow-xl romantic-glow-subtle"
        >
          {/* Header Icon */}
          <motion.div
            variants={itemVariants}
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#ffe4e6] to-[#fff1f2] border border-[#fecdd3] flex items-center justify-center shadow-inner"
          >
            <KeyRound className="w-7 h-7 text-[#e11d48]" />
          </motion.div>

          {/* Prompt heading */}
          <motion.h2
            variants={itemVariants}
            className="font-serif-romantic text-3xl sm:text-4xl font-semibold text-[#3b0d19] mb-2 tracking-tight"
          >
            Who are you?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-[#731b31]/80 font-light mb-6 leading-relaxed"
          >
            This little world has something special waiting for you.
          </motion.p>

          <FloralDivider className="my-2" />

          {/* Name Entry Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <motion.div variants={itemVariants} className="text-left">
              <label
                htmlFor="visitor-name"
                className="block text-xs uppercase tracking-wider font-semibold text-[#93223f] mb-1.5 ml-1"
              >
                Your Name
              </label>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#e85d7b]">
                  <Heart className="w-4 h-4 fill-[#fbbecb]/40" />
                </div>
                <input
                  id="visitor-name"
                  type="text"
                  autoComplete="off"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="Enter your beautiful name..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/90 border border-[#fbbecb] text-[#3b0d19] placeholder:text-[#93223f]/40 text-base focus:outline-none focus:ring-2 focus:ring-[#e85d7b]/50 focus:border-[#e85d7b] shadow-inner transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Error Message with Romantic Tone */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#fff0f3] border border-[#fcaebc] text-left text-xs sm:text-sm text-[#731b31]">
                    <AlertCircle className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                    <p className="leading-snug">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Open My Story Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#e85d7b] via-[#e11d48] to-[#be123c] text-white font-medium text-base shadow-md hover:shadow-lg hover:shadow-[#e85d7b]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Finding Your Story...</span>
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white/90" />
                  <span>Open My Story ♡</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Quick Profile Testing Chips */}
          <motion.div variants={itemVariants} className="mt-7 pt-5 border-t border-[#fecdd3]/60">
            <p className="text-xs text-[#93223f]/70 font-medium mb-2.5">
              Testing Sample Profiles:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickSelect("Katherine")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                  nameInput.toLowerCase() === "katherine"
                    ? "bg-[#e85d7b] text-white border-[#e85d7b] shadow-sm"
                    : "bg-white/80 text-[#731b31] border-[#fbbecb] hover:bg-[#fff0f3]"
                }`}
              >
                🌸 Katherine
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("Saras")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                  nameInput.toLowerCase() === "saras"
                    ? "bg-[#be123c] text-white border-[#be123c] shadow-sm"
                    : "bg-white/80 text-[#731b31] border-[#fbbecb] hover:bg-[#fff0f3]"
                }`}
              >
                🌿 Saras
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("Kat")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                  nameInput.toLowerCase() === "kat"
                    ? "bg-[#be123c] text-white border-[#be123c] shadow-sm"
                    : "bg-white/60 text-[#731b31] border-[#fbbecb] hover:bg-[#fff0f3]"
                }`}
                title="Test partial name rule (should NOT match Katherine)"
              >
                Kat (Partial Test)
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("Unknown Guest")}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/50 text-[#731b31]/70 border border-[#fbbecb]/60 hover:bg-[#fff0f3] transition-all cursor-pointer"
              >
                Unknown Name
              </button>
            </div>
            
            {/* Subtle personalization privacy note */}
            <p className="mt-4 text-[11px] text-[#93223f]/50 font-light leading-snug">
              Name matching is used solely to personalize your reading experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
