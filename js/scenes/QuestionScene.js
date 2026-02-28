// ============================================
// QuestionScene - Overlay with question + death threat
// ============================================

class QuestionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'QuestionScene' });
    }

    init(data) {
        this.levelIndex = data.level;
        this.question = data.question;
        this.questionTrolls = data.questionTrolls || [];
    }

    create() {
        this.questionManager = new QuestionManager();
        this.deathThreatManager = new DeathThreatManager(this);

        // Semi-transparent backdrop
        this.add.rectangle(GAME.WIDTH / 2, GAME.HEIGHT / 2, GAME.WIDTH, GAME.HEIGHT, 0x000000, 0.3)
            .setDepth(1);

        // Timer
        this.timerDuration = this.question.timer * 1000;
        this.elapsed = 0;
        this.finished = false;
        this.reversed = false;

        // Check for question trolls
        for (const qt of this.questionTrolls) {
            if (qt.type === 'ReversedTimerTroll') {
                this.reversed = true;
            }
            if (qt.type === 'ShufflingButtonsTroll') {
                this.shuffleInterval = this.time.addEvent({
                    delay: 2000,
                    callback: () => this.questionManager.shuffleChoices(),
                    loop: true,
                });
            }
        }

        // Show question UI
        this.questionManager.show(this.question, (correct) => {
            this.onAnswered(correct);
        });

        // Start death threat
        this.deathThreatManager.start(this.question.deathThreat, this.timerDuration);

        // Tick sound interval
        this.tickEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.finished) SoundManager.playTone('tick');
            },
            loop: true,
        });
    }

    update(time, delta) {
        if (this.finished) return;

        this.elapsed += delta;

        // Update timer bar
        let fraction = 1 - (this.elapsed / this.timerDuration);
        if (this.reversed) fraction = this.elapsed / this.timerDuration;
        fraction = Phaser.Math.Clamp(fraction, 0, 1);
        this.questionManager.updateTimer(this.reversed ? 1 - fraction : fraction);

        // Update death threats
        this.deathThreatManager.update(this.elapsed, this.timerDuration);

        // Warning sound
        if (fraction < 0.3 && !this.warnedOnce) {
            this.warnedOnce = true;
            SoundManager.playTone('warning');
        }

        // Timeout
        if (this.elapsed >= this.timerDuration) {
            this.finished = true;
            this.questionManager.onTimeout(this.question);
            this.time.delayedCall(1500, () => this.returnResult('wrong'));
        }
    }

    onAnswered(correct) {
        this.finished = true;
        if (this.tickEvent) this.tickEvent.remove();
        this.time.delayedCall(1200, () => {
            this.returnResult(correct ? 'correct' : 'wrong');
        });
    }

    returnResult(result) {
        this.questionManager.hide();
        this.deathThreatManager.destroy();
        this.scene.stop();
        this.scene.resume('GameScene', { result });
    }

    shutdown() {
        this.questionManager.hide();
        this.deathThreatManager.destroy();
        if (this.tickEvent) this.tickEvent.remove();
        if (this.shuffleInterval) this.shuffleInterval.remove();
    }
}
