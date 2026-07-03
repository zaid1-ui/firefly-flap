# Firefly Flap

A Flappy Bird-style browser game. You're a firefly weaving between tree
trunks at dusk — the sky darkens and stars come out the further you fly.

## Play

Open `index.html` in any browser, or serve the folder locally:

```
npx serve .
```

**Controls:** tap, click, or press Space / Up Arrow to flap. Press **M** to mute/unmute sound.

## Project structure

```
firefly-flap/
├── index.html          entry point, loads everything
├── css/
│   └── style.css       page layout and canvas styling
└── js/
    ├── config.js       all tuning constants (gravity, speed, gaps...)
    ├── sounds.js       sound effects (synthesized, no audio files)
    ├── bird.js         player: physics + drawing
    ├── pipes.js        obstacles: spawning, collision, scoring
    ├── particles.js    glow trail and flap sparks
    ├── background.js   sky, stars, hills, ground
    ├── ui.js           score, title screen, game-over screen
    ├── game.js         state machine + core update/draw logic
    └── main.js         boots the game and runs the loop
```

## Tuning the game

Everything adjustable lives in `js/config.js`. Some fun ones to try:

| Constant     | What it does                          |
|--------------|---------------------------------------|
| `GRAVITY`    | How fast you fall                     |
| `FLAP`       | Strength of each flap (more negative = stronger) |
| `GAP_START`  | Gap between trunks at the start       |
| `SPEED_MAX`  | Top scrolling speed                   |
| `NIGHT_CAP`  | Score at which the sky is fully dark  |

## Deploying

Deployed on GitHub Page.

