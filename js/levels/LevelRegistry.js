// ============================================
// LevelRegistry - All level configs
// ============================================

const LevelRegistry = {
    levels: [],

    init() {
        this.levels = [
            LEVEL_01,
            LEVEL_02,
            LEVEL_03,
            LEVEL_04,
            LEVEL_05,
            LEVEL_06,
            LEVEL_07,
            LEVEL_08,
            LEVEL_09,
            LEVEL_10,
        ];
    },

    getLevel(index) {
        if (index < 0 || index >= this.levels.length) return null;
        return this.levels[index];
    },

    getLevelCount() {
        return this.levels.length;
    },

    getQuestion(levelIndex) {
        const level = this.getLevel(levelIndex);
        if (!level) return null;
        return QUESTIONS[level.questionIndex];
    },

    saveProgress(levelIndex) {
        try {
            const current = parseInt(localStorage.getItem('leveldevil_progress') || '0', 10);
            if (levelIndex + 1 > current) {
                localStorage.setItem('leveldevil_progress', String(levelIndex + 1));
            }
        } catch (e) { /* ignore */ }
    },
};
