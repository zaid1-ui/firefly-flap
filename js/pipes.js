// ============================================================
// pipes.js — the obstacles (tree trunks): spawning, movement,
// scoring flags, and drawing.
// ============================================================

const Pipes = {
  list: [],

  reset() {
    this.list = [];
    this.spawn(CONFIG.WIDTH + 60);
    this.spawn(CONFIG.WIDTH + 60 + CONFIG.PIPE_SPACING);
  },

  spawn(x, score = 0) {
    const gap = Math.max(CONFIG.GAP_MIN, CONFIG.GAP_START - score * CONFIG.GAP_SHRINK);
    const margin = 60;
    const usable = CONFIG.HEIGHT - CONFIG.GROUND_H - margin * 2 - gap;
    const gapY = margin + Math.random() * usable;
    this.list.push({ x, gapY, gap, scored: false });
  },

  update(speed, score) {
    for (const p of this.list) p.x -= speed;

    // recycle: drop off-screen pipes, add new ones on the right
    if (this.list[0].x < -CONFIG.PIPE_W) this.list.shift();
    if (this.list[this.list.length - 1].x < CONFIG.WIDTH - CONFIG.PIPE_SPACING) {
      this.spawn(CONFIG.WIDTH + 20, score);
    }
  },

  // Returns true if the bird collides with any pipe.
  hits(bird) {
    for (const p of this.list) {
      if (bird.x + bird.r > p.x && bird.x - bird.r < p.x + CONFIG.PIPE_W) {
        if (bird.y - bird.r < p.gapY || bird.y + bird.r > p.gapY + p.gap) {
          return true;
        }
      }
    }
    return false;
  },

  // Returns how many pipes the bird just passed (0 or 1 normally).
  collectScore(bird) {
    let gained = 0;
    for (const p of this.list) {
      if (!p.scored && p.x + CONFIG.PIPE_W < bird.x) {
        p.scored = true;
        gained++;
      }
    }
    return gained;
  },

  draw(ctx) {
    for (const p of this.list) {
      this.drawTrunk(ctx, p.x, 0, p.gapY, true);
      this.drawTrunk(ctx, p.x, p.gapY + p.gap,
        CONFIG.HEIGHT - CONFIG.GROUND_H - (p.gapY + p.gap), false);
    }
  },

  drawTrunk(ctx, x, y, h, isTop) {
    if (h <= 0) return;
    const W = CONFIG.PIPE_W;

    // trunk body
    const grad = ctx.createLinearGradient(x, 0, x + W, 0);
    grad.addColorStop(0, '#2e2249');
    grad.addColorStop(0.5, '#4a3a6b');
    grad.addColorStop(1, '#241a3d');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, W, h);

    // bark lines
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 2;
    for (let i = 1; i < 4; i++) {
      const lx = x + (W / 4) * i + Math.sin(i * 7) * 3;
      ctx.beginPath();
      ctx.moveTo(lx, y);
      ctx.lineTo(lx, y + h);
      ctx.stroke();
    }

    // canopy lip at the gap edge
    const lipY = isTop ? y + h - 14 : y;
    ctx.fillStyle = '#38295c';
    ctx.beginPath();
    ctx.roundRect(x - 6, lipY, W + 12, 14, 5);
    ctx.fill();

    // moss glow dots near the gap
    ctx.fillStyle = 'rgba(140, 240, 170, 0.5)';
    for (let i = 0; i < 4; i++) {
      const dx = x + 8 + i * 16;
      const dy = isTop ? y + h - 7 : y + 7;
      ctx.beginPath();
      ctx.arc(dx, dy, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};
