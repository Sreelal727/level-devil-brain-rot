// ============================================
// Phaser Game Configuration
// ============================================

const gameConfig = {
    type: Phaser.AUTO,
    width: GAME.WIDTH,
    height: GAME.HEIGHT,
    parent: 'game-container',
    backgroundColor: COLORS.BG,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: PHYSICS.GRAVITY },
            debug: false,
        },
    },
    scene: [BootScene, MenuScene, GameScene, QuestionScene, LevelCompleteScene, GameOverScene],
    pixelArt: false,
    roundPixels: true,
};
