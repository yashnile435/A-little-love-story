/**
 * Centralized Profile Configuration for "A Little Love Story"
 * 
 * Scalable profile store supporting multiple independent profiles.
 * Each profile is decoupled from presentation components.
 * 
 * Required fields per profile:
 * - id
 * - name
 * - displayName
 * - welcomeMessage
 * - subtitle
 * - loveLetter: { greeting, paragraphs, closing, signature, title, date, author, preview, excerpt, isSealed }
 * - photos: [ { id, image, title, date, caption, location } ]
 * - timeline: [ { id, date, title, description, icon } ]
 * - dateInvitation
 */

export const PROFILES = [
  {
    id: "katherine",
    name: "Katherine",
    displayName: "Katherine",
    partnerName: "Saras",
    relationshipTitle: "My Eternal Muse",
    tagline: "Every quiet second with you feels like home.",
    accentColor: "#e85d7b",
    
    // Core welcome details
    welcomeMessage: "Welcome back to your story, Katherine ♡",
    subtitle: "A digital keepsake sanctuary crafted with every tender thought, every fond laugh, and the infinite warmth you bring into my world.",

    // Backward-compatible personalized welcome block
    personalizedWelcome: {
      badge: "Reserved for Katherine",
      greeting: "Hello, my darling Katherine ♡",
      title: "Where Every Whisper Finds You",
      subtitle: "A digital keepsake sanctuary crafted with every tender thought, every fond laugh, and the infinite warmth you bring into my world."
    },

    // Love letter structure for Stage 3
    loveLetter: {
      greeting: "Dear Katherine,",
      paragraphs: [
        "There is something quiet and true I have wanted to tell you.",
        "In a world that often moves in a hurried rush, the gentle warmth of your presence brings a quiet peace that is rare and precious.",
        "You have a way of making ordinary moments feel meaningful simply by being yourself. Every smile shared and every gentle word spoken has lingered warmly in my thoughts.",
        "Every memory captured in this little sanctuary was crafted to remind you of how deeply cherished you are, today and always."
      ],
      closing: "With all my tenderness,",
      signature: "Saras ♡",
      // Metadata
      title: "The Chapters We Haven't Named Yet",
      date: "Forever & Always",
      author: "Saras",
      preview: "I built this quiet corner of the world because words alone can never hold everything you are to me...",
      excerpt: "If love was measured in raindrops, I would send you a perpetual storm of softness. Thank you for making ordinary days feel extraordinary.",
      isSealed: true
    },

    // Memory Album photos for Stage 4
    photos: [
      {
        id: "kat-memory-01",
        image: "/memories/katherine/memory-01.png",
        title: "Golden Hour Glow",
        date: "2025-10-14",
        caption: "The evening light caught your smile in the sweetest, most unforgettable way.",
        location: "Sunset Promenade"
      },
      {
        id: "kat-memory-02",
        image: "/memories/katherine/memory-02.png",
        title: "Stolen Coffee Whispers",
        date: "2025-11-03",
        caption: "A rainy coffee afternoon where two warm cups of coffee turned into hours of laughter.",
        location: "The Little Corner Café"
      },
      {
        id: "kat-memory-03",
        image: "/memories/katherine/memory-03.png",
        title: "Under the Constellations",
        date: "2025-12-24",
        caption: "Walking quietly beneath a thousand constellations in the crisp, gentle night air.",
        location: "Observatory Hill"
      },
      {
        id: "kat-memory-04",
        image: "/memories/katherine/memory-04.png",
        title: "First Roadtrip Detour",
        date: "2026-01-18",
        caption: "Taking the scenic coastal route with windows down and our favorite melodies playing.",
        location: "Coastline Overlook"
      }
    ],

    // Memory album chapters
    memoryAlbum: [
      {
        chapter: "Chapter I",
        title: "The First Spark",
        storySnippet: "The very first time our eyes met, the rest of the room became quiet background noise."
      },
      {
        chapter: "Chapter II",
        title: "Shared Laughter",
        storySnippet: "Those silly inside jokes that only the two of us understand."
      },
      {
        chapter: "Chapter III",
        title: "Safe Harbor",
        storySnippet: "Finding in you a place of total peace and unconditional tenderness."
      }
    ],

    // Timeline milestone events
    timeline: [
      {
        id: "kt1",
        date: "The Day We Met",
        title: "A Serendipitous Encounter",
        description: "Two wandering paths gently converged into one unforgettable journey.",
        icon: "sparkles"
      },
      {
        id: "kt2",
        date: "First Long Conversation",
        title: "Hours That Felt Like Minutes",
        description: "Talking until the early morning hours, realizing our souls spoke the same language.",
        icon: "heart"
      },
      {
        id: "kt3",
        date: "The Unspoken Certainty",
        title: "When I Knew It Was You",
        description: "A sudden, gentle clarity that life is simply better with you by my side.",
        icon: "compass"
      }
    ],
    get timelineEvents() {
      return this.timeline;
    },

    // Date invitation details
    dateInvitation: {
      status: "pending_rsvp",
      title: "A Special Evening Under the Stars",
      proposedDate: "This Upcoming Weekend",
      location: "Our Secret Haven",
      note: "Dress comfortably, bring your sweetest smile, and let me take care of every little detail.",
      rsvpOptions: ["Yes, absolutely! ♡", "With all my heart! ✨"]
    },
    get dateInvitationDetails() {
      return this.dateInvitation;
    }
  },

  {
    id: "saras",
    name: "Saras",
    displayName: "Saras",
    partnerName: "Katherine",
    relationshipTitle: "My Guiding Star",
    tagline: "You are the poetry I never knew how to write.",
    accentColor: "#be123c",

    // Core welcome details
    welcomeMessage: "Welcome back to your story, Saras ♡",
    subtitle: "Here lies a tapestry of memories, gentle moments, and promises woven just for you, my beloved partner.",

    // Backward-compatible personalized welcome block
    personalizedWelcome: {
      badge: "Reserved for Saras",
      greeting: "Hello, my handsome Saras ♡",
      title: "A Sanctuary for Our Memories",
      subtitle: "Here lies a tapestry of memories, gentle moments, and promises woven just for you, my beloved partner."
    },

    // Love letter structure for Stage 3
    loveLetter: {
      greeting: "Dear Saras,",
      paragraphs: [
        "There is something special and heartfelt I have wanted to share with you.",
        "Your steady strength, gentle understanding, and thoughtful smiles make even the simplest days feel like a quiet blessing.",
        "Knowing I have a safe haven in your presence gives me courage and peace. You bring a quiet warmth to my world that I cherish more than words can express.",
        "This keepsake is a small tribute to your kind heart, reminding you how truly valued and loved you are through every season."
      ],
      closing: "With warm feelings and devotion,",
      signature: "Katherine ♡",
      // Metadata
      title: "Letters Written to Your Heart",
      date: "Through Every Season",
      author: "Katherine",
      preview: "Every step of this road is brighter with your hand in mine...",
      excerpt: "Your strength and warmth give me a sense of peace that words can never fully capture. You are my home.",
      isSealed: true
    },

    // Memory Album photos for Stage 4
    photos: [
      {
        id: "saras-memory-01",
        image: "/memories/saras/memory-01.png",
        title: "Quiet Morning Brew",
        date: "2025-09-28",
        caption: "Early sunbeams and your gentle smile making the start of the day feel peaceful.",
        location: "Sunny Balcony"
      },
      {
        id: "saras-memory-02",
        image: "/memories/saras/memory-02.png",
        title: "The Scenic Mountain Detour",
        date: "2025-11-19",
        caption: "Getting delightfully lost on winding mountain trails with endless conversations.",
        location: "Pine Ridge Trail"
      },
      {
        id: "saras-memory-03",
        image: "/memories/saras/memory-03.png",
        title: "Celebration Under the Sky",
        date: "2025-12-31",
        caption: "Warm embraces as the midnight lights illuminated the harbor ahead of a new year.",
        location: "Harbor Overlook"
      },
      {
        id: "saras-memory-04",
        image: "/memories/saras/memory-04.png",
        title: "Bookshop Hideaway",
        date: "2026-02-14",
        caption: "Finding quiet poetry books and sharing whispered recommendations between the aisles.",
        location: "Old Town Books"
      }
    ],

    // Memory album chapters
    memoryAlbum: [
      {
        chapter: "Chapter I",
        title: "The Gentle Beginning",
        storySnippet: "How a chance meeting blossomed into the greatest blessing of my life."
      },
      {
        chapter: "Chapter II",
        title: "Unconditional Support",
        storySnippet: "Every time you believed in me when I struggled to believe in myself."
      }
    ],

    // Timeline milestone events
    timeline: [
      {
        id: "st1",
        date: "Day One",
        title: "When Our Worlds Collided",
        description: "The moment that changed everything for the better.",
        icon: "sparkles"
      },
      {
        id: "st2",
        date: "Our Milestone",
        title: "A Promise Made",
        description: "To stand by one another through life's sweetest highs and quietest storms.",
        icon: "heart"
      }
    ],
    get timelineEvents() {
      return this.timeline;
    },

    // Date invitation details
    dateInvitation: {
      status: "pending_rsvp",
      title: "An Evening of Culinary Delights & Candlelight",
      proposedDate: "Friday Sunset",
      location: "A Cozy Table by the Window",
      note: "No clocks, no rush — just you, me, and our favorite songs playing softly.",
      rsvpOptions: ["Count me in, love! ♡", "I wouldn't miss it for the world! ✨"]
    },
    get dateInvitationDetails() {
      return this.dateInvitation;
    }
  }
];

/**
 * Helper to fetch all profile summaries
 */
export const getAllProfiles = () => {
  return PROFILES.map(p => ({
    id: p.id,
    name: p.name,
    displayName: p.displayName,
    partnerName: p.partnerName,
    tagline: p.tagline
  }));
};

/**
 * Find a profile by its ID
 */
export const getProfileById = (id) => {
  if (!id || typeof id !== "string") return null;
  const cleanId = id.trim().toLowerCase();
  return PROFILES.find(p => p.id.toLowerCase() === cleanId) || null;
};
