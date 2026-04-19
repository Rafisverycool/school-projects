let platforms = [];
let bushes = [];
let coins = [];
let coinScore = 0;
let gameWon = false;
const TILE_SIZE = 16 * 4;
function tilesWide(n) { return n * TILE_SIZE; }

let endGoal = null;

function initPlatforms() {
    const W = canvas.width;
    const H = canvas.height;
    gameWon = false;

    const WORLD_WIDTH = tilesWide(90);

    platforms = [
        // ── Floor & Ceiling ──
        { x: -200,      y: H - 24,   width: WORLD_WIDTH + 400, height: 24, type: 'solid', zone: 1, isFloor: true },
        { x: -200,      y: -24,      width: WORLD_WIDTH + 400, height: 24, type: 'solid', zone: 1, isCeiling: true },

        // ════════════════════════════════
        // ZONE 1 — Green/Dirt — Staircase
        // ════════════════════════════════
        { x: W * 0.02,  y: H * 0.88, width: tilesWide(3), height: 36, type: 'passthrough', zone: 1 },
        { x: W * 0.10,  y: H * 0.76, width: tilesWide(3), height: 36, type: 'solid',       zone: 1 },
        { x: W * 0.18,  y: H * 0.64, width: tilesWide(3), height: 36, type: 'solid',       zone: 1 },
        { x: W * 0.26,  y: H * 0.52, width: tilesWide(3), height: 36, type: 'solid',       zone: 1 },
        { x: W * 0.34,  y: H * 0.40, width: tilesWide(3), height: 36, type: 'solid',       zone: 1 },
        { x: W * 0.42,  y: H * 0.28, width: tilesWide(3), height: 36, type: 'solid',       zone: 1 },
        { x: W * 0.50,  y: H * 0.16, width: tilesWide(4), height: 36, type: 'solid',       zone: 1 },
        // side branches
        { x: W * 0.22,  y: H * 0.72, width: tilesWide(2), height: 36, type: 'passthrough', zone: 1 },
        { x: W * 0.30,  y: H * 0.82, width: tilesWide(2), height: 36, type: 'passthrough', zone: 1 },
        // scatter
        { x: W * 0.06,  y: H * 0.60, width: tilesWide(2), height: 36, type: 'solid',       zone: 1 },
        { x: W * 0.14,  y: H * 0.47, width: tilesWide(2), height: 36, type: 'passthrough', zone: 1 },
        { x: W * 0.44,  y: H * 0.55, width: tilesWide(1), height: 28, type: 'passthrough', zone: 1 },
        { x: W * 0.38,  y: H * 0.68, width: tilesWide(2), height: 36, type: 'solid',       zone: 1 },
        { x: W * 0.55,  y: H * 0.44, width: tilesWide(1), height: 28, type: 'passthrough', zone: 1 },
        { x: W * 0.56,  y: H * 0.72, width: tilesWide(2), height: 36, type: 'solid',       zone: 1 },

        // ════════════════════════════════
        // ZONE 2 — Teal/Magic — Zigzag EXPANDED
        // ════════════════════════════════
        { x: W * 0.62,  y: H * 0.80, width: tilesWide(5), height: 48, type: 'solid', zone: 2, dark: true },
        // main zigzag
        { x: W * 0.72,  y: H * 0.63, width: tilesWide(3), height: 36, type: 'solid', zone: 2 },
        { x: W * 0.62,  y: H * 0.48, width: tilesWide(3), height: 36, type: 'solid', zone: 2 },
        { x: W * 0.74,  y: H * 0.34, width: tilesWide(3), height: 36, type: 'solid', zone: 2 },
        { x: W * 0.62,  y: H * 0.20, width: tilesWide(4), height: 36, type: 'solid', zone: 2 },
        // single-tile hops
        { x: W * 0.82,  y: H * 0.55, width: tilesWide(1), height: 28, type: 'passthrough', zone: 2 },
        { x: W * 0.82,  y: H * 0.40, width: tilesWide(1), height: 28, type: 'passthrough', zone: 2 },
        // extra chaotic platforms
        { x: W * 0.68,  y: H * 0.71, width: tilesWide(1), height: 28, type: 'passthrough', zone: 2 },
        { x: W * 0.78,  y: H * 0.57, width: tilesWide(2), height: 36, type: 'solid',       zone: 2 },
        { x: W * 0.65,  y: H * 0.42, width: tilesWide(1), height: 28, type: 'passthrough', zone: 2 },
        { x: W * 0.77,  y: H * 0.28, width: tilesWide(2), height: 36, type: 'solid',       zone: 2 },
        { x: W * 0.68,  y: H * 0.13, width: tilesWide(2), height: 36, type: 'solid',       zone: 2 },
        { x: W * 0.85,  y: H * 0.23, width: tilesWide(2), height: 36, type: 'solid',       zone: 2 },
        { x: W * 0.70,  y: H * 0.56, width: tilesWide(1), height: 28, type: 'passthrough', zone: 2 },
        { x: W * 0.80,  y: H * 0.46, width: tilesWide(1), height: 28, type: 'passthrough', zone: 2 },
        // upper shelf — reward for reaching purple top
        { x: W * 0.74,  y: H * 0.07, width: tilesWide(5), height: 36, type: 'solid', zone: 2, dark: true },
        // hidden lower detour
        { x: W * 0.63,  y: H * 0.90, width: tilesWide(2), height: 28, type: 'passthrough', zone: 2 },
        { x: W * 0.76,  y: H * 0.88, width: tilesWide(2), height: 28, type: 'passthrough', zone: 2 },
        { x: W * 0.70,  y: H * 0.93, width: tilesWide(1), height: 28, type: 'passthrough', zone: 2 },

        // ════════════════════════════════
        // ZONE 3 — Red/Orange — Island Cluster
        // ════════════════════════════════
        { x: W * 0.90,  y: H * 0.82, width: tilesWide(6), height: 48, type: 'solid', zone: 3, dark: true },
        { x: W * 0.92,  y: H * 0.65, width: tilesWide(2), height: 36, type: 'solid', zone: 3 },
        { x: W * 1.00,  y: H * 0.65, width: tilesWide(2), height: 36, type: 'solid', zone: 3 },
        { x: W * 1.08,  y: H * 0.65, width: tilesWide(2), height: 36, type: 'solid', zone: 3 },
        { x: W * 0.94,  y: H * 0.48, width: tilesWide(2), height: 36, type: 'solid', zone: 3 },
        { x: W * 1.04,  y: H * 0.48, width: tilesWide(2), height: 36, type: 'solid', zone: 3 },
        { x: W * 0.99,  y: H * 0.32, width: tilesWide(3), height: 36, type: 'solid', zone: 3 },
        { x: W * 0.99,  y: H * 0.17, width: tilesWide(4), height: 36, type: 'solid', zone: 3 },
        { x: W * 0.87,  y: H * 0.55, width: tilesWide(1), height: 28, type: 'passthrough', zone: 3 },
        { x: W * 1.13,  y: H * 0.72, width: tilesWide(2), height: 36, type: 'solid',       zone: 3 },
        { x: W * 1.10,  y: H * 0.40, width: tilesWide(1), height: 28, type: 'passthrough', zone: 3 },
        // extra scatter
        { x: W * 0.96,  y: H * 0.57, width: tilesWide(1), height: 28, type: 'passthrough', zone: 3 },
        { x: W * 1.15,  y: H * 0.55, width: tilesWide(2), height: 36, type: 'solid',       zone: 3 },
        { x: W * 1.08,  y: H * 0.32, width: tilesWide(1), height: 28, type: 'passthrough', zone: 3 },
        { x: W * 0.91,  y: H * 0.40, width: tilesWide(1), height: 28, type: 'passthrough', zone: 3 },
        { x: W * 1.18,  y: H * 0.20, width: tilesWide(2), height: 36, type: 'solid',       zone: 3 },

        // ════════════════════════════════
        // ZONE 4 — Blue — Spiral Ascent
        // ════════════════════════════════
        { x: W * 1.22,  y: H * 0.88, width: tilesWide(8), height: 48, type: 'solid', zone: 4, dark: true },
        { x: W * 1.42,  y: H * 0.74, width: tilesWide(3), height: 36, type: 'solid', zone: 4 },
        { x: W * 1.55,  y: H * 0.60, width: tilesWide(3), height: 36, type: 'solid', zone: 4 },
        { x: W * 1.44,  y: H * 0.46, width: tilesWide(3), height: 36, type: 'solid', zone: 4 },
        { x: W * 1.30,  y: H * 0.33, width: tilesWide(3), height: 36, type: 'solid', zone: 4 },
        { x: W * 1.42,  y: H * 0.20, width: tilesWide(3), height: 36, type: 'solid', zone: 4 },
        { x: W * 1.55,  y: H * 0.10, width: tilesWide(4), height: 36, type: 'solid', zone: 4 },
        { x: W * 1.26,  y: H * 0.70, width: tilesWide(2), height: 28, type: 'passthrough', zone: 4 },
        { x: W * 1.35,  y: H * 0.57, width: tilesWide(2), height: 28, type: 'passthrough', zone: 4 },
        { x: W * 1.50,  y: H * 0.82, width: tilesWide(2), height: 36, type: 'solid',       zone: 4 },
        { x: W * 1.62,  y: H * 0.70, width: tilesWide(1), height: 28, type: 'passthrough', zone: 4 },
        { x: W * 1.38,  y: H * 0.40, width: tilesWide(1), height: 28, type: 'passthrough', zone: 4 },
        // extra
        { x: W * 1.60,  y: H * 0.82, width: tilesWide(2), height: 36, type: 'solid',       zone: 4 },
        { x: W * 1.48,  y: H * 0.68, width: tilesWide(1), height: 28, type: 'passthrough', zone: 4 },
        { x: W * 1.65,  y: H * 0.50, width: tilesWide(2), height: 36, type: 'solid',       zone: 4 },
        { x: W * 1.36,  y: H * 0.26, width: tilesWide(1), height: 28, type: 'passthrough', zone: 4 },
        { x: W * 1.60,  y: H * 0.22, width: tilesWide(2), height: 36, type: 'solid',       zone: 4 },

        // ════════════════════════════════
        // ZONE 5 — Slate — Sky Bridge
        // ════════════════════════════════
        { x: W * 1.70,  y: H * 0.85, width: tilesWide(4), height: 36, type: 'solid', zone: 5 },
        { x: W * 1.82,  y: H * 0.70, width: tilesWide(3), height: 36, type: 'solid', zone: 5 },
        { x: W * 1.70,  y: H * 0.57, width: tilesWide(3), height: 36, type: 'solid', zone: 5 },
        // long bridge
        { x: W * 1.82,  y: H * 0.10, width: tilesWide(12), height: 36, type: 'solid', zone: 5, dark: true },
        // stalactite passthrough ledges below bridge
        { x: W * 1.86,  y: H * 0.20, width: tilesWide(2), height: 28, type: 'passthrough', zone: 5 },
        { x: W * 1.99,  y: H * 0.22, width: tilesWide(2), height: 28, type: 'passthrough', zone: 5 },
        { x: W * 2.12,  y: H * 0.20, width: tilesWide(2), height: 28, type: 'passthrough', zone: 5 },
        { x: W * 2.25,  y: H * 0.24, width: tilesWide(2), height: 28, type: 'passthrough', zone: 5 },
        // steps to bridge
        { x: W * 2.35,  y: H * 0.42, width: tilesWide(3), height: 36, type: 'solid', zone: 5 },
        { x: W * 2.38,  y: H * 0.28, width: tilesWide(3), height: 36, type: 'solid', zone: 5 },
        // mid fillers
        { x: W * 1.76,  y: H * 0.44, width: tilesWide(2), height: 28, type: 'passthrough', zone: 5 },
        { x: W * 1.92,  y: H * 0.35, width: tilesWide(2), height: 36, type: 'solid',       zone: 5 },
        { x: W * 2.04,  y: H * 0.48, width: tilesWide(2), height: 36, type: 'solid',       zone: 5 },
        { x: W * 2.18,  y: H * 0.38, width: tilesWide(1), height: 28, type: 'passthrough', zone: 5 },

        // ════════════════════════════════
        // ZONE 6 — Rose — Avalanche Descent
        // ════════════════════════════════
        { x: W * 2.55,  y: H * 0.80, width: tilesWide(4), height: 36, type: 'solid', zone: 6 },
        { x: W * 2.65,  y: H * 0.66, width: tilesWide(3), height: 36, type: 'solid', zone: 6 },
        { x: W * 2.57,  y: H * 0.52, width: tilesWide(3), height: 36, type: 'solid', zone: 6 },
        { x: W * 2.67,  y: H * 0.38, width: tilesWide(3), height: 36, type: 'solid', zone: 6 },
        { x: W * 2.56,  y: H * 0.24, width: tilesWide(4), height: 36, type: 'solid', zone: 6 },
        { x: W * 2.68,  y: H * 0.12, width: tilesWide(5), height: 36, type: 'solid', zone: 6 },
        { x: W * 2.80,  y: H * 0.54, width: tilesWide(2), height: 28, type: 'passthrough', zone: 6 },
        { x: W * 2.80,  y: H * 0.42, width: tilesWide(2), height: 28, type: 'passthrough', zone: 6 },
        { x: W * 2.74,  y: H * 0.72, width: tilesWide(1), height: 28, type: 'passthrough', zone: 6 },
        { x: W * 2.62,  y: H * 0.60, width: tilesWide(1), height: 28, type: 'passthrough', zone: 6 },
        { x: W * 2.75,  y: H * 0.30, width: tilesWide(2), height: 36, type: 'solid',       zone: 6 },
        // extra
        { x: W * 2.85,  y: H * 0.62, width: tilesWide(2), height: 36, type: 'solid',       zone: 6 },
        { x: W * 2.88,  y: H * 0.48, width: tilesWide(1), height: 28, type: 'passthrough', zone: 6 },
        { x: W * 2.72,  y: H * 0.19, width: tilesWide(2), height: 36, type: 'solid',       zone: 6 },
        { x: W * 2.84,  y: H * 0.14, width: tilesWide(2), height: 36, type: 'solid',       zone: 6 },

        // ════════════════════════════════
        // ZONE 7 — The End — Grand Finale
        // ════════════════════════════════
        { x: W * 2.92,  y: H * 0.75, width: tilesWide(10), height: 48, type: 'solid', zone: 1, dark: true },
        { x: W * 2.94,  y: H * 0.55, width: tilesWide(4),  height: 36, type: 'solid', zone: 1 },
        { x: W * 3.06,  y: H * 0.38, width: tilesWide(5),  height: 36, type: 'solid', zone: 1 },
        { x: W * 3.10,  y: H * 0.20, width: tilesWide(6),  height: 36, type: 'solid', zone: 1, dark: true },
    ];

    // ── End goal flag ──
    endGoal = {
        x: W * 3.12 + tilesWide(2),
        y: H * 0.20 - 80,
        width: 48,
        height: 80,
        triggered: false,
    };

    // ── Bushes (decorative, walk-through, drawn on top of background) ──
    bushes = [
        // Zone 1
        { x: W * 0.04,  y: H - 24 - 128, variant: 0 },
        { x: W * 0.12,  y: H * 0.76 - 96, variant: 2 },
        { x: W * 0.28,  y: H - 24 - 96,   variant: 0 },
        { x: W * 0.45,  y: H - 24 - 96,   variant: 2 },
        { x: W * 0.20,  y: H * 0.64 - 96, variant: 0 },
        { x: W * 0.52,  y: H * 0.16 - 96, variant: 2 },
        // Zone 2
        { x: W * 0.64,  y: H * 0.80 - 96, variant: 0 },
        { x: W * 0.78,  y: H - 24 - 96,   variant: 2 },
        { x: W * 0.66,  y: H * 0.20 - 96, variant: 0 },
        // Zone 3
        { x: W * 0.92,  y: H * 0.82 - 96, variant: 2 },
        { x: W * 1.00,  y: H * 0.65 - 96, variant: 0 },
        { x: W * 1.10,  y: H - 24 - 96,   variant: 2 },
        // Zone 4
        { x: W * 1.24,  y: H * 0.88 - 96, variant: 0 },
        { x: W * 1.44,  y: H * 0.74 - 96, variant: 2 },
        { x: W * 1.56,  y: H - 24 - 96,   variant: 0 },
        // Zone 5
        { x: W * 1.72,  y: H * 0.85 - 96, variant: 2 },
        { x: W * 1.95,  y: H - 24 - 96,   variant: 0 },
        // Zone 6
        { x: W * 2.57,  y: H * 0.80 - 96, variant: 0 },
        { x: W * 2.70,  y: H - 24 - 96,   variant: 2 },
        { x: W * 2.85,  y: H - 24 - 96,   variant: 0 },
        // End area
        { x: W * 2.94,  y: H * 0.75 - 96, variant: 2 },
        { x: W * 3.08,  y: H - 24 - 96,   variant: 0 },
    ];

    // ── Coins ──
    coins = [];
    coinScore = 0;

    // Zone 1
    coins.push({ x: W * 0.10 + 30, y: H * 0.76 - 30, collected: false });
    coins.push({ x: W * 0.18 + 30, y: H * 0.64 - 30, collected: false });
    coins.push({ x: W * 0.26 + 30, y: H * 0.52 - 30, collected: false });
    coins.push({ x: W * 0.34 + 30, y: H * 0.40 - 30, collected: false });
    coins.push({ x: W * 0.42 + 30, y: H * 0.28 - 30, collected: false });
    coins.push({ x: W * 0.50 + 40, y: H * 0.16 - 30, collected: false });
    coins.push({ x: W * 0.38 + 30, y: H * 0.68 - 30, collected: false });

    // Zone 2
    coins.push({ x: W * 0.72 + 50, y: H * 0.63 - 30, collected: false });
    coins.push({ x: W * 0.62 + 30, y: H * 0.48 - 30, collected: false });
    coins.push({ x: W * 0.74 + 50, y: H * 0.34 - 30, collected: false });
    coins.push({ x: W * 0.62 + 60, y: H * 0.20 - 30, collected: false });
    coins.push({ x: W * 0.78 + 30, y: H * 0.57 - 30, collected: false });
    coins.push({ x: W * 0.77 + 30, y: H * 0.28 - 30, collected: false });
    coins.push({ x: W * 0.68 + 20, y: H * 0.13 - 30, collected: false });
    coins.push({ x: W * 0.85 + 20, y: H * 0.23 - 30, collected: false });
    // hidden lower path
    coins.push({ x: W * 0.76 + 20, y: H * 0.85,      collected: false });
    coins.push({ x: W * 0.70 + 10, y: H * 0.90,      collected: false });
    // upper shelf bonus row
    coins.push({ x: W * 0.76 + 20, y: H * 0.07 - 30, collected: false });
    coins.push({ x: W * 0.84 + 20, y: H * 0.07 - 30, collected: false });
    coins.push({ x: W * 0.92 + 20, y: H * 0.07 - 30, collected: false });

    // Zone 3
    coins.push({ x: W * 0.96,      y: H * 0.57,       collected: false });
    coins.push({ x: W * 1.04,      y: H * 0.57,       collected: false });
    coins.push({ x: W * 1.12,      y: H * 0.57,       collected: false });
    coins.push({ x: W * 0.99 + 30, y: H * 0.40,       collected: false });
    coins.push({ x: W * 1.04 + 30, y: H * 0.24,       collected: false });
    coins.push({ x: W * 1.01 + 30, y: H * 0.10,       collected: false });
    coins.push({ x: W * 1.15 + 30, y: H * 0.55 - 30,  collected: false });
    coins.push({ x: W * 1.18 + 30, y: H * 0.20 - 30,  collected: false });

    // Zone 4
    coins.push({ x: W * 1.44 + 40, y: H * 0.74 - 30, collected: false });
    coins.push({ x: W * 1.57 + 40, y: H * 0.60 - 30, collected: false });
    coins.push({ x: W * 1.46 + 40, y: H * 0.46 - 30, collected: false });
    coins.push({ x: W * 1.32 + 40, y: H * 0.33 - 30, collected: false });
    coins.push({ x: W * 1.44 + 40, y: H * 0.20 - 30, collected: false });
    coins.push({ x: W * 1.57 + 50, y: H * 0.10 - 30, collected: false });
    coins.push({ x: W * 1.65 + 30, y: H * 0.50 - 30, collected: false });
    coins.push({ x: W * 1.60 + 30, y: H * 0.22 - 30, collected: false });

    // Zone 5 — sky bridge run
    for (let i = 0; i < 8; i++) {
        coins.push({ x: W * 1.86 + i * tilesWide(1.3), y: H * 0.10 - 30, collected: false });
    }
    coins.push({ x: W * 2.37 + 30, y: H * 0.42 - 30, collected: false });
    coins.push({ x: W * 2.40 + 30, y: H * 0.28 - 30, collected: false });
    coins.push({ x: W * 2.04 + 30, y: H * 0.48 - 30, collected: false });

    // Zone 6
    coins.push({ x: W * 2.57 + 40, y: H * 0.80 - 30, collected: false });
    coins.push({ x: W * 2.67 + 40, y: H * 0.66 - 30, collected: false });
    coins.push({ x: W * 2.59 + 40, y: H * 0.52 - 30, collected: false });
    coins.push({ x: W * 2.69 + 40, y: H * 0.38 - 30, collected: false });
    coins.push({ x: W * 2.58 + 50, y: H * 0.24 - 30, collected: false });
    coins.push({ x: W * 2.70 + 60, y: H * 0.12 - 30, collected: false });
    coins.push({ x: W * 2.82 + 20, y: H * 0.54 - 30, collected: false });
    coins.push({ x: W * 2.82 + 20, y: H * 0.42 - 30, collected: false });
    coins.push({ x: W * 2.85 + 20, y: H * 0.62 - 30, collected: false });
    coins.push({ x: W * 2.84 + 20, y: H * 0.14 - 30, collected: false });

    // End area
    coins.push({ x: W * 2.96 + 30, y: H * 0.55 - 30, collected: false });
    coins.push({ x: W * 3.08 + 40, y: H * 0.38 - 30, collected: false });
    coins.push({ x: W * 3.12 + 30, y: H * 0.20 - 30, collected: false });
    coins.push({ x: W * 3.18 + 30, y: H * 0.20 - 30, collected: false });
    coins.push({ x: W * 3.24 + 30, y: H * 0.20 - 30, collected: false });
}

