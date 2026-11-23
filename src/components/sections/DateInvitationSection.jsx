import { motion } from "framer-motion";
import { Wine, Sparkles, MapPin, Calendar } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import { FloralDivider } from "../common/FloralDecorations";

export const DateInvitationSection = () => {
  const { currentProfile } = useProfile();

  if (!currentProfile) return null;

  const { dateInvitationDetails } = currentProfile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-xl mx-auto"
    >
      {/* Notice Banner */}
      <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-[#fff0f3] border border-[#ffdbe2] text-xs text-[#93223f]">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#e85d7b]" />
          Date Invitation Foundation
        </span>
        <span className="font-light italic">Interactive RSVP response in Stage 5</span>
      </div>

      <div className="romantic-glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-[#fecdd3] text-center relative overflow-hidden">
        
        {/* Floating icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ffe4e6] to-[#fff1f2] border border-[#fecdd3] mx-auto mb-4 flex items-center justify-center text-[#e11d48] shadow-inner">
          <Wine className="w-7 h-7" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full bg-[#fdf2f4] border border-[#fcaebc] text-xs font-semibold uppercase tracking-wider text-[#be123c] mb-3">
          Special Invitation
        </span>

        <h2 className="font-serif-romantic text-2xl sm:text-3xl font-semibold text-[#3b0d19] mb-2">
          {dateInvitationDetails.title}
        </h2>

        <FloralDivider />

        <p className="text-xs sm:text-sm text-[#731b31]/80 font-light italic mb-6 leading-relaxed">
          "{dateInvitationDetails.note}"
        </p>

        {/* Date & Location Preview Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
          <div className="p-3.5 rounded-2xl bg-white/70 border border-[#fecdd3] flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#e85d7b] shrink-0" />
            <div>
              <span className="text-[11px] text-[#93223f]/70 uppercase font-semibold block">Proposed Time</span>
              <span className="text-xs sm:text-sm font-medium text-[#3b0d19]">{dateInvitationDetails.proposedDate}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 border border-[#fecdd3] flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#e85d7b] shrink-0" />
            <div>
              <span className="text-[11px] text-[#93223f]/70 uppercase font-semibold block">Location</span>
              <span className="text-xs sm:text-sm font-medium text-[#3b0d19]">{dateInvitationDetails.location}</span>
            </div>
          </div>
        </div>

        {/* RSVP Buttons Preview */}
        <div className="space-y-2">
          <p className="text-xs text-[#93223f]/80 font-medium">RSVP Preview Options:</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {dateInvitationDetails.rsvpOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                className="px-4 py-2.5 rounded-2xl bg-white hover:bg-[#fff5f6] border border-[#fbbecb] text-xs sm:text-sm font-medium text-[#731b31] shadow-sm transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
