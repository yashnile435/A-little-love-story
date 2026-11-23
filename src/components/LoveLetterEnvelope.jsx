import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, MailOpen } from "lucide-react";

/**
 * LoveLetterEnvelope Component
 * 
 * Elegant interactive envelope with heart wax seal and smooth opening animation.
 * 
 * Props:
 * - isOpen: boolean
 * - onOpen: () => void
 * - recipientName: string
 * - senderName: string
 */
export const LoveLetterEnvelope = ({
  isOpen = false,
  onOpen,
  recipientName = "My Love",
  senderName = "Someone Special"
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto py-6 sm:py-8 flex flex-col items-center select-none">
      
      {/* Perspective wrapper for 3D flap opening */}
      <div 
        className="relative w-72 sm:w-88 h-48 sm:h-56 cursor-pointer group"
        style={{ perspective: 1000 }}
        onClick={!isOpen ? onOpen : undefined}
        onKeyDown={(e) => {
          if (!isOpen && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onOpen?.();
          }
        }}
        role="button"
        tabIndex={isOpen ? -1 : 0}
        aria-label={isOpen ? "Letter opened" : `Open love letter from ${senderName}`}
      >
        {/* Ambient glow behind envelope */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ffdbe2]/60 to-[#fcaebc]/30 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500 pointer-events-none" />

        {/* Envelope Base Container */}
        <div className="relative w-full h-full bg-[#fdfaf5] rounded-2xl shadow-xl border border-[#fecdd3] overflow-visible">
          
          {/* Back Paper Liner (Soft Blush Tint inside envelope) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#ffdbe2]/50 to-[#fff5f6] rounded-2xl" />

          {/* Letter Paper Emerging from Inside Envelope */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { y: shouldReduceMotion ? -20 : -90, opacity: 1, scale: 1.02 }
                : { y: 0, opacity: 0.8, scale: 0.95 }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-2 h-44 sm:h-48 bg-[#fffdfa] rounded-xl shadow-md border border-[#fcaebc]/60 p-4 flex flex-col justify-between z-10"
          >
            <div className="flex items-center justify-between text-[11px] text-[#93223f]/70 font-medium border-b border-[#fecdd3]/60 pb-1.5">
              <span className="flex items-center gap-1 font-serif-romantic italic">
                <Sparkles className="w-3 h-3 text-[#e85d7b]" />
                Private Keepsake
              </span>
              <span className="font-serif-romantic">For {recipientName}</span>
            </div>

            <div className="space-y-1.5 py-2">
              <div className="h-1.5 bg-[#ffdbe2]/80 rounded-full w-3/4" />
              <div className="h-1.5 bg-[#ffdbe2]/60 rounded-full w-full" />
              <div className="h-1.5 bg-[#ffdbe2]/60 rounded-full w-5/6" />
            </div>

            <div className="text-right text-[10px] text-[#be123c] font-script-romantic text-sm">
              With all my fondness ♡
            </div>
          </motion.div>

          {/* Front Envelope Pocket Flaps (Left, Right, Bottom Triangles) */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
            {/* Left flap */}
            <div 
              className="absolute inset-0 bg-[#fff1f2] border-r border-[#fecdd3]/80 shadow-sm"
              style={{ clipPath: "polygon(0 0, 0 100%, 50% 50%)" }}
            />
            {/* Right flap */}
            <div 
              className="absolute inset-0 bg-[#fff1f2] border-l border-[#fecdd3]/80 shadow-sm"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
            />
            {/* Bottom flap */}
            <div 
              className="absolute inset-0 bg-[#fdf5f7] border-t border-[#fcaebc]/70 shadow-md"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 45%)" }}
            />
          </div>

          {/* Envelope Front Calligraphy Address */}
          {!isOpen && (
            <div className="absolute inset-x-0 bottom-6 z-25 text-center pointer-events-none px-4">
              <p className="font-script-romantic text-2xl sm:text-3xl text-[#93223f] tracking-wide">
                To My Dearest {recipientName}
              </p>
              <p className="text-[11px] text-[#be123c]/70 font-light tracking-widest uppercase mt-0.5">
                Sent with gentle care by {senderName}
              </p>
            </div>
          )}

          {/* Top Flap (Folds open upward) */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { rotateX: 180, zIndex: 5 }
                : { rotateX: 0, zIndex: 30 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.6,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "top center" }}
            className="absolute inset-x-0 top-0 h-28 sm:h-32 rounded-t-2xl overflow-visible pointer-events-none"
          >
            {/* Flap triangle */}
            <div 
              className="w-full h-full bg-[#faeff2] border-b border-[#fcaebc] shadow-md"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </motion.div>

          {/* Heart-Shaped Wax Seal Button (Centered on the closed flap) */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { scale: 0, opacity: 0, y: -20 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.35 }}
            className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto"
          >
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen?.();
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#9f1239] via-[#be123c] to-[#e11d48] flex items-center justify-center text-white shadow-lg border-2 border-[#ffe4e6] hover:shadow-[#e11d48]/40 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              title="Click to break wax seal & open letter"
              aria-label="Break wax seal and open love letter"
            >
              {/* Outer seal decorative rim */}
              <span className="absolute inset-1 rounded-full border border-white/30 border-dashed" />
              
              {/* Embossed Heart */}
              <Heart className="w-6 h-6 text-white fill-white/90 drop-shadow group-hover:scale-110 transition-transform duration-300" />

              {/* Pulsing glow ring */}
              <span className="absolute -inset-1 rounded-full bg-[#f43f5e]/30 animate-ping pointer-events-none" />
            </motion.button>
          </motion.div>

          {/* Floating Hearts Particles Burst when Opened */}
          {isOpen && !shouldReduceMotion && (
            <div className="absolute -top-12 inset-x-0 flex justify-center pointer-events-none z-50" aria-hidden="true">
              {[
                { x: -50, y: -40, delay: 0, char: "♡" },
                { x: -20, y: -65, delay: 0.1, char: "✨" },
                { x: 20, y: -60, delay: 0.15, char: "♥" },
                { x: 50, y: -35, delay: 0.05, char: "♡" }
              ].map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], y: p.y, x: p.x, scale: 1.2 }}
                  transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
                  className="absolute text-lg sm:text-xl text-[#e85d7b]"
                >
                  {p.char}
                </motion.span>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Interactive Helper Prompt */}
      {!isOpen && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-xs sm:text-sm text-[#93223f]/80 font-serif-romantic italic text-center"
        >
          Click the heart wax seal or the button below to break the seal ♡
        </motion.p>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-3 flex items-center gap-1.5 text-xs text-[#be123c] font-medium"
        >
          <MailOpen className="w-3.5 h-3.5" />
          <span>Letter unsealed</span>
        </motion.div>
      )}
    </div>
  );
};

export default LoveLetterEnvelope;
