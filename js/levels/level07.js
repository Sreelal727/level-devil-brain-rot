// ============================================
// Level 7 - RUN!
// Auto-scrolling death wall chases you through
// an obstacle course. No time to think.
// ============================================

const LEVEL_07 = {
    name: "Level 7",
    subtitle: "Don't look back.",
    worldWidth: 2400,
    worldHeight: 600,

    playerSpawn: { x: 60, y: 550 },
    doorPosition: { x: 2340, y: 550 - DOOR_HEIGHT / 2 },

    floor: false,
    ceiling: true,

    platforms: [
        // Start
        { x: 100, y: 570, width: 160, id: 'start' },
        // Sprint section - fast hops
        { x: 280, y: 570, width: 50, id: 'r1' },
        { x: 400, y: 530, width: 50, id: 'r2' },
        { x: 520, y: 570, width: 50, id: 'r3' },
        { x: 640, y: 530, width: 50, id: 'r4' },
        { x: 760, y: 570, width: 60, id: 'r5' },
        // Climb over wall
        { x: 870, y: 510, width: 50, id: 'r6' },
        { x: 950, y: 450, width: 50, id: 'r7' },
        { x: 1060, y: 450, width: 60, id: 'r8' },
        // Drop and sprint
        { x: 1180, y: 570, width: 60, id: 'r9' },
        { x: 1310, y: 570, width: 50, id: 'r10' },
        { x: 1430, y: 530, width: 50, id: 'r11' },
        { x: 1550, y: 570, width: 50, id: 'r12' },
        // Another climb
        { x: 1660, y: 510, width: 50, id: 'r13' },
        { x: 1770, y: 450, width: 50, id: 'r14' },
        { x: 1880, y: 510, width: 50, id: 'r15' },
        { x: 1990, y: 570, width: 50, id: 'r16' },
        // Final sprint
        { x: 2110, y: 570, width: 50, id: 'r17' },
        { x: 2230, y: 570, width: 60, id: 'r18' },
        // End
        { x: 2340, y: 570, width: 100, id: 'door_plat' },
    ],

    walls: [
        // Walls to jump over
        { x: 830, y: 520, height: 100, id: 'obstacle1' },
        { x: 1620, y: 520, height: 100, id: 'obstacle2' },
    ],

    hazards: [
        { type: 'spike_row', x: 150, y: 586, count: 140, direction: 'up' },
        { type: 'spike_row', x: 850, y: 24, count: 10, direction: 'down' },
        { type: 'spike_row', x: 1650, y: 24, count: 10, direction: 'down' },
    ],

    trolls: [
        { type: 'AutoScrollTroll', config: { speed: 65, delay: 2000 } },
    ],

    questionIndex: 6,
};
