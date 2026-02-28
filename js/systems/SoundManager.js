// ============================================
// SoundManager - Web Audio procedural sounds
// ============================================

const SoundManager = {
    ctx: null,
    enabled: true,

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.enabled = false;
        }
    },

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    playTone(type) {
        if (!this.enabled || !this.ctx) return;
        this.resume();

        switch (type) {
            case 'jump':
                this._playNote(440, 0.08, 'square', 0.15, 600);
                break;
            case 'land':
                this._playNote(120, 0.05, 'triangle', 0.1);
                break;
            case 'death':
                this._playNoise(0.3, 0.2);
                this._playNote(200, 0.3, 'sawtooth', 0.15, 50);
                break;
            case 'door':
                this._playNote(523, 0.1, 'sine', 0.15);
                setTimeout(() => this._playNote(659, 0.1, 'sine', 0.15), 100);
                setTimeout(() => this._playNote(784, 0.15, 'sine', 0.15), 200);
                break;
            case 'correct':
                this._playNote(523, 0.12, 'sine', 0.12);
                setTimeout(() => this._playNote(784, 0.2, 'sine', 0.12), 120);
                break;
            case 'wrong':
                this._playNote(200, 0.15, 'square', 0.12);
                setTimeout(() => this._playNote(150, 0.25, 'square', 0.12), 150);
                break;
            case 'click':
                this._playNote(800, 0.03, 'square', 0.08);
                break;
            case 'crumble':
                this._playNoise(0.15, 0.1);
                this._playNote(100, 0.15, 'triangle', 0.08);
                break;
            case 'tick':
                this._playNote(1000, 0.02, 'square', 0.05);
                break;
            case 'warning':
                this._playNote(600, 0.08, 'square', 0.12);
                setTimeout(() => this._playNote(600, 0.08, 'square', 0.12), 150);
                break;
            case 'gravity_flip':
                this._playNote(300, 0.2, 'sine', 0.1, 600);
                break;
            case 'troll':
                this._playNote(250, 0.1, 'sawtooth', 0.08);
                setTimeout(() => this._playNote(200, 0.15, 'sawtooth', 0.08), 100);
                break;
        }
    },

    _playNote(freq, duration, waveType, volume, endFreq) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = waveType || 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        if (endFreq) {
            osc.frequency.linearRampToValueAtTime(endFreq, this.ctx.currentTime + duration);
        }
        gain.gain.setValueAtTime(volume || 0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    _playNoise(duration, volume) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(volume || 0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start();
    },
};
