import { motion } from "framer-motion";
import { Sparkles, ScrollText, Images, CalendarHeart, Wine, ArrowRight } from "lucide-react";
import { useProfile } from "../../context/useProfile.js";
import { FloralDivider } from "../common/FloralDecorations.jsx";

export const HomeSection = () => {
  const { currentProfile, setActiveTab } = useProfile();

  if (!currentProfile) return null;

  const displayName = currentProfile.displayName || currentProfile.name;
  const welcomeMessage = currentProfile.welcomeMessage || currentProfile.personalizedWelcome?.greeting || `Welcome, ${displayName} ♡`;
  const subtitle = currentProfile.subtitle || currentProfile.personalizedWelcome?.subtitle;
  const { partnerName, relationshipTitle, tagline } = currentProfile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Romantic Hero Section */}
      <div className="romantic-glass-card rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-lg border border-[#fecdd3]/70">
        
        {/* Subtle ambient decorative blurred glows */}
        <div className="absolute w-64 h-64 rounded-full bg-[#ffdbe2]/30 blur-2xl -top-10 -right-10 pointer-events-none" />
        <div className="absolute w-64 h-64 rounded-full bg-[#fcaebc]/20 blur-2xl -bottom-10 -left-10 pointer-events-none" />

        {/* Personalized Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#fcaebc] text-xs sm:text-sm font-medium text-[#93223f] mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#e85d7b]" />
          <span>Reserved for {displayName}</span>
        </div>

        {/* Welcome Heading using the selected girl's name */}
        <h1 className="font-serif-romantic text-3xl sm:text-5xl font-medium text-[#3b0d19] mb-3">
          {welcomeMessage}
        </h1>

        <FloralDivider />

        {/* Romantic Tagline */}
        {tagline && (
          <p className="font-script-romantic text-2xl sm:text-3xl text-[#d42d54] mb-3">
            {tagline}
          </p>
        )}

        {/* Personalized Subtitle */}
        <p className="text-sm sm:text-base text-[#731b31]/80 max-w-2xl mx-auto leading-relaxed font-light mb-6">
          {subtitle}
        </p>

        {/* Profile Relationship Details Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-[#731b31] bg-[#fff5f6] px-4 py-2 rounded-2xl border border-[#ffdbe2]">
          <span className="font-semibold text-[#be123c]">Story Partner:</span>
          <span>{partnerName}</span>
          <span className="text-[#f48fa3]">•</span>
          <span className="font-semibold text-[#be123c]">Honored As:</span>
          <span>{relationshipTitle}</span>
        </div>
      </div>

      {/* Navigation Links for Story Sections */}
      <div>
        <h2 className="font-serif-romantic text-xl sm:text-2xl font-semibold text-[#3b0d19] mb-4 text-center sm:text-left">
          Explore Your Digital Sanctuary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Feelings Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab("feelings")}
            className="cursor-pointer romantic-glass rounded-2xl p-5 border border-[#ffdbe2] shadow-sm hover:romantic-glow-subtle transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffeef1] text-[#e85d7b] flex items-center justify-center mb-3">
              <ScrollText className="w-5 h-5" />
            </div>
            <h3 className="font-serif-romantic text-lg font-semibold text-[#3b0d19] mb-1">
              My Feelings
            </h3>
            <p className="text-xs text-[#731b31]/75 mb-3 leading-relaxed">
              An intimate love letter dedicated to {displayName} from {partnerName}.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#e85d7b]">
              Read letter <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Memory Album Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab("album")}
            className="cursor-pointer romantic-glass rounded-2xl p-5 border border-[#ffdbe2] shadow-sm hover:romantic-glow-subtle transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffeef1] text-[#e85d7b] flex items-center justify-center mb-3">
              <Images className="w-5 h-5" />
            </div>
            <h3 className="font-serif-romantic text-lg font-semibold text-[#3b0d19] mb-1">
              Memory Album
            </h3>
            <p className="text-xs text-[#731b31]/75 mb-3 leading-relaxed">
              Captured moments and chapters woven between {displayName} and {partnerName}.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#e85d7b]">
              View album <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Timeline Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab("timeline")}
            className="cursor-pointer romantic-glass rounded-2xl p-5 border border-[#ffdbe2] shadow-sm hover:romantic-glow-subtle transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffeef1] text-[#e85d7b] flex items-center justify-center mb-3">
              <CalendarHeart className="w-5 h-5" />
            </div>
            <h3 className="font-serif-romantic text-lg font-semibold text-[#3b0d19] mb-1">
              Our Timeline
            </h3>
            <p className="text-xs text-[#731b31]/75 mb-3 leading-relaxed">
              Milestones etched in time on the journey of {displayName} & {partnerName}.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#e85d7b]">
              Explore timeline <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Date Invitation Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab("invitation")}
            className="cursor-pointer romantic-glass rounded-2xl p-5 border border-[#ffdbe2] shadow-sm hover:romantic-glow-subtle transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffeef1] text-[#e85d7b] flex items-center justify-center mb-3">
              <Wine className="w-5 h-5" />
            </div>
            <h3 className="font-serif-romantic text-lg font-semibold text-[#3b0d19] mb-1">
              Date Invitation
            </h3>
            <p className="text-xs text-[#731b31]/75 mb-3 leading-relaxed">
              A private question and proposal prepared especially for {displayName}.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#e85d7b]">
              View invitation <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
