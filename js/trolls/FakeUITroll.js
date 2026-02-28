// ============================================
// FakeUITroll - Shows fake Game Over / error screens
// ============================================

class FakeUITroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.triggerX = config.triggerX || GAME.WIDTH * 0.4;
        this.triggered = false;
        this.elements = [];
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
            this.showFakeError();
        }
    }

    showFakeError() {
        SoundManager.playTone('death');

        const bg = this.scene.add.rectangle(
            GAME.WIDTH / 2, GAME.HEIGHT / 2, GAME.WIDTH, GAME.HEIGHT, 0xF5F5F0, 0.95
        ).setDepth(50).setScrollFactor(0);

        const errorTitle = this.scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2 - 60, 'GAME CRASHED', {
            fontFamily: 'Courier New',
            fontSize: '32px',
            color: '#CC3333',
            fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(51).setScrollFactor(0);

        const errorMsg = this.scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2 - 10,
            'Error: player_skill_not_found\nPlease git gud and try again', {
            fontFamily: 'Courier New',
            fontSize: '14px',
            color: '#1A1A1A',
            align: 'center',
        }).setOrigin(0.5).setDepth(51).setScrollFactor(0);

        const lol = this.scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2 + 50, 'lol jk keep going', {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#8A8A8A',
        }).setOrigin(0.5).setDepth(51).setAlpha(0).setScrollFactor(0);

        this.elements = [bg, errorTitle, errorMsg, lol];

        // Reveal it's fake after 2 seconds
        this.scene.time.delayedCall(2000, () => {
            SoundManager.playTone('troll');
            this.scene.tweens.add({ targets: lol, alpha: 1, duration: 300 });

            this.scene.time.delayedCall(1500, () => {
                for (const el of this.elements) {
                    this.scene.tweens.add({
                        targets: el,
                        alpha: 0,
                        duration: 500,
                        onComplete: () => el.destroy(),
                    });
                }
                this.elements = [];
            });
        });
    }

    destroy() {
        for (const el of this.elements) {
            if (el && el.destroy) el.destroy();
        }
        super.destroy();
    }
}
