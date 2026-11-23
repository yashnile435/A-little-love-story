import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Camera } from "lucide-react";

/**
 * MemoryLightbox Component
 * 
 * Full-screen romantic photo viewer for the Memory Album.
 * 
 * Props:
 * - photos: Array of memory photo objects
 * - activeIndex: Number (currently viewed photo index)
 * - onClose: () => void
 * - onNavigate: (newIndex: number) => void
 */
export const MemoryLightbox = ({
  photos = [],
  activeIndex = 0,
  onClose,
  onNavigate
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [imageErrorMap, setImageErrorMap] = useState({});
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const total = photos.length;
  const currentPhoto = photos[activeIndex] || null;

  // Lock body scrolling while lightbox is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    const prevIndex = (activeIndex - 1 + total) % total;
    onNavigate?.(prevIndex);
  }, [activeIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    const nextIndex = (activeIndex + 1) % total;
    onNavigate?.(nextIndex);
  }, [activeIndex, total, onNavigate]);

  // Keyboard navigation listener (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  if (!currentPhoto) return null;

  const hasError = imageErrorMap[currentPhoto.id || activeIndex];

  // Animation variants for smooth sliding/fading between images
  const slideVariants = {
    enter: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: { duration: shouldReduceMotion ? 0.15 : 0.25, ease: "easeIn" }
    })
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph viewer: ${currentPhoto.title || "Memory"}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1a060d]/85 backdrop-blur-md select-none"
    >
      {/* Background click to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Top Header Bar: Counter & Close Button */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30">
        {/* Photo index counter */}
        <div className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wide">
          <span>{activeIndex + 1} of {total}</span>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
          title="Close photo viewer (Escape)"
          aria-label="Close photo viewer"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Previous Button (Visible if multiple photos) */}
      {total > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-white/30 active:scale-95 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl"
          title="Previous photograph (Left Arrow)"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Next Button (Visible if multiple photos) */}
      {total > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-white/30 active:scale-95 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl"
          title="Next photograph (Right Arrow)"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Main Lightbox Card Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto.id || activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col items-center"
          >
            {/* Image Frame Container */}
            <div className="relative w-full max-h-[60vh] sm:max-h-[66vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#2d0f19]/70 shadow-2xl border border-white/20 flex items-center justify-center">
              {!hasError ? (
                <img
                  src={currentPhoto.image}
                  alt={currentPhoto.title || "Memory photograph"}
                  onError={() => {
                    setImageErrorMap((prev) => ({
                      ...prev,
                      [currentPhoto.id || activeIndex]: true
                    }));
                  }}
                  className="max-h-[60vh] sm:max-h-[66vh] w-auto max-w-full object-contain mx-auto"
                />
              ) : (
                /* Fallback view inside lightbox */
                <div className="w-full h-64 sm:h-80 flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <Camera className="w-8 h-8 text-[#ffdbe2]" />
                  </div>
                  <h4 className="font-serif-romantic text-xl font-medium text-white mb-1">
                    {currentPhoto.title || "Cherished Memory"}
                  </h4>
                  <p className="text-xs text-white/70 max-w-xs font-light">
                    A precious moment etched in our memory album.
                  </p>
                </div>
              )}
            </div>

            {/* Photo Metadata Bar below the image */}
            <div className="w-full max-w-2xl mt-3 sm:mt-4 px-4 py-3 sm:py-4 rounded-2xl bg-[#fffdfa]/95 backdrop-blur-md border border-[#fecdd3] shadow-lg text-[#3b0d19] text-center space-y-1.5">
              
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#93223f]/80">
                {currentPhoto.date && (
                  <span className="inline-flex items-center gap-1 font-medium bg-[#fff0f3] px-2.5 py-0.5 rounded-full border border-[#fecdd3]">
                    <Calendar className="w-3 h-3 text-[#e85d7b]" />
                    <span>{currentPhoto.date}</span>
                  </span>
                )}

                {currentPhoto.location && (
                  <span className="inline-flex items-center gap-1 font-light italic bg-[#fff0f3] px-2.5 py-0.5 rounded-full border border-[#fecdd3]">
                    <MapPin className="w-3 h-3 text-[#e85d7b]" />
                    <span>{currentPhoto.location}</span>
                  </span>
                )}
              </div>

              <h3 className="font-serif-romantic text-xl sm:text-2xl font-semibold text-[#3b0d19]">
                {currentPhoto.title || "A Precious Moment"}
              </h3>

              {currentPhoto.caption && (
                <p className="text-xs sm:text-sm text-[#731b31]/80 font-light leading-relaxed max-w-xl mx-auto">
                  {currentPhoto.caption}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryLightbox;
