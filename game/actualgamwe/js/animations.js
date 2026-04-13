class SpriteAnimator {
  constructor(image, frameWidth, frameHeight) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.animations = {};
    this.currentAnim = null;
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.frameInterval = 100;
    this.loop = true;
    this.done = false;
  }

  addAnimation(name, row, frames, fps = 10, loop = true) {
    this.animations[name] = { row, frames, fps, loop };
  }

  play(name) {
    if (this.currentAnim === name) return;
    this.currentAnim = name;
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.done = false;
    const anim = this.animations[name];
    if (anim) {
      this.frameInterval = 1000 / anim.fps;
      this.loop = anim.loop;
    }
  }

  update(deltaTime) {
    if (!this.currentAnim || this.done) return;
    const anim = this.animations[this.currentAnim];
    if (!anim) return;
    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.frameInterval) {
      this.frameTimer = 0;
      this.currentFrame++;
      if (this.currentFrame >= anim.frames) {
        if (this.loop) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = anim.frames - 1;
          this.done = true;
        }
      }
    }
  }

  draw(ctx, x, y, scale = 1) {
    if (!this.currentAnim) return;
    const anim = this.animations[this.currentAnim];
    if (!anim) return;
    const srcX = this.currentFrame * this.frameWidth;
    const srcY = anim.row * this.frameHeight;
    ctx.drawImage(
        this.image,
        srcX, srcY,
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * scale, this.frameHeight * scale
    );
}
}