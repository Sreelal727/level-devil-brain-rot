// ============================================
// HazardFactory - Place spikes and hazards
// ============================================

class HazardFactory {
    constructor(scene) {
        this.scene = scene;
        this.hazards = null;
    }

    create() {
        this.hazards = this.scene.physics.add.staticGroup();
    }

    buildFromConfig(config) {
        if (!config.hazards) return;

        for (const h of config.hazards) {
            switch (h.type) {
                case 'spike_row':
                    this.addSpikeRow(h.x, h.y, h.count, h.direction || 'up', h.spacing);
                    break;
                case 'spike':
                    this.addSpike(h.x, h.y, h.direction || 'up');
                    break;
                default:
                    this.addSpike(h.x, h.y, h.direction || 'up');
            }
        }
    }

    addSpike(x, y, direction) {
        const textureKey = 'spike_' + direction;
        const spike = this.hazards.create(x, y, textureKey);
        // Slightly smaller hitbox for fairness
        spike.body.setSize(SPIKE_SIZE * 0.7, SPIKE_SIZE * 0.7);
        spike.body.setOffset(SPIKE_SIZE * 0.15, SPIKE_SIZE * 0.15);
        return spike;
    }

    addSpikeRow(startX, y, count, direction, spacing) {
        const gap = spacing || SPIKE_SIZE;
        for (let i = 0; i < count; i++) {
            this.addSpike(startX + i * gap, y, direction);
        }
    }

    addHiddenSpike(x, y, direction) {
        const spike = this.addSpike(x, y, direction);
        spike.setVisible(false);
        spike.body.enable = false;
        spike.setData('hidden', true);
        return spike;
    }

    revealSpike(spike) {
        spike.setVisible(true);
        spike.body.enable = true;
        spike.setData('hidden', false);
    }

    destroy() {
        if (this.hazards) this.hazards.clear(true, true);
    }
}
