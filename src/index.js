function getForecast(coordinantes) {
  let apiKey = `6a9394d6d39a65a984e888e3891d896e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinantes.lat}&lon=${coordinantes.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
}

function searchTemp(response) {
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

  getForecast(response.data.coord);
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let localTempButton = document.querySelector("#localTemp-button");
localTempButton.addEventListener("click", currentTemp);

function formatDayForecast(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElemnt = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2" class="forecast">
              <div class="forecast-date">${formatDayForecast(
                forecastDay.dt
              )}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" class="icon" />
              <span class="forecast-temp forecast-temp-min"> ${Math.round(
                forecastDay.temp.max
              )}?? </span>
              <span class="forecast-temp forecast-temp-max"> ${Math.round(
                forecastDay.temp.min
              )}?? </span>
            </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElemnt.innerHTML = forecastHTML;
}
function showCity(city) {
  let cityInfo = document.querySelector("#city");
  cityInfo.innerHTML = city;
  let apiKey = `6a9394d6d39a65a984e888e3891d896e`;
  let tempUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${tempUrl}`).then(showTemp);
}

showCity("Katowice");

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
