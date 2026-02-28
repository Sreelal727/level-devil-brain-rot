// ============================================
// Level 9 - Is This Real?
// Fake crash screen, fake platforms, door slides,
// answer buttons shuffle during question
// ============================================

const LEVEL_09 = {
    name: "Level 9",
    subtitle: "Is this real?",
    worldWidth: 1800,
    worldHeight: 700,

    playerSpawn: { x: 60, y: 650 },
    doorPosition: { x: 1740, y: 150 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: true,

    platforms: [
        // Start
        { x: 100, y: 670, width: 160, id: 'start' },
        // Section 1 - before fake crash
        { x: 280, y: 610, width: 60, id: 'p1' },
        { x: 400, y: 550, width: 60, id: 'p2' },
        { x: 520, y: 490, width: 80, id: 'pre_crash' },

        // Section 2 - after fake crash, with fake platforms
        { x: 660, y: 490, width: 60, id: 'p3' },
        { x: 800, y: 430, width: 70, id: 'f1', texture: TEXTURES.FAKE },
        { x: 790, y: 490, width: 50, id: 'real1' },
        { x: 910, y: 430, width: 60, id: 'p4' },
        { x: 1040, y: 370, width: 60, id: 'p5' },
        { x: 1160, y: 370, width: 70, id: 'f2', texture: TEXTURES.FAKE },
        { x: 1150, y: 430, width: 50, id: 'real2' },
        { x: 1270, y: 370, width: 50, id: 'p6' },

        // Final climb
        { x: 1380, y: 310, width: 50, id: 'p7' },
        { x: 1490, y: 250, width: 50, id: 'p8' },
        { x: 1600, y: 200, width: 50, id: 'p9' },
        // Door platform
        { x: 1740, y: 150, width: 80, id: 'door_plat' },
    ],

    hazards: [
        { type: 'spike_row', x: 150, y: 686, count: 100, direction: 'up' },
        { type: 'spike_row', x: 600, y: 24, count: 50, direction: 'down' },
        // Spike walls
        { type: 'spike', x: 1580, y: 180, direction: 'right' },
        { type: 'spike', x: 1580, y: 196, direction: 'right' },
    ],

    trolls: [
        { type: 'FakeUITroll', config: { triggerX: 550 } },
        { type: 'FakePlatformTroll', config: { platformIds: ['f1', 'f2'] } },
        { type: 'DoorSlideTroll', config: { slideDistance: 45, slideSpeed: 500 } },
        { type: 'CrumblingFloorTroll', config: { delay: 500 } },
    ],

    questionTrolls: [
        { type: 'ShufflingButtonsTroll' },
    ],

    questionIndex: 8,
};
