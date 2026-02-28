// ============================================
// Phaser Game Configuration
// ============================================

const gameConfig = {
    type: Phaser.AUTO,
    width: GAME.WIDTH,
    height: GAME.HEIGHT,
    parent: 'game-container',
    backgroundColor: COLORS.BG,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: PHYSICS.GRAVITY },
            debug: false,
        },
    },
    input: {
        activePointers: 3, // Support multi-touch
    },
    scene: [BootScene, MenuScene, GameScene, QuestionScene, LevelCompleteScene, GameOverScene],
    pixelArt: false,
    roundPixels: true,
};
