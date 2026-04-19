const sprites = {};
let playerAnimator = null;

// ── Sprite sheet tile layout (16px per tile, 16x16 grid) ──
// Platform surface tiles: rows 0-2, cols 0-8
//   col 0 = green-dirt, 1 = brown, 2 = tan, 3 = beige, 4 = red-brown, 5 = rose, 6 = teal, 7 = blue, 8 = slate
// Decorations:
//   Bush (small): cols 0-1, rows 3-5  (green round bush)
//   Tree (palm):  cols 5-6, rows 3-8
// Tileset background strips (cols 0-4, rows 9-15):
//   col 0 = white → sky blue (sky/day)
//   col 1 = peach → orange → yellow (warm/fire zone)
//   col 2 = pink → red → magenta (magic/purple zone)
//   col 3 = light gray → slate (stone/cave zone)
//   col 4 = sky blue → deep blue (water/ice zone)

function loadSprites(onComplete) {
    let loaded = 0;
    const total = 3; // knight, platforms, coin
    function checkDone() {
        loaded++;
        if (loaded >= total) onComplete();
    }

    // Knight sprite
    const knightImg = new Image();
    knightImg.src = 'sprites/sprites/knight.png';
    knightImg.onload = () => {
        sprites.knight = knightImg;
        playerAnimator = new SpriteAnimator(knightImg, 32, 32);
        playerAnimator.addAnimation("IDLE",  0, 4,  8,  true);
        playerAnimator.addAnimation("RUN",   2, 8,  12, true);
        playerAnimator.addAnimation("RUN2",  3, 8,  12, true);
        playerAnimator.addAnimation("ROLL",  4, 8,  12, false);
        playerAnimator.addAnimation("HIT",   6, 4,  10, false);
        playerAnimator.addAnimation("DEATH", 7, 4,  8,  false);
        playerAnimator.play("IDLE");
        checkDone();
    };
    knightImg.onerror = () => { console.warn('Failed to load knight sprite'); checkDone(); };

    // World / tileset sprite sheet
    const worldImg = new Image();
    worldImg.src = 'sprites/sprites/world.png';
    worldImg.onload = () => {
        sprites.world = worldImg;
        checkDone();
    };
    worldImg.onerror = () => {
        console.warn('Failed to load world sprite, will use fallback');
        checkDone();
    };

    // Coin sprite
    const coinImg = new Image();
    coinImg.src = 'sprites/sprites/coin.png';
    coinImg.onload = () => {
        sprites.coin = coinImg;
        checkDone();
    };
    coinImg.onerror = () => {
        console.warn('Failed to load coin sprite, will use fallback');
        checkDone();
    };
}

// ── Zone → tileset column mapping ──
// Each zone gets a background strip col (0-4) and a platform surface col (0-8)
const ZONE_CONFIG = {
    1: { bgCol: 0, platCol: 0 }, // green-dirt / sky
    2: { bgCol: 2, platCol: 6 }, // teal platforms / pink-magic bg
    3: { bgCol: 1, platCol: 4 }, // red-brown platforms / warm bg
    4: { bgCol: 4, platCol: 7 }, // blue platforms / water bg
    5: { bgCol: 3, platCol: 8 }, // slate platforms / stone bg
    6: { bgCol: 1, platCol: 5 }, // rose platforms / warm bg
};

// ── Draw scrolling tileset background ──
// Call this before drawing platforms, inside camera transform.
// bgScrollX = cameraX (for parallax offset)
function drawTileBackground(ctx, cameraX, cameraY, canvasW, canvasH, zone) {
    const img = sprites.world;
    if (!img) {
        // Fallback solid colours per zone
        const fallbacks = { 1: '#6b8c6b', 2: '#3a2a4a', 3: '#4a2a2a', 4: '#1a2a4a', 5: '#3a3a3a', 6: '#4a3a2a' };
        ctx.fillStyle = fallbacks[zone] || '#444';
        ctx.fillRect(cameraX, cameraY, canvasW, canvasH);
        return;
    }

    const TILE = 16;
    const SCALE = 4; // 16px tiles drawn at 64px
    const DRAWN = TILE * SCALE;

    const cfg = ZONE_CONFIG[zone] || ZONE_CONFIG[1];
    const srcX = cfg.bgCol * TILE;

    // Draw a 7-row vertical strip tiled across the screen
    // Each row in the strip (rows 9-15) is a slightly different shade
    const stripRows = 7; // rows 9..15
    const totalStripH = stripRows * TILE;

    // Tile horizontally across visible area, use parallax (0.5x speed)
    const parallaxX = Math.floor(cameraX * 0.5);
    const startTileX = Math.floor((cameraX + parallaxX) / DRAWN) * DRAWN - DRAWN;
    const endTileX = cameraX + canvasW + DRAWN;

    for (let tx = startTileX; tx < endTileX; tx += DRAWN) {
        // Tile vertically too
        for (let ty = Math.floor(cameraY / DRAWN) * DRAWN - DRAWN; ty < cameraY + canvasH + DRAWN; ty += DRAWN) {
            // Pick which strip row based on world Y depth
            const depth = Math.floor(((ty - cameraY + DRAWN) / (canvasH + DRAWN)) * stripRows);
            const stripRow = Math.min(Math.max(depth, 0), stripRows - 1);
            const srcY = (9 + stripRow) * TILE;

            ctx.drawImage(img, srcX, srcY, TILE, TILE, tx - parallaxX, ty, DRAWN, DRAWN);
        }
    }
}

