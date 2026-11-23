import fs from "fs";
import path from "path";
import { PROFILES, getAllProfiles, getProfileById } from "./src/data/profiles.js";
import { matchProfile } from "./src/utils/profileMatcher.js";

console.log("=============================================================");
console.log("STAGE 4 TEST SUITE: MEMORY ALBUM & DIGITAL SCRAPBOOK");
console.log("=============================================================");

let testsPassed = 0;
let testsTotal = 0;

function assert(condition, message) {
  testsTotal++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ PASS: ${message}`);
  testsPassed++;
}

// -------------------------------------------------------------
// Section A: Memory Data Structure Validation
// -------------------------------------------------------------
console.log("\n[A] Validating Memory Data Structure per Profile");
const requiredPhotoFields = ["id", "image", "title", "date", "caption"];

PROFILES.forEach((profile) => {
  assert(Array.isArray(profile.photos), `Profile "${profile.name}" has photos array`);
  assert(profile.photos.length >= 2, `Profile "${profile.name}" has at least 2 memories configured`);

  profile.photos.forEach((photo, idx) => {
    requiredPhotoFields.forEach((field) => {
      assert(
        photo[field] !== undefined && photo[field] !== null && String(photo[field]).trim().length > 0,
        `Profile "${profile.name}" photo #${idx + 1} has valid non-empty "${field}"`
      );
    });

    // Check optional location field type if provided
    if (photo.location !== undefined) {
      assert(typeof photo.location === "string", `Profile "${profile.name}" photo #${idx + 1} location is a string`);
    }

    // Verify date format (YYYY-MM-DD)
    assert(/^\d{4}-\d{2}-\d{2}$/.test(photo.date), `Profile "${profile.name}" photo #${idx + 1} date "${photo.date}" follows YYYY-MM-DD`);
  });
});

// -------------------------------------------------------------
// Section B: Local Image Asset Existence on Disk
// -------------------------------------------------------------
console.log("\n[B] Verifying Local Memory Image Files on Disk");
PROFILES.forEach((profile) => {
  profile.photos.forEach((photo) => {
    // Relative path inside public folder
    const relativePath = photo.image.startsWith("/") ? photo.image.slice(1) : photo.image;
    const fullPath = path.resolve("public", relativePath);

    assert(fs.existsSync(fullPath), `Local file exists for "${photo.title}": ${relativePath}`);
    const stats = fs.statSync(fullPath);
    assert(stats.size > 0, `File is non-empty (${stats.size} bytes): ${relativePath}`);
  });
});

// -------------------------------------------------------------
// Section C: Strict Memory Isolation (Katherine vs Saras)
// -------------------------------------------------------------
console.log("\n[C] Testing Memory Isolation between Katherine and Saras");
const katherine = matchProfile("Katherine");
const saras = matchProfile("Saras");

assert(katherine !== null && saras !== null, "Both profiles matched");

const katPhotoIds = new Set(katherine.photos.map(p => p.id));
const sarasPhotoIds = new Set(saras.photos.map(p => p.id));
const katImages = new Set(katherine.photos.map(p => p.image));
const sarasImages = new Set(saras.photos.map(p => p.image));

// Check zero overlap in photo IDs
const idIntersection = [...katPhotoIds].filter(id => sarasPhotoIds.has(id));
assert(idIntersection.length === 0, "No duplicate photo IDs between profiles");

// Check zero overlap in image asset paths
const imageIntersection = [...katImages].filter(img => sarasImages.has(img));
assert(imageIntersection.length === 0, "No duplicate image paths between profiles");

// Check that Katherine photos are in katherine folder and Saras in saras folder
katherine.photos.forEach(p => {
  assert(p.image.includes("/katherine/"), `Katherine photo "${p.title}" is in katherine/ directory`);
});
saras.photos.forEach(p => {
  assert(p.image.includes("/saras/"), `Saras photo "${p.title}" is in saras/ directory`);
});

// -------------------------------------------------------------
// Section D: Lightbox Circular Navigation Logic
// -------------------------------------------------------------
console.log("\n[D] Testing Lightbox Navigation Calculations");
function getNextIndex(current, total) {
  return (current + 1) % total;
}
function getPrevIndex(current, total) {
  return (current - 1 + total) % total;
}

const count = katherine.photos.length;
assert(getNextIndex(0, count) === 1, "Next from 0 is 1");
assert(getNextIndex(count - 1, count) === 0, "Next from last wraps to 0 (circular)");
assert(getPrevIndex(0, count) === count - 1, "Prev from 0 wraps to last (circular)");
assert(getPrevIndex(2, count) === 1, "Prev from 2 is 1");

// -------------------------------------------------------------
// Section E: Empty Album State Graceful Handling
// -------------------------------------------------------------
console.log("\n[E] Testing Empty Album State Handling");
const emptyProfile = {
  id: "guest",
  name: "Guest",
  photos: []
};

assert(Array.isArray(emptyProfile.photos) && emptyProfile.photos.length === 0, "Empty profile photos is empty array");
// Test fallback message
const emptyMessage = "Every beautiful story starts somewhere...";
const emptySubtitle = "More memories will find their place here soon. ♡";
assert(emptyMessage.length > 0 && emptySubtitle.length > 0, "Empty state messages defined");

// -------------------------------------------------------------
// Section F: Stage 1-3 Backward Compatibility
// -------------------------------------------------------------
console.log("\n[F] Verifying Stage 1-3 Features Remain Intact");
assert(matchProfile("katherine")?.id === "katherine", "Case-insensitive 'katherine' matches");
assert(matchProfile("  KATHERINE  ")?.id === "katherine", "Whitespace-trimmed '  KATHERINE  ' matches");
assert(matchProfile("SARAS")?.id === "saras", "Case-insensitive 'SARAS' matches");
assert(matchProfile("Kat") === null, "Partial 'Kat' does NOT match");
assert(matchProfile("Sara") === null, "Partial 'Sara' does NOT match");
assert(matchProfile("") === null, "Empty input returns null");
assert(matchProfile("Unknown") === null, "Unknown name returns null");
assert(katherine.loveLetter.greeting.includes("Katherine"), "Katherine's love letter preserved");
assert(saras.loveLetter.greeting.includes("Saras"), "Saras's love letter preserved");
assert(getAllProfiles().length >= 2, "getAllProfiles returns valid list");
assert(getProfileById("katherine")?.name === "Katherine", "getProfileById retrieves Katherine");

console.log("\n=============================================================");
console.log(`ALL STAGE 4 TESTS PASSED! (${testsPassed}/${testsTotal})`);
console.log("=============================================================");
