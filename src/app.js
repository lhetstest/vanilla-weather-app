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
}

const showRealTemp = (response) => {
    let tempElement=document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    cityElement.innerHTML = response.data.name;
    tempElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute("alt", response.data.weather[0].description);
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

search("Vienna");

let form = document.querySelector('#search-form');

form.addEventListener("submit", handleSubmit);