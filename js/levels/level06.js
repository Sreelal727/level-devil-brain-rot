// ============================================
// Level 6 - Fake Success
// Halfway through, fake "Level Complete" pops up
// Then crumbling platforms + more traps to real door
// ============================================

const LEVEL_06 = {
    name: "Level 6",
    subtitle: "Almost there...",
    worldWidth: 2000,
    worldHeight: 600,

    playerSpawn: { x: 60, y: 550 },
    doorPosition: { x: 1940, y: 200 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: true,

    platforms: [
        // Start
        { x: 100, y: 570, width: 160, id: 'start' },
        // Section 1 - seems easy
        { x: 260, y: 520, width: 60, id: 'p1' },
        { x: 380, y: 470, width: 60, id: 'p2' },
        { x: 500, y: 420, width: 70, id: 'p3' },
        { x: 620, y: 380, width: 80, id: 'p4' },
        // "Easy" landing before fake success
        { x: 780, y: 380, width: 120, id: 'fake_end' },

        // Section 2 (after fake success - harder, crumbling)
        { x: 940, y: 420, width: 50, id: 'c1' },
        { x: 1060, y: 370, width: 50, id: 'c2' },
        { x: 1180, y: 320, width: 50, id: 'c3' },
        { x: 1300, y: 380, width: 50, id: 'c4' },
        { x: 1400, y: 320, width: 50, id: 'c5' },
        { x: 1500, y: 260, width: 60, id: 'c6' },
        // Narrow gauntlet
        { x: 1620, y: 300, width: 40, id: 'c7' },
        { x: 1720, y: 250, width: 40, id: 'c8' },
        { x: 1830, y: 200, width: 50, id: 'c9' },
        // Door
        { x: 1940, y: 200, width: 80, id: 'door_plat' },
    ],

    hazards: [
        { type: 'spike_row', x: 150, y: 586, count: 110, direction: 'up' },
        { type: 'spike_row', x: 1200, y: 24, count: 40, direction: 'down' },
        // Wall spikes in gauntlet
        { type: 'spike_row', x: 1600, y: 200, count: 3, direction: 'left' },
    ],

    trolls: [
        { type: 'FakeSuccessTroll', config: { triggerX: 780 } },
        { type: 'CrumblingFloorTroll', config: { delay: 400 } },
    ],

    questionIndex: 5,
};
