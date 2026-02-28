// ============================================
// Level 1 - Tutorial with a twist
// Scrolling right, crumbling platforms over spike pit
// ============================================
// Jump math: max 90px. Player feet on plat top = plat.y - 23.
// Gap rule: next plat.y > prev plat.y - 80 (safe jump)

const LEVEL_01 = {
    name: "Level 1",
    subtitle: "Welcome...",
    worldWidth: 1600,
    worldHeight: 600,

    playerSpawn: { x: 60, y: 550 },
    doorPosition: { x: 1540, y: 300 - DOOR_HEIGHT / 2 },

    floor: false, // no full floor
    ceiling: true,

    platforms: [
        // Starting safe ground
        { x: 100, y: 570, width: 180, id: 'start' },
        // First jumps
        { x: 280, y: 520, width: 70, id: 'p1' },
        { x: 400, y: 520, width: 70, id: 'p2' },
        // Climb up
        { x: 520, y: 460, width: 70, id: 'p3' },
        { x: 640, y: 400, width: 80, id: 'p4' },
        // Corridor above spike pit
        { x: 780, y: 400, width: 60, id: 'p5' },
        { x: 900, y: 450, width: 70, id: 'p6' },
        { x: 1020, y: 400, width: 60, id: 'p7' },
        // Descent with narrow platforms
        { x: 1140, y: 350, width: 60, id: 'p8' },
        { x: 1260, y: 350, width: 50, id: 'p9' },
        { x: 1380, y: 300, width: 80, id: 'p10' },
        // Door platform
        { x: 1520, y: 300, width: 100, id: 'door_plat' },
    ],

    walls: [
        // Corridor walls to force routing
        { x: 700, y: 250, height: 200, id: 'wall1' },
    ],

    hazards: [
        // Spike pit under the platforms
        { type: 'spike_row', x: 200, y: 576, count: 80, direction: 'up' },
        // Ceiling spikes in corridor
        { type: 'spike_row', x: 800, y: 24, count: 15, direction: 'down' },
        // Spikes before door
        { type: 'spike_row', x: 1400, y: 276, count: 4, direction: 'down' },
    ],

    trolls: [
        { type: 'CrumblingFloorTroll', config: { delay: 600 } },
    ],

    questionIndex: 0,
};
