const ApiKey = "3f6e3d40fd4ccb891fd9333bb992ba57";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function cheakWeather(city) {
    const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);

    // Check if the response status is not OK (e.g., 404 for a city not found)
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        // Check if 'main' and 'weather' data are available in the response
        if (data.main && data.weather) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "image/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "image/clear.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "image/rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "image/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "image/mist.png";
            }

            // Display weather data and hide error
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        } else {
            // Handle case where main or weather data is missing
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
    }
}

searchBtn.addEventListener("click", () => {
    cheakWeather(searchBox.value);
});

 