// ── Figure out which zone we're in based on world X ──
function getZoneAt(worldX) {
    const W = canvas.width;
    if (worldX < W * 0.62)  return 1;
    if (worldX < W * 0.90)  return 2;
    if (worldX < W * 1.22)  return 3;
    if (worldX < W * 1.70)  return 4;
    if (worldX < W * 2.55)  return 5;
    if (worldX < W * 2.92)  return 6;
    return 1; // end area back to zone 1 style
}

// ── Draw end goal flag ──
function drawEndGoal(ctx) {
    if (!endGoal || endGoal.triggered) return;
    const { x, y, width, height } = endGoal;
    const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 300);
    ctx.save();
    ctx.fillStyle = `rgba(255, 220, 50, ${pulse * 0.35})`;
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ccc';
    ctx.fillRect(x + width / 2 - 4, y, 8, height);
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.moveTo(x + width / 2 + 4, y + 8);
    ctx.lineTo(x + width / 2 + 40, y + 24);
    ctx.lineTo(x + width / 2 + 4, y + 40);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#888';
    ctx.fillRect(x, y + height - 10, width, 10);
    ctx.restore();
}

// ── Check end goal ──
function checkEndGoal() {
    if (!endGoal || endGoal.triggered || gameWon) return;
    const eg = endGoal;
    if (
        player.x + player.width  > eg.x &&
        player.x                 < eg.x + eg.width &&
        player.y + player.height > eg.y &&
        player.y                 < eg.y + eg.height
    ) {
        endGoal.triggered = true;
        gameWon = true;
    }
}

