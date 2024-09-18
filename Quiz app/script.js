const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answer: [
            { text: "Indian desert", correct: false },
            { text: "Sahara", correct: true },
            { text: "Gobi", correct: false },
            { text: "Kalahari", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answer: [
            { text: "India", correct: false },
            { text: "Sri Lanka", correct: false },
            { text: "England", correct: false },
            { text: "Vatican City", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctica", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.querySelector(".btn1");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, correct) {
    const buttons = answerButtonsElement.children;
    for (let btn of buttons) {
        btn.classList.add(btn === button ? (correct ? "correct" : "incorrect") : "disabled");
    }
    if (correct) score++;
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
