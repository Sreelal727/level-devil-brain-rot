// ============================================
// LevelCompleteScene
// ============================================

class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelCompleteScene' });
    }

    init(data) {
        this.levelIndex = data.level;
    }

    create() {
        const cx = GAME.WIDTH / 2;
        const cy = GAME.HEIGHT / 2;

        this.add.text(cx, cy - 60, 'LEVEL COMPLETE', {
            fontFamily: 'Courier New',
            fontSize: '36px',
            color: '#2D8A4E',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.add.text(cx, cy - 10, `Level ${this.levelIndex + 1} cleared!`, {
            fontFamily: 'Courier New',
            fontSize: '18px',
            color: '#1A1A1A',
        }).setOrigin(0.5);

        const hasNext = this.levelIndex + 1 < LevelRegistry.getLevelCount();

        if (hasNext) {
            const nextBtn = this.add.rectangle(cx, cy + 50, 200, 45, COLORS.PLATFORM)
                .setInteractive({ useHandCursor: true });
            this.add.text(cx, cy + 50, 'NEXT LEVEL', {
                fontFamily: 'Courier New',
                fontSize: '18px',
                color: '#F5F5F0',
                fontStyle: 'bold',
            }).setOrigin(0.5);

            nextBtn.on('pointerover', () => nextBtn.setFillStyle(0x444444));
            nextBtn.on('pointerout', () => nextBtn.setFillStyle(COLORS.PLATFORM));
            nextBtn.on('pointerdown', () => {
                SoundManager.playTone('click');
                this.scene.start('GameScene', { level: this.levelIndex + 1 });
            });
        } else {
            this.add.text(cx, cy + 50, 'YOU WIN! ALL LEVELS COMPLETE!', {
                fontFamily: 'Courier New',
                fontSize: '20px',
                color: '#CC3333',
                fontStyle: 'bold',
            }).setOrigin(0.5);
        }

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
