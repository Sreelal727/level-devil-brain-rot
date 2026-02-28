// ============================================
// GameScene - Main platforming (reused per level)
// Supports scrolling levels via worldWidth/worldHeight
// ============================================

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.levelIndex = data.level || 0;
    }

    create() {
        LevelRegistry.init();
        this.levelConfig = LevelRegistry.getLevel(this.levelIndex);
        if (!this.levelConfig) {
            this.scene.start('MenuScene');
            return;
        }

        // World size (defaults to screen size)
        const ww = this.levelConfig.worldWidth || GAME.WIDTH;
        const wh = this.levelConfig.worldHeight || GAME.HEIGHT;

        // Set physics world bounds
        this.physics.world.setBounds(0, 0, ww, wh);

        // Camera
        this.cameras.main.setBounds(0, 0, ww, wh);
        this.cameras.main.setBackgroundColor(COLORS.BG);

        // Systems
        this.platformFactory = new PlatformFactory(this);
        this.hazardFactory = new HazardFactory(this);
        this.playerController = new PlayerController(this);
        this.trollManager = new TrollManager(this);

        this.platformFactory.create();
        this.hazardFactory.create();

        // Build level (pass world dimensions)
        this.platformFactory.buildFromConfig(this.levelConfig, ww, wh);
        this.hazardFactory.buildFromConfig(this.levelConfig);

        // Player
        const spawn = this.levelConfig.playerSpawn;
        this.playerController.create(spawn.x, spawn.y);

        // Camera follow player
        this.cameras.main.startFollow(this.playerController.sprite, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(100, 50);

        // Door
        const dp = this.levelConfig.doorPosition;
        this.door = this.physics.add.staticSprite(dp.x, dp.y, TEXTURES.DOOR);
        this.door.setDepth(5);
        this.doorReached = false;

        // Collisions
        this.physics.add.collider(this.playerController.sprite, this.platformFactory.platforms);
        this.physics.add.collider(this.playerController.sprite, this.platformFactory.walls);
        this.physics.add.overlap(this.playerController.sprite, this.hazardFactory.hazards,
            this.onHitHazard, null, this);
        this.physics.add.overlap(this.playerController.sprite, this.door,
            this.onReachDoor, null, this);

        // Trolls
        this.trollManager.init(this.levelConfig);

        // HUD (fixed to camera)
        this.levelText = this.add.text(GAME.WIDTH / 2, 20, this.levelConfig.name, {
            fontFamily: 'Courier New',
            fontSize: '14px',
            color: '#8A8A8A',
        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

        // Subtitle flash (fixed to camera)
        if (this.levelConfig.subtitle) {
            const sub = this.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2, this.levelConfig.subtitle, {
                fontFamily: 'Courier New',
                fontSize: '24px',
                color: '#1A1A1A',
                fontStyle: 'bold',
            }).setOrigin(0.5).setDepth(30).setAlpha(1).setScrollFactor(0);
            this.tweens.add({
                targets: sub,
                alpha: 0,
                duration: 1500,
                delay: 500,
                onComplete: () => sub.destroy(),
            });
        }

        // Camera shake helper
        this.shakeCamera = (intensity, duration) => {
            this.cameras.main.shake(duration || 200, intensity || 0.005);
        };

        // Listen for resume from question scene
        this.events.on('resume', (sys, data) => {
            if (data && data.result === 'correct') {
                this.onQuestionCorrect();
            } else if (data && data.result === 'wrong') {
                this.onQuestionWrong();
            }
        });
    }

    update(time, delta) {
        if (!this.levelConfig) return;
        this.playerController.update(delta);
        this.trollManager.update(time, delta);
    }

    onHitHazard(player, hazard) {
        if (hazard.getData('hidden')) return;
        this.playerController.die();
    }

    onReachDoor(player, door) {
        if (this.doorReached || this.playerController.isDead) return;
        this.doorReached = true;
        SoundManager.playTone('door');

        this.playerController.sprite.body.setVelocity(0, 0);
        this.playerController.sprite.body.setAllowGravity(false);
        this.playerController.isDead = true;

        this.time.delayedCall(500, () => {
            this.scene.pause();
            this.scene.launch('QuestionScene', {
                level: this.levelIndex,
                question: LevelRegistry.getQuestion(this.levelIndex),
                questionTrolls: this.levelConfig.questionTrolls || [],
            });
        });
    }

    onQuestionCorrect() {
        LevelRegistry.saveProgress(this.levelIndex);
        this.scene.start('LevelCompleteScene', { level: this.levelIndex });
    }

    onQuestionWrong() {
        this.scene.start('GameOverScene', { level: this.levelIndex, reason: 'question' });
    }

    onPlayerDeath() {
        this.shakeCamera(0.01, 300);
        this.time.delayedCall(500, () => {
            this.scene.start('GameOverScene', { level: this.levelIndex, reason: 'death' });
        });
    }

    shutdown() {
        this.trollManager.destroy();
        this.platformFactory.destroy();
        this.hazardFactory.destroy();
        this.playerController.destroy();
    }
}
