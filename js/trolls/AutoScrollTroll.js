// ============================================
// AutoScrollTroll - Death wall chases player
// Works with scrolling levels
// ============================================

class AutoScrollTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.speed = config.speed || 40;
        this.delay = config.delay || 2000;
        this.started = false;
        this.deathWall = null;
        this.deathSpikes = [];
        this.warningText = null;
    }

    init() {
        // Warning text (fixed to camera)
        this.warningText = this.scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2, 'RUN!', {
            fontFamily: 'Courier New',
            fontSize: '48px',
            color: '#CC3333',
            fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(30).setAlpha(0).setScrollFactor(0);

        this.scene.time.delayedCall(this.delay, () => {
            this.startScroll();
        });
        this.activate();
    }

    startScroll() {
        this.started = true;
        SoundManager.playTone('warning');

        this.scene.tweens.add({
            targets: this.warningText,
            alpha: 1,
            duration: 200,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                if (this.warningText) this.warningText.destroy();
                this.warningText = null;
            },
        });

        const wh = this.scene.physics.world.bounds.height;

        // Death wall in world coordinates
        this.deathWall = this.scene.add.rectangle(
            -20, wh / 2, 40, wh, COLORS.DANGER
        ).setDepth(15);

        // Spike visuals on the wall
        for (let y = 0; y < wh; y += 20) {
            const spike = this.scene.add.triangle(
                0, y, 0, 0, 0, 20, 15, 10, COLORS.DANGER
            ).setDepth(15);
            this.deathSpikes.push(spike);
        }
    }

    update(time, delta) {
        if (!this.active || !this.started || !this.deathWall) return;

        // Move death wall
        this.deathWall.x += this.speed * (delta / 1000);

        // Move spikes with wall
        for (const spike of this.deathSpikes) {
            spike.x = this.deathWall.x + 20;
        }

        const player = this.scene.playerController.sprite;
        if (!player || this.scene.playerController.isDead) return;

        if (player.x <= this.deathWall.x + 20) {
            this.scene.playerController.die();
        }
    }

    destroy() {
        if (this.deathWall) { this.deathWall.destroy(); this.deathWall = null; }
        if (this.warningText) { this.warningText.destroy(); this.warningText = null; }
        for (const s of this.deathSpikes) s.destroy();
        this.deathSpikes = [];
        super.destroy();
    }
}
