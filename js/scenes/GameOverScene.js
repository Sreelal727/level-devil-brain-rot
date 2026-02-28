// ============================================
// GameOverScene
// ============================================

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.levelIndex = data.level;
        this.reason = data.reason || 'death';
    }

    create() {
        const cx = GAME.WIDTH / 2;
        const cy = GAME.HEIGHT / 2;

        const messages = {
            death: ['YOU DIED', 'Try not to die this time.'],
            question: ['WRONG ANSWER', 'Brain rot confirmed.'],
        };

        const [title, sub] = messages[this.reason] || messages.death;

        this.add.text(cx, cy - 60, title, {
            fontFamily: 'Courier New',
            fontSize: '36px',
            color: '#CC3333',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.add.text(cx, cy - 10, sub, {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#1A1A1A',
        }).setOrigin(0.5);

        // Retry button
        const retryBtn = this.add.rectangle(cx, cy + 50, 200, 45, COLORS.PLATFORM)
            .setInteractive({ useHandCursor: true });
        this.add.text(cx, cy + 50, 'RETRY', {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#F5F5F0',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        retryBtn.on('pointerover', () => retryBtn.setFillStyle(0x444444));
        retryBtn.on('pointerout', () => retryBtn.setFillStyle(COLORS.PLATFORM));
        retryBtn.on('pointerdown', () => {
            SoundManager.playTone('click');
            this.scene.start('GameScene', { level: this.levelIndex });
        });

        // Menu button
        const menuBtn = this.add.rectangle(cx, cy + 110, 160, 40, 0x8A8A8A)
            .setInteractive({ useHandCursor: true });
        this.add.text(cx, cy + 110, 'MENU', {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#F5F5F0',
        }).setOrigin(0.5);

        menuBtn.on('pointerover', () => menuBtn.setFillStyle(0xAAAAAA));
        menuBtn.on('pointerout', () => menuBtn.setFillStyle(0x8A8A8A));
        menuBtn.on('pointerdown', () => {
            SoundManager.playTone('click');
            this.scene.start('MenuScene');
        });
    }
}
