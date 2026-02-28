// ============================================
// GameOverScene - 50+ unique non-repeating roasts
// ============================================

// Persistent state (survives scene restarts)
if (!window._failCounts) window._failCounts = {};
if (!window._usedDeathRoasts) window._usedDeathRoasts = new Set();
if (!window._usedQuestionRoasts) window._usedQuestionRoasts = new Set();

// ---- DEATH ROASTS (50+ unique) ----
const DEATH_ROASTS = {
    // Tier 1: First fail (gentle teasing)
    tier1: [
        { title: 'YOU DIED', message: 'Happens to the best of us.\n...you\'re not the best of us.' },
        { title: 'YOU DIED', message: 'The floor is not your friend.' },
        { title: 'WASTED', message: 'That was almost impressive. Almost.' },
        { title: 'YOU DIED', message: 'Skill issue detected.' },
        { title: 'DEAD', message: 'First try? More like worst try.' },
        { title: 'RIP', message: 'You lasted longer than I expected.\nThat\'s not a compliment.' },
        { title: 'OOPS', message: 'Gravity: 1. You: 0.' },
        { title: 'FALLEN', message: 'Were you even trying or just vibing?' },
        { title: 'YOU DIED', message: 'Pro tip: avoid the things that kill you.' },
        { title: 'BONK', message: 'The spikes send their regards.' },
    ],

    // Tier 2: 2-3 fails (medium roast)
    tier2: [
        { title: 'AGAIN?', message: 'Einstein said insanity is doing the same\nthing and expecting different results.' },
        { title: 'BRUH', message: 'Your controller isn\'t broken.\nYou are.' },
        { title: 'DECEASED', message: 'You died the exact same way.\nThat takes commitment.' },
        { title: 'OOF', message: 'Even the spikes feel bad for you at this point.' },
        { title: 'YIKES', message: 'Have you considered...jumping?' },
        { title: 'NOPE', message: 'The "A" and "D" keys also exist, btw.' },
        { title: 'REALLY?', message: 'You saw the spikes.\nYou ran into the spikes.\nBold strategy.' },
        { title: 'TRAGIC', message: 'Somewhere, a platformer tutorial\nis crying for you.' },
        { title: 'BRUH MOMENT', message: 'That death was sponsored by\na complete lack of reflexes.' },
        { title: 'NOT GREAT', message: 'On a scale of 1 to 10,\nthat was a solid "why".' },
        { title: 'WHOOPS', message: 'You just speedran dying.\nNew personal best!' },
        { title: 'SPLAT', message: 'Fun fact: the ground doesn\'t\nget softer on the second try.' },
    ],

    // Tier 3: 4-6 fails (hard roast)
    tier3: [
        { title: 'BRO WHAT', message: 'This is genuinely concerning.\nAre you playing with your elbows?' },
        { title: 'EMBARRASSING', message: 'I\'ve seen better gameplay from\na cat walking on a keyboard.' },
        { title: 'DOWN BAD', message: 'The spikes are starting to\nlearn your name.' },
        { title: 'PAIN', message: 'Fun fact: the average player dies\n2 times here. You\'re way past that.' },
        { title: 'YIKES x2', message: 'At this point the hazards are\nnot the obstacle. You are.' },
        { title: 'SUS', message: 'Are you throwing on purpose?\nBecause this can\'t be real gameplay.' },
        { title: 'HELP', message: 'Should I call someone?\nA doctor? A tutor? A priest?' },
        { title: 'CERTIFIED L', message: 'Your death compilation would go\nviral for all the wrong reasons.' },
        { title: 'BIG OOF', message: 'The respawn button is getting\na workout today.' },
        { title: 'MY BROTHER', message: 'You\'ve died more times than\nthe game has pixels.' },
        { title: 'WRECKED', message: 'That wasn\'t even close.\nLike, not remotely close.' },
        { title: 'FLOP ERA', message: 'This is your villain origin story\nbut you\'re the victim.' },
    ],

    // Tier 4: 7-9 fails (brutal roast)
    tier4: [
        { title: 'JUST STOP', message: 'This game has feelings too.\nYou\'re hurting it.' },
        { title: 'COOKED', message: 'You\'re not even rage-quitting.\nYou just keep coming back for pain.' },
        { title: 'HELLO???', message: 'I would say "git gud" but at this\npoint just git a different hobby.' },
        { title: 'VIOLATION', message: 'Your spacebar is filing a\nrestraining order against you.' },
        { title: 'BRO FELL OFF', message: 'Literally. Again. For the millionth time.' },
        { title: 'NOT SALVAGEABLE', message: 'I\'ve run out of encouraging\nthings to say. There were none.' },
        { title: 'THERAPY TIME', message: 'This game is no longer fun for you.\nIt never was. Please reflect.' },
        { title: 'MENACE', message: 'You\'re not playing the game.\nThe game is playing you.' },
        { title: 'CAUGHT IN 4K', message: 'Your gameplay is being used\nas a "what NOT to do" tutorial.' },
        { title: 'FINISHED', message: 'The loading screen had more\nskill than that run.' },
        { title: 'DONE', message: 'Even auto-complete would\nplay this better than you.' },
        { title: 'FRAUD ALERT', message: 'You claimed to be a gamer.\nThe evidence suggests otherwise.' },
    ],

    // Tier 5: 10+ fails (absolute destruction)
    tier5: [
        { title: 'UNINSTALL', message: 'Oh wait, it\'s a browser game.\nJust close the tab. Please.' },
        { title: 'ARE YOU OK?', message: 'This isn\'t a cry for help right?\nBlink twice if you need assistance.' },
        { title: 'L + RATIO', message: 'Bro got bodied by a browser game.\nThe NPCs are laughing at you.\nThere are no NPCs in this game.' },
        { title: 'EMOTIONAL\nDAMAGE', message: 'At this point I\'m rooting for\nthe spikes. They have a family too.' },
        { title: 'NAH', message: 'I showed your gameplay to a friend.\nThey unfriended me.' },
        { title: 'OBITUARY', message: 'Here lies your dignity.\nCause of death: this level.' },
        { title: 'ACTUALLY\nHISTORIC', message: 'Scientists will study this run\nto understand human failure.' },
        { title: 'BFFR', message: 'Be fr right now. Close the tab.\nGo outside. Touch grass.\nForget this happened.' },
        { title: 'GAME OVER\nFOREVER', message: 'The retry button is judging you.\nThe pixels are judging you.\nI am judging you.' },
        { title: 'DELUSION', message: 'You think "this time will be different."\nNarrator: it was not different.' },
        { title: 'PUBLIC\nSERVICE\nANNOUNCEMENT', message: 'No games were harmed in the making\nof this disaster. Only your pride.' },
        { title: 'BEYOND HELP', message: 'I asked the spikes to go easy on you.\nThey said no.\nI respect their decision.' },
        { title: '404', message: 'Error 404: Skill not found.\nError 500: Brain not responding.\nError 503: Hope unavailable.' },
        { title: 'LORE DROP', message: 'In the Level Devil universe,\nyour character is used as a\ncautionary tale for other players.' },
        { title: 'CANCELLED', message: 'Your gaming license has been\nrevoked. Effective immediately.\nNo appeals.' },
        { title: 'AUTOPSY\nREPORT', message: 'Cause of death: skill deficiency.\nContributing factors: everything.\nPrognosis: terminal.' },
    ],
};

