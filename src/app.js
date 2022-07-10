const showRealTemp = (response) => {
    let tempElement=document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    console.log()
    cityElement.innerHTML = response.data.name;
    tempElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description

}

let APIKEY = "bd71345693d3c57b7742e27f41d36a4d";
let units = "metric";
let city = "Vienna";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=${units}`;

axios.get(apiUrl).then(showRealTemp);
