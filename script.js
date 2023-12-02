let countryInput = document.getElementById("countryInput");
let searchBtn = document.getElementById("searchBtn");
let result = document.getElementById("result");

searchBtn.addEventListener("click", function () {
  let countryName = countryInput.value.trim();
  if (countryName === "") {
    result.innerHTML = `<p class="px-5 md:px-16 text-red-600 font-bold">Please enter a country name before searching.</p>`;
    return;
  }

  let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  result.innerHTML = `<p class="text-center px-5 md:px-18 font-bold text-yellow-500 md:text-xl ">Loading...</p>`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 404) {
        result.innerHTML = `<p class="px-5 md:px-16 text-red-600 font-bold">It seems like the country you entered might not exist or is not recognized internationally. Please verify the name or try searching for a different country.</p>`;
      } else {
        result.innerHTML = `
            <img class="shadow-xl w-[70%] mx-auto mt-4 md:w-[50%]" src="${
              data[0].flags.svg
            }" class="flagImage">
            <h2 class="font-bold text-2xl mb-5 mt-2">${data[0].name.common}</h2>

            <div class="flex justify-center items-center gap-2 w-[90%] mx-auto mt-3">
                <div class="flex justify-center items-center flex-col bg-gradient-to-r from-blue-200 to-cyan-200 px-4 py-3 rounded shadow-xl min-w-[50%]">
                    <p class='text-sm'>Capital : </p>
                    <span class="text-lg font-bold">${data[0].capital[0]}</span>
                </div>
                <div class="flex justify-center items-center flex-col bg-gradient-to-r from-blue-200 to-cyan-200 px-4 py-3 rounded shadow-xl min-w-[50%]">
                    <p class="text-sm">Continent : </p>
                    <span class="text-lg font-bold">${data[0].continents[0]}</span>
                </div>
            </div>

            <div class="flex justify-center items-center gap-2 mt-3 w-[90%] mx-auto">
                <div class="flex justify-center items-center flex-col bg-gradient-to-r from-blue-200 to-cyan-200 px-4 py-3 rounded shadow-xl min-w-[50%]">
                    <h4 class="text-sm">Population : </h4>
                    <span class="text-lg font-bold">${data[0].population}</span>
                </div>
                <div class="flex justify-center items-center flex-col bg-gradient-to-r from-blue-200 to-cyan-200 px-1 py-3 rounded shadow-xl min-w-[50%]">
                <h4 class="text-sm">Currency : </h4>
                <span class="text-lg font-bold">${
                data[0].currencies[Object.keys(data[0].currencies)].name
                }</span>
                </div>
            </div>

            <div class="flex justify-center items-center flex-col bg-gradient-to-r from-blue-200 to-cyan-200 px-1 py-3 rounded shadow-xl w-[90%] mx-auto mt-3">
            <h4 class="text-sm">Common Languages : </h4>
            <span class="text-lg font-bold">${Object.values(data[0].languages)
              .toString()
              .split(",")
              .join(", ")}</span>
                </div>
                `;
      }
    })
    .catch((error) => {
      console.log("Error occured while fetching data : ", error);
      result.innerHTML = `<p class="px-5 md:px-16 text-red-600 font-bold">An error occurred while fetching data. Please try again later.</p>`;
    });
});
