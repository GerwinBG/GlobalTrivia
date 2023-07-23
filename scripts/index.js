
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
const welcomeUserDiv = document.getElementById("congratulations");
const startGameBtn = document.getElementById("startGameBtn");
const categorySection = document.getElementById("categorySection");
const triviaGameSection = document.getElementById("TriviaGame");

  
    function handleSubmit(event) {
      event.preventDefault(); 

      // Hide the user info form
      userInfoForm.style.display = "none";

      // Display the welcome user div
      welcomeUserDiv.style.display = "block";

      // Scroll to the welcome user div
      welcomeUserDiv.scrollIntoView({ behavior: "smooth" });
    }

    // Function to show the category section and hide the welcome section
    function showCategorySection() {
      welcomeUserDiv.style.display = "none";
      categorySection.style.display = "block";
    }

    // Function to start the game based on the selected category
    function startGame(category) {
      // Hide the category section
      categorySection.style.display = "none";

      // Show the TriviaGame section
      triviaGameSection.style.display = "block";

    }

    userInfoForm.addEventListener("submit", handleSubmit);
    startGameBtn.addEventListener("click", showCategorySection);

// Define mytrivia questions and answers
const triviaQuestions = [
  {
    question: "What is the Capital of USA?",
    choices: ["Random City 1", "Random City 2", "Washington D.C", "Random City 3"],
    correctChoice: "Washington D.C"
  },
  // Add other questions here...
];

let currentQuestionIndex = 0;
let score = 0;
let countdownTimer;

function startTriviaGame() {
  document.getElementById("TriviaGame").style.display = "block";
  showQuestion(currentQuestionIndex);
  startTimer();
}

function showQuestion(index) {
  if (index < triviaQuestions.length) {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    questionElement.textContent = triviaQuestions[index].question;
    const choicesButtons = choicesElement.getElementsByTagName("button");
    for (let i = 0; i < choicesButtons.length; i++) {
      choicesButtons[i].textContent = triviaQuestions[index].choices[i];
    }
  } else {
    showGameOverPopup();
  }
}

function startTimer() {
  let timeLeft = 40;
  const timerElement = document.getElementById("timer");
  const progressBar = timerElement.querySelector(".progress-bar");
  const timeLeftElement = timerElement.querySelector(".time-left");
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

// Add an event listener to the button that starts the trivia game
const startButton = document.getElementById("startTriviaButton");
startButton.addEventListener("click", startTriviaGame);







