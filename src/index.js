function showTemp(response) {
  let temp = Math.round(response.data.main.temp);

  let nowTemp = document.querySelector("#temp");
  nowTemp.innerHTML = temp;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector(`#description`);
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
}

function searchTemp(city) {
  let searchInput = document.querySelector("#search-input");
  let cityTemp = `${searchInput.value}`;
  let apiKey = `6a9394d6d39a65a984e888e3891d896e`;
  let tempUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=${apiKey}&units=metric`;
  axios.get(`${tempUrl}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
form.addEventListener("submit", searchTemp);

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6a9394d6d39a65a984e888e3891d896e";
  let tempUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${tempUrl}`).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let tempInfo = document.querySelector("#temp");
  tempInfo.innerHTML = temp;
  let cityInfo = document.querySelector("#city");
  cityInfo.innerHTML = city;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector(`#description`);
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let localTempButton = document.querySelector("#localTemp-button");
localTempButton.addEventListener("click", currentTemp);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let forecastElemnt = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  <div class="col-2">
              <div class="forecast-date">${day}</div>
              <img src="" class="float-left" alt="clear" id="icon" />
              <span class="forecast-temp-min"> 12° </span>
              <span class="forecast-temp-max"> 20° </span>
            </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElemnt.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let now = new Date();
let today = document.querySelector("#today-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
today.innerHTML = `${day} ${hour}:${min}`;

displayForecast();