// ── Draw win screen (call OUTSIDE camera transform) ──
function drawWinScreen(ctx) {
    if (!gameWon) return;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.font = 'bold 72px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.strokeText('YOU WIN!', canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#fff';
    ctx.strokeText(`Coins: ${coinScore}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText(`Coins: ${coinScore}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.font = '22px Arial';
    ctx.fillStyle = '#aaa';
    ctx.strokeStyle = 'transparent';
    ctx.fillText('Press R to play again', canvas.width / 2, canvas.height / 2 + 70);
    ctx.restore();
}

// ── Draw platforms ──
function drawplatforms(ctx) {
    // Draw bushes first (behind platforms)
    for (const bush of bushes) {
        drawBush(ctx, bush.x, bush.y, bush.variant);
    }

    for (const platform of platforms) {
        if (platform.isFloor || platform.isCeiling) {
            ctx.fillStyle = '#333';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            continue;
        }
        if (platform.type === 'solid') {
            if (sprites.world) {
                drawPlatformSprite(ctx, platform.x, platform.y, platform.width, platform.zone);
            } else {
                ctx.fillStyle = '#888';
                ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            }
        } else {
            // passthrough — draw faintly
            if (sprites.world) {
                ctx.globalAlpha = 0.7;
                drawPlatformSprite(ctx, platform.x, platform.y, platform.width, platform.zone);
                ctx.globalAlpha = 1.0;
            } else {
                ctx.fillStyle = 'rgba(150,150,150,0.6)';
                ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            }
        }
    }

    drawCoins(ctx);
    drawEndGoal(ctx);
}

// ── Draw coins ──
function drawCoins(ctx) {
    for (const coin of coins) {
        if (coin.collected) continue;
        drawCoinSprite(ctx, coin.x, coin.y, 10);
    }
}

// ── Collect coins ──
function collectCoins() {
    for (const coin of coins) {
        if (coin.collected) continue;
        const coinRadius = 10;
        const dx = (player.x + player.width / 2) - coin.x;
        const dy = (player.y + player.height / 2) - coin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < player.width / 2 + coinRadius) {
            coin.collected = true;
            coinScore++;
        }
    }
}

