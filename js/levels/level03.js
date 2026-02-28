// ============================================
// Level 3 - Gravity Flip Gauntlet
// Must navigate right-side up AND upside down
// ============================================

const LEVEL_03 = {
    name: "Level 3",
    subtitle: "What goes up...",
    worldWidth: 1800,
    worldHeight: 600,

    playerSpawn: { x: 60, y: 550 },
    doorPosition: { x: 1740, y: 80 + DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: false,

    platforms: [
        // Starting ground
        { x: 120, y: 570, width: 200, id: 'start' },
        // Normal gravity section
        { x: 300, y: 510, width: 60, id: 'p1' },
        { x: 420, y: 460, width: 70, id: 'p2' },
        { x: 550, y: 410, width: 60, id: 'p3' },
        { x: 670, y: 370, width: 70, id: 'p4' },
        // Landing pad before flip
        { x: 800, y: 370, width: 120, id: 'flip_pad' },

        // After gravity flips - these become the "floor" (ceiling)
        { x: 800, y: 30, width: 120, id: 'ceil_start' },
        { x: 950, y: 80, width: 60, id: 'cp1' },
        { x: 1080, y: 130, width: 60, id: 'cp2' },
        { x: 1200, y: 80, width: 60, id: 'cp3' },
        { x: 1330, y: 50, width: 70, id: 'cp4' },
        { x: 1460, y: 100, width: 60, id: 'cp5' },
        { x: 1580, y: 60, width: 70, id: 'cp6' },
        // Door platform on ceiling
        { x: 1720, y: 60, width: 100, id: 'door_plat' },
    ],

    walls: [
        { x: WALL_THICKNESS / 2, y: 300, height: 600, id: 'leftWall' },
        { x: 1800 - WALL_THICKNESS / 2, y: 300, height: 600, id: 'rightWall' },
    ],
    leftWall: false,
    rightWall: false,

    hazards: [
        // Bottom spikes (death pit)
        { type: 'spike_row', x: 200, y: 586, count: 90, direction: 'up' },
        // Top spikes (death after flip in wrong areas)
        { type: 'spike_row', x: 200, y: 14, count: 30, direction: 'down' },
        // Spikes between sections
        { type: 'spike_row', x: 1100, y: 586, count: 40, direction: 'up' },
    ],

    trolls: [
        { type: 'GravityFlipTroll', config: { triggerX: 850 } },
    ],

    questionTrolls: [
        { type: 'ReversedTimerTroll' },
    ],

    questionIndex: 2,
};
