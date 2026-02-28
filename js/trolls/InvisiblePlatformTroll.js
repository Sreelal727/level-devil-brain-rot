// ============================================
// InvisiblePlatformTroll - Real platforms you can't see
// ============================================

class InvisiblePlatformTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.platformIds = config.platformIds || [];
        this.revealOnLand = config.revealOnLand !== false;
    }

    init() {
        for (const id of this.platformIds) {
            const plat = this.scene.platformFactory.getPlatformByName(id);
            if (plat) {
                plat.setAlpha(0);
                plat.setData('invisible', true);
            }
        }
        this.activate();
    }

    update(time, delta) {
        if (!this.active || !this.revealOnLand) return;

        const player = this.scene.playerController.sprite;
        if (!player || this.scene.playerController.isDead) return;
        if (!player.body.blocked.down) return;

        for (const id of this.platformIds) {
            const plat = this.scene.platformFactory.getPlatformByName(id);
            if (!plat || !plat.getData('invisible')) continue;

            const bounds = plat.getBounds();
            if (player.x >= bounds.left - 5 && player.x <= bounds.right + 5 &&
                player.y + PLAYER.HEIGHT / 2 >= bounds.top - 5 &&
                player.y + PLAYER.HEIGHT / 2 <= bounds.top + 10) {
                plat.setData('invisible', false);
                this.scene.tweens.add({
                    targets: plat,
                    alpha: 1,
                    duration: 300,
                });
            }
        }
    }
}
