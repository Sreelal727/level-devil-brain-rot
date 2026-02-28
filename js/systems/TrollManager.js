// ============================================
// TrollManager - Load + update troll behaviors
// ============================================

const TROLL_CLASSES = {
    CrumblingFloorTroll,
    FakePlatformTroll,
    DoorSlideTroll,
    GravityFlipTroll,
    ReversedTimerTroll,
    HiddenSpikeTroll,
    InvisiblePlatformTroll,
    FakeSuccessTroll,
    AutoScrollTroll,
    RandomPlatformTroll,
    FakeUITroll,
    ShufflingButtonsTroll,
};

class TrollManager {
    constructor(scene) {
        this.scene = scene;
        this.trolls = [];
    }

    init(levelConfig) {
        this.trolls = [];

        if (!levelConfig.trolls) return;

        for (const trollDef of levelConfig.trolls) {
            const TrollClass = TROLL_CLASSES[trollDef.type];
            if (!TrollClass) {
                console.warn(`Unknown troll type: ${trollDef.type}`);
                continue;
            }
            const troll = new TrollClass(this.scene, trollDef.config || {});
            troll.init();
            this.trolls.push(troll);
        }
    }

    update(time, delta) {
        for (const troll of this.trolls) {
            troll.update(time, delta);
        }
    }

    destroy() {
        for (const troll of this.trolls) {
            troll.destroy();
        }
        this.trolls = [];
    }
}
