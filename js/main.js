// ============================================================
// main.js — the entry point: grab the canvas, wire up input,
// initialize systems, and start the loop.
// ============================================================

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// --- Input ---
canvas.addEventListener('pointerdown', () => Game.input());
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    Game.input();
  }
  if (e.code === 'KeyM') {
    Sounds.toggleMute();
  }
});

// --- Boot ---
Background.init();
Game.reset();

// --- The game loop: update, draw, repeat ~60x per second ---
function loop() {
  Game.update();
  Game.draw(ctx);
  requestAnimationFrame(loop);
}
loop();
