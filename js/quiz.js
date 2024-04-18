// user name
window.onload = function () {
  var userName = sessionStorage.getItem("userName");
  var message = "Please write your name";
  if (userName) {
    document.getElementById("userName").textContent = userName;
  } else {
    document.getElementById("userName").textContent = message;
    document.getElementById("userName").style.color = "red";
    document.getElementById("userName").style.fontSize = "15px";
  }
};

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// questions

const questions = [
  {
    question:
      "for (var i = 1; i < 5; i++){ <br> setTimeout (() => { <br> consle.log(i); <br> }, 1000) <br>}",
    answers: [
      { text: "1,2,3,4", correct: false },
      { text: "1,1,1,1", correct: false },
      { text: "5,5,5,5", correct: true },
      { text: "other wise", correct: false },
    ],
  },
  {
    question:
      "for (const i = 1; i < 5; i++){ <br> setTimeout (() => {consle.log(i);}, 1000)}",
    answers: [
      { text: "1,2,3,4", correct: true },
      { text: "1,1,1,1", correct: false },
      { text: "5,5,5,5", correct: false },
      { text: "other wise", correct: false },
    ],
  },
  {
    question: "let a = 0; <br> let b = []; <br> console.log(a == b);",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "error", correct: false },
      { text: "NAN", correct: false },
    ],
  },

  {
    question:
      "const myfun = () => { <br> console.log(x); <br> const x = 'hello'; <br> }; <br> myfun();",
    answers: [
      { text: "error", correct: true },
      { text: "undefined", correct: false },
      { text: "hello", correct: false },
    ],
  },
  {
    question: "let output = 2 ** 3; <br> console.log(output)",
    answers: [
      { text: "6", correct: false },
      { text: "9", correct: false },
      { text: "8", correct: true },
    ],
  },
  {
    question: "let a = 2 + ['2']; <br> console.log(a);",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "2", correct: false },
      { text: "NAN", correct: false },
    ],
  },
  {
    question: "let a = 4 > 3 > 2 ; <br> console.log(a);",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
    ],
  },
  {
    question: "let a = '1' + 1 * '1'; <br> console.log(a);",
    answers: [
      { text: "11", correct: true },
      { text: "1", correct: false },
      { text: "3", correct: false },
      { text: "error", correct: false },
    ],
  },
  {
    question: "console.log(null >= 0)",
    answers: [
      { text: "error", correct: false },
      { text: "true", correct: true },
      { text: "false", correct: false },
    ],
  },
  {
    question: "console.log(null > 0)",
    answers: [
      { text: "error", correct: false },
      { text: "true", correct: false },
      { text: "false", correct: true },
    ],
  },
];

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const questionElement = document.getElementById("question");
const answereuttons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");

let timeLeft = 10;
let timerInterval;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}

// start timer
function startTimer() {
  timeLeft = 10;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      progressSteps[currentQuestionIndex].classList.add("incorrect");

      clearInterval(timer);
      handleNextButton();
    }
    document.getElementById("time").innerText = timeLeft;
    timeLeft--;
  }, 1000);
}

// //////////////////////////////////////////////////////////////////////////////////////////

function showQuestion() {
  resetState();
  startTimer();
  updateProgressbar();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  // sets the innerHTML of an element  with the id
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer-btn");
    answereuttons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.visibility = "hidden";
  while (answereuttons.firstChild) {
    answereuttons.removeChild(answereuttons.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    progressSteps[currentQuestionIndex].classList.add("correct");
  } else {
    selectedBtn.classList.add("incorrect");
    progressSteps[currentQuestionIndex].classList.add("incorrect");
  }

  Array.from(answereuttons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextButton.style.visibility = "inherit";
}

// Reset the timer on each question change
function handleNextButton() {
  clearInterval(timerInterval);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  const resultMessage =
    score >= 6
      ? `Good job! <i class="bi bi-emoji-smile"></i>`
      : `Try again! <i class="bi bi-emoji-frown-fill"></i>`;
  questionElement.innerHTML = `your scored ${score} out of ${questions.length}. ${resultMessage}`;
  nextButton.innerHTML = "play again";
  nextButton.style.visibility = "inherit";
}

function handleTimeout() {
  // Find the correct answer and mark it
  Array.from(answereuttons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  // Move to the next question after 10 seconds
  // Continue to the next question
  setTimeout(handleNextButton, 10000);
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function updateProgressbar() {
  progressSteps.forEach((progressStep, index) => {
    // if(index < currentQuestionIndex + 1 )
    if (index < currentQuestionIndex + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });
}

startQuiz();
