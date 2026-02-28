// ============================================
// FakeSuccessTroll - Shows fake "Level Complete" then yanks it away
// ============================================

class FakeSuccessTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.triggerX = config.triggerX || GAME.WIDTH / 2;
        this.triggered = false;
        this.fakeElements = [];
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
            this.showFakeSuccess();
        }
    }

    showFakeSuccess() {
        // Freeze player briefly
        const player = this.scene.playerController.sprite;
        const savedVelX = player.body.velocity.x;
        const savedVelY = player.body.velocity.y;
        player.body.setVelocity(0, 0);
        player.body.setAllowGravity(false);

        SoundManager.playTone('correct');

        // Fake overlay (fixed to camera)
        const bg = this.scene.add.rectangle(
            GAME.WIDTH / 2, GAME.HEIGHT / 2, GAME.WIDTH, GAME.HEIGHT, 0xF5F5F0, 0.95
        ).setDepth(50).setScrollFactor(0);

        const title = this.scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2 - 30, 'LEVEL COMPLETE!', {
            fontFamily: 'Courier New',
            fontSize: '36px',
            color: '#2D8A4E',
            fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(51).setScrollFactor(0);

        const sub = this.scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2 + 20, 'Just kidding.', {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#CC3333',
            fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(51).setAlpha(0).setScrollFactor(0);

        this.fakeElements = [bg, title, sub];

        // After 1.5 seconds, reveal the troll
        this.scene.time.delayedCall(1500, () => {
            SoundManager.playTone('troll');
            this.scene.tweens.add({ targets: title, alpha: 0, duration: 300 });
            this.scene.tweens.add({ targets: sub, alpha: 1, duration: 300 });

            // Shake and remove
            this.scene.cameras.main.shake(500, 0.01);

            this.scene.time.delayedCall(1000, () => {
                for (const el of this.fakeElements) el.destroy();
                this.fakeElements = [];
                player.body.setAllowGravity(true);
                player.body.setVelocity(savedVelX, savedVelY);
                this.scene.playerController.isDead = false;
            });
        });
    }

    destroy() {
        for (const el of this.fakeElements) {
            if (el && el.destroy) el.destroy();
        }
        super.destroy();
    }
}
