// ============================================================
// bird.js — the player character: its state, physics, and art.
// ============================================================

const Bird = {
  x: 110,
  y: 0,
  vy: 0,
  r: 13,      // collision radius
  wing: 0,    // frames remaining of the wing-up pose

  reset() {
    this.x = 110;
    this.y = CONFIG.HEIGHT / 2;
    this.vy = 0;
    this.wing = 0;
  },

  flap() {
    this.vy = CONFIG.FLAP;
    this.wing = 8;
  },

  // Apply gravity and move. Called every frame while playing/falling.
  applyPhysics() {
    this.vy += CONFIG.GRAVITY;
    this.y += this.vy;
    if (this.wing > 0) this.wing--;
  },

  // Gentle hover on the title screen.
  hover(frame) {
    this.y = CONFIG.HEIGHT / 2 + Math.sin(frame * 0.06) * 8;
  },

  draw(ctx, state, frame) {
    const tilt = (state === 'play' || state === 'dead')
      ? Math.max(-0.5, Math.min(0.9, this.vy * 0.07))
      : Math.sin(frame * 0.06) * 0.08;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(tilt);

    // glow aura
    ctx.save();
    ctx.shadowColor = '#ffe66d';
    ctx.shadowBlur = 22;
    ctx.fillStyle = 'rgba(255, 230, 109, 0.9)';
    ctx.beginPath();
    ctx.ellipse(2, 2, 9, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // body
    ctx.fillStyle = '#3b2d1e';
    ctx.beginPath();
    ctx.ellipse(-4, -2, 9, 7, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // abdomen (the light)
    ctx.fillStyle = '#ffef9e';
    ctx.beginPath();
    ctx.ellipse(4, 3, 7, 5.5, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // wings
    const wingUp = this.wing > 0;
    ctx.fillStyle = 'rgba(220, 225, 255, 0.65)';
    ctx.beginPath();
    ctx.ellipse(-3, wingUp ? -12 : -8, 8, wingUp ? 6 : 4, wingUp ? -0.7 : -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-7, wingUp ? -10 : -7, 6, wingUp ? 5 : 3, wingUp ? -1.0 : -0.5, 0, Math.PI * 2);
    ctx.fill();

    // eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-9, -4, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a1530';
    ctx.beginPath();
    ctx.arc(-8.4, -4, 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
};
