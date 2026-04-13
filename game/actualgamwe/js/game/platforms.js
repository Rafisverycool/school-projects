const platforms = [
    { x: 200, y: 1250, width: 200, height: 20 },
    { x: 500, y: 300, width: 150, height: 20 },
]

function drawplatforms(ctx) {
    ctx.fillStyle = 'red';
    for (const platform of platforms) {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
}

function platformCollision() {
    for (const platform of platforms) {
        if (
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height + player.dy + 1
        )
        {
            player.y = platform.y - player.height + HITBOX_PADDING;
            player.dy = 0;
            player.grounded = true;
        }
    }
}