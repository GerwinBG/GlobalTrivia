
// toggle for nav
function myFunction(x) {
  x.classList.toggle("change");
} 
const btnContainer = document.querySelector("navbarSupportedContent");

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

const pages = ['home', 'countries', 'about'];

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

// This is for UserInfo to leaderboard

const userInfoForm = document.getElementById("userInfoForm");
const welcomeUserDiv = document.getElementById("congratulations");
const startGameBtn = document.getElementById("startGameBtn");
const leaderboard = document.getElementById("leaderboard");

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Hide the user info form
  userInfoForm.style.display = "none";

  // Display the welcome user div
  welcomeUserDiv.style.display = "block";
}

// Function to handle start button click
function handleStart() {
  // Hide the welcome user div
  welcomeUserDiv.style.display = "none";

  // Display the leaderboard
  leaderboard.style.display = "block";
}

// Attach event listener to form submission
userInfoForm.addEventListener("submit", handleSubmit);

// Attach event listener to start button click
startGameBtn.addEventListener("click", handleStart);

// End for leaderboard function

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const questionTime = 40; // Time in seconds for each question
let timeLeft = questionTime;
let timerInterval;

// Fetch data from the Restcountries.com API
async function fetchData() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/independent?status=true");
    const data = await response.json();
    questions = data.map((country) => ({
      question: `What is the capital of ${country.name.common}?`,
      options: getOptions(data, country.name.common, 3),
      correctAnswer: country.capital[0]
    }));
    displayQuestion();
    startTimer();
  } catch (error) {
    console.log(error);
    questionElement.textContent = "Failed to fetch questions. Please try again later.";
  }
}

// Generate options for a specific question
function getOptions(data, correctAnswer, count) {
  const options = [];
  const randomIndices = getRandomIndices(data.length, count - 1); // Subtract 1 from count to accommodate the correct answer

  // Add the correct answer
  options.push(correctAnswer);

  // Add random incorrect answers
  randomIndices.forEach((index) => {
    const incorrectAnswer = data[index].capital[0];
    options.push(incorrectAnswer);
  });

  // Shuffle the options
  shuffleArray(options);

  return options;
}

// Shuffle array elements in-place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Get random indices from 0 to max (exclusive)
function getRandomIndices(max, count) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option, currentQuestion.correctAnswer));
    button.style.marginRight = "10px"; // Add space between answer buttons
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption, correctAnswer) {
  optionsElement.classList.add("disabled"); // Disable answer buttons
  if (selectedOption === correctAnswer) {
    score++;
    feedbackElement.textContent = "Congratulations! You're correct!";
  } else {
    feedbackElement.innerHTML = `<strong>Wrong</strong><br><p>Better luck next question.</p>`;
  }

  clearInterval(timerInterval); // Stop the timer
  timeLeft = questionTime; // Reset the time for the next question

  nextButton.style.display = "block"; // Show the next question button
}

function startTimer() {
  timeLeft = questionTime;
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showTimeUpPopup();
    }
  }, 1000);
}

function showTimeUpPopup() {
  optionsElement.classList.add("disabled"); // Disable answer buttons
  feedbackElement.innerHTML = `<strong>Time's up!</strong><br><p>Better luck next question.</p>`;
  nextButton.style.display = "block"; // Show the next question button
}

function nextQuestion() {
  optionsElement.classList.remove("disabled"); // Enable answer buttons for the next question
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    feedbackElement.textContent = ""; // Clear the feedback
    nextButton.style.display = "none"; // Hide the next question button
    startTimer();
  } else {
    endGame();
  }
}

function endGame() {
  optionsElement.innerHTML = "";
  questionElement.textContent = "";
  feedbackElement.textContent = "";
  scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
  timerElement.textContent = ""; // Clear the timer display
}

fetchData();


// Cards For Country

// fetchCountry
const loadCountryAPI = () => {
  fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(data => displayCountries(data))
}
// display all countries
const displayCountries = countries => {
  const countriesHTML = countries.map(country => getCountry(country))
  // displaying div to HTML
  const containerMap =document.getElementById('cardCountry');
  containerMap.innerHTML = countriesHTML.join(' ');
}


// get data and set it to Html
const getCountry = (country) =>  {
  console.log(country)
  return `
    <div class="card">
      <img src="${country.flags.png}" class="card-img-top" />
      <div class="card-body">    
        <h5>${country.name.common}</h5>
        <p class="card-text">Capital: ${country.capital}</p> 
        <p class="card-text">Region: ${country.region}</p>
        <p class="card-text">Population: ${country.population}</p>
      </div>  
    </div>

  ` 
}

loadCountryAPI()