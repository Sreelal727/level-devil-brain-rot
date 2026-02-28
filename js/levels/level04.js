// ============================================
// Level 4 - Hidden Spikes Everywhere
// Navigate tight corridors with spikes that pop up
// ============================================

const LEVEL_04 = {
    name: "Level 4",
    subtitle: "Watch your step.",
    worldWidth: 1600,
    worldHeight: 800,

    playerSpawn: { x: 60, y: 750 },
    doorPosition: { x: 1540, y: 100 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: true,

    platforms: [
        // Start
        { x: 120, y: 770, width: 200, id: 'start' },
        // Climb through narrow passages
        { x: 300, y: 710, width: 80, id: 'p1' },
        { x: 430, y: 650, width: 80, id: 'p2' },
        // Flat section (trapped)
        { x: 600, y: 650, width: 150, id: 'trap1' },
        { x: 780, y: 600, width: 60, id: 'p3' },
        { x: 900, y: 540, width: 80, id: 'p4' },
        // Mid corridor
        { x: 1020, y: 480, width: 120, id: 'trap2' },
        { x: 1160, y: 420, width: 60, id: 'p5' },
        { x: 1260, y: 360, width: 60, id: 'p6' },
        // Narrow climb to top
        { x: 1350, y: 290, width: 50, id: 'p7' },
        { x: 1430, y: 220, width: 50, id: 'p8' },
        { x: 1500, y: 150, width: 60, id: 'p9' },
        // Door platform
        { x: 1540, y: 100, width: 80, id: 'door_plat' },
    ],

    walls: [
        // Corridor walls - gaps at bottom for player to pass
        { x: 550, y: 500, height: 120, id: 'w1' },
        { x: 950, y: 300, height: 150, id: 'w2' },
    ],

    hazards: [
        // Bottom pit
        { type: 'spike_row', x: 150, y: 786, count: 85, direction: 'up' },
    ],

    trolls: [
        {
            type: 'HiddenSpikeTroll',
            config: {
                triggerDistance: 70,
                spikes: [
                    // On trap platforms
                    { x: 570, y: 634, direction: 'up' },
                    { x: 586, y: 634, direction: 'up' },
                    { x: 602, y: 634, direction: 'up' },
                    { x: 618, y: 634, direction: 'up' },
                    // On trap2
                    { x: 990, y: 464, direction: 'up' },
                    { x: 1006, y: 464, direction: 'up' },
                    { x: 1022, y: 464, direction: 'up' },
                    { x: 1038, y: 464, direction: 'up' },
                    // Wall spikes (on right side of w1)
                    { x: 566, y: 470, direction: 'right' },
                    { x: 566, y: 490, direction: 'right' },
                    // Near door
                    { x: 1520, y: 134, direction: 'up' },
                    { x: 1536, y: 134, direction: 'up' },
                ],
            },
        },
        { type: 'CrumblingFloorTroll', config: { delay: 500 } },
    ],

    questionIndex: 3,
};