// ── X collision ──
function platformCollisionX() {
    for (const platform of platforms) {
        if (platform.type !== 'solid') continue;
        const overlapX = player.x + player.width > platform.x &&
                         player.x < platform.x + platform.width;
        const overlapY = player.y + player.height > platform.y &&
                         player.y < platform.y + platform.height;
        if (!overlapX || !overlapY) continue;
        const fromLeft  = (player.x + player.width) - platform.x;
        const fromRight = (platform.x + platform.width) - player.x;
        if (fromLeft < fromRight) {
            player.x = platform.x - player.width;
        } else {
            player.x = platform.x + platform.width;
        }
    }
}

// ── Y collision ──
function platformCollisionY() {
    for (const platform of platforms) {
        const overlapX = player.x + player.width > platform.x &&
                         player.x < platform.x + platform.width;
        const overlapY = player.y + player.height > platform.y &&
                         player.y < platform.y + platform.height;
        if (!overlapX || !overlapY) continue;
        const fromTop    = (player.y + player.height) - platform.y;
        const fromBottom = (platform.y + platform.height) - player.y;
        if (fromTop < fromBottom) {
            if (platform.type === 'solid' || (platform.type === 'passthrough' && player.dy >= 0)) {
                player.y        = platform.y - player.height;
                player.dy       = 0;
                player.grounded = true;
                jumpsLeft       = 2;
            }
        } else {
            if (platform.type === 'solid') {
                player.y  = platform.y + platform.height;
                player.dy = 0;
            }
        }
    }
}

// ── Main collision handler ──
function platformCollision() {
    platformCollisionX();
    platformCollisionY();
}