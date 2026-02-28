// ============================================
// PlayerController - Movement, jump, death
// with animated stick figure + touch support
// ============================================

class PlayerController {
    constructor(scene) {
        this.scene = scene;
        this.sprite = null;
        this.cursors = null;
        this.wasd = null;
        this.spaceBar = null;
        this.isDead = false;
        this.gravityFlipped = false;
        this.jumpBufferTimer = 0;
        this.coyoteTimer = 0;
        this.wasOnFloor = false;
        this.facingRight = true;
        this.currentAnim = '';

        // Touch state
        this.touchLeft = false;
        this.touchRight = false;
        this.touchJump = false;
        this.touchJumpConsumed = false;
    }

    create(x, y) {
        this.sprite = this.scene.physics.add.sprite(x, y, 'stickfig_idle_0');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setSize(PLAYER.WIDTH, PLAYER.HEIGHT);
        this.sprite.body.setOffset(
            (PLAYER.TEX_W - PLAYER.WIDTH) / 2,
            PLAYER.TEX_H - PLAYER.HEIGHT
        );
        this.sprite.body.setMaxVelocityY(PHYSICS.MAX_FALL_SPEED);
        this.sprite.setDepth(10);

        // Keyboard input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.scene.input.keyboard.addKey('W'),
            down: this.scene.input.keyboard.addKey('S'),
            left: this.scene.input.keyboard.addKey('A'),
            right: this.scene.input.keyboard.addKey('D'),
        };
        this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.isDead = false;
        this.gravityFlipped = false;
        this.facingRight = true;
        this.playAnim('player_idle');

        // Setup touch controls
        this.setupTouchControls();
    }

    setupTouchControls() {
        const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
        const controls = document.getElementById('touch-controls');
        if (!controls) return;

        if (isTouchDevice) {
            controls.classList.add('visible');
        }

        const btnLeft = document.getElementById('btn-left');
        const btnRight = document.getElementById('btn-right');
        const btnJump = document.getElementById('btn-jump');

        if (btnLeft) {
            btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchLeft = true; btnLeft.classList.add('pressed'); }, { passive: false });
            btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); this.touchLeft = false; btnLeft.classList.remove('pressed'); }, { passive: false });
            btnLeft.addEventListener('touchcancel', () => { this.touchLeft = false; btnLeft.classList.remove('pressed'); });
        }

        if (btnRight) {
            btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchRight = true; btnRight.classList.add('pressed'); }, { passive: false });
            btnRight.addEventListener('touchend', (e) => { e.preventDefault(); this.touchRight = false; btnRight.classList.remove('pressed'); }, { passive: false });
            btnRight.addEventListener('touchcancel', () => { this.touchRight = false; btnRight.classList.remove('pressed'); });
        }

        if (btnJump) {
            btnJump.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.touchJump = true;
                this.touchJumpConsumed = false;
                btnJump.classList.add('pressed');
            }, { passive: false });
            btnJump.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.touchJump = false;
                btnJump.classList.remove('pressed');
            }, { passive: false });
            btnJump.addEventListener('touchcancel', () => {
                this.touchJump = false;
                btnJump.classList.remove('pressed');
            });
        }
    }

    playAnim(key) {
        if (this.currentAnim === key) return;
        this.currentAnim = key;
        this.sprite.play(key, true);
    }

    update(delta) {
        if (this.isDead) return;

        const body = this.sprite.body;
        const onFloor = this.gravityFlipped ? body.blocked.up : body.blocked.down;

        // Coyote time
        if (onFloor) {
            this.coyoteTimer = 80;
        } else if (this.coyoteTimer > 0) {
            this.coyoteTimer -= delta;
        }

        // Horizontal movement (keyboard + touch)
        const left = this.cursors.left.isDown || this.wasd.left.isDown || this.touchLeft;
        const right = this.cursors.right.isDown || this.wasd.right.isDown || this.touchRight;

        if (left) {
            body.setVelocityX(-PHYSICS.PLAYER_SPEED);
            this.facingRight = false;
        } else if (right) {
            body.setVelocityX(PHYSICS.PLAYER_SPEED);
            this.facingRight = true;
        } else {
            body.setVelocityX(0);
        }

        // Flip sprite based on direction
        this.sprite.setFlipX(!this.facingRight);
        this.sprite.setFlipY(this.gravityFlipped);

        // Jump (keyboard)
        const keyboardJump = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                            Phaser.Input.Keyboard.JustDown(this.wasd.up) ||
                            Phaser.Input.Keyboard.JustDown(this.spaceBar);

        // Jump (touch - trigger once per press)
        const touchJumpTriggered = this.touchJump && !this.touchJumpConsumed;
        if (touchJumpTriggered) {
            this.touchJumpConsumed = true;
        }

        if (keyboardJump || touchJumpTriggered) {
            this.jumpBufferTimer = 100;
        } else if (this.jumpBufferTimer > 0) {
            this.jumpBufferTimer -= delta;
        }

        if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
            const jumpVel = this.gravityFlipped ? -PHYSICS.JUMP_VELOCITY : PHYSICS.JUMP_VELOCITY;
            body.setVelocityY(jumpVel);
            this.jumpBufferTimer = 0;
            this.coyoteTimer = 0;
            SoundManager.playTone('jump');
        }

        // Animation selection
        if (onFloor) {
            if (left || right) {
                this.playAnim('player_run');
            } else {
                this.playAnim('player_idle');
            }
        } else {
            if (body.velocity.y < 0 && !this.gravityFlipped || body.velocity.y > 0 && this.gravityFlipped) {
                this.playAnim('player_jump');
            } else {
                this.playAnim('player_fall');
            }
        }

        // Landing sound
        if (onFloor && !this.wasOnFloor) {
            SoundManager.playTone('land');
        }
        this.wasOnFloor = onFloor;

        // Fall off world check
        const worldH = this.scene.physics.world.bounds.height;
        if (this.sprite.y > worldH + 50 || this.sprite.y < -50) {
            this.die();
        }
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        SoundManager.playTone('death');
        this.sprite.body.setVelocity(0, 0);
        this.sprite.body.setAllowGravity(false);
        this.playAnim('player_death');

        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                this.scene.onPlayerDeath();
            },
        });
    }

    flipGravity() {
        this.gravityFlipped = !this.gravityFlipped;
        const newGrav = this.gravityFlipped ? -PHYSICS.GRAVITY : PHYSICS.GRAVITY;
        this.sprite.body.setGravityY(newGrav - PHYSICS.GRAVITY);
        SoundManager.playTone('gravity_flip');
    }

    getPosition() {
        return { x: this.sprite.x, y: this.sprite.y };
    }

    destroy() {
        if (this.sprite) {
            this.sprite.destroy();
            this.sprite = null;
        }
        // Reset touch state
        this.touchLeft = false;
        this.touchRight = false;
        this.touchJump = false;
    }
}
