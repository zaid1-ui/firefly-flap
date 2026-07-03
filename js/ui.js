// ============================================================
// ui.js — everything text: score, title screen, game-over card.
// ============================================================

const UI = {
  draw(ctx, state, score, best, deadTimer) {
    const W = CONFIG.WIDTH;
    const H = CONFIG.HEIGHT;
    ctx.textAlign = 'center';

    if (state === 'play' || state === 'dead') {
      ctx.font = 'bold 44px Georgia';
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillText(score, W / 2 + 2, 72);
      ctx.fillStyle = '#f4efe6';
      ctx.fillText(score, W / 2, 70);
    }

    if (state === 'start') {
      ctx.fillStyle = '#f4efe6';
      ctx.font = 'italic bold 40px Georgia';
      ctx.fillText('Firefly Flap', W / 2, 190);
      ctx.font = '17px Georgia';
      ctx.fillStyle = 'rgba(244, 239, 230, 0.85)';
      ctx.fillText('Tap, click, or press space to fly', W / 2, 230);
      ctx.fillText('Slip through the trees. The night deepens', W / 2, 256);
      ctx.fillText('the further you go.', W / 2, 278);
      if (best > 0) {
        ctx.fillStyle = '#ffe66d';
        ctx.fillText('Best tonight: ' + best, W / 2, 320);
      }
    }

    if (state === 'dead') {
      ctx.fillStyle = 'rgba(10, 8, 24, 0.72)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#f4efe6';
      ctx.font = 'italic bold 36px Georgia';
      ctx.fillText('The light went out', W / 2, H / 2 - 50);
      ctx.font = '22px Georgia';
      ctx.fillText('Score  ' + score, W / 2, H / 2);
      ctx.fillStyle = '#ffe66d';
      ctx.fillText('Best  ' + best, W / 2, H / 2 + 34);
      if (deadTimer > 25) {
        ctx.fillStyle = 'rgba(244, 239, 230, 0.8)';
        ctx.font = '16px Georgia';
        ctx.fillText('Tap to glow again', W / 2, H / 2 + 84);
      }
    }
  }
};
