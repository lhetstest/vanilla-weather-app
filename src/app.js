const formatDate = (timestamp) => {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours<10) {
        hours = `0${hours}`;
    };
    if (minutes<10) {
        minutes = `0${minutes}`;
    };
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurthday",
        "Friday",
        "Saturday"
      ];
      let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
};

const displayForecast = (response) => {
    console.log(response.data.daily);
    // let date = new Date();
    let shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // let shortWeekDay = shortWeekDays[date.getDay()];
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";
    shortWeekDays.forEach(function (shortWeekDay) {
        forecastHTML = forecastHTML + `<div class="col-2">
            <div class="forecast-weekday">${shortWeekDay}</div>
            <img src="./src/assets/sunny.png" 
            width="44"
            alt="clear">
            <div class="forecast-temperature">
                <span class="forecast-temperature-day">
                    18 °
                </span>
                <span class="forecast-temperature-night">
                    12 °
                </span>    
            </div> 
        </div>`;
    } )
      
    forecastElement.innerHTML = forecastHTML;
};

const getForecast = (coordinates) => {
    let APIKEY = "bd71345693d3c57b7742e27f41d36a4d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKEY}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
};

const showRealTemp = (response) => {
    let tempElement=document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML = response.data.name;
    tempElement.innerHTML = Math.round(celsiusTemperature);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
};

const search = (city) => {
    let APIKEY = "bd71345693d3c57b7742e27f41d36a4d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=${units}`;

    axios.get(apiUrl).then(showRealTemp);
}

const handleSubmit = (e) => {
    e.preventDefault;
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
};

const showFahrenheitTemperature = (e) => {
    e.preventDefault;
    let tempElement = document.querySelector('#temperature');
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemperature);
};

const showCelsiusTemperature = (e) => {
    e.preventDefault;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempElement = document.querySelector('#temperature');
    tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector('#search-form');
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Vienna");
displayForecast();