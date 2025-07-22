// WEATHER INFO ----------------------------------------------------------------------------------
const currentWeatherEl = document.querySelector('.current-weather');
const forecastEl = document.querySelector('.weather-forecast');

const weatherIcon = document.getElementById('weather-icon');
const locationEl = document.getElementById('weather-location');
const descriptionEl = document.getElementById('weather-description');
const tempEl = document.getElementById('weather-temp');
const highLowEl = document.getElementById('weather-high-low');
const humidityEl = document.getElementById('weather-humidity');
const sunriseEl = document.getElementById('weather-sunrise');
const sunsetEl = document.getElementById('weather-sunset');

const forecastToday = document.getElementById('forecast-today');
const forecastWed = document.getElementById('forecast-wed');
const forecastThu = document.getElementById('forecast-thu');

const API_KEY = '694f3d563d3489dfbfc9bcb22b0cc292';
const lat = 28.6353;
const lon = -106.0889;
const units = 'metric';

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&exclude=minutely,hourly,alerts`
    );
    const data = await response.json();

    // CURRENT WEATHER
    const current = data.current;
    locationEl.textContent = "Chihuahua, Mexico";
    descriptionEl.textContent = `Conditions: ${current.weather[0].description}`;
    tempEl.textContent = `Temp: ${current.temp.toFixed(1)} °C`;
    highLowEl.textContent = `High: ${data.daily[0].temp.max.toFixed(1)} °C / Low: ${data.daily[0].temp.min.toFixed(1)} °C`;
    humidityEl.innerHTML = `<span class="label">Humidity:</span> ${current.humidity}%`;

    // Icon
    const iconCode = current.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.src = iconURL;
    weatherIcon.alt = current.weather[0].description;
    weatherIcon.style.display = "inline";

    // Sunrise/Sunset
    const sunriseTime = new Date(current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunriseEl.innerHTML = `<span class="label">Sunrise:</span> ${sunriseTime}`;
    sunsetEl.innerHTML = `<span class="label">Sunset:</span> ${sunsetTime}`;

    const days = data.daily;

    forecastToday.innerHTML = `<span class="label">Today:</span> ${days[0].temp.max.toFixed(1)}°C`;
    forecastWed.innerHTML = `<span class="label">Wednesday:</span> ${days[2].temp.max.toFixed(1)}°C`;
    forecastThu.innerHTML = `<span class="label">Thursday:</span> ${days[3].temp.max.toFixed(1)}°C`;

  } catch (error) {
    console.error("Error fetching weather:", error);
    locationEl.textContent = "Failed to load weather.";
  }
}

getWeather();
