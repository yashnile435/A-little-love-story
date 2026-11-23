/**
 * Ambient Audio Helper using Web Audio API
 * 
 * Generates delicate, romantic music box / chime tones natively without external assets or APIs.
 * Can also play local audio tracks if provided.
 */

class AmbientSoundManager {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.melodyNoteIndex = 0;

    // Romantic music-box pentatonic frequencies (Soft C Major / A Minor romantic scale)
    this.notes = [
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      880.00, // A5
      1046.50 // C6
    ];

    // Gentle arpeggio pattern
    this.pattern = [0, 2, 4, 2, 5, 4, 3, 1, 0, 4, 2, 1];
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playGentleChime(freq = 659.25, duration = 1.8) {
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Sine wave with soft harmonic
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Delicate envelope
      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, this.audioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Audio autoplay gracefully handled
    }
  }

  toggleMelody() {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;

    // Play immediate first note
    this.playNextNote();

    // Gentle timing between notes
    this.intervalId = setInterval(() => {
      this.playNextNote();
    }, 1800);
  }

  playNextNote() {
    if (!this.isPlaying) return;
    const noteIdx = this.pattern[this.melodyNoteIndex % this.pattern.length];
    const freq = this.notes[noteIdx % this.notes.length];
    this.playGentleChime(freq, 2.2);
    this.melodyNoteIndex++;
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const soundManager = new AmbientSoundManager();
