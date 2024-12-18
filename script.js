document.addEventListener("DOMContentLoaded", () => {
    // Your weather app code goes here
    let weather = {
        apiKey: "89df12fe29ff4dad6823af80e21c00ba",
        fetchWeather: function (city) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" 
                + city 
                + "&units=metric&appid=" 
                + this.apiKey
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No weather data found.");
                    }
                    return response.json();
                })
                .then((data) => this.displayWeather(data))
                .catch((error) => console.error("Error fetching weather data:", error));
        },
        displayWeather: function(data) {
            const { name } = data; // City name
            const { country } = data.sys; // Country code
            const { icon, description } = data.weather[0]; // Weather icon and description
            const { temp, humidity } = data.main; // Temperature and humidity
            const { speed } = data.wind; // Wind speed

            document.querySelector(".city").innerText = `Weather in ${name}, ${country}`;
            document.querySelector(".temp").innerText = `${temp}°C`;
            document.querySelector(".description").innerText = description;
            document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
            document.querySelector(".wind").innerText = `Wind: ${speed} m/s`;
            document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        }
    };

    // Example default fetch
    weather.fetchWeather("Denver");

    // Add event listener for the search button
    document.querySelector(".search-btn").addEventListener("click", () => {
        const city = document.querySelector(".search-bar").value;
        weather.fetchWeather(city);
    });
});
