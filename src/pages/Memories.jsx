import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Images, 
  ArrowRight, 
  ArrowLeft, 
  Camera, 
  CalendarHeart 
} from "lucide-react";
import { useProfile } from "../context/useProfile.js";
import { MemoryCard } from "../components/MemoryCard.jsx";
import { MemoryLightbox } from "../components/MemoryLightbox.jsx";
import { FloralDivider } from "../components/common/FloralDecorations.jsx";

/**
 * Memories Page - Personalized Memory Album & Digital Scrapbook
 * 
 * Features:
 * - Polaroid-inspired photo cards with individual scrapbook tilts.
 * - Interactive full-screen Lightbox with keyboard navigation.
 * - Memory count badge and romantic typography.
 * - Empty state handling when no photos are present.
 * - Navigation links to return or proceed to the Timeline section.
 * - Route protection when no profile is active.
 */
export const Memories = () => {
  const { currentProfile, setActiveTab, returnToNameEntry } = useProfile();
  const shouldReduceMotion = useReducedMotion();

  // Lightbox modal state: null if closed, number index if open
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Route protection: If no profile selected, redirect to name entry
  useEffect(() => {
    if (!currentProfile) {
      returnToNameEntry();
    }
  }, [currentProfile, returnToNameEntry]);

  if (!currentProfile) return null;

  const displayName = currentProfile.displayName || currentProfile.name || "Beloved";
  const photos = Array.isArray(currentProfile.photos) ? currentProfile.photos : [];
  const hasPhotos = photos.length > 0;

  const handleOpenPhoto = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNavigateLightbox = (newIndex) => {
    setSelectedPhotoIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-10 px-2 sm:px-4">
      
      {/* Top Header Section */}
      <div className="text-center space-y-3">
        
        {/* Navigation Breadcrumb / Return */}
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("feelings")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#731b31] border border-[#fecdd3] shadow-xs transition-all cursor-pointer"
            title="Return to Love Letter"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#e85d7b]" />
            <span>My Feelings</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fff0f3] border border-[#fcaebc] text-[#be123c] font-medium shadow-xs">
            <Images className="w-3.5 h-3.5 text-[#e85d7b]" />
            <span>{photos.length} Cherished {photos.length === 1 ? "Moment" : "Moments"}</span>
          </div>
        </div>

        {/* Personalized Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-medium text-[#3b0d19] leading-tight"
        >
          Little Moments, Beautiful Memories, {displayName} ♡
        </motion.h1>

        <FloralDivider />

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base text-[#731b31]/80 font-light max-w-xl mx-auto leading-relaxed"
        >
          Every picture holds a little piece of a beautiful story. Soft glances, 
          winding detours, and quiet smiles that make ordinary days feel timeless.
        </motion.p>
      </div>

      {/* Gallery Section or Empty State */}
      {hasPhotos ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 pt-4">
          {photos.map((photo, index) => (
            <MemoryCard
              key={photo.id || index}
              photo={photo}
              index={index}
              onClick={() => handleOpenPhoto(index)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="romantic-glass-card rounded-3xl p-8 sm:p-14 text-center max-w-md mx-auto space-y-4 border border-[#fecdd3]"
        >
          <div className="w-16 h-16 rounded-full bg-[#ffe4e6] text-[#e85d7b] flex items-center justify-center mx-auto shadow-inner">
            <Camera className="w-8 h-8" />
          </div>

          <h3 className="font-serif-romantic text-2xl font-semibold text-[#3b0d19]">
            Every beautiful story starts somewhere...
          </h3>

          <p className="text-xs sm:text-sm text-[#731b31]/75 font-light leading-relaxed">
            More memories will find their place here soon. ♡
          </p>
        </motion.div>
      )}

      {/* Lightbox Modal (conditionally rendered when photo is selected) */}
      {selectedPhotoIndex !== null && (
        <MemoryLightbox
          photos={photos}
          activeIndex={selectedPhotoIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />
      )}

      {/* Bottom Navigation Section: Proceed to Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: 0.5 }}
        className="romantic-glass-card rounded-3xl p-6 sm:p-8 text-center space-y-3 border border-[#fecdd3] mt-12"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#be123c]">
          <CalendarHeart className="w-3.5 h-3.5" />
          <span>The Journey Continues</span>
        </div>

        <h3 className="font-serif-romantic text-2xl sm:text-3xl font-medium text-[#3b0d19]">
          There's More to Our Story...
        </h3>

        <p className="text-xs sm:text-sm text-[#731b31]/80 max-w-md mx-auto font-light leading-relaxed">
          From the serendipitous beginning to the unforgettable days in between, 
          every milestone has brought us closer together.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e85d7b] via-[#e11d48] to-[#be123c] text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:shadow-[#e85d7b]/30 hover:scale-103 active:scale-97 transition-all duration-300 cursor-pointer"
          >
            <span>Explore Our Timeline ♡</span>
            <ArrowRight className="w-4 h-4 text-white/90" />
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default Memories;
