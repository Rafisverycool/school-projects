const canvas = document.getElementById('gameCanvas');
const PLAYER_SCALE = 2;
const FRAME_SIZE = 32;
const HITBOX_PADDING = 8;
const player = {
    x: 0,
    y: 0,
    width: (FRAME_SIZE * PLAYER_SCALE) - (HITBOX_PADDING * 2),
    height: (FRAME_SIZE * PLAYER_SCALE) - (HITBOX_PADDING * 2),
    speed: 5,
    dy: 0,
    jumpPower: 12,
    grounded: false,
};
const gravity = 0.5;
let jumpsLeft = 2;
let jumpCooldown = 0;

function movement() {
    if (jumpCooldown > 0) jumpCooldown--;

    if (keys['Space'] && jumpsLeft > 0 && jumpCooldown === 0 && (player.grounded || jumpsLeft < 2)) {
        player.dy = -player.jumpPower;
        player.grounded = false;
        jumpsLeft--;
        jumpCooldown = 20;
    }

    if (keys['KeyA']) player.x -= player.speed;
    if (keys['KeyD']) player.x += player.speed;

    player.dy += gravity;
    player.y += player.dy;

    const floor = canvas.height - player.height;
    if (player.y >= floor) {
        player.y = floor;
        player.dy = 0;
        player.grounded = true;
        jumpsLeft = 2;
    }

    platformCollision();

    // Left wall — can't go before the start of the world
    if (player.x < 0) player.x = 0;
    // Right clamp removed — player can now walk into the extended world
}