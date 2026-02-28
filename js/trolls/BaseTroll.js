// ============================================
// BaseTroll - Base class for all troll behaviors
// ============================================

class BaseTroll {
    constructor(scene, config) {
        this.scene = scene;
        this.config = config || {};
        this.active = false;
    }

    init() {
        // Override in subclass
    }

    activate() {
        this.active = true;
    }

    update(time, delta) {
        // Override in subclass
    }

    destroy() {
        this.active = false;
    }
}
