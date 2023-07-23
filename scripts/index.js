
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
const triviaGameSection = document.getElementById("triviaGameSection");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let userName;
let triviaQuestions;
let currentQuestionIndex = 0;
let score = 0;
let countdownTimer;

function handleSubmit(event) {
  event.preventDefault();

  const userName = document.getElementById("nameInput").value;
  document.getElementById("congratulations").textContent =
    "Welcome to GlobalTrivia, " + userName + "!";

  userInfoForm.style.display = "none";
  welcomeUserSection.style.display = "flex";
}

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", handleSubmit);





