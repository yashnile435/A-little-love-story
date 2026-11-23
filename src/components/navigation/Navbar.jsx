import { motion } from "framer-motion";
import { 
  Home, 
  HeartHandshake, 
  Images, 
  CalendarHeart, 
  Wine, 
  LogOut, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { useProfile } from "../../context/useProfile.js";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "feelings", label: "My Feelings", icon: HeartHandshake },
  { id: "album", label: "Memory Album", icon: Images },
  { id: "timeline", label: "Our Timeline", icon: CalendarHeart },
  { id: "invitation", label: "Date Invitation", icon: Wine },
];

export const Navbar = () => {
  const { currentProfile, activeTab, setActiveTab, logoutProfile, returnToNameEntry } = useProfile();

  if (!currentProfile) return null;

  const displayName = currentProfile.displayName || currentProfile.name;

  return (
    <>
      {/* Top Header Bar for Desktop & Mobile */}
      <header className="sticky top-0 z-30 w-full px-4 py-3 sm:px-6 romantic-glass border-b border-[#fecdd3]/60 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand & Matched Profile Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e85d7b] to-[#f48fa3] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif-romantic text-sm sm:text-base font-semibold text-[#3b0d19] leading-tight flex items-center gap-1.5">
                <span>{displayName}'s Story</span>
                <span className="text-[#e85d7b] text-xs">♡</span>
              </p>
              <p className="text-[11px] text-[#93223f]/70 font-light truncate max-w-[150px] sm:max-w-none">
                With {currentProfile.partnerName} • {currentProfile.relationshipTitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#fff0f3]/70 border border-[#fcaebc]/40 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive ? "text-[#be123c]" : "text-[#731b31]/75 hover:text-[#3b0d19]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-[#ffdbe2]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Back to Name Entry / Logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={returnToNameEntry}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#731b31]/80 hover:text-[#3b0d19] hover:bg-white/60 transition-all cursor-pointer"
              title="Return to name entry"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#e85d7b]" />
              <span>Back</span>
            </button>
            <button
              onClick={logoutProfile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#731b31] hover:text-[#be123c] bg-white/70 hover:bg-white border border-[#ffdbe2] shadow-sm transition-all cursor-pointer"
              title="Reset profile and return to name entry"
            >
              <LogOut className="w-3.5 h-3.5 text-[#e85d7b]" />
              <span>Switch Story</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Bottom Navigation Bar for Mobile Screens */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-40 romantic-glass rounded-2xl border border-[#fecdd3]/80 shadow-lg px-2 py-1.5 backdrop-blur-lg">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center py-1.5 px-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive ? "text-[#be123c]" : "text-[#93223f]/60 hover:text-[#731b31]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-pill"
                    className="absolute inset-0 bg-[#ffeef1] rounded-xl border border-[#ffdbe2]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#e85d7b]" : ""}`} />
                  <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">
                    {item.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
