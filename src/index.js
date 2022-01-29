function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector("#temp");
  nowTemp.innerHTML = temp;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
}

function searchTemp(event) {
  event.preventDefault();
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
  console.log(latitude);
  console.log(longitude);
  let apiKey = "6a9394d6d39a65a984e888e3891d896e";
  let tempUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${tempUrl}`).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  console.log(response.data);
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
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let localTempButton = document.querySelector("#localTemp-button");
localTempButton.addEventListener("click", currentTemp);

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
let min = now.getMinutes();
today.innerHTML = `${day} ${hour}:${min}`;