// ── Draw a platform using the world tileset ──
function drawPlatformSprite(ctx, x, y, width, zone = 1) {
    const img = sprites.world;
    if (!img) {
        ctx.fillStyle = '#888';
        ctx.fillRect(x, y, width, 36);
        return;
    }

    const TILE = 16;
    const SCALE = 4;
    const srcH = 9; // top 9 rows of platform tile = the "cap" visual
    const dstH = srcH * SCALE;
    const capSrcW = 16;
    const dstCap = capSrcW * SCALE;
    const midSrcW = 16;
    const dstMid = midSrcW * SCALE;

    // Determine which platform surface column to use
    const cfg = ZONE_CONFIG[zone] || ZONE_CONFIG[1];
    const platCol = cfg.platCol;
    const srcY = 0; // platform tiles start at row 0

    const srcXLeft  = platCol * TILE;
    const srcXMid   = platCol * TILE; // same tile repeated for middle
    const srcXRight = platCol * TILE;

    // Left cap
    ctx.drawImage(img, srcXLeft, srcY, capSrcW, srcH, x, y, dstCap, dstH);

    // Middle fill
    let currentX = x + dstCap;
    const endX = x + width - dstCap;
    while (currentX + dstMid <= endX) {
        ctx.drawImage(img, srcXMid, srcY, midSrcW, srcH, currentX, y, dstMid, dstH);
        currentX += dstMid;
    }
    const remaining = endX - currentX;
    if (remaining > 0) {
        const partialSrcW = Math.max(1, Math.ceil(remaining / SCALE));
        ctx.drawImage(img, srcXMid, srcY, partialSrcW, srcH, currentX, y, remaining, dstH);
    }

    // Right cap
    ctx.drawImage(img, srcXRight, srcY, capSrcW, srcH, x + width - dstCap, y, dstCap, dstH);
}

// ── Draw a bush decoration (walkthrough, visual only) ──
// Draws a 2x2 tile bush from the world sheet (cols 0-1, rows 3-5)
function drawBush(ctx, x, y, variant = 0) {
    const img = sprites.world;
    const TILE = 16;
    const SCALE = 4;

    if (!img) {
        // Fallback: draw a simple green oval
        ctx.save();
        ctx.fillStyle = '#2d7a2d';
        ctx.beginPath();
        ctx.ellipse(x + 32, y + 20, 36, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#3da03d';
        ctx.beginPath();
        ctx.ellipse(x + 24, y + 14, 22, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
    }

    // Bush sprite is a 2x2 tile at (0,3)-(1,4)
    // variant 0 = full bush (2 tiles wide x 2 tall)
    // variant 1 = small single tile (0,3)
    const srcX = variant === 1 ? TILE : 0;
    const srcY = 3 * TILE;

    if (variant === 2) {
        // Small single bush tile
        ctx.drawImage(img, 0, 3*TILE, TILE*2, TILE*2, x, y, TILE*2*SCALE, TILE*2*SCALE);
    } else {
        // Full 2x2 bush
        ctx.drawImage(img, 0, 3*TILE, TILE*2, TILE*3, x, y, TILE*2*SCALE, TILE*3*SCALE);
    }
}

// ── Draw coin (uses coin.png or fallback) ──
function drawCoinSprite(ctx, x, y, radius = 8) {
    const img = sprites.coin;
    if (img) {
        const size = radius * 2.5;
        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
    } else {
        // Fallback circle coin
        ctx.save();
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(x - 2, y - 2, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}