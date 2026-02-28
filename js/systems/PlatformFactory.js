// ============================================
// PlatformFactory - Build platforms from config
// ============================================

class PlatformFactory {
    constructor(scene) {
        this.scene = scene;
        this.platforms = null;
        this.walls = null;
    }

    create() {
        this.platforms = this.scene.physics.add.staticGroup();
        this.walls = this.scene.physics.add.staticGroup();
    }

    buildFromConfig(config, worldW, worldH) {
        const ww = worldW || GAME.WIDTH;
        const wh = worldH || GAME.HEIGHT;

        // Platforms
        if (config.platforms) {
            for (const p of config.platforms) {
                this.addPlatform(p.x, p.y, p.width, p.texture, p.id);
            }
        }

        // Walls
        if (config.walls) {
            for (const w of config.walls) {
                this.addWall(w.x, w.y, w.height, w.id);
            }
        }

        // Floor
        if (config.floor !== false) {
            this.addPlatform(ww / 2, wh - PLATFORM_THICKNESS / 2,
                             ww, TEXTURES.PLATFORM, 'floor');
        }

        // Ceiling
        if (config.ceiling !== false) {
            this.addPlatform(ww / 2, PLATFORM_THICKNESS / 2,
                             ww, TEXTURES.PLATFORM, 'ceiling');
        }

        // Left/Right walls
        if (config.leftWall !== false) {
            this.addWall(WALL_THICKNESS / 2, wh / 2, wh, 'leftWall');
        }
        if (config.rightWall !== false) {
            this.addWall(ww - WALL_THICKNESS / 2, wh / 2, wh, 'rightWall');
        }
    }

    addPlatform(x, y, width, texture, id) {
        const tex = texture || TEXTURES.PLATFORM;
        const p = this.platforms.create(x, y, tex);
        p.setDisplaySize(width, PLATFORM_THICKNESS);
        p.refreshBody();
        if (id) p.name = id;
        return p;
    }

    addWall(x, y, height, id) {
        const w = this.walls.create(x, y, TEXTURES.WALL);
        w.setDisplaySize(WALL_THICKNESS, height);
        w.refreshBody();
        if (id) w.name = id;
        return w;
    }

    getPlatformByName(name) {
        return this.platforms.getChildren().find(p => p.name === name);
    }

    destroy() {
        if (this.platforms) this.platforms.clear(true, true);
        if (this.walls) this.walls.clear(true, true);
    }
}
