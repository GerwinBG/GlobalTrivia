
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

  // Scroll to the welcome user div
  welcomeUserDiv.scrollIntoView({ behavior: "smooth" });
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
const progressBarElement = document.querySelector('.progress-bar');
const countdownContainer = document.querySelector('.countdown-container');
const nextButton = document.getElementById("nextBtn");
// const topPlayers =[
//   {
//     name: "Klane",
//     score: 100,
//   },
//   {
//     name: "Mariya",
//     score: 90,
//   },
//   {
//     name: "Gerwin",
//     score: 80,
//   },
//   {
//     name: "Baneknek",
//     score: 95,
//   },
//   {
//     name: "Mendz",
//     score: 75,
//   }

// ]


// This for Trivia game timer 
let timeLeft = 40; 

function startCountdown() {
  const countdownInterval = setInterval(() => {
    const progress = (timeLeft / 40) * 100;
    progressBarElement.style.height = `${progress}%`;

    const seconds = timeLeft % 60;

    timerElement.innerHTML = `00:${seconds.toString().padStart(2, '0')}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      timerElement.innerHTML = "Time's up!";
      countdownContainer.style.visibility = 'hidden';
    }
  }, 1000);
}

startCountdown();




// Cards For Country
const countriesElement = document.querySelector('.cardCountry')
const search = document.querySelector('.search')
const region = document.querySelectorAll('.region')
const regionName = document.getElementsByClassName('regionName')
// fetchCountry
async function fetchCountry () {
  const url = await fetch("https://restcountries.com/v3.1/all");
  const res = await url.json();
  res.forEach(Element => {
    showCountry(Element)
  });
}
fetchCountry()
// 


function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("card");
  country.innerHTML = `
        <img src="${data.flags.png}" class="card-img-top" />
        <hr class="p=0">
        <div class="card-body">    
        <h5><b>${data.name.common}</b></h5>
          <p><strong>Capital:</strong> ${data.capital}</p> 
          <p class="regionName">Region: ${data.region}</p>
          <p>Population: ${data.population}</p>
        </div> 
  `;
  countriesElement.appendChild(country);
}


region.forEach(element => {
  element.addEventListener("click", () => {
  Array.from(regionName).forEach(elem => {
     if(elem.innerText.includes(element.innerText) || element.innerText == "All") {
      elem.parentElement.parentElement.style.display = "grid";
     } else {
      elem.parentElement.parentElement.style.display = "none";
     }
    });
  })
})


