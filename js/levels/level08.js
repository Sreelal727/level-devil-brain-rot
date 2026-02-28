// ============================================
// Level 8 - Shifting Ground
// Platforms randomly move every few seconds
// Must time your jumps between shifts
// ============================================

const LEVEL_08 = {
    name: "Level 8",
    subtitle: "Nothing stays.",
    worldWidth: 1600,
    worldHeight: 700,

    playerSpawn: { x: 60, y: 650 },
    doorPosition: { x: 1540, y: 120 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: true,

    platforms: [
        // Start (safe, won't move)
        { x: 100, y: 670, width: 160, id: 'start' },
        // Moving platforms
        { x: 280, y: 610, width: 70, id: 'mv1' },
        { x: 430, y: 560, width: 70, id: 'mv2' },
        { x: 580, y: 500, width: 70, id: 'mv3' },
        { x: 720, y: 440, width: 70, id: 'mv4' },
        // Rest point (safe)
        { x: 860, y: 400, width: 100, id: 'rest' },
        // More moving
        { x: 1000, y: 340, width: 60, id: 'mv5' },
        { x: 1120, y: 280, width: 60, id: 'mv6' },
        { x: 1240, y: 220, width: 60, id: 'mv7' },
        { x: 1360, y: 160, width: 60, id: 'mv8' },
        // Door platform (safe)
        { x: 1520, y: 120, width: 100, id: 'door_plat' },
    ],

    hazards: [
        { type: 'spike_row', x: 150, y: 686, count: 85, direction: 'up' },
        { type: 'spike_row', x: 800, y: 24, count: 40, direction: 'down' },
    ],

    trolls: [
        {
            type: 'RandomPlatformTroll',
            config: {
                platformIds: ['mv1', 'mv2', 'mv3', 'mv4', 'mv5', 'mv6', 'mv7', 'mv8'],
                interval: 2500,
                shiftAmount: 35,
                maxShifts: 12,
            },
        },
        { type: 'HiddenSpikeTroll', config: {
            triggerDistance: 60,
            spikes: [
                { x: 840, y: 384, direction: 'up' },
                { x: 856, y: 384, direction: 'up' },
                { x: 872, y: 384, direction: 'up' },
            ],
        }},
    ],

    questionIndex: 7,
};
