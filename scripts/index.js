let questionElement;
let choicesElement;

// toggle for nav
function myFunction(x) {
  x.classList.toggle("change");
} 
const btnContainer = document.querySelector(".navbar-collapse");

const btns = document.getElementsByClassName("nav-link");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
// nav end


window.addEventListener('popstate', (e) => {
  showSelectedPage(e.state.id);
});

const pages = ['home', 'countries', 'about', 'leaderboard'];

history.replaceState({ id: 'home' }, 'Trivia Game', './index.html');
const showSelectedPage = (selectedPage) => {
  pages.forEach(page => {
    const pageDiv = document.getElementById(page);

    if (page === selectedPage) {
      pageDiv.classList.remove('d-none');
    } else {
      pageDiv.classList.add('d-none');
    }
  })
}
const navigateToHome = () => {
  history.pushState({ id: 'home' }, 'TriviaGame', './index.html');
  showSelectedPage('home');
}

const navigateToCountries = () => {
  history.pushState({ id: 'countries' }, 'Countries', './index.html#countries');
  showSelectedPage('countries');
}

const navigateToAbout = () => {
  history.pushState({ id: 'about' }, 'About', './index.html#about');
  showSelectedPage('about');
}

const navigateToLeaderboard = () => {
  history.pushState({ id: 'leaderboard' }, 'Leaderboard', './index.html#leaderboard');
  showSelectedPage('leaderboard');
}

const userInfoForm = document.getElementById("userInfoForm");
const welcomeUserSection = document.getElementById("congratulations");
const startGameBtn = document.getElementById("startGameBtn");
const categorySection = document.getElementById("categorySection");
const easyButton = document.getElementById("easyButton");
const easyTriviaGame = document.getElementById("easyQuestionContainer");
const moderateTriviaGame = document.getElementById("moderateTriviaGame");
const hardTriviaGame = document.getElementById("hardTriviaGame");
const timerElement = document.getElementById("timer");

let userName;
let triviaQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let countdownTimer;

function handleSubmit(event) {
  event.preventDefault();

  userInfoForm.style.display = "none";
  welcomeUserSection.style.display = "block";
  welcomeUserSection.scrollIntoView({ behavior: "smooth" });
}

function handleStart() {
  welcomeUserSection.style.display = "none";
  categorySection.style.display = "block";
}

async function showSelectedCategory() {
  categorySection.style.display = "none";
  easyTriviaGame.style.display = "block";
  moderateTriviaGame.style.display = "none"; 
  hardTriviaGame.style.display = "none";

  triviaQuestions = [
    {
      question: "What is the Capital of USA?",
      correctAnswer: "Washington D.C",
    },
    {
      question: "What is the Capital City of Japan?",
      correctAnswer: "Tokyo",
    },
    {
      question: "What is the Capital City of South Korea?",
      correctAnswer: "SEOUL",
    },
    {
      question: "What is the Capital City of China?",
      correctAnswer: "Beijing",
    },
    {
        question: "What is the Capital City of Russia?",
        correctAnswer: "Moscow",
    },
    {
        question: "What is the Capital City of India?",
        correctAnswer: "New Delhi",
    },
    {
        question: "What is the Capital City of Australia?",
        correctAnswer: "Canberra",
    },
    {
        question: "What is the Capital City of Philippines?",
        correctAnswer: "Manila",
    },
    {
        question: "What is the Capital City of Canada?",
        correctAnswer: "Ottawa",
    },
    {
        question: "What is the Capital City of Israel?",
        correctAnswer: "Israel",
    },

  ];

  currentQuestionIndex = 0;
  score = 0

  await createQuestion(triviaQuestions[currentQuestionIndex].question, triviaQuestions[currentQuestionIndex].correctAnswer, 'question-container-easy');
  startTimer();

}

