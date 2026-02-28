// ============================================
// GravityFlipTroll - Flips gravity at a trigger point
// ============================================

class GravityFlipTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.triggerX = config.triggerX || GAME.WIDTH / 2;
        this.triggered = false;
    }

    init() {
        this.activate();
    }

    update(time, delta) {
        if (!this.active || this.triggered) return;

        const player = this.scene.playerController.sprite;
        if (!player || this.scene.playerController.isDead) return;

        if (player.x >= this.triggerX) {
            this.triggered = true;
            this.scene.playerController.flipGravity();
            this.scene.shakeCamera(0.015, 400);

            // Flash screen (fixed to camera for scrolling levels)
            const flash = this.scene.add.rectangle(
                GAME.WIDTH / 2, GAME.HEIGHT / 2, GAME.WIDTH, GAME.HEIGHT, 0xFFFFFF, 0.5
            ).setDepth(100).setScrollFactor(0);
            this.scene.tweens.add({
                targets: flash,
                alpha: 0,
                duration: 300,
                onComplete: () => flash.destroy(),
            });

            // Warning text (fixed to camera for scrolling levels)
            const warn = this.scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2, 'GRAVITY FLIP!', {
                fontFamily: 'Courier New',
                fontSize: '28px',
                color: '#CC3333',
                fontStyle: 'bold',
            }).setOrigin(0.5).setDepth(101).setScrollFactor(0);

            this.scene.tweens.add({
                targets: warn,
                alpha: 0,
                y: warn.y - 50,
                duration: 1000,
                onComplete: () => warn.destroy(),
            });
        }
    }
}
