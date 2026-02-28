// ============================================
// Level 2 - Trust Nothing
// Fake platforms everywhere, door slides, tight corridors
// ============================================

const LEVEL_02 = {
    name: "Level 2",
    subtitle: "Trust nothing.",
    worldWidth: 1400,
    worldHeight: 700,

    playerSpawn: { x: 60, y: 650 },
    doorPosition: { x: 1340, y: 120 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: true,

    platforms: [
        // Start
        { x: 100, y: 670, width: 160, id: 'start' },
        // Two paths - obvious one is fake
        { x: 260, y: 610, width: 70, id: 'f1', texture: TEXTURES.FAKE },
        { x: 200, y: 610, width: 60, id: 'real1' },
        // Climb
        { x: 320, y: 560, width: 60, id: 'p2' },
        { x: 450, y: 510, width: 80, id: 'f2', texture: TEXTURES.FAKE },
        { x: 440, y: 560, width: 60, id: 'real2' },
        // Zigzag up
        { x: 540, y: 500, width: 60, id: 'p3' },
        { x: 650, y: 450, width: 60, id: 'p4' },
        { x: 750, y: 400, width: 60, id: 'f3', texture: TEXTURES.FAKE },
        { x: 760, y: 450, width: 50, id: 'real3' },
        { x: 860, y: 390, width: 60, id: 'p5' },
        // Upper section
        { x: 960, y: 330, width: 80, id: 'p6' },
        { x: 1060, y: 270, width: 60, id: 'p7' },
        { x: 1160, y: 210, width: 60, id: 'f4', texture: TEXTURES.FAKE },
        { x: 1170, y: 270, width: 50, id: 'real4' },
        { x: 1260, y: 200, width: 60, id: 'p8' },
        // Door platform
        { x: 1340, y: 140, width: 100, id: 'door_plat' },
    ],

    hazards: [
        { type: 'spike_row', x: 120, y: 676, count: 75, direction: 'up' },
        { type: 'spike_row', x: 900, y: 24, count: 20, direction: 'down' },
    ],

    trolls: [
        { type: 'FakePlatformTroll', config: { platformIds: ['f1', 'f2', 'f3', 'f4'] } },
        { type: 'DoorSlideTroll', config: { slideDistance: 55, slideSpeed: 400 } },
    ],

    questionIndex: 1,
};
