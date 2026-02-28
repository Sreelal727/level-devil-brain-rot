// ============================================
// QuestionManager - DOM-based question UI
// ============================================

class QuestionManager {
    constructor() {
        this.overlay = null;
        this.onAnswer = null;
        this.answered = false;
    }

    show(question, onAnswer) {
        this.onAnswer = onAnswer;
        this.answered = false;
        this.overlay = document.getElementById('question-overlay');
        this.overlay.innerHTML = '';
        this.overlay.classList.add('active');

        const panel = document.createElement('div');
        panel.className = 'question-panel';

        // Question text
        const qText = document.createElement('div');
        qText.className = 'question-text';
        qText.textContent = question.text;
        panel.appendChild(qText);

        if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
            this.buildMultipleChoice(panel, question);
        } else {
            this.buildTextInput(panel, question);
        }

        // Timer bar
        const timerContainer = document.createElement('div');
        timerContainer.className = 'timer-bar-container';
        const timerFill = document.createElement('div');
        timerFill.className = 'timer-bar-fill';
        timerFill.id = 'timer-fill';
        timerContainer.appendChild(timerFill);
        panel.appendChild(timerContainer);

        // Warning text
        const warning = document.createElement('div');
        warning.className = 'warning-text';
        warning.id = 'warning-text';
        warning.textContent = 'HURRY UP!';
        panel.appendChild(warning);

        // Feedback
        const feedback = document.createElement('div');
        feedback.className = 'question-feedback';
        feedback.id = 'question-feedback';
        panel.appendChild(feedback);

        this.overlay.appendChild(panel);
    }

    buildMultipleChoice(panel, question) {
        const container = document.createElement('div');
        container.className = 'choices-container';
        container.id = 'choices-container';

        question.choices.forEach((choice, i) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = `${String.fromCharCode(65 + i)}) ${choice}`;
            btn.dataset.value = choice;
            btn.addEventListener('click', () => this.submitAnswer(choice, question, btn));
            container.appendChild(btn);
        });

        panel.appendChild(container);
    }

    buildTextInput(panel, question) {
        const container = document.createElement('div');
        container.className = 'text-input-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-input-field';
        input.id = 'answer-input';
        input.placeholder = 'Type your answer...';
        input.autocomplete = 'off';

        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-btn';
        submitBtn.textContent = 'SUBMIT';
        submitBtn.addEventListener('click', () => {
            this.submitAnswer(input.value.trim(), question);
        });

        input.addEventListener('keydown', (e) => {
            e.stopPropagation(); // Prevent Phaser from capturing keys
            if (e.key === 'Enter') {
                this.submitAnswer(input.value.trim(), question);
            }
        });

        container.appendChild(input);
        container.appendChild(submitBtn);
        panel.appendChild(container);

        // Focus after a frame
        requestAnimationFrame(() => input.focus());
    }

    submitAnswer(value, question, btnElement) {
        if (this.answered) return;
        this.answered = true;

        const correct = this.checkAnswer(value, question);
        const feedback = document.getElementById('question-feedback');

        if (correct) {
            feedback.textContent = 'CORRECT!';
            feedback.className = 'question-feedback correct';
            if (btnElement) btnElement.classList.add('correct');
            SoundManager.playTone('correct');
        } else {
            feedback.textContent = `WRONG! Answer: ${question.answer}`;
            feedback.className = 'question-feedback wrong';
            if (btnElement) btnElement.classList.add('wrong');
            // Highlight correct for multiple choice
            const container = document.getElementById('choices-container');
            if (container) {
                container.querySelectorAll('.choice-btn').forEach(btn => {
                    if (btn.dataset.value === question.answer) {
                        btn.classList.add('correct');
                    }
                });
            }
            SoundManager.playTone('wrong');
        }

        // Disable all inputs
        this.disableInputs();

        setTimeout(() => {
            if (this.onAnswer) this.onAnswer(correct);
        }, 1000);
    }

    checkAnswer(value, question) {
        const normalizedValue = value.toLowerCase().trim();
        const normalizedAnswer = question.answer.toLowerCase().trim();
        if (normalizedValue === normalizedAnswer) return true;
        if (question.acceptableAnswers) {
            return question.acceptableAnswers.some(a => a.toLowerCase().trim() === normalizedValue);
        }
        return false;
    }

    onTimeout(question) {
        if (this.answered) return;
        this.answered = true;
        const feedback = document.getElementById('question-feedback');
        feedback.textContent = `TIME'S UP! Answer: ${question.answer}`;
        feedback.className = 'question-feedback wrong';
        SoundManager.playTone('wrong');
        this.disableInputs();

        setTimeout(() => {
            if (this.onAnswer) this.onAnswer(false);
        }, 1000);
    }

    disableInputs() {
        const btns = this.overlay.querySelectorAll('.choice-btn, .submit-btn');
        btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
        const input = document.getElementById('answer-input');
        if (input) input.disabled = true;
    }

    updateTimer(fraction) {
        const fill = document.getElementById('timer-fill');
        if (fill) fill.style.width = `${fraction * 100}%`;
        const warning = document.getElementById('warning-text');
        if (warning) {
            warning.classList.toggle('visible', fraction < 0.3);
        }
    }

    hide() {
        if (this.overlay) {
            this.overlay.classList.remove('active');
            this.overlay.innerHTML = '';
        }
    }

    shuffleChoices() {
        const container = document.getElementById('choices-container');
        if (!container) return;
        const btns = Array.from(container.children);
        for (let i = btns.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            container.appendChild(btns[j]);
        }
        // Re-label
        container.querySelectorAll('.choice-btn').forEach((btn, i) => {
            const text = btn.dataset.value;
            btn.textContent = `${String.fromCharCode(65 + i)}) ${text}`;
        });
    }
}
