const canvas = document.getElementById('gameCanvas');
const PLAYER_SCALE = 2;
const FRAME_SIZE = 32;
const HITBOX_PADDING = 8;

const player = {
    x: 0,
    y: 0,
    width: FRAME_SIZE * PLAYER_SCALE,
    height: FRAME_SIZE * PLAYER_SCALE,
    speed: 5,
    dy: 0,
    jumpPower: 12,
    grounded: false,
};

const gravity = 0.5;

function movement() {
    if (keys['Space'] && player.grounded) {
        player.dy = -player.jumpPower;
        player.grounded = false;
    }
    if (keys['KeyA']) player.x -= player.speed;
    if (keys['KeyD']) player.x += player.speed;

    player.dy += gravity;
    player.y += player.dy;

    const floor = canvas.height - player.height + HITBOX_PADDING;
    if (player.y >= floor) {
        player.y = floor;
        player.dy = 0;
        player.grounded = true;
    }

    platformCollision();

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}