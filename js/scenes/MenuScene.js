// ============================================
// MenuScene - Title screen + Play button
// ============================================

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const cx = GAME.WIDTH / 2;
        const cy = GAME.HEIGHT / 2;

        // Title
        this.add.text(cx, cy - 120, 'LEVEL DEVIL', {
            fontFamily: 'Courier New',
            fontSize: '48px',
            color: '#1A1A1A',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.add.text(cx, cy - 70, 'Brain Rot Edition', {
            fontFamily: 'Courier New',
            fontSize: '20px',
            color: '#CC3333',
        }).setOrigin(0.5);

        // Play button
        const playBtn = this.add.rectangle(cx, cy + 20, 200, 50, COLORS.PLATFORM)
            .setInteractive({ useHandCursor: true });
        const playText = this.add.text(cx, cy + 20, 'PLAY', {
            fontFamily: 'Courier New',
            fontSize: '24px',
            color: '#F5F5F0',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        playBtn.on('pointerover', () => playBtn.setFillStyle(0x444444));
        playBtn.on('pointerout', () => playBtn.setFillStyle(COLORS.PLATFORM));
        playBtn.on('pointerdown', () => {
            SoundManager.playTone('click');
            this.scene.start('GameScene', { level: 0 });
        });

        // Level select (unlocked levels)
        const progress = this.getProgress();
        if (progress > 0) {
            this.add.text(cx, cy + 80, 'LEVEL SELECT', {
                fontFamily: 'Courier New',
                fontSize: '14px',
                color: '#4A4A4A',
            }).setOrigin(0.5);

            const cols = 5;
            const startX = cx - (cols - 1) * 40 / 2;
            for (let i = 0; i < 10; i++) {
                const unlocked = i <= progress;
                const lx = startX + (i % cols) * 40;
                const ly = cy + 110 + Math.floor(i / cols) * 40;
                const btn = this.add.rectangle(lx, ly, 32, 32, unlocked ? COLORS.PLATFORM : 0xAAAAAA)
                    .setInteractive({ useHandCursor: unlocked });
                this.add.text(lx, ly, `${i + 1}`, {
                    fontFamily: 'Courier New',
                    fontSize: '14px',
                    color: '#F5F5F0',
                }).setOrigin(0.5);

                if (unlocked) {
                    btn.on('pointerover', () => btn.setFillStyle(0x444444));
                    btn.on('pointerout', () => btn.setFillStyle(COLORS.PLATFORM));
                    btn.on('pointerdown', () => {
                        SoundManager.playTone('click');
                        this.scene.start('GameScene', { level: i });
                    });
                }
            }
        }

        // Instructions (detect touch device)
        const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
        const instructions = isTouchDevice
            ? 'Use on-screen buttons to move and jump'
            : 'WASD / Arrow Keys to move | Space to jump';
        this.add.text(cx, GAME.HEIGHT - 40, instructions, {
            fontFamily: 'Courier New',
            fontSize: '12px',
            color: '#8A8A8A',
        }).setOrigin(0.5);
    }

    getProgress() {
        try {
            return parseInt(localStorage.getItem('leveldevil_progress') || '0', 10);
        } catch (e) {
            return 0;
        }
    }
}
