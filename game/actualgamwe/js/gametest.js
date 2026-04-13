const context = canvas.getContext('2d');
let lastTime = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.x = (canvas.width / 2) - (player.width / 2);
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.grounded = true;
}

function draw(deltaTime) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawplatforms(context);
    if (playerAnimator) {
        if (keys['KeyA'] || keys['KeyD']) {
            playerAnimator.play("RUN");
        } else {
            playerAnimator.play("IDLE");
        }
        playerAnimator.update(deltaTime);
        const flipped = keys['KeyA'];
        context.save();
        if (flipped) {
            context.scale(-1, 1);
            playerAnimator.draw(context, -(player.x + player.width), player.y, PLAYER_SCALE);
        } else {
            playerAnimator.draw(context, player.x, player.y, PLAYER_SCALE);
        }
        context.restore();
    } else {
        context.fillStyle = 'red';
        context.fillRect(player.x, player.y, player.width, player.height);
    }
}

function gameloop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    movement();
    draw(deltaTime);
    requestAnimationFrame(gameloop);
}

window.addEventListener('resize', resizeCanvas);
loadSprites(() => {
    resizeCanvas();
    requestAnimationFrame(gameloop);
});