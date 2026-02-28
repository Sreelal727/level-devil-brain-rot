// ============================================
// ReversedTimerTroll - Timer bar fills up instead of emptying
// (Purely visual - actual timeout still works normally)
// ============================================

class ReversedTimerTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
    }

    init() {
        this.activate();
    }
}
