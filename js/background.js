// ============================================================
// background.js — everything behind and below the action:
// the dusk-to-night sky, twinkling stars, hills, and ground.
// ============================================================

const Background = {
  stars: [],

  init() {
    this.stars = Array.from({ length: CONFIG.STAR_COUNT }, () => ({
      x: Math.random() * CONFIG.WIDTH,
      y: Math.random() * (CONFIG.HEIGHT - CONFIG.GROUND_H) * 0.85,
      s: Math.random() * 1.6 + 0.4,
      tw: Math.random() * Math.PI * 2
    }));
  },

  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  // Sky shifts from dusk to deep night as score climbs.
  skyColors(score) {
    const t = Math.min(1, score / CONFIG.NIGHT_CAP);
    const top = [this.lerp(48, 10, t), this.lerp(34, 10, t), this.lerp(84, 38, t)];
    const bot = [this.lerp(150, 40, t), this.lerp(75, 24, t), this.lerp(90, 70, t)];
    return {
      top: `rgb(${top.map(Math.round)})`,
      bot: `rgb(${bot.map(Math.round)})`,
      t
    };
  },

  drawSky(ctx, score, frame) {
    const sky = this.skyColors(score);
    const g = ctx.createLinearGradient(0, 0, 0, CONFIG.HEIGHT);
    g.addColorStop(0, sky.top);
    g.addColorStop(1, sky.bot);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    // stars fade in with darkness
    ctx.save();
    for (const s of this.stars) {
      const twinkle = 0.55 + 0.45 * Math.sin(frame * 0.03 + s.tw);
      ctx.globalAlpha = sky.t * twinkle * 0.9;
      ctx.fillStyle = '#fffbe8';
      ctx.fillRect(s.x, s.y, s.s, s.s);
    }
    ctx.restore();
  },

  drawHills(ctx, frame, speed) {
    const groundY = CONFIG.HEIGHT - CONFIG.GROUND_H;
    ctx.fillStyle = 'rgba(20, 14, 44, 0.55)';
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    for (let x = 0; x <= CONFIG.WIDTH; x += 10) {
      const off = (frame * speed * 0.25 + x) * 0.012;
      ctx.lineTo(x, groundY - 60 - Math.sin(off) * 26 - Math.sin(off * 2.7) * 10);
    }
    ctx.lineTo(CONFIG.WIDTH, groundY);
    ctx.closePath();
    ctx.fill();
  },

  drawGround(ctx, frame, speed) {
    const groundY = CONFIG.HEIGHT - CONFIG.GROUND_H;
    ctx.fillStyle = '#171130';
    ctx.fillRect(0, groundY, CONFIG.WIDTH, CONFIG.GROUND_H);

    // grass blades scrolling with the world
    ctx.strokeStyle = 'rgba(120, 200, 150, 0.35)';
    ctx.lineWidth = 2;
    const scroll = (frame * speed) % 18;
    for (let x = -scroll; x < CONFIG.WIDTH; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.quadraticCurveTo(x + 3, groundY - 10, x + 6, groundY - 14);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(0, groundY, CONFIG.WIDTH, 2);
  }
};
