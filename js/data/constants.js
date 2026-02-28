// ============================================
// Level Devil: Brain Rot Edition - Constants
// ============================================

const COLORS = {
    BG:         0xF5F5F0,
    PLAYER:     0x1A1A1A,
    PLATFORM:   0x2D2D2D,
    WALL:       0x2D2D2D,
    HAZARD:     0x1A1A1A,
    DOOR_OUTER: 0x4A4A4A,
    DOOR_INNER: 0x8A8A8A,
    DANGER:     0xCC3333,
    WHITE:      0xFFFFFF,
    TIMER_BG:   0x444444,
    TIMER_FILL: 0xCC3333,
    CRUMBLE:    0x5A5A5A,
    FAKE:       0x2D2D2D,
    INVISIBLE:  0x2D2D2D,
};

const CSS_COLORS = {
    BG:      '#F5F5F0',
    TEXT:    '#1A1A1A',
    DANGER:  '#CC3333',
    ACCENT:  '#4A4A4A',
    BUTTON:  '#2D2D2D',
    BUTTON_HOVER: '#444444',
    CORRECT: '#2D8A4E',
    WRONG:   '#CC3333',
};

const PHYSICS = {
    GRAVITY:        800,
    PLAYER_SPEED:   200,
    JUMP_VELOCITY: -380,
    MAX_FALL_SPEED: 600,
};

const PLAYER = {
    WIDTH:  18,
    HEIGHT: 34,
    // Stick figure drawing dimensions (texture is 24x38)
    TEX_W: 24,
    TEX_H: 38,
    ANIM_FRAMES: {
        IDLE: 2,
        RUN: 6,
        JUMP: 1,
        FALL: 1,
    },
};

const GAME = {
    WIDTH:  800,
    HEIGHT: 600,
};

const PLATFORM_THICKNESS = 16;
const WALL_THICKNESS = 16;
const SPIKE_SIZE = 16;
const DOOR_WIDTH = 32;
const DOOR_HEIGHT = 48;

const TEXTURES = {
    PLAYER:      'player',
    PLATFORM:    'platform',
    WALL:        'wall',
    SPIKE_UP:    'spike_up',
    SPIKE_DOWN:  'spike_down',
    SPIKE_LEFT:  'spike_left',
    SPIKE_RIGHT: 'spike_right',
    DOOR:        'door',
    ROLLER:      'roller',
    SAW:         'saw',
    CRUMBLE:     'crumble_platform',
    FAKE:        'fake_platform',
};

const QUESTION_TYPES = {
    MULTIPLE_CHOICE: 'multiple_choice',
    TEXT_INPUT:       'text_input',
};
