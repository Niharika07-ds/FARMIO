const API_KEY = "20cf5783cceef486b397fb6ed58ef98d";
let isCelsius = true;
let currentLat, currentLon;

// Loader helpers
const loader = document.getElementById("loader");
const showLoader = () => loader.classList.remove("hidden");
const hideLoader = () => loader.classList.add("hidden");

// On load
window.onload = () => useMyLocation();

// ================= LOCATION =================
function useMyLocation() {
  showLoader();
  navigator.geolocation.getCurrentPosition(pos => {
    currentLat = pos.coords.latitude;
    currentLon = pos.coords.longitude;
    fetchWeather(currentLat, currentLon);
  });
}

// ================= FETCH =================
function fetchWeather(lat, lon) {
  const unit = isCelsius ? "metric" : "imperial";

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      updateUI(data);
      setDayNight(data);
      setAnimation(data.weather[0].main);
      getForecast(lat, lon);
    })
    .finally(hideLoader);
}

// ================= SEARCH =================
function searchByCity() {
  const city = input.value;
  if (!city) return;

  showLoader();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      currentLat = data.coord.lat;
      currentLon = data.coord.lon;
      updateUI(data);
      setDayNight(data);
      setAnimation(data.weather[0].main);
      getForecast(currentLat, currentLon);
    })
    .finally(hideLoader);
}

// ================= UI UPDATE =================
function updateUI(data) {
  city.innerText = `${data.name}, ${data.sys.country}`;
  temperature.innerText = Math.round(data.main.temp) + (isCelsius ? " °C" : " °F");
  clouds.innerText = data.weather[0].description;
  img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  humidity.innerText = data.main.humidity;
  wind.innerText = data.wind.speed;
  pressure.innerText = data.main.pressure;
}

// ================= DAY / NIGHT =================
function setDayNight(data) {
  const hour = new Date().getHours();
  document.body.className = hour >= 6 && hour < 18 ? "day" : "night";
}

// ================= UNIT TOGGLE =================
function toggleUnit() {
  isCelsius = !isCelsius;
  unitBtn.innerText = isCelsius ? "°F" : "°C";
  fetchWeather(currentLat, currentLon);
}

// ================= ANIMATION =================
function setAnimation(type) {
  const anim = document.getElementById("animation");
  anim.className = "animation";

  if (type.includes("Rain")) anim.classList.add("rain");
  else if (type.includes("Snow")) anim.classList.add("snow");
  else anim.classList.add("sun");
}

// ================= FORECAST =================
function getForecast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      hourForecast(data);
      dayForecast(data);
    });
}
