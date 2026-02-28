// ============================================
// Level 5 - Blind Faith
// Visible platforms are traps, real path is invisible
// Must memorize or feel your way through
// ============================================

const LEVEL_05 = {
    name: "Level 5",
    subtitle: "Faith jump.",
    worldWidth: 1400,
    worldHeight: 600,

    playerSpawn: { x: 60, y: 550 },
    doorPosition: { x: 1340, y: 550 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: true,

    platforms: [
        // Start
        { x: 100, y: 570, width: 140, id: 'start' },

        // FAKE path (obvious, tempting) - goes up and right
        { x: 260, y: 510, width: 70, id: 'fake1', texture: TEXTURES.FAKE },
        { x: 400, y: 450, width: 70, id: 'fake2', texture: TEXTURES.FAKE },
        { x: 550, y: 390, width: 70, id: 'fake3', texture: TEXTURES.FAKE },
        { x: 700, y: 330, width: 70, id: 'fake4', texture: TEXTURES.FAKE },
        { x: 900, y: 400, width: 70, id: 'fake5', texture: TEXTURES.FAKE },

        // REAL path (invisible) - goes low, hugging bottom
        { x: 280, y: 570, width: 60, id: 'inv1' },
        { x: 420, y: 570, width: 50, id: 'inv2' },
        { x: 560, y: 530, width: 50, id: 'inv3' },
        { x: 680, y: 570, width: 50, id: 'inv4' },
        { x: 810, y: 530, width: 50, id: 'inv5' },
        { x: 940, y: 570, width: 50, id: 'inv6' },
        { x: 1060, y: 530, width: 60, id: 'inv7' },
        { x: 1180, y: 570, width: 60, id: 'inv8' },

        // End platform (visible)
        { x: 1320, y: 570, width: 120, id: 'end_plat' },
    ],

    hazards: [
        // Death pit
        { type: 'spike_row', x: 140, y: 586, count: 75, direction: 'up' },
        // Ceiling pressure
        { type: 'spike_row', x: 400, y: 24, count: 40, direction: 'down' },
    ],

    trolls: [
        { type: 'FakePlatformTroll', config: { platformIds: ['fake1', 'fake2', 'fake3', 'fake4', 'fake5'] } },
        { type: 'InvisiblePlatformTroll', config: {
            platformIds: ['inv1', 'inv2', 'inv3', 'inv4', 'inv5', 'inv6', 'inv7', 'inv8'],
            revealOnLand: true,
        }},
    ],

    questionIndex: 4,
};
