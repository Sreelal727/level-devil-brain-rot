// ============================================
// RandomPlatformTroll - Platforms shift positions periodically
// ============================================

class RandomPlatformTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.interval = config.interval || 3000;
        this.shiftAmount = config.shiftAmount || 30;
        this.platformIds = config.platformIds || [];
        this.timer = 0;
        this.shiftCount = 0;
        this.maxShifts = config.maxShifts || 999;
    }

    init() {
        this.timer = this.interval;
        this.activate();
    }

    update(time, delta) {
        if (!this.active || this.shiftCount >= this.maxShifts) return;

        this.timer -= delta;
        if (this.timer > 0) return;
        this.timer = this.interval;
        this.shiftCount++;

        const player = this.scene.playerController.sprite;

        for (const id of this.platformIds) {
            const plat = this.scene.platformFactory.getPlatformByName(id);
            if (!plat) continue;

            // Don't move platform player is standing on
            if (player && !this.scene.playerController.isDead) {
                const bounds = plat.getBounds();
                if (player.x >= bounds.left && player.x <= bounds.right &&
                    player.y + PLAYER.HEIGHT / 2 >= bounds.top - 10 &&
                    player.y + PLAYER.HEIGHT / 2 <= bounds.top + 10) {
                    continue;
                }
            }

            const shiftX = (Math.random() - 0.5) * this.shiftAmount * 2;
            const shiftY = (Math.random() - 0.5) * this.shiftAmount;
            const newX = Phaser.Math.Clamp(plat.x + shiftX, WALL_THICKNESS + 40, GAME.WIDTH - WALL_THICKNESS - 40);
            const newY = Phaser.Math.Clamp(plat.y + shiftY, PLATFORM_THICKNESS + 40, GAME.HEIGHT - PLATFORM_THICKNESS - 40);

            SoundManager.playTone('troll');

            this.scene.tweens.add({
                targets: plat,
                x: newX,
                y: newY,
                duration: 300,
                ease: 'Power2',
                onComplete: () => {
                    plat.refreshBody();
                },
            });
        }
    }
}
