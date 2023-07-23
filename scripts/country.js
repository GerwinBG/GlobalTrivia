// Cards For Country
const countriesElement = document.querySelector('.cardCountry')
const search = document.querySelector('.search')
const region = document.querySelectorAll('.region')
const regionName = document.getElementsByClassName('regionName')
const countryName = document.getElementsByClassName('countryName')
// fetchCountry
async function fetchCountry () {
  const url = await fetch("https://restcountries.com/v3.1/all");
  const res = await url.json();
  res.forEach(Element => {
    showCountry(Element)
  });
}

// 

fetchCountry()
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("card");
  country.innerHTML = `
            <img src="${data.flags.png}" class="card-img-top" />
            <hr class="p=0">
            <div class="card-body">    
            <h5 class="countryName"><b>${data.name.common}</b></h5>
            <p><b>Capital:</b>${data.capital}</p> 
            <p class="regionName"><b>Region:</b>${data.region}</p>
            <p><b>Population:</b>${data.population}</p>
        </div> 
  `;
  countriesElement.appendChild(country);
  country.addEventListener("click", ()=> {
    showCountryDetail(data)
  })
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
search.addEventListener("input", ()=>{
  Array.from(countryName).forEach(elem => {
    if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
     elem.parentElement.parentElement.style.display = "grid";
    } else {
     elem.parentElement.parentElement.style.display = "none";
    }
   });
})