// ---- QUESTION ROASTS (25+ unique) ----
const QUESTION_ROASTS = {
    tier1: [
        { title: 'WRONG ANSWER', message: 'Brain rot confirmed.' },
        { title: 'NOPE', message: 'Tell me you don\'t read without\ntelling me you don\'t read.' },
        { title: 'INCORRECT', message: 'The answer was right there.\nSo were you. Yet here we are.' },
        { title: 'WRONG', message: 'Skill issue? No. This is a BRAIN issue.' },
        { title: 'FAILED', message: 'Your brain said "trust me bro"\nand lied to your face.' },
        { title: 'NOPE', message: 'Confidence without knowledge\nis just vibes. Bad vibes.' },
        { title: 'MISS', message: 'Were you even reading the question\nor just admiring the death roller?' },
        { title: 'X', message: 'That answer was so wrong it\nlooped back around to being funny.' },
    ],

    tier2: [
        { title: 'WRONG AGAIN', message: 'Maybe try using brain cells\nthis time? Just a suggestion.' },
        { title: 'STILL WRONG', message: 'At this point just pick randomly.\nYou\'ll have better odds.' },
        { title: 'BRO WHAT', message: 'You survived the platforming just to\ndie at a trivia question. Incredible.' },
        { title: 'BRAINLESS', message: 'The death roller has a higher IQ\nthan this performance.' },
        { title: 'ACADEMIA\nREJECTS YOU', message: 'Somewhere a school is regretting\nits entire curriculum because of you.' },
        { title: 'THINK HARDER', message: 'I can hear the hamster wheel\nin your head. It\'s not spinning.' },
        { title: 'SMOOTH BRAIN', message: 'Not a single wrinkle detected.\nCompletely aerodynamic skull.' },
        { title: 'CAP', message: 'You said you knew the answer.\nThat was the biggest lie of 2026.' },
    ],

    tier3: [
        { title: 'BRAIN.EXE\nNOT FOUND', message: 'System requirements: 1 brain cell.\nYou: *error: insufficient resources*' },
        { title: '0 IQ PLAY', message: 'The roller doesn\'t even need to\nhurry anymore. It knows you\'ll fail.' },
        { title: 'NPC BEHAVIOR', message: 'You\'re answering like a bot\ntrained on wrong answers only.' },
        { title: 'MEGA L', message: 'The question is starting to feel\nbad for being too hard for you.' },
        { title: 'BUFFERING...', message: 'Your brain: 0% loaded.\nEstimated time: forever.\nPlease try again never.' },
        { title: 'SCIENTIFICALLY\nIMPOSSIBLE', message: 'A coin flip has 50% accuracy.\nYou have less. Statistically historic.' },
        { title: 'INTELLECTUAL\nEXTINCTION', message: 'Your brain cells are leaving\nthe chat one by one.\nThe last one just left.' },
        { title: 'WIKI EXISTS', message: 'The entirety of human knowledge\nis free online. And yet.' },
        { title: 'TRUST ISSUES', message: 'I will never trust your judgment\nagain. About anything. Ever.' },
    ],
};

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.levelIndex = data.level;
        this.reason = data.reason || 'death';

        const key = `level_${this.levelIndex}`;
        window._failCounts[key] = (window._failCounts[key] || 0) + 1;
        this.failCount = window._failCounts[key];
    }

    create() {
        const cx = GAME.WIDTH / 2;
        const cy = GAME.HEIGHT / 2;

        const roast = this.getUniqueRoast(this.reason, this.failCount);

        // Inject dynamic values
        let title = roast.title;
        let message = roast.message;
        message = message.replace(/\{fails\}/g, this.failCount);
        message = message.replace(/\{level\}/g, this.levelIndex + 1);
        title = title.replace(/\{fails\}/g, this.failCount);
        title = title.replace(/\{level\}/g, this.levelIndex + 1);

        // Title
        this.add.text(cx, cy - 70, title, {
            fontFamily: 'Courier New',
            fontSize: '36px',
            color: '#CC3333',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        // Roast text
        this.add.text(cx, cy - 5, message, {
            fontFamily: 'Courier New',
            fontSize: '15px',
            color: '#1A1A1A',
            align: 'center',
            wordWrap: { width: 500 },
            lineSpacing: 4,
        }).setOrigin(0.5);

        // Fail counter (shown after 2+ fails)
        if (this.failCount >= 2) {
            this.add.text(cx, cy + 40, `Deaths on this level: ${this.failCount}`, {
                fontFamily: 'Courier New',
                fontSize: '11px',
                color: '#CC3333',
            }).setOrigin(0.5);
        }

        // Retry button
        const retryBtn = this.add.rectangle(cx, cy + 75, 200, 45, COLORS.PLATFORM)
            .setInteractive({ useHandCursor: true });
        this.add.text(cx, cy + 75, this.getRetryText(), {
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
        const menuBtn = this.add.rectangle(cx, cy + 130, 160, 40, 0x8A8A8A)
            .setInteractive({ useHandCursor: true });
        this.add.text(cx, cy + 130, 'GIVE UP', {
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
        const f = this.failCount;
        if (f >= 15) return 'WHY.';
        if (f >= 10) return 'AGAIN?! OK...';
        if (f >= 7) return 'REALLY? RETRY';
        if (f >= 5) return 'SIGH... RETRY';
        if (f >= 3) return 'TRY AGAIN...';
        return 'RETRY';
    }

    getTier(fails) {
        if (fails <= 1) return 'tier1';
        if (fails <= 3) return 'tier2';
        if (fails <= 6) return 'tier3';
        if (fails <= 9) return 'tier4';
        return 'tier5';
    }

    getQuestionTier(fails) {
        if (fails <= 1) return 'tier1';
        if (fails <= 3) return 'tier2';
        return 'tier3';
    }

    getUniqueRoast(reason, fails) {
        const isDeath = reason !== 'question';
        const roasts = isDeath ? DEATH_ROASTS : QUESTION_ROASTS;
        const usedSet = isDeath ? window._usedDeathRoasts : window._usedQuestionRoasts;
        const tier = isDeath ? this.getTier(fails) : this.getQuestionTier(fails);

        // Collect eligible roasts: current tier + all unlocked lower tiers
        const allTiers = Object.keys(roasts);
        const tierIdx = allTiers.indexOf(tier);
        let pool = [];
        for (let i = 0; i <= tierIdx; i++) {
            pool = pool.concat(roasts[allTiers[i]].map((r, j) => ({ ...r, _id: `${allTiers[i]}_${j}` })));
        }

        // Filter out used roasts
        let available = pool.filter(r => !usedSet.has(r._id));

        // If all used up, reset and use full pool
        if (available.length === 0) {
            usedSet.clear();
            available = pool;
        }

        // Prefer roasts from the current tier (70% chance if available)
        const currentTierPool = available.filter(r => r._id.startsWith(tier));
        let chosen;
        if (currentTierPool.length > 0 && Math.random() < 0.7) {
            chosen = currentTierPool[Math.floor(Math.random() * currentTierPool.length)];
        } else {
            chosen = available[Math.floor(Math.random() * available.length)];
        }

        usedSet.add(chosen._id);
        return chosen;
    }
}
