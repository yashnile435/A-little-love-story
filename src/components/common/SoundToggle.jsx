import { motion } from "framer-motion";
import { Volume2, Music } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";

/**
 * Romantic ambient audio toggle
 */
export const SoundToggle = () => {
  const { isAudioPlaying, toggleAudio } = useProfile();

  return (
    <motion.button
      onClick={toggleAudio}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full romantic-glass shadow-sm hover:romantic-glow-subtle transition-all duration-300 text-xs font-medium text-[#731b31] border border-[#ffdbe2]"
      title={isAudioPlaying ? "Mute ambient melody" : "Play ambient melody"}
      aria-label={isAudioPlaying ? "Mute ambient melody" : "Play ambient melody"}
    >
      {isAudioPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f48fa3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e85d7b]" />
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#e85d7b]" />
          <span className="hidden sm:inline">Melody Playing</span>
        </>
      ) : (
        <>
          <Music className="w-3.5 h-3.5 text-[#93223f] opacity-70" />
          <span className="hidden sm:inline">Soft Melody</span>
        </>
      )}
    </motion.button>
  );
};
