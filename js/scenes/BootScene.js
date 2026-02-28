// ============================================
// BootScene - Generate textures, init systems
// ============================================

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        this.generateTextures();
        this.generateStickFigure();
        SoundManager.init();
        this.scene.start('MenuScene');
    }

    generateStickFigure() {
        const W = PLAYER.TEX_W;
        const H = PLAYER.TEX_H;
        const cx = W / 2;
        const color = COLORS.PLAYER;
        const lw = 2.5; // line width

        // Head radius, body positions
        const headR = 4;
        const headY = headR + 1;
        const neckY = headY + headR;
        const hipY = H - 14;
        const footY = H - 2;

        // --- IDLE frames (subtle breathing) ---
        for (let f = 0; f < 2; f++) {
            const g = this.add.graphics();
            const bodyShift = f === 0 ? 0 : -1;
            g.lineStyle(lw, color, 1);
            // Head
            g.strokeCircle(cx, headY + bodyShift, headR);
            // Body
            g.lineBetween(cx, neckY + bodyShift, cx, hipY);
            // Arms (resting)
            g.lineBetween(cx, neckY + 6 + bodyShift, cx - 7, hipY - 2);
            g.lineBetween(cx, neckY + 6 + bodyShift, cx + 7, hipY - 2);
            // Legs (standing)
            g.lineBetween(cx, hipY, cx - 5, footY);
            g.lineBetween(cx, hipY, cx + 5, footY);
            g.generateTexture('stickfig_idle_' + f, W, H);
            g.destroy();
        }

        // --- RUN frames (6 frames of leg/arm cycle) ---
        for (let f = 0; f < 6; f++) {
            const g = this.add.graphics();
            const phase = (f / 6) * Math.PI * 2;
            const legSwing = Math.sin(phase) * 8;
            const armSwing = Math.sin(phase) * 6;
            const bounce = -Math.abs(Math.sin(phase)) * 2;

            g.lineStyle(lw, color, 1);
            // Head
            g.strokeCircle(cx, headY + bounce, headR);
            // Body (slight lean forward)
            g.lineBetween(cx + 1, neckY + bounce, cx, hipY);
            // Arms (swinging opposite to legs)
            g.lineBetween(cx, neckY + 5 + bounce, cx - 3 - armSwing, hipY - 6 + Math.abs(armSwing) * 0.3);
            g.lineBetween(cx, neckY + 5 + bounce, cx + 3 + armSwing, hipY - 6 + Math.abs(armSwing) * 0.3);
            // Legs
            g.lineBetween(cx, hipY, cx + legSwing, footY);
            g.lineBetween(cx, hipY, cx - legSwing, footY);
            g.generateTexture('stickfig_run_' + f, W, H);
            g.destroy();
        }

        // --- JUMP frame (arms up, legs tucked) ---
        {
            const g = this.add.graphics();
            g.lineStyle(lw, color, 1);
            // Head
            g.strokeCircle(cx, headY, headR);
            // Body
            g.lineBetween(cx, neckY, cx, hipY);
            // Arms raised up
            g.lineBetween(cx, neckY + 4, cx - 7, neckY - 2);
            g.lineBetween(cx, neckY + 4, cx + 7, neckY - 2);
            // Legs tucked
            g.lineBetween(cx, hipY, cx - 6, hipY + 5);
            g.lineBetween(cx - 6, hipY + 5, cx - 4, footY);
            g.lineBetween(cx, hipY, cx + 6, hipY + 5);
            g.lineBetween(cx + 6, hipY + 5, cx + 4, footY);
            g.generateTexture('stickfig_jump_0', W, H);
            g.destroy();
        }

        // --- FALL frame (arms spread, legs dangling) ---
        {
            const g = this.add.graphics();
            g.lineStyle(lw, color, 1);
            // Head
            g.strokeCircle(cx, headY, headR);
            // Body
            g.lineBetween(cx, neckY, cx, hipY);
            // Arms spread wide
            g.lineBetween(cx, neckY + 5, cx - 9, neckY + 10);
            g.lineBetween(cx, neckY + 5, cx + 9, neckY + 10);
            // Legs dangling
            g.lineBetween(cx, hipY, cx - 3, footY + 1);
            g.lineBetween(cx, hipY, cx + 4, footY - 1);
            g.generateTexture('stickfig_fall_0', W, H);
            g.destroy();
        }

        // --- DEATH frame (splat) ---
        {
            const g = this.add.graphics();
            g.lineStyle(lw, color, 1);
            // Head
            g.strokeCircle(cx, headY + 2, headR);
            // X eyes
            g.lineStyle(1.5, color, 1);
            g.lineBetween(cx - 3, headY, cx - 1, headY + 3);
            g.lineBetween(cx - 1, headY, cx - 3, headY + 3);
            g.lineBetween(cx + 1, headY, cx + 3, headY + 3);
            g.lineBetween(cx + 3, headY, cx + 1, headY + 3);
            g.lineStyle(lw, color, 1);
            // Body collapsed
            g.lineBetween(cx, neckY + 2, cx, hipY - 2);
            // Arms flopped
            g.lineBetween(cx, neckY + 6, cx - 10, hipY);
            g.lineBetween(cx, neckY + 6, cx + 10, hipY);
            // Legs flopped
            g.lineBetween(cx, hipY - 2, cx - 8, footY);
            g.lineBetween(cx, hipY - 2, cx + 8, footY);
            g.generateTexture('stickfig_death_0', W, H);
            g.destroy();
        }

        // Create Phaser animations
        this.anims.create({
            key: 'player_idle',
            frames: [
                { key: 'stickfig_idle_0' },
                { key: 'stickfig_idle_1' },
            ],
            frameRate: 3,
            repeat: -1,
        });

        this.anims.create({
            key: 'player_run',
            frames: [
                { key: 'stickfig_run_0' },
                { key: 'stickfig_run_1' },
                { key: 'stickfig_run_2' },
                { key: 'stickfig_run_3' },
                { key: 'stickfig_run_4' },
                { key: 'stickfig_run_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'player_jump',
            frames: [{ key: 'stickfig_jump_0' }],
            frameRate: 1,
        });

        this.anims.create({
            key: 'player_fall',
            frames: [{ key: 'stickfig_fall_0' }],
            frameRate: 1,
        });

        this.anims.create({
            key: 'player_death',
            frames: [{ key: 'stickfig_death_0' }],
            frameRate: 1,
        });
    }

    generateTextures() {
        // Platform tile
        const plat = this.add.graphics();
        plat.fillStyle(COLORS.PLATFORM, 1);
        plat.fillRect(0, 0, 16, PLATFORM_THICKNESS);
        plat.generateTexture(TEXTURES.PLATFORM, 16, PLATFORM_THICKNESS);
        plat.destroy();

        // Wall tile
        const wallG = this.add.graphics();
        wallG.fillStyle(COLORS.WALL, 1);
        wallG.fillRect(0, 0, WALL_THICKNESS, 16);
        wallG.generateTexture(TEXTURES.WALL, WALL_THICKNESS, 16);
        wallG.destroy();

        // Crumbling platform
        const cg = this.add.graphics();
        cg.fillStyle(COLORS.CRUMBLE, 1);
        cg.fillRect(0, 0, 16, PLATFORM_THICKNESS);
        cg.lineStyle(1, 0x3A3A3A, 0.6);
        cg.lineBetween(4, 2, 8, PLATFORM_THICKNESS - 2);
        cg.lineBetween(10, 1, 13, PLATFORM_THICKNESS - 3);
        cg.generateTexture(TEXTURES.CRUMBLE, 16, PLATFORM_THICKNESS);
        cg.destroy();

        // Fake platform
        const fg = this.add.graphics();
        fg.fillStyle(COLORS.FAKE, 1);
        fg.fillRect(0, 0, 16, PLATFORM_THICKNESS);
        fg.generateTexture(TEXTURES.FAKE, 16, PLATFORM_THICKNESS);
        fg.destroy();

        // Spikes
        this.generateSpike(TEXTURES.SPIKE_UP, 'up');
        this.generateSpike(TEXTURES.SPIKE_DOWN, 'down');
        this.generateSpike(TEXTURES.SPIKE_LEFT, 'left');
        this.generateSpike(TEXTURES.SPIKE_RIGHT, 'right');

        // Door
        const dg = this.add.graphics();
        dg.fillStyle(COLORS.DOOR_OUTER, 1);
        dg.fillRect(0, 0, DOOR_WIDTH, DOOR_HEIGHT);
        dg.fillStyle(COLORS.DOOR_INNER, 1);
        dg.fillRect(4, 4, DOOR_WIDTH - 8, DOOR_HEIGHT - 8);
        dg.fillStyle(COLORS.DOOR_OUTER, 1);
        dg.fillCircle(DOOR_WIDTH - 10, DOOR_HEIGHT / 2, 3);
        dg.generateTexture(TEXTURES.DOOR, DOOR_WIDTH, DOOR_HEIGHT);
        dg.destroy();

        // Roller
        const rg = this.add.graphics();
        const rollerR = 24;
        rg.fillStyle(COLORS.DANGER, 1);
        rg.fillCircle(rollerR, rollerR, rollerR);
        rg.fillStyle(COLORS.HAZARD, 1);
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            rg.fillCircle(rollerR + Math.cos(angle) * (rollerR + 4), rollerR + Math.sin(angle) * (rollerR + 4), 5);
        }
        rg.generateTexture(TEXTURES.ROLLER, rollerR * 2 + 10, rollerR * 2 + 10);
        rg.destroy();

        // Saw blade
        const sg = this.add.graphics();
        const sawR = 28;
        sg.fillStyle(COLORS.DANGER, 1);
        sg.fillCircle(sawR, sawR, sawR);
        sg.fillStyle(COLORS.HAZARD, 1);
        sg.fillCircle(sawR, sawR, sawR - 8);
        sg.fillStyle(COLORS.DANGER, 1);
        sg.fillCircle(sawR, sawR, 6);
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            sg.fillTriangle(
                sawR + Math.cos(angle) * (sawR + 3), sawR + Math.sin(angle) * (sawR + 3),
                sawR + Math.cos(angle - 0.15) * (sawR - 6), sawR + Math.sin(angle - 0.15) * (sawR - 6),
                sawR + Math.cos(angle + 0.15) * (sawR - 6), sawR + Math.sin(angle + 0.15) * (sawR - 6)
            );
        }
        sg.generateTexture(TEXTURES.SAW, sawR * 2 + 6, sawR * 2 + 6);
        sg.destroy();
    }

    generateSpike(key, direction) {
        const g = this.add.graphics();
        const s = SPIKE_SIZE;
        g.fillStyle(COLORS.HAZARD, 1);
        switch (direction) {
            case 'up':    g.fillTriangle(s/2, 0, 0, s, s, s); break;
            case 'down':  g.fillTriangle(0, 0, s, 0, s/2, s); break;
            case 'left':  g.fillTriangle(0, s/2, s, 0, s, s); break;
            case 'right': g.fillTriangle(0, 0, s, s/2, 0, s); break;
        }
        g.generateTexture(key, s, s);
        g.destroy();
    }
}
