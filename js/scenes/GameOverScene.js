// ============================================
// GameOverScene - with escalating roasts
// ============================================

// Persistent fail tracker (survives scene restarts)
if (!window._failCounts) window._failCounts = {};

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.levelIndex = data.level;
        this.reason = data.reason || 'death';

        // Track fails per level
        const key = `level_${this.levelIndex}`;
        window._failCounts[key] = (window._failCounts[key] || 0) + 1;
        this.failCount = window._failCounts[key];
    }

    create() {
        const cx = GAME.WIDTH / 2;
        const cy = GAME.HEIGHT / 2;

        const roast = this.getRoast(this.reason, this.failCount);

        // Title
        this.add.text(cx, cy - 70, roast.title, {
            fontFamily: 'Courier New',
            fontSize: '36px',
            color: '#CC3333',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        // Roast text (wrapping for longer roasts)
        this.add.text(cx, cy - 10, roast.message, {
            fontFamily: 'Courier New',
            fontSize: '15px',
            color: '#1A1A1A',
            align: 'center',
            wordWrap: { width: 500 },
            lineSpacing: 4,
        }).setOrigin(0.5);

        // Fail counter (shown after 2+ fails)
        if (this.failCount >= 2) {
            this.add.text(cx, cy + 30, `Deaths on this level: ${this.failCount}`, {
                fontFamily: 'Courier New',
                fontSize: '11px',
                color: '#CC3333',
            }).setOrigin(0.5);
        }

        // Retry button
        const retryBtn = this.add.rectangle(cx, cy + 65, 200, 45, COLORS.PLATFORM)
            .setInteractive({ useHandCursor: true });
        this.add.text(cx, cy + 65, this.getRetryText(), {
            fontFamily: 'Courier New',
            fontSize: '18px',
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
        const menuBtn = this.add.rectangle(cx, cy + 120, 160, 40, 0x8A8A8A)
            .setInteractive({ useHandCursor: true });
        this.add.text(cx, cy + 120, 'GIVE UP', {
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

    getRetryText() {
        if (this.failCount >= 10) return 'AGAIN?! OK...';
        if (this.failCount >= 7) return 'REALLY? RETRY';
        if (this.failCount >= 5) return 'SIGH... RETRY';
        if (this.failCount >= 3) return 'TRY AGAIN...';
        return 'RETRY';
    }

    getRoast(reason, fails) {
        if (reason === 'question') {
            return this.getQuestionRoast(fails);
        }
        return this.getDeathRoast(fails);
    }

    getDeathRoast(fails) {
        // Tier 1: First fail (gentle)
        const tier1 = [
            { title: 'YOU DIED', message: 'Happens to the best of us.\n...you\'re not the best of us.' },
            { title: 'YOU DIED', message: 'The floor is not your friend.' },
            { title: 'WASTED', message: 'That was almost impressive. Almost.' },
            { title: 'YOU DIED', message: 'Skill issue detected.' },
        ];

        // Tier 2: 2-3 fails (medium roast)
        const tier2 = [
            { title: 'AGAIN?', message: 'Einstein said insanity is doing the same\nthing and expecting different results.' },
            { title: 'BRUH', message: 'Your controller isn\'t broken.\nYou are.' },
            { title: 'DECEASED', message: 'You died the exact same way.\nThat takes commitment.' },
            { title: 'OOF', message: 'Even the spikes feel bad for you at this point.' },
            { title: 'YIKES', message: 'Have you considered...jumping?' },
            { title: 'NOPE', message: 'The "A" and "D" keys also exist, btw.' },
        ];

        // Tier 3: 4-6 fails (hard roast)
        const tier3 = [
            { title: 'BRO WHAT', message: 'This is genuinely concerning.\nAre you playing with your elbows?' },
            { title: 'EMBARRASSING', message: 'I\'ve seen better gameplay from\na cat walking on a keyboard.' },
            { title: 'SERIOUSLY?', message: `Death #${fails}. At this rate the door will\ndie of old age before you reach it.` },
            { title: 'DOWN BAD', message: 'The spikes are starting to\nlearn your name.' },
            { title: 'MY GUY', message: 'This is level ' + (this.levelIndex + 1) + '.\nThere are 10.\nYou will not survive.' },
            { title: 'PAIN', message: 'Fun fact: the average player dies\n2 times here. You\'re at ' + fails + '.' },
        ];

        // Tier 4: 7-9 fails (brutal roast)
        const tier4 = [
            { title: 'JUST STOP', message: 'This game has feelings too.\nYou\'re hurting it.' },
            { title: 'TRAGIC', message: `${fails} deaths. That\'s not a skill issue,\nthat\'s a lifestyle.` },
            { title: 'COOKED', message: 'You\'re not even rage-quitting.\nYou just keep coming back for pain.' },
            { title: 'HELLO???', message: 'I would say "git gud" but at this\npoint just git a different hobby.' },
            { title: 'VIOLATION', message: 'Your spacebar is filing a\nrestraining order against you.' },
            { title: 'BRO FELL OFF', message: 'Literally. Again. For the ' + fails + 'th time.' },
        ];

        // Tier 5: 10+ fails (absolute destruction)
        const tier5 = [
            { title: '💀💀💀', message: `${fails} DEATHS. This should be illegal.\nYou are committing crimes against gaming.` },
            { title: 'UNINSTALL', message: 'Oh wait, it\'s a browser game.\nJust close the tab. Please.' },
            { title: 'ARE YOU OK?', message: 'This isn\'t a cry for help right?\nBlink twice if you need assistance.' },
            { title: 'WORLD RECORD', message: `${fails} deaths on level ${this.levelIndex + 1}.\nNobody has ever been this bad.\nCongratulations, I guess.` },
            { title: 'L + RATIO', message: 'Bro got bodied by level ' + (this.levelIndex + 1) + '.\nThe NPCs are laughing at you.\nThere are no NPCs in this game.' },
            { title: 'EMOTIONAL\nDAMAGE', message: 'At this point I\'m rooting for\nthe spikes. They have a family too.' },
            { title: 'GG (GONE)', message: 'Your dignity left the chat\n' + (fails - 3) + ' deaths ago.' },
            { title: 'NAH', message: 'I showed your gameplay to a friend.\nThey unfriended me.' },
        ];

        let pool;
        if (fails <= 1) pool = tier1;
        else if (fails <= 3) pool = tier2;
        else if (fails <= 6) pool = tier3;
        else if (fails <= 9) pool = tier4;
        else pool = tier5;

        return pool[Math.floor(Math.random() * pool.length)];
    }

    getQuestionRoast(fails) {
        const tier1 = [
            { title: 'WRONG ANSWER', message: 'Brain rot confirmed.' },
            { title: 'NOPE', message: 'Tell me you don\'t read without\ntelling me you don\'t read.' },
            { title: 'INCORRECT', message: 'The answer was right there.\nSo were you. Yet here we are.' },
            { title: 'WRONG', message: 'Skill issue? No. This is a BRAIN issue.' },
        ];

        const tier2 = [
            { title: 'WRONG AGAIN', message: 'Maybe try using brain cells\nthis time? Just a suggestion.' },
            { title: 'STILL WRONG', message: 'At this point just pick randomly.\nYou\'ll have better odds.' },
            { title: 'BRO WHAT', message: 'You survived the platforming just to\ndie at a trivia question. Incredible.' },
            { title: 'BRAINLESS', message: 'The death roller has a higher IQ\nthan this performance.' },
        ];

        const tier3 = [
            { title: 'COOKED', message: `${fails} wrong answers.\nGoogle is free, but apparently\nso are your brain cells. Free to leave.` },
            { title: 'NPC BEHAVIOR', message: 'You\'re answering like a bot\nthat was trained on wrong answers only.' },
            { title: '0 IQ PLAY', message: 'The roller doesn\'t even need to\nhurry anymore. It knows.' },
            { title: 'BRAIN.EXE\nNOT FOUND', message: 'System requirements: 1 brain cell.\nYou: *error: insufficient resources*' },
            { title: 'MEGA L', message: `Failed the same question ${fails} times.\nThe question is starting to feel\nbad for being too hard.` },
        ];

        let pool;
        if (fails <= 1) pool = tier1;
        else if (fails <= 3) pool = tier2;
        else pool = tier3;

        return pool[Math.floor(Math.random() * pool.length)];
    }
}
