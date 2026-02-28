// ============================================
// Questions for each level
// ============================================

const QUESTIONS = [
    // Level 1 - Easy, generous timer
    {
        text: "What is the capital of France?",
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        choices: ["London", "Paris", "Berlin", "Madrid"],
        answer: "Paris",
        timer: 15,
        deathThreat: 'roller',
    },
    // Level 2 - Text input
    {
        text: "What color do you get mixing red and blue?",
        type: QUESTION_TYPES.TEXT_INPUT,
        answer: "purple",
        timer: 12,
        deathThreat: 'dual_roller',
    },
    // Level 3 - Tricky wording
    {
        text: "How many months have 28 days?",
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        choices: ["1", "6", "12", "All of them"],
        answer: "All of them",
        timer: 10,
        deathThreat: 'saw',
    },
    // Level 4
    {
        text: "What word is spelled incorrectly in every dictionary?",
        type: QUESTION_TYPES.TEXT_INPUT,
        answer: "incorrectly",
        timer: 10,
        deathThreat: 'roller',
    },
    // Level 5
    {
        text: "If you have 3 apples and take away 2, how many do YOU have?",
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        choices: ["1", "2", "3", "0"],
        answer: "2",
        timer: 9,
        deathThreat: 'dual_roller',
    },
    // Level 6
    {
        text: "What gets wetter the more it dries?",
        type: QUESTION_TYPES.TEXT_INPUT,
        answer: "towel",
        timer: 8,
        deathThreat: 'saw',
    },
    // Level 7
    {
        text: "A rooster lays an egg on top of a barn. Which way does it roll?",
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        choices: ["Left", "Right", "Down the front", "Roosters don't lay eggs"],
        answer: "Roosters don't lay eggs",
        timer: 8,
        deathThreat: 'dual_roller',
    },
    // Level 8
    {
        text: "What has a head and a tail but no body?",
        type: QUESTION_TYPES.TEXT_INPUT,
        answer: "coin",
        timer: 7,
        deathThreat: 'saw',
    },
    // Level 9
    {
        text: "What can you hold in your right hand but never in your left?",
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        choices: ["A ball", "Your left elbow", "A phone", "A pen"],
        answer: "Your left elbow",
        timer: 6,
        deathThreat: 'dual_roller',
    },
    // Level 10
    {
        text: "What is the answer to this question?",
        type: QUESTION_TYPES.TEXT_INPUT,
        answer: "yes",
        acceptableAnswers: ["yes", "this", "the answer"],
        timer: 5,
        deathThreat: 'saw',
    },
];
