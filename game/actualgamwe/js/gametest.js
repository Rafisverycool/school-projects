const context = canvas.getContext('2d');
let lastTime = 0;
let cameraX = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initPlatforms();
    player.x = (canvas.width / 2) - (player.width / 2);
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.grounded = true;
    cameraX = 0;
}

function drawBackground(ctx) {
    const zone2Start = canvas.width * 0.82;

    const z1ScreenEnd = Math.min(canvas.width, zone2Start - cameraX);
    if (z1ScreenEnd > 0) {
        ctx.fillStyle = '#6b6b6b';
        ctx.fillRect(0, 0, z1ScreenEnd, canvas.height);
    }

    const z2ScreenStart = Math.max(0, zone2Start - cameraX);
    if (z2ScreenStart < canvas.width) {
        ctx.fillStyle = '#3a2a4a';
        ctx.fillRect(z2ScreenStart, 0, canvas.width - z2ScreenStart, canvas.height);
    }

    const seam = zone2Start - cameraX;
    if (seam > 0 && seam < canvas.width) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(seam, 0);
        ctx.lineTo(seam, canvas.height);
        ctx.stroke();
    }
}

function updateCamera() {
    const targetX = player.x - canvas.width * 0.4;
    cameraX = Math.max(0, targetX);
}

function draw(deltaTime) {
    drawBackground(context);

    context.save();
    context.translate(-cameraX, 0);

    drawplatforms(context);

    // playerAnimator is declared in sprites.js — no 'let' here
    if (playerAnimator) {
        if (keys['KeyA'] || keys['KeyD']) {
            playerAnimator.play("RUN");
        } else {
            playerAnimator.play("IDLE");
        }
        playerAnimator.update(deltaTime);
        const spriteX = player.x - HITBOX_PADDING;
        const spriteY = player.y - HITBOX_PADDING;
        const flipped = keys['KeyA'];
        context.save();
        if (flipped) {
            context.scale(-1, 1);
            playerAnimator.draw(context, -(spriteX + FRAME_SIZE * PLAYER_SCALE), spriteY, PLAYER_SCALE);
        } else {
            playerAnimator.draw(context, spriteX, spriteY, PLAYER_SCALE);
        }
        context.restore();
    } else {
        context.fillStyle = 'red';
        context.fillRect(player.x, player.y, player.width, player.height);
    }

    context.restore();
}

function gameloop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    movement();
    updateCamera();
    draw(deltaTime);
    requestAnimationFrame(gameloop);
}

window.addEventListener('resize', resizeCanvas);
loadSprites(() => {
    resizeCanvas();
    requestAnimationFrame(gameloop);
});