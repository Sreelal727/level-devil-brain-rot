// ============================================
// FakePlatformTroll - Platforms that aren't real
// ============================================

class FakePlatformTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.platformIds = config.platformIds || [];
    }

    init() {
        // Disable collision on fake platforms
        for (const id of this.platformIds) {
            const plat = this.scene.platformFactory.getPlatformByName(id);
            if (plat) {
                plat.body.enable = false;
                // Slight visual hint (very subtle)
                plat.setAlpha(0.95);
            }
        }
        this.activate();
    }

    update(time, delta) {
        if (!this.active) return;

        const player = this.scene.playerController.sprite;
        if (!player) return;

        // When player falls through, show a brief troll flash
        for (const id of this.platformIds) {
            const plat = this.scene.platformFactory.getPlatformByName(id);
            if (!plat || plat.getData('trolled')) continue;

            const bounds = plat.getBounds();
            if (player.y > bounds.top && player.y < bounds.bottom &&
                player.x > bounds.left && player.x < bounds.right) {
                plat.setData('trolled', true);
                SoundManager.playTone('troll');

                // Flash and fade the fake platform
                this.scene.tweens.add({
                    targets: plat,
                    alpha: 0,
                    duration: 500,
                });
            }
        }
    }
}
