let countryInput = document.getElementById("countryInput");
let searchBtn = document.getElementById("searchBtn");
let result = document.getElementById("result");

searchBtn.addEventListener("click", function () {
  let countryName = countryInput.value;
  let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.status === 404){
            result.innerHTML = `<p class="p-5 text-red-600 font-bold">It seems like the country you entered might not exist or is not recognized internationally. Please verify the name or try searching for a different country.</p>`;
        } else {

            result.innerHTML = `
            <img class="shadow-xl w-[70%] mx-auto mt-4 md:w-[50%]" src="${data[0].flags.svg}" class="flagImage">
            <h2 class="font-bold text-2xl mb-5 mt-2">${data[0].name.common}</h2>
            <div class="flex justify-start items-center gap-5 ml-5 font-bold">
                <h4>Capital : </h4>
                <span>${data[0].capital[0]}</span>
            </div>
            <div class="flex justify-start items-center gap-5 ml-5 font-bold">
                <h4>Continent : </h4>
                <span>${data[0].continents[0]}</span>
            </div>
            <div class="flex justify-start items-center gap-5 ml-5 font-bold">
                <h4>Population : </h4>
                <span>${data[0].population}</span>
            </div>
            <div class="flex justify-start items-center gap-5 ml-5 font-bold">
            <h4>Currency : </h4>
            <span>${
              data[0].currencies[Object.keys(data[0].currencies)].name
            }</span>
            </div>
            <div class="flex justify-start items-start ml-5 font-bold pr-1 md:gap-5">
            <h4 class="w-[55%] md:max-w-max">Common Languages : </h4>
            <span class="w-[45%] max-w-max">${Object.values(data[0].languages)
                .toString()
                .split(",")
                .join(", ")}</span>
                </div>
                `;
            }
            })
    .catch((error) => {
        console.log("Error occured while fetching data : ", error)
        result.innerHTML = "<p>An error occurred while fetching data. Please try again later.</p>";
    })
});
