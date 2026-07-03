// ============================================================
// config.js — every tuning knob for the game lives here.
// Change these numbers to change how the game feels.
// ============================================================

const CONFIG = {
  // Canvas
  WIDTH: 420,
  HEIGHT: 640,
  GROUND_H: 70,

  // Physics
  GRAVITY: 0.42,
  FLAP: -7.2,          // upward kick per flap (negative = up)

  // Pipes (tree trunks)
  PIPE_W: 70,
  GAP_START: 175,      // gap size at score 0
  GAP_MIN: 130,        // gap never shrinks below this
  GAP_SHRINK: 1.5,     // gap shrinks this much per point
  PIPE_SPACING: 230,   // horizontal distance between pipes

  // Speed
  SPEED_START: 2.4,
  SPEED_MAX: 3.6,
  SPEED_RAMP: 0.04,    // speed gained per point

  // Visuals
  STAR_COUNT: 70,
  NIGHT_CAP: 20        // score at which the sky is fully dark
};
