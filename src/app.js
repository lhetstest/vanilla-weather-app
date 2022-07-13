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

const formatDay = (timestamp) => {
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return shortWeekDays[day];
};

const displayForecast = (response) => {
    let foreCast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";
    foreCast.forEach(function (foreCastDay, index) {
        if(index>0 && index<7) {
        forecastHTML = forecastHTML + `<div class="col-2">
            <div class="forecast-weekday">${formatDay(foreCastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${foreCastDay.weather[0].icon}@2x.png" 
            width="44"
            alt="clear">
            <div class="forecast-temperature">
                <span class="forecast-temperature-day">
                    ${Math.round(foreCastDay.temp.max)} °
                </span>
                <span class="forecast-temperature-night">
                    ${Math.round(foreCastDay.temp.min)} °
                </span>    
            </div> 
        </div>`;
    }
    } )
      
    forecastElement.innerHTML = forecastHTML;
};

const showMonth = () => {
    let day = new Date();
    let dayOfMonth = day.getDate();
    let month = day.getMonth();
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return `${dayOfMonth} ${months[month]}`;
} 

const getForecast = (coordinates) => {
    let APIKEY = "bd71345693d3c57b7742e27f41d36a4d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKEY}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
};

const getCurrentPosition = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getForecast);
}

const showRealTemp = (response) => {
    let tempElement=document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let dayMonthElement =  document.querySelector('#month');
    let iconElement = document.querySelector('#icon');

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML = response.data.name;
    dayMonthElement.innerHTML = showMonth();

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
    e.preventDefault();
    let cityInputElement = document.querySelector("#city-input");

    search(cityInputElement.value);
};

const showFahrenheitTemperature = (e) => {
    e.preventDefault();
    let tempElement = document.querySelector('#temperature');
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemperature);
};

const showCelsiusTemperature = (e) => {
    e.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempElement = document.querySelector('#temperature');
    tempElement.innerHTML = Math.round(celsiusTemperature);
};

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener("click", showCelsiusTemperature);

let form = document.querySelector('#search-form');
form.addEventListener("submit", handleSubmit);

search("Vienna");

displayForecast();