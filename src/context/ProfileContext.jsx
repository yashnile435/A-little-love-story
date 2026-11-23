/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback } from "react";
import { ProfileContext } from "./ProfileContextObject.js";
import { useProfile } from "./useProfile.js";
import { matchProfileName } from "../utils/profileMatcher.js";
import { soundManager } from "../utils/sound.js";

export { useProfile };

export const ProfileProvider = ({ children }) => {
  // Screens: 'welcome' | 'name-entry' | 'story'
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [currentProfile, setCurrentProfile] = useState(null);
  
  // Navigation tabs for the personalized experience:
  // 'home' | 'feelings' | 'album' | 'timeline' | 'invitation'
  const [activeTab, setActiveTab] = useState("home");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Navigate to Name Entry screen
  const beginStory = useCallback(() => {
    setCurrentScreen("name-entry");
  }, []);

  // Return to Welcome screen
  const returnToWelcome = useCallback(() => {
    setCurrentScreen("welcome");
  }, []);

  // Return to Name Entry without logging out or after logging out
  const returnToNameEntry = useCallback(() => {
    setCurrentScreen("name-entry");
  }, []);

  // Select profile explicitly
  const selectProfile = useCallback((profile) => {
    setCurrentProfile(profile);
    if (profile) {
      setActiveTab("home");
      setCurrentScreen("story");
    }
  }, []);

  // Submit name to open personalized story
  const loginWithName = useCallback((name) => {
    const result = matchProfileName(name);
    if (result.success && result.profile) {
      setCurrentProfile(result.profile);
      setActiveTab("home");
      setCurrentScreen("story");
    }
    return result;
  }, []);

  // Logout / Reset profile
  const logoutProfile = useCallback(() => {
    setCurrentProfile(null);
    setActiveTab("home");
    setCurrentScreen("name-entry");
  }, []);

  // Alias for logoutProfile
  const resetProfile = logoutProfile;

  // Toggle ambient audio
  const toggleAudio = useCallback(() => {
    const playing = soundManager.toggleMelody();
    setIsAudioPlaying(playing);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        currentScreen,
        currentProfile,
        activeTab,
        isAudioPlaying,
        beginStory,
        returnToWelcome,
        returnToNameEntry,
        selectProfile,
        loginWithName,
        logoutProfile,
        resetProfile,
        setActiveTab,
        toggleAudio,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
