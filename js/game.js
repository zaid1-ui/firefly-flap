// ============================================================
// game.js — the brain: state machine, update logic, and the
// wiring between all systems. This is the "game loop" core.
// ============================================================

const Game = {
  state: 'start',   // start | play | dead
  score: 0,
  best: 0,
  speed: CONFIG.SPEED_START,
  frame: 0,
  deadTimer: 0,

  reset() {
    Bird.reset();
    Pipes.reset();
    Particles.reset();
    this.score = 0;
    this.speed = CONFIG.SPEED_START;
    this.frame = 0;
    this.deadTimer = 0;
  },

  // One player action: flap / start / restart, depending on state.
  input() {
    if (this.state === 'start') this.state = 'play';

    if (this.state === 'play') {
      Bird.flap();
      Particles.burst(Bird.x, Bird.y);
      Sounds.flap();
    } else if (this.state === 'dead' && this.deadTimer > 25) {
      this.reset();
      this.state = 'start';
    }
  },

  die() {
    this.state = 'dead';
    this.deadTimer = 0;
    Bird.vy = -3;
    Sounds.die();
  },

  // Called once per frame: advance the whole world by one tick.
  update() {
    this.frame++;

    if (this.state === 'play') {
      Bird.applyPhysics();

      this.speed = Math.min(
        CONFIG.SPEED_MAX,
        CONFIG.SPEED_START + this.score * CONFIG.SPEED_RAMP
      );

      Pipes.update(this.speed, this.score);

      const gained = Pipes.collectScore(Bird);
      if (gained > 0) {
        this.score += gained;
        if (this.score > this.best) this.best = this.score;
        Sounds.score();
      }

      // collisions: ground, ceiling, pipes
      const groundY = CONFIG.HEIGHT - CONFIG.GROUND_H;
      if (Bird.y + Bird.r > groundY || Bird.y - Bird.r < 0) this.die();
      if (Pipes.hits(Bird)) this.die();

      // ambient glow trail
      if (this.frame % 3 === 0) {
        Particles.trail(Bird.x, Bird.y, this.speed);
      }
    }

    if (this.state === 'dead') {
      this.deadTimer++;
      // let the bird fall to the ground
      if (Bird.y + Bird.r < CONFIG.HEIGHT - CONFIG.GROUND_H) {
        Bird.applyPhysics();
      }
    }

    if (this.state === 'start') {
      Bird.hover(this.frame);
    }

    Particles.update();
  },

  // Scroll speed for background elements (idle screens drift slowly).
  worldSpeed() {
    return this.state === 'play' ? this.speed : 1;
  },

  // Called once per frame: paint everything, back to front.
  draw(ctx) {
    Background.drawSky(ctx, this.score, this.frame);
    Background.drawHills(ctx, this.frame, this.worldSpeed());
    Pipes.draw(ctx);
    Particles.draw(ctx);
    Bird.draw(ctx, this.state, this.frame);
    Background.drawGround(ctx, this.frame, this.worldSpeed());
    UI.draw(ctx, this.state, this.score, this.best, this.deadTimer);
  }
};
