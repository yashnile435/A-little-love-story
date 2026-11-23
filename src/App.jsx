import { AnimatePresence } from "framer-motion";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { useProfile } from "./context/useProfile.js";
import { WelcomeScreen } from "./components/screens/WelcomeScreen.jsx";
import { NameEntryScreen } from "./components/screens/NameEntryScreen.jsx";
import { PersonalizedHome } from "./pages/PersonalizedHome.jsx";
import { FloatingHearts } from "./components/common/FloatingHearts.jsx";
import { SoundToggle } from "./components/common/SoundToggle.jsx";

function MainContent() {
  const { currentScreen } = useProfile();

  return (
    <div className="relative min-h-screen bg-[#fdfcf9] font-sans antialiased text-[#4a1525] overflow-x-hidden">
      {/* Ambient floating hearts across all screens */}
      <FloatingHearts count={16} />

      {/* Music toggle button */}
      <SoundToggle />

      {/* Screen switcher with animated transitions */}
      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && <WelcomeScreen key="welcome" />}
        {currentScreen === "name-entry" && <NameEntryScreen key="name-entry" />}
        {currentScreen === "story" && <PersonalizedHome key="story" />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <MainContent />
    </ProfileProvider>
  );
}
