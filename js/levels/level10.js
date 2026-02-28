// ============================================
// Level 10 - THE FINAL TROLL
// Every troll combined, longest level, 5-second timer
// ============================================

const LEVEL_10 = {
    name: "Level 10",
    subtitle: "Good luck.",
    worldWidth: 2400,
    worldHeight: 800,

    playerSpawn: { x: 60, y: 750 },
    doorPosition: { x: 2340, y: 100 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: false,

    platforms: [
        // Start
        { x: 100, y: 770, width: 160, id: 'start' },

        // Section 1: Crumbling + fake platforms
        { x: 280, y: 710, width: 50, id: 'a1' },
        { x: 400, y: 710, width: 60, id: 'af1', texture: TEXTURES.FAKE },
        { x: 390, y: 760, width: 50, id: 'a2' },
        { x: 500, y: 700, width: 50, id: 'a3' },
        { x: 620, y: 650, width: 60, id: 'a4' },

        // Section 2: Invisible platforms
        { x: 750, y: 650, width: 50, id: 'inv1' },
        { x: 870, y: 610, width: 50, id: 'inv2' },
        { x: 990, y: 650, width: 50, id: 'inv3' },
        { x: 1100, y: 600, width: 70, id: 'rest1' },

        // Section 3: Random moving platforms + hidden spikes
        { x: 1230, y: 540, width: 60, id: 'mv1' },
        { x: 1350, y: 480, width: 60, id: 'mv2' },
        { x: 1470, y: 420, width: 60, id: 'mv3' },
        { x: 1590, y: 360, width: 70, id: 'rest2' },

        // Section 4: Tight climb with fake success
        { x: 1710, y: 300, width: 50, id: 'b1' },
        { x: 1820, y: 240, width: 50, id: 'b2' },
        { x: 1930, y: 180, width: 50, id: 'b3' },
        { x: 2040, y: 240, width: 50, id: 'b4' },
        { x: 2150, y: 180, width: 50, id: 'b5' },
        { x: 2250, y: 120, width: 50, id: 'b6' },

        // Door platform
        { x: 2340, y: 100, width: 80, id: 'door_plat' },
    ],

    walls: [
        { x: WALL_THICKNESS / 2, y: 400, height: 800, id: 'leftWall' },
        { x: 2400 - WALL_THICKNESS / 2, y: 400, height: 800, id: 'rightWall' },
        // Corridor walls
        { x: 1080, y: 500, height: 150, id: 'corridor1' },
        { x: 1610, y: 250, height: 150, id: 'corridor2' },
    ],
    leftWall: false,
    rightWall: false,

    hazards: [
        // Death pit
        { type: 'spike_row', x: 150, y: 786, count: 140, direction: 'up' },
        // Ceiling spikes
        { type: 'spike_row', x: 1500, y: 14, count: 50, direction: 'down' },
        // Wall spike traps
        { type: 'spike', x: 1096, y: 480, direction: 'right' },
        { type: 'spike', x: 1096, y: 496, direction: 'right' },
        { type: 'spike', x: 1096, y: 512, direction: 'right' },
    ],

    trolls: [
        // Every troll type
        { type: 'CrumblingFloorTroll', config: { delay: 350 } },
        { type: 'FakePlatformTroll', config: { platformIds: ['af1'] } },
        { type: 'InvisiblePlatformTroll', config: {
            platformIds: ['inv1', 'inv2', 'inv3'],
            revealOnLand: true,
        }},
        { type: 'HiddenSpikeTroll', config: {
            triggerDistance: 55,
            spikes: [
                { x: 1230, y: 524, direction: 'up' },
                { x: 1350, y: 464, direction: 'up' },
                { x: 1590, y: 344, direction: 'up' },
                { x: 2340, y: 84, direction: 'up' },
                { x: 2356, y: 84, direction: 'up' },
            ],
        }},
        { type: 'RandomPlatformTroll', config: {
            platformIds: ['mv1', 'mv2', 'mv3'],
            interval: 2000,
            shiftAmount: 30,
            maxShifts: 10,
        }},
        { type: 'FakeSuccessTroll', config: { triggerX: 1900 } },
        { type: 'DoorSlideTroll', config: { slideDistance: 35, slideSpeed: 600 } },
    ],

    questionTrolls: [
        { type: 'ReversedTimerTroll' },
        { type: 'ShufflingButtonsTroll' },
    ],

    questionIndex: 9,
};
