const questions = [
    {
        question: "Which language is used for Web Development?",
        options: ["C++", "Python", "JavaScript", "Java"],
        answer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "High Text Markup Language", "Hyperlinks and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which symbol is used for Single Line Comment in JavaScript?",
        options: ["//", "#", "/*", "<!-- -->"],
        answer: "//"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreScreen = document.getElementById("score-screen");
const finalScoreEl = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
    const current = questions[currentQuestion];
    questionEl.textContent = current.question;

    optionsEl.innerHTML = '';
    current.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = option;
        optionDiv.classList.add('option');
        optionDiv.addEventListener('click', selectAnswer);
        optionsEl.appendChild(optionDiv);
    });
    nextButton.disabled = true;
}

function selectAnswer(event) {
    const selectedOption = event.target;
    const correctAnswer = questions[currentQuestion].answer;

    Array.from(optionsEl.children).forEach(child => {
        child.removeEventListener('click', selectAnswer);
        if (child.textContent === correctAnswer) {
            child.classList.add('correct');
        } else if (child === selectedOption) {
            child.classList.add('incorrect');
        }
    });
    if (selectedOption.textContent === correctAnswer) {
        score++;
    }
    nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    document.getElementById('quiz-container').classList.add('hidden');
    scoreScreen.classList.remove('hidden');
    finalScoreEl.textContent = `You scored ${score}/${questions.length}!`;
}

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-container').classList.remove('hidden');
    scoreScreen.classList.add('hidden');
    loadQuestion();
});

// Initial load
loadQuestion();
