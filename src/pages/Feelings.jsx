import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  RotateCcw, 
  FastForward, 
  ArrowRight, 
  Mail, 
  BookHeart
} from "lucide-react";
import { useProfile } from "../context/useProfile.js";
import { LoveLetterEnvelope } from "../components/LoveLetterEnvelope.jsx";
import { FloralDivider } from "../components/common/FloralDecorations.jsx";

/**
 * Feelings Page - Personalized Love Letter Experience
 * 
 * Features:
 * - Animated interactive envelope with wax seal.
 * - Sequential paragraph revelation with Framer Motion.
 * - Skip animation option for instant reading.
 * - Replay animation button.
 * - Fallbacks for missing/partial letter content.
 * - Route protection for unauthenticated access.
 * - Navigation to "Memory Album" at the end of the letter.
 */
export const Feelings = () => {
  const { currentProfile, setActiveTab, returnToNameEntry } = useProfile();
  const shouldReduceMotion = useReducedMotion();

  // State: Envelope open status
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  // State: Whether user chose to skip animations and read full letter immediately
  const [isSkipped, setIsSkipped] = useState(false);
  // State: Key to force replay transitions
  const [replayKey, setReplayKey] = useState(0);

  // Route protection: If no profile selected, redirect to name-entry
  useEffect(() => {
    if (!currentProfile) {
      returnToNameEntry();
    }
  }, [currentProfile, returnToNameEntry]);

  if (!currentProfile) return null;

  const displayName = currentProfile.displayName || currentProfile.name;
  const partnerName = currentProfile.partnerName || "Your Storyteller";

  // Gracefully handle letter content with robust fallbacks
  const letter = currentProfile.loveLetter || {};
  const greeting = letter.greeting || `Dear ${displayName},`;
  const paragraphs = Array.isArray(letter.paragraphs) && letter.paragraphs.length > 0
    ? letter.paragraphs
    : [
        letter.excerpt || letter.preview ||
        "You bring a gentle warmth and quiet peace to this world that makes even ordinary moments feel special and memorable."
      ];
  const closing = letter.closing || "With warm feelings,";
  const signature = letter.signature || `${partnerName} ♡`;

  // Handler to open envelope
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  // Handler to skip animation
  const handleSkipAnimation = () => {
    setIsSkipped(true);
  };

  // Handler to replay envelope & letter reveal
  const handleReplay = () => {
    setIsEnvelopeOpen(false);
    setIsSkipped(false);
    setReplayKey((prev) => prev + 1);
  };

  // Handler to continue to next section (Memory Album)
  const handleContinueToMemories = () => {
    setActiveTab("album");
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto space-y-8 px-2 sm:px-4">
      
      {/* Header Introduction Section */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#fcaebc] text-xs sm:text-sm font-medium text-[#93223f] shadow-sm mb-2"
        >
          <BookHeart className="w-3.5 h-3.5 text-[#e85d7b]" />
          <span>An Intimate Message for {displayName}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-medium text-[#3b0d19] leading-tight"
        >
          There's Something I Want to Tell You...
        </motion.h1>

        <FloralDivider />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#731b31]/80 font-light max-w-lg mx-auto leading-relaxed"
        >
          Every whispered thought and gentle feeling has been carefully penned into this letter, 
          dedicated solely to you by {partnerName}.
        </motion.p>
      </div>

      {/* Main Interactive Stage */}
      <div key={replayKey} className="space-y-8">
        
        {/* Envelope Component */}
        <LoveLetterEnvelope
          isOpen={isEnvelopeOpen}
          onOpen={handleOpenEnvelope}
          recipientName={displayName}
          senderName={partnerName}
        />

        {/* Action Button: "Open My Letter" (Visible when envelope is closed) */}
        {!isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <button
              type="button"
              onClick={handleOpenEnvelope}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e85d7b] via-[#e11d48] to-[#be123c] text-white font-medium text-base shadow-md hover:shadow-lg hover:shadow-[#e85d7b]/30 hover:scale-103 active:scale-97 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-white/90" />
              <span>Open My Letter ♡</span>
            </button>
          </motion.div>
        )}

        {/* Revealed Love Letter Paper Experience (Visible when envelope is open) */}
        <AnimatePresence>
          {isEnvelopeOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Reading Controls Toolbar: Replay & Skip */}
              <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white/70 border border-[#fecdd3] romantic-glass text-xs text-[#731b31]">
                <div className="flex items-center gap-1.5 text-[#93223f] font-serif-romantic italic">
                  <Sparkles className="w-3.5 h-3.5 text-[#e85d7b]" />
                  <span>Reading: Letter to {displayName}</span>
                </div>

                <div className="flex items-center gap-2">
                  {!isSkipped && !shouldReduceMotion && (
                    <button
                      type="button"
                      onClick={handleSkipAnimation}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#fff0f3] border border-[#fcaebc] font-medium text-[11px] text-[#be123c] shadow-xs transition-all cursor-pointer"
                      title="Reveal complete letter immediately"
                      aria-label="Skip animation and display full letter"
                    >
                      <FastForward className="w-3 h-3" />
                      <span>Skip Animation</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleReplay}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#fff0f3] border border-[#ffdbe2] font-medium text-[11px] text-[#731b31] shadow-xs transition-all cursor-pointer"
                    title="Fold envelope back and replay"
                    aria-label="Replay letter opening animation"
                  >
                    <RotateCcw className="w-3 h-3 text-[#e85d7b]" />
                    <span>Replay</span>
                  </button>
                </div>
              </div>

              {/* Romantic Parchment Letter Card */}
              <div className="relative bg-[#fffdfa] rounded-3xl p-6 sm:p-12 shadow-xl border border-[#fecdd3] text-[#3b0d19] overflow-hidden">
                
                {/* Vintage Deckle-Edge Gradient Overlay */}
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#ffeef1]/30 pointer-events-none" />

                {/* Delicate Watermark Heart */}
                <div className="absolute right-4 bottom-4 text-[#ffdbe2]/25 pointer-events-none select-none font-serif-romantic text-9xl">
                  ♡
                </div>

                {/* Letter Content Container with Readable Line Length */}
                <div className="relative z-10 max-w-xl mx-auto space-y-6">
                  
                  {/* Salutation / Greeting */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b border-[#fcaebc]/50 pb-4"
                  >
                    <h2 className="font-serif-romantic text-2xl sm:text-3xl font-semibold text-[#be123c] tracking-tight">
                      {greeting}
                    </h2>
                  </motion.div>

                  {/* Sequential Paragraph Reveal */}
                  <div className="space-y-4 text-base sm:text-lg text-[#4a1525] font-light leading-relaxed font-serif-romantic">
                    {paragraphs.map((paragraph, index) => {
                      const delayTime = isSkipped || shouldReduceMotion ? 0 : 0.4 + index * 0.9;

                      return (
                        <motion.p
                          key={index}
                          initial={isSkipped || shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: isSkipped || shouldReduceMotion ? 0.2 : 0.7,
                            delay: delayTime,
                            ease: "easeOut"
                          }}
                          className="leading-relaxed"
                        >
                          {paragraph}
                        </motion.p>
                      );
                    })}
                  </div>

                  {/* Closing & Signature */}
                  <motion.div
                    initial={isSkipped || shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: isSkipped || shouldReduceMotion ? 0.3 : 0.6 + paragraphs.length * 0.9
                    }}
                    className="pt-6 border-t border-[#fcaebc]/40 text-right space-y-1"
                  >
                    <p className="font-serif-romantic italic text-sm sm:text-base text-[#93223f]/80">
                      {closing}
                    </p>
                    <p className="font-script-romantic text-3xl sm:text-4xl text-[#be123c]">
                      {signature}
                    </p>
                  </motion.div>

                </div>
              </div>

              {/* Continue Navigation Section: Discover Our Memories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isSkipped || shouldReduceMotion ? 0.4 : 1.2 + paragraphs.length * 0.9,
                  duration: 0.6
                }}
                className="romantic-glass-card rounded-3xl p-6 sm:p-8 text-center space-y-3 border border-[#fecdd3]"
              >
                <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#be123c]">
                  <Heart className="w-3.5 h-3.5 fill-[#e85d7b]" />
                  <span>The Story Continues</span>
                </div>

                <h3 className="font-serif-romantic text-2xl sm:text-3xl font-medium text-[#3b0d19]">
                  There's More to Our Story...
                </h3>

                <p className="text-xs sm:text-sm text-[#731b31]/80 max-w-md mx-auto font-light leading-relaxed">
                  Every letter is just one thread in a larger tapestry. Step into our memory album to revisit the smiles and places that brought us here.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleContinueToMemories}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e85d7b] via-[#e11d48] to-[#be123c] text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:shadow-[#e85d7b]/30 hover:scale-103 active:scale-97 transition-all duration-300 cursor-pointer"
                  >
                    <span>Discover Our Memories ♡</span>
                    <ArrowRight className="w-4 h-4 text-white/90" />
                  </button>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};

export default Feelings;
