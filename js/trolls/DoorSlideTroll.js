// ============================================
// DoorSlideTroll - Door slides away when you get close
// ============================================

class DoorSlideTroll extends BaseTroll {
    constructor(scene, config) {
        super(scene, config);
        this.slideDistance = config.slideDistance || 100;
        this.slideSpeed = config.slideSpeed || 300;
        this.hasMoved = false;
        this.triggerDistance = config.triggerDistance || 80;
    }

    init() {
        this.activate();
    }

    update(time, delta) {
        if (!this.active || this.hasMoved) return;

        const player = this.scene.playerController.sprite;
        const door = this.scene.door;
        if (!player || !door) return;

        const dist = Phaser.Math.Distance.Between(player.x, player.y, door.x, door.y);
        if (dist < this.triggerDistance) {
            this.hasMoved = true;
            SoundManager.playTone('troll');

            // Slide door away
            const targetY = door.y - this.slideDistance;
            this.scene.tweens.add({
                targets: door,
                y: Math.max(targetY, DOOR_HEIGHT / 2 + PLATFORM_THICKNESS),
                duration: this.slideSpeed,
                ease: 'Power2',
                onUpdate: () => {
                    door.refreshBody();
                },
            });
        }
    }
}
