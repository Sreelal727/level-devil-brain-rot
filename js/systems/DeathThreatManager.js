// ============================================
// DeathThreatManager - Approaching hazards during questions
// ============================================

class DeathThreatManager {
    constructor(scene) {
        this.scene = scene;
        this.threats = [];
        this.active = false;
    }

    start(type, timerDuration) {
        this.active = true;
        this.timerDuration = timerDuration;

        switch (type) {
            case 'roller':
                this.createRoller('left');
                break;
            case 'dual_roller':
                this.createRoller('left');
                this.createRoller('right');
                break;
            case 'saw':
                this.createSaw();
                break;
        }
    }

    createRoller(side) {
        const startX = side === 'left' ? -40 : GAME.WIDTH + 40;
        const y = GAME.HEIGHT / 2;
        const roller = this.scene.add.image(startX, y, TEXTURES.ROLLER);
        roller.setDepth(5);
        roller.setData('side', side);
        roller.setData('startX', startX);
        roller.setData('targetX', side === 'left' ? GAME.WIDTH / 2 - 100 : GAME.WIDTH / 2 + 100);
        this.threats.push(roller);
    }

    createSaw() {
        const saw = this.scene.add.image(GAME.WIDTH / 2, -50, TEXTURES.SAW);
        saw.setDepth(5);
        saw.setData('side', 'top');
        saw.setData('startY', -50);
        saw.setData('targetY', GAME.HEIGHT / 2 - 50);
        this.threats.push(saw);
    }

    update(elapsed, duration) {
        if (!this.active) return;

        const progress = Math.min(elapsed / duration, 1);

        for (const threat of this.threats) {
            const side = threat.getData('side');

            if (side === 'top') {
                // Saw comes down
                const startY = threat.getData('startY');
                const targetY = threat.getData('targetY');
                threat.y = startY + (targetY - startY) * progress;
                threat.rotation += 0.05;
            } else {
                // Rollers come from sides
                const startX = threat.getData('startX');
                const targetX = threat.getData('targetX');
                threat.x = startX + (targetX - startX) * progress;
                threat.rotation += side === 'left' ? 0.03 : -0.03;
            }

            // Pulse scale when close
            if (progress > 0.7) {
                const pulse = 1 + Math.sin(elapsed * 0.01) * 0.1;
                threat.setScale(pulse);
            }
        }
    }

    destroy() {
        for (const t of this.threats) {
            t.destroy();
        }
        this.threats = [];
        this.active = false;
    }
}
