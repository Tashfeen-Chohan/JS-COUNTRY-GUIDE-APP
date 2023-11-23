let countryInput = document.getElementById("countryInput")
let searchBtn = document.getElementById("searchBtn")
let result = document.getElementById("result")

searchBtn.addEventListener("click", function(){
    let countryName = countryInput.value
    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    console.log(url)

    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        result.innerHTML = `
            <img src="${data[0].flags.svg}" class="flagImage">
            <h2>${data[0].name.common}</h2>
            <div class="dataWrapper">
                <h4>Capital : </h4>
                <span>${data[0].capital[0]}</span>
            </div>
            <div class="dataWrapper">
                <h4>Continent : </h4>
                <span>${data[0].continents[0]}</span>
            </div>
            <div class="dataWrapper">
                <h4>Population : </h4>
                <span>${data[0].population}</span>
            </div>
            <div class="dataWrapper">
                <h4>Currency : </h4>
                <span>${data[0].currencies[Object.keys(data[0].currencies)].name}</span>
            </div>
            <div class="dataWrapper">
                <h4>Common Languages : </h4>
                <span>${Object.values(data[0].languages).toString().split(",").join(', ')}</span>
            </div>
        `

    })
})