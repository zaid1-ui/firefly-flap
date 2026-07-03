// ============================================================
// sounds.js — sound effects synthesized with the Web Audio API.
// No audio files needed: every sound is generated in code, which
// keeps the project dependency-free and tiny.
// ============================================================

const Sounds = {
  ctx: null,
  muted: false,

  // Browsers block audio until the user interacts with the page,
  // so we create the AudioContext lazily on the first input.
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  },

  // Small helper: play one oscillator note with a volume envelope.
  tone({ freq, endFreq, type = 'sine', duration = 0.1, volume = 0.15, delay = 0 }) {
    const ctx = this.ensure();
    if (!ctx || this.muted) return;

    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + duration);

    gain.gain.setValueAtTime(volume, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  },

  // A soft wing-beat "whoosh": quick pitch drop.
  flap() {
    this.tone({ freq: 520, endFreq: 260, type: 'triangle', duration: 0.09, volume: 0.12 });
  },

  // A firefly-ish two-note chime when you pass a trunk.
  score() {
    this.tone({ freq: 880, type: 'sine', duration: 0.08, volume: 0.12 });
    this.tone({ freq: 1320, type: 'sine', duration: 0.12, volume: 0.10, delay: 0.07 });
  },

  // The light goes out: a falling thud.
  die() {
    this.tone({ freq: 300, endFreq: 70, type: 'sawtooth', duration: 0.4, volume: 0.14 });
  },

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
};
