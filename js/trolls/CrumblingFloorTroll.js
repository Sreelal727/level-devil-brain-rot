// ============================================
// CrumblingFloorTroll - Floor crumbles after player lands
// ============================================

class CrumblingFloorTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.crumbledPlatforms = new Set();
        this.delay = config.delay || 500;
    }

    init() {
        this.activate();
    }

    update(time, delta) {
        if (!this.active) return;

        const player = this.scene.playerController.sprite;
        if (!player || this.scene.playerController.isDead) return;

        const body = player.body;
        if (!body.blocked.down) return;

        // Check which platform we're standing on
        const platforms = this.scene.platformFactory.platforms.getChildren();
        for (const plat of platforms) {
            if (this.crumbledPlatforms.has(plat)) continue;
            if (plat.name === 'floor' || plat.name === 'ceiling' ||
                plat.name === 'leftWall' || plat.name === 'rightWall') continue;

            // Check overlap
            const px = player.x;
            const py = player.y + PLAYER.HEIGHT / 2;
            const platBounds = plat.getBounds();

            if (px >= platBounds.left && px <= platBounds.right &&
                py >= platBounds.top - 5 && py <= platBounds.top + 10) {
                this.startCrumble(plat);
            }
        }
    }

    startCrumble(platform) {
        if (this.crumbledPlatforms.has(platform)) return;
        this.crumbledPlatforms.add(platform);

        // Visual shake
        this.scene.tweens.add({
            targets: platform,
            x: platform.x + 2,
            duration: 50,
            yoyo: true,
            repeat: 4,
        });

        SoundManager.playTone('crumble');

        // Crumble after delay
        this.scene.time.delayedCall(this.delay, () => {
            this.scene.tweens.add({
                targets: platform,
                alpha: 0,
                y: platform.y + 20,
                duration: 200,
                onComplete: () => {
                    platform.body.enable = false;
                    platform.setVisible(false);
                },
            });
        });
    }
}
