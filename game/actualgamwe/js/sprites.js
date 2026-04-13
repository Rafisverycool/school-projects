const sprites = {};
let playerAnimator = null;

function loadSprites(onComplete) {
    const img = new Image();
    img.src = 'sprites/sprites/knight.png';
    img.onload = () => {
        sprites.knight = img;
        playerAnimator = new SpriteAnimator(img, 32, 32);
        playerAnimator.addAnimation("IDLE",  0, 4,  8,  true);
        playerAnimator.addAnimation("RUN",   2, 8,  12, true);
        playerAnimator.addAnimation("RUN2",  3, 8,  12, true);
        playerAnimator.addAnimation("ROLL",  4, 8,  12, false);
        playerAnimator.addAnimation("HIT",   6, 4,  10, false);
        playerAnimator.addAnimation("DEATH", 7, 4,  8,  false);
        playerAnimator.play("IDLE");
        onComplete();
    };
    img.onerror = () => console.warn('Failed to load knight sprite');
}