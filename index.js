const xhr = new XMLHttpRequest();
const apiKey = "820a48eee5a1ccdc61e7dc53a181f2e0";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&`;

const tempHeading = document.querySelector(".weather");
let tempFarenheit = "";
let tempCelcius = "";
let tempToggle = false;
const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(input) {
    const isZipCode = /^\d{5}$/.test(input);
    
    const queryParam = isZipCode ? `zip=${input}` : `q=${input}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl + queryParam + `&appid=${apiKey}`, true);
    
    xhr.onload = function () {
        if (xhr.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display="none";
            return;
        } else if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML =
                Math.round(data.main.temp) + "°C";
            tempCelcius = Math.round(data.main.temp);
            tempFarenheit = Math.round((9 / 5) * tempCelcius + 32);
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }
            document.querySelector(".display-heading").style.display = "none";
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    };
    xhr.send();
}

tempHeading.addEventListener("click", () => {
    if (!tempToggle) {
        document.querySelector(".temp").innerHTML = tempFarenheit + "°F";
        tempToggle = !tempToggle;
    }
    else {
        document.querySelector(".temp").innerHTML = tempCelcius + "°C";
        tempToggle = !tempToggle;
    }
})

searchBtn.addEventListener("click", () => {
    if (!searchBox.value) {
        return;
    }
    checkWeather(searchBox.value);
}
)