async function createQuestion(question, correctAnswer, containerId) {
  const questionContainer = document.getElementById(containerId);
    questionElement = document.createElement("div");
    questionElement.innerHTML = `<h2>${question}</h2>`;
    questionElement.classList.add("easyQuestion");

  const buttonA = document.getElementById("ButtonA");
  const buttonB = document.getElementById("ButtonB");
  const buttonC = document.getElementById("ButtonC");
  const buttonD = document.getElementById("ButtonD");

  const options = await fetchRandomChoices(correctAnswer);
  const shuffledOptions = shuffleArray(options);

  const buttons = [buttonA, buttonB, buttonC, buttonD];

  buttons[0].textContent = shuffledOptions[0];
  buttons[1].textContent = shuffledOptions[1];
  buttons[2].textContent = shuffledOptions[2];
  buttons[3].textContent = shuffledOptions[3];

  buttonA.onclick = function () {
    checkAnswer(shuffledOptions[0], correctAnswer)
  };
  buttonB.onclick = function () {
    checkAnswer(shuffledOptions[1], correctAnswer);
  };
  buttonC.onclick = function () {
    checkAnswer(shuffledOptions[2], correctAnswer);
  };
  buttonD.onclick = function () {
    checkAnswer(shuffledOptions[3], correctAnswer);
  }

  questionContainer.appendChild(questionElement);
  questionContainer.appendChild(document.getElementById("timer"));

  const buttonRow1 =document.createElement("div");
  buttonRow1.className = "button-row1";
  buttonRow1.appendChild(buttonA);
  buttonRow1.appendChild(buttonB);
  questionContainer.appendChild(buttonRow1);

  const buttonRow2 =document.createElement("div");
  buttonRow2.className = "button-row2";
  buttonRow2.appendChild(buttonC);
  buttonRow2.appendChild(buttonD);
  questionContainer.appendChild(buttonRow2);

}
  
async function fetchRandomChoices(correctAnswer) {
  const response = await fetch("https://restcountries.com/v3.1/independent?status=true");
  const data = await response.json();

  const capitalCities = data.map((country) => country.capital[0]);

  const shuffledChoices = shuffleArray(capitalCities);

  const correctAnswerIndex = Math.floor(Math.random() * 4); 
  shuffledChoices.splice(correctAnswerIndex, 0, correctAnswer);

  const randomChoices = [];
  while (randomChoices.length < 3) {
    const randomIndex = Math.floor(Math.random() * capitalCities.length);
    const randomChoice = capitalCities[randomIndex];
    if (!randomChoices.includes(randomChoice) && randomChoice !== correctAnswer) {
      randomChoices.push(randomChoice);
    }
  }
  
  return shuffleArray(randomChoices.concat(correctAnswer));
}


function checkAnswer(selectedAnswer, correctAnswer, ) {
  if (selectedAnswer === correctAnswer) {
    alert("Correct! Your answer is right.");
    score++;
  } else {
    alert("Incorrect. Please try again.");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < triviaQuestions.length) {
    showQuestion(currentQuestionIndex);
  } else {

    alert(`Quiz Completed! Your score is: ${score}/${triviaQuestions.length}`);
    resetQuiz();
  }
  
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  
async function showQuestion(index) {
  const currentQuestion = triviaQuestions[index];
  questionElement.innerHTML = `<h2>${currentQuestion.question}</h2>`;

  const shuffledOptions = shuffleArray([currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers]);

  choicesElement.innerHTML = "";

  shuffledOptions.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.style.fontSize = "20px"
    button.onclick = function () {
      checkAnswer(option, currentQuestion.correctAnswer);
    };
    choicesElement.appendChild(button);
  });
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Correct! Your answer is right.");
    score++;
  } else {
    alert("Incorrect. Please try again.");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < triviaQuestions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    alert(`Quiz Completed! Your score is: ${score}/${triviaQuestions.length}`);
    resetQuiz();
  }
}
  
  
  
function startTimer() {
  let secondsLeft = 40; 

  function updateTimer() {
    timerElement.textContent = `Time Left: ${secondsLeft}s`;
    secondsLeft--;

    if (secondsLeft < 0) {
      clearInterval(countdownTimer);
      checkAnswer(null, null); 
    }
  }

  updateTimer(); 

  
  countdownTimer = setInterval(updateTimer, 1000);
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  clearInterval(countdownTimer);
  timerElement.textContent = "";
  choicesElement.innerHTML = "";
  categorySection.style.display = "block";
  easyTriviaGame.style.display = "none";
}



function initializeQuiz() {
  userInfoForm.addEventListener("submit", handleSubmit);
  startGameBtn.addEventListener("click", handleStart);
  easyButton.addEventListener("click", showSelectedCategory);
}



// Call the initializeQuiz function when the page loads
window.onload = initializeQuiz;

document.getElementById("startQuizButton").addEventListener("click", startQuiz);


