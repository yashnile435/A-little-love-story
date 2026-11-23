import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Camera, Sparkles } from "lucide-react";

/**
 * MemoryCard Component
 * 
 * Polaroid-inspired photo card for the scrapbook gallery.
 * - Subtle distinct rotation per card.
 * - Washi tape accent on top.
 * - Lazy loading image with graceful fallback on error.
 * - Date, title, caption, and optional location.
 */
export const MemoryCard = ({ photo, index = 0, onClick }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Subtle scrapbook tilt angles (do not rotate all cards by the same angle)
  const tilts = [-2.2, 1.8, -1.4, 2.4, -1.8, 1.2];
  const cardTilt = tilts[index % tilts.length];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.5,
        delay: shouldReduceMotion ? 0 : (index * 0.1) % 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={
        shouldReduceMotion
          ? { scale: 1.01 }
          : { y: -8, rotate: 0, scale: 1.02 }
      }
      style={{ rotate: shouldReduceMotion ? 0 : `${cardTilt}deg` }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View photograph: ${photo.title || "Memory"} from ${photo.date || "our story"}`}
      className="group relative bg-[#fffdfa] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 pb-5 sm:pb-6 border border-[#fecdd3]/80 shadow-md hover:shadow-2xl hover:romantic-glow-subtle transition-shadow duration-300 cursor-pointer flex flex-col justify-between select-none"
    >
      {/* Scrapbook Washi Tape Accent */}
      <div 
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-[#fcaebc]/45 backdrop-blur-xs border border-white/60 rounded-xs -rotate-1 shadow-xs pointer-events-none z-10"
      />

      {/* Photo Frame Container */}
      <div className="relative aspect-4/3 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-tr from-[#ffeef1] via-[#fff5f6] to-[#ffdbe2] border border-[#fecdd3]/70">
        {!hasImageError ? (
          <img
            src={photo.image}
            alt={photo.title || "Memory photograph"}
            loading="lazy"
            onError={() => setHasImageError(true)}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
          />
        ) : (
          /* Graceful Fallback if image path is unavailable */
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-tr from-[#fff0f3] to-[#ffe4e6]">
            <div className="w-12 h-12 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#e85d7b] mb-2">
              <Camera className="w-6 h-6" />
            </div>
            <span className="font-serif-romantic text-sm font-medium text-[#3b0d19]">
              {photo.title || "Cherished Moment"}
            </span>
            <span className="text-[11px] text-[#93223f]/70 font-light mt-0.5">
              A private keepsake in our story
            </span>
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-[#3b0d19]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-[#be123c] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[#e85d7b]" />
            <span>View Memory</span>
          </span>
        </div>
      </div>

      {/* Polaroid Caption & Details Area */}
      <div className="pt-3.5 sm:pt-4 px-1 space-y-2">
        {/* Date and Optional Location Badges */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-[#93223f]/80">
          {photo.date && (
            <span className="inline-flex items-center gap-1 font-medium bg-[#fff0f3] px-2.5 py-0.5 rounded-full border border-[#fecdd3]">
              <Calendar className="w-3 h-3 text-[#e85d7b]" />
              <span>{photo.date}</span>
            </span>
          )}

          {photo.location && (
            <span className="inline-flex items-center gap-1 font-light italic truncate max-w-[140px] text-[#731b31]/75">
              <MapPin className="w-3 h-3 text-[#e85d7b] shrink-0" />
              <span className="truncate">{photo.location}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif-romantic text-lg sm:text-xl font-semibold text-[#3b0d19] leading-snug group-hover:text-[#be123c] transition-colors">
          {photo.title || "Untitled Memory"}
        </h3>

        {/* Caption */}
        {photo.caption && (
          <p className="text-xs sm:text-sm text-[#731b31]/80 font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
            {photo.caption}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default MemoryCard;
