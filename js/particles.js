// ============================================================
// particles.js — the firefly's glow trail and flap bursts.
// ============================================================

const Particles = {
  list: [],

  reset() {
    this.list = [];
  },

  // Burst of sparks when the player flaps.
  burst(x, y) {
    for (let i = 0; i < 5; i++) {
      this.list.push({
        x: x - 8,
        y: y + 6,
        vx: -1 - Math.random() * 1.5,
        vy: Math.random() * 1.4 - 0.4,
        life: 28 + Math.random() * 12,
        max: 40
      });
    }
  },

  // Steady ambient trail behind the firefly.
  trail(x, y, speed) {
    this.list.push({
      x: x - 6,
      y,
      vx: -speed * 0.6,
      vy: 0,
      life: 30,
      max: 30
    });
  },

  update() {
    for (const pt of this.list) {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life--;
    }
    this.list = this.list.filter(pt => pt.life > 0);
  },

  draw(ctx) {
    for (const pt of this.list) {
      const a = pt.life / pt.max;
      ctx.save();
      ctx.globalAlpha = a * 0.7;
      ctx.fillStyle = '#ffe66d';
      ctx.shadowColor = '#ffe66d';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.2 * a + 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
};
