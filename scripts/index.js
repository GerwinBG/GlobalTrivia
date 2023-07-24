
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
const triviaGameSection = document.getElementById("TriviaGame");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timerElement = document.getElementById("timer");
const progressBar = timerElement.querySelector(".progress-bar");
const timeLeftElement = timerElement.querySelector(".time-left");

let userName;
let triviaQuestions;
let currentQuestionIndex = 0;
let score = 0;
let countdownTimer;

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Hide the user info form
  userInfoForm.style.display = "none";

  // Display the congratulations
  welcomeUserSection.style.display = "block";

  // Scroll to the welcome user div
  welcomeUserSection.scrollIntoView({ behavior: "smooth" });
}

// Function to handle start button click
function handleStart() {
  // Hide the congratulations
  welcomeUserSection.style.display = "none";

  // Show the category section
  categorySection.style.display = "block";
}

async function startTriviaGame(category) {
  categorySection.style.display = "none";
  triviaGameSection.style.display = "block";

  if (category === "easy") {
    triviaQuestions = easyQuestions; 
  } else if (category === "moderate") {
    triviaQuestions = getModerateQuestions(); 
  } else if (category === "hard") {
    triviaQuestions = getHardQuestions(); 
  }

  showQuestion(currentQuestionIndex);
  startTimer();
}

// 10 easy category questions
const easyQuestions = [
  {
    question: "What is the capital of USA?",
    choices: ["New York", "Los Angeles", "Chicago", "Washington D.C"],
    correctChoice: "Washington D.C"
  },
  {
    question: "What is the capital city of Japan?",
    choices: ["Tokyo", "Beijing", "Seoul", "Shanghai"],
    correctChoice: "Tokyo"
  },
  {
    question: "What is the capital city of South Korea?",
    choices: ["Seoul", "Bangkok", "Hanoi", "Kuala Lumpur"],
    correctChoice: "Seoul"
  },
  {
    question: "What is the capital city of China?",
    choices: ["Beijing", "Shanghai", "Hong Kong", "Singapore"],
    correctChoice: "Beijing"
  },
  {
    question: "What is the capital city of Russia?",
    choices: ["Moscow", "St. Petersburg", "Kiev", "Berlin"],
    correctChoice: "Moscow"
  },
  {
    question: "What is the capital city of India?",
    choices: ["Delhi", "Mumbai", "Bangalore", "New Delhi"],
    correctChoice: "New Delhi"
  },
  {
    question: "What is the capital city of Australia?",
    choices: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
    correctChoice: "Canberra"
  },
  {
    question: "What is the capital city of Philippines?",
    choices: ["Manila", "Jakarta", "Bangkok", "Kuala Lumpur"],
    correctChoice: "Manila"
  },
  {
    question: "What is the capital city of Canada?",
    choices: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    correctChoice: "Ottawa"
  },
  {
    question: "What is the capital city of Israel?",
    choices: ["Jerusalem", "Tel Aviv", "Haifa", "Israel"],
    correctChoice: "Jerusalem"
  }
];

// Function to get three random choices and the correct answer
async function getChoices(correctChoice) {
  const randomCities = await fetchRandomCities();
  const choices = randomCities.slice(0, 3);
  choices.push(correctChoice);
  shuffle(choices);
  return choices;
}

// Function to show a question with its choices
async function showQuestion(index) {
  if (index < triviaQuestions.length) {
    questionElement.textContent = triviaQuestions[index].question;
    const choicesButtons = choicesElement.getElementsByTagName("button");
    const choices = await getChoices(triviaQuestions[index].correctChoice);

    for (let i = 0; i < choicesButtons.length; i++) {
      choicesButtons[i].textContent = choices[i];
    }
  } else {
    showGameOverPopup();
  }
}


// Function to handle the "Next Question" button click
function handleNextQuestion() {
  if (currentQuestionIndex < 9) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
    startTimer();
  } else {
    showResultPopup(score);
  }
}

function showPopup(isCorrect) {
  if (isCorrect) {
    // Show "Congratulations! you got the correct answer" popup
    score += 10;
  } else {
    // Show "Sorry you're wrong!" popup
  }
}

// Function to check the answer selected by the user
function checkAnswer(selectedButton) {
  const selectedAnswer = selectedButton.textContent;
  const correctAnswer = triviaQuestions[currentQuestionIndex].correctChoice;
  clearInterval(countdownTimer);

  if (selectedAnswer === correctAnswer) {
    showPopup(true);
  } else {
    showPopup(false);
  }

  handleNextQuestion();
}

function startTimer() {
  let timeLeft = 40;
  countdownTimer = setInterval(() => {
    timeLeft -= 1;
    const progressWidth = (timeLeft / 40) * 100;
    progressBar.style.width = `${progressWidth}%`;
    timeLeftElement.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      showOutOfTimePopup();
    }
  }, 1000);
}

function checkAnswer(selectedButton) {
  const selectedAnswer = selectedButton.textContent;
  const correctAnswer = triviaQuestions[currentQuestionIndex].correctChoice;
  clearInterval(countdownTimer);

  if (selectedAnswer === correctAnswer) {
    score += 10;
    showCorrectAnswerPopup();
  } else {
    showWrongAnswerPopup();
  }
}

function showCorrectAnswerPopup() {
  // Show the "Congratulations! you got the correct answer" popup
  // Update the score and other necessary elements
  // Implement the "Next Question" functionality
}

function showWrongAnswerPopup() {
  // Show the "Sorry you're wrong!" popup
  // Implement the "Next Question" functionality
}

function showOutOfTimePopup() {
  // Show the "Sorry, you're running out of time!" popup
  // Implement the "Next Question" functionality
}

function showGameOverPopup() {
  // Show the game over popup with the summary of correct answers and total score
  // Implement the leaderboard update functionality
  // Reset the game state to allow the user to select a category again
}


userInfoForm.addEventListener("submit", handleSubmit);
startGameBtn.addEventListener("click", handleStart);

document.getElementById("easyButton").addEventListener("click", () => startGame("easy"));;
document.getElementById("moderateButton").addEventListener("click", () => startGame("moderate"));
document.getElementById("hardButton").addEventListener("click", () => startGame("hard"));



window.onload = function() {
  document.getElementById("myAudio").play();
}
