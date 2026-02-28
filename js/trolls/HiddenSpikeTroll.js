// ============================================
// HiddenSpikeTroll - Spikes appear when player gets close
// ============================================

class HiddenSpikeTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.triggerDistance = config.triggerDistance || 100;
        this.hiddenSpikes = [];
    }

    init() {
        // Find all hidden spikes (placed by HazardFactory with hidden flag)
        // We create them ourselves from config
        if (this.config.spikes) {
            for (const s of this.config.spikes) {
                const spike = this.scene.hazardFactory.addHiddenSpike(s.x, s.y, s.direction || 'up');
                this.hiddenSpikes.push(spike);
            }
        }
        this.activate();
    }

    update(time, delta) {
        if (!this.active) return;

        const player = this.scene.playerController.sprite;
        if (!player || this.scene.playerController.isDead) return;

        for (const spike of this.hiddenSpikes) {
            if (!spike.getData('hidden')) continue;

            const dist = Phaser.Math.Distance.Between(player.x, player.y, spike.x, spike.y);
            if (dist < this.triggerDistance) {
                this.scene.hazardFactory.revealSpike(spike);
                SoundManager.playTone('troll');

                // Pop-in animation
                spike.setScale(0);
                this.scene.tweens.add({
                    targets: spike,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 150,
                    ease: 'Back.easeOut',
                });
            }
        }
    }
}
