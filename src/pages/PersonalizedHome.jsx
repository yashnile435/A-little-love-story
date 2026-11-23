import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../context/useProfile.js";
import { Navbar } from "../components/navigation/Navbar.jsx";
import { HomeSection } from "../components/sections/HomeSection.jsx";
import { FeelingsSection } from "../components/sections/FeelingsSection.jsx";
import { MemoryAlbumSection } from "../components/sections/MemoryAlbumSection.jsx";
import { TimelineSection } from "../components/sections/TimelineSection.jsx";
import { DateInvitationSection } from "../components/sections/DateInvitationSection.jsx";
import { FloralCorner } from "../components/common/FloralDecorations.jsx";

/**
 * PersonalizedHome Page for "A Little Love Story"
 * 
 * Stage 2 Objective:
 * - Route protection: Redirects to name-entry if no profile is selected.
 * - Displays exclusively the active profile's data.
 * - Romantic hero section, personalized greeting & subtitle.
 * - Navigation links for all 5 story sections.
 */
export const PersonalizedHome = () => {
  const { currentProfile, activeTab, returnToNameEntry } = useProfile();

  // Route protection: If no profile is selected, redirect to name entry
  useEffect(() => {
    if (!currentProfile) {
      returnToNameEntry();
    }
  }, [currentProfile, returnToNameEntry]);

  if (!currentProfile) {
    return null;
  }

  const renderActiveSection = () => {
    switch (activeTab) {
      case "feelings":
        return <FeelingsSection key={`feelings-${currentProfile.id}`} />;
      case "album":
        return <MemoryAlbumSection key={`album-${currentProfile.id}`} />;
      case "timeline":
        return <TimelineSection key={`timeline-${currentProfile.id}`} />;
      case "invitation":
        return <DateInvitationSection key={`invitation-${currentProfile.id}`} />;
      case "home":
      default:
        return <HomeSection key={`home-${currentProfile.id}`} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen romantic-gradient-bg flex flex-col relative text-[#4a1525]"
    >
      {/* Decorative Floral Accents */}
      <FloralCorner position="top-right" className="opacity-20" />
      <FloralCorner position="bottom-left" className="opacity-20" />

      {/* Reusable Responsive Navigation Header */}
      <Navbar />

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 md:pb-16 relative z-10">
        <AnimatePresence mode="wait">
          {renderActiveSection()}
        </AnimatePresence>
      </main>

      {/* Desktop Footer */}
      <footer className="text-center py-4 border-t border-[#fecdd3]/40 text-xs text-[#93223f]/60 font-light hidden md:block">
        A Little Love Story • An Intimate Digital Sanctuary for {currentProfile.displayName || currentProfile.name}
      </footer>
    </motion.div>
  );
};

export default PersonalizedHome;
