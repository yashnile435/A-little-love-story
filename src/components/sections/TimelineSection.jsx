import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import { FloralDivider } from "../common/FloralDecorations";

export const TimelineSection = () => {
  const { currentProfile } = useProfile();

  if (!currentProfile) return null;

  const { timelineEvents } = currentProfile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Notice Banner */}
      <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-[#fff0f3] border border-[#ffdbe2] text-xs text-[#93223f]">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#e85d7b]" />
          Timeline Architecture Ready
        </span>
        <span className="font-light italic">Interactive Milestones in Stage 4</span>
      </div>

      <div className="text-center">
        <h2 className="font-serif-romantic text-3xl font-semibold text-[#3b0d19] mb-2">
          Our Gentle Milestones
        </h2>
        <p className="text-sm text-[#731b31]/80 font-light">
          Moments where destiny smiled and turned two solitary lives into one harmonious song.
        </p>
        <FloralDivider />
      </div>

      {/* Timeline Milestones List */}
      <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-[#ffdbe2] my-8 ml-3 sm:ml-6">
        {timelineEvents.map((event, idx) => (
          <div key={event.id || idx} className="relative group">
            
            {/* Timeline node icon */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-tr from-[#ffe4e6] to-[#fff1f2] border-2 border-[#e85d7b] flex items-center justify-center text-[#e85d7b] shadow-sm group-hover:scale-110 transition-transform">
              <Heart className="w-3.5 h-3.5 fill-[#e85d7b]/40" />
            </div>

            {/* Timeline event card */}
            <div className="romantic-glass-card rounded-2xl p-5 border border-[#ffdbe2] shadow-sm hover:romantic-glow-subtle transition-all">
              <span className="inline-block px-3 py-1 rounded-full bg-[#fff0f3] text-[#be123c] text-[11px] font-semibold tracking-wide uppercase mb-2">
                {event.date}
              </span>
              <h3 className="font-serif-romantic text-lg font-semibold text-[#3b0d19] mb-1">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#731b31]/80 font-light leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
