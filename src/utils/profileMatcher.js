/**
 * Profile Matching Utility for "A Little Love Story"
 * 
 * Rules:
 * - Case-insensitive matching.
 * - Trim leading and trailing spaces.
 * - Handle multiple internal spaces.
 * - Match ONLY registered profiles.
 * - Prevent empty or whitespace-only values.
 * - Do NOT match profiles using partial name matching (e.g. "Kat" does NOT match "Katherine").
 * - Returns matched profile object or null.
 */

import { PROFILES } from "../data/profiles.js";

/**
 * Trims leading and trailing whitespace safely
 * @param {unknown} rawInput 
 * @returns {string}
 */
export const cleanInput = (rawInput) => {
  if (typeof rawInput !== "string") return "";
  return rawInput.trim();
};

/**
 * Normalizes input:
 * 1. Checks if string
 * 2. Trims leading and trailing spaces
 * 3. Collapses multiple internal spaces into a single space
 * 4. Converts to lowercase
 * 
 * @param {unknown} str 
 * @returns {string}
 */
export const normalizeName = (str) => {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
};

/**
 * Matches user input against registered profiles strictly.
 * No partial matching (e.g., "Kat" will not match "Katherine").
 * 
 * @param {string} inputName 
 * @returns {object|null} Matched profile or null
 */
export const matchProfile = (inputName) => {
  if (typeof inputName !== "string") return null;

  const normalized = normalizeName(inputName);
  if (!normalized) return null;

  // Exact comparison against registered profile names (case-insensitive & whitespace-normalized)
  const matched = PROFILES.find((profile) => {
    const profName = normalizeName(profile.name);
    const profDisplayName = normalizeName(profile.displayName || "");
    const profId = normalizeName(profile.id);

    return (
      normalized === profName ||
      normalized === profDisplayName ||
      normalized === profId
    );
  });

  return matched || null;
};

/**
 * Match profile with descriptive validation details for UI feedback
 * 
 * @param {string} rawName 
 * @returns {{ success: boolean, profile: object|null, errorType?: string, message?: string }}
 */
export const matchProfileName = (rawName) => {
  const trimmed = cleanInput(rawName);

  // 1. Prevent empty input
  if (!trimmed) {
    return {
      success: false,
      profile: null,
      errorType: "EMPTY",
      message: "Please share your name with me so I can open your story ♡"
    };
  }

  // 2. Strict exact profile matching
  const profile = matchProfile(trimmed);

  if (profile) {
    return {
      success: true,
      profile
    };
  }

  // 3. User entered an unregistered or partial name
  const safeDisplayName = trimmed.length > 25 ? trimmed.slice(0, 25) + "..." : trimmed;

  return {
    success: false,
    profile: null,
    errorType: "NOT_FOUND",
    message: `We couldn't find a story for "${safeDisplayName}" yet, but every love story begins somewhere special. If you have an invitation, please check your spelling!`
  };
};
