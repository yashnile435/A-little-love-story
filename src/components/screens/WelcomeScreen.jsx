import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import { FloralCorner, FloralDivider } from "../common/FloralDecorations";

export const WelcomeScreen = () => {
  const { beginStory } = useProfile();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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

      {/* Ambient background glow orbs */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#ffdbe2]/40 blur-3xl -top-16 -left-16 pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#fbbecb]/30 blur-3xl -bottom-16 -right-16 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Subtle romantic badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full romantic-glass border border-[#ffdbe2] text-[#93223f] text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e85d7b]" />
          <span>An Intimate Keepsake</span>
          <span className="text-[#f48fa3]">•</span>
          <span>Chapter 1</span>
        </motion.div>

        {/* Romantic Decorative Script Tag */}
        <motion.p
          variants={itemVariants}
          className="font-script-romantic text-3xl sm:text-4xl text-[#d42d54] mb-2 tracking-wide"
        >
          A quiet universe for two
        </motion.p>

        {/* Website Title */}
        <motion.h1
          variants={itemVariants}
          className="font-serif-romantic text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#3b0d19] leading-[1.15] mb-4"
        >
          A Little Love Story
        </motion.h1>

        {/* Floral Ribbon Divider */}
        <motion.div variants={itemVariants} className="w-full">
          <FloralDivider />
        </motion.div>

        {/* Personalized Introductory Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-serif-romantic text-xl sm:text-2xl md:text-3xl text-[#541424] font-normal italic max-w-lg mb-4 leading-relaxed"
        >
          “Where Every Whisper and Memory Finds Its Forever Home”
        </motion.h2>

        {/* Short Romantic Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-[#731b31]/80 max-w-xl mx-auto mb-10 leading-relaxed font-light px-2"
        >
          Step into a tender sanctuary crafted just for you. Here, the clocks slow down,
          cherished glances never fade, and our story gently unfolds one heartbeat at a time.
        </motion.p>

        {/* Prominent "Begin Your Story" Button */}
        <motion.div variants={itemVariants} className="w-full sm:w-auto">
          <motion.button
            onClick={beginStory}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#e85d7b] via-[#e11d48] to-[#be123c] text-white font-medium text-base sm:text-lg shadow-lg hover:shadow-xl hover:shadow-[#e85d7b]/30 transition-all duration-300 w-full sm:w-auto overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

            <Heart className="w-5 h-5 text-white/90 fill-white/30 group-hover:fill-white transition-colors duration-300 animate-pulse" />
            <span className="tracking-wide">Begin Your Story</span>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Subtle footer whisper */}
        <motion.p
          variants={itemVariants}
          className="mt-12 text-xs sm:text-sm text-[#93223f]/60 font-serif-romantic italic"
        >
          Crafted with endless tenderness & infinite care ♡
        </motion.p>
      </div>
    </motion.div>
  );
};
