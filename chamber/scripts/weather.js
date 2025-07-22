const apiKey = '694f3d563d3489dfbfc9bcb22b0cc292';

// Elements for current weather
const weatherLocation = document.getElementById('weather-location');
const weatherDescription = document.getElementById('weather-description');
const weatherTemp = document.getElementById('weather-temp');
const weatherHighLow = document.getElementById('weather-high-low');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherSunrise = document.getElementById('weather-sunrise');
const weatherSunset = document.getElementById('weather-sunset');
const weatherIcon = document.getElementById('weather-icon');

// Elements for forecast
const forecastToday = document.getElementById('forecast-today');
const forecastWed = document.getElementById('forecast-wed');
const forecastThu = document.getElementById('forecast-thu');

function formatTime(unixTime, timezoneOffset) {
  const date = new Date((unixTime + timezoneOffset) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getWeatherByCity(city, country) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Weather fetch failed');
      return response.json();
    })
    .then(data => {
      const { name, sys, main, weather, timezone, coord } = data;

      weatherLocation.textContent = `${name}, ${sys.country}`;
      const description = weather[0].description;
      weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      weatherTemp.textContent = `${main.temp} °C`;
      weatherHighLow.innerHTML = `<strong>High:</strong> ${main.temp_max} °C / <strong>Low:</strong> ${main.temp_min} °C`;
      weatherHumidity.innerHTML = `<strong>Humidity:</strong> ${main.humidity}%`;
      weatherSunrise.innerHTML = `<strong>Sunrise:</strong> ${formatTime(sys.sunrise, timezone)}`;
      weatherSunset.innerHTML = `<strong>Sunset:</strong> ${formatTime(sys.sunset, timezone)}`;

      // Static icon path
      weatherIcon.src = 'images/weather-icon.webp';
      weatherIcon.alt = 'Weather icon';
      weatherIcon.style.display = 'inline';

      getForecastByCoords(coord.lat, coord.lon);
    })
    .catch(error => {
      console.error(error);
      weatherLocation.textContent = 'Unable to get weather data';
    });
}

function getForecastByCoords(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then(response => {
      if (!response.ok) throw new Error('Forecast fetch failed');
      return response.json();
    })
    .then(data => {
      const forecastList = data.list;

      const today = new Date();
      const nextWednesday = new Date(today);
      const nextThursday = new Date(today);

      nextWednesday.setDate(today.getDate() + ((3 + 7 - today.getDay()) % 7 || 7));
      nextThursday.setDate(today.getDate() + ((4 + 7 - today.getDay()) % 7 || 7));

      const todayStr = today.toISOString().split('T')[0];
      const wedStr = nextWednesday.toISOString().split('T')[0];
      const thuStr = nextThursday.toISOString().split('T')[0];

      const getMiddayForecast = (dateStr) => {
        return forecastList.find(f => f.dt_txt.startsWith(dateStr) && f.dt_txt.includes("12:00:00"));
      };

      const renderTempOnly = (element, forecast, label) => {
        if (!forecast) {
          element.textContent = `${label}: No data`;
          return;
        }
        element.innerHTML = `<strong>${label}:</strong> ${forecast.main.temp} °C`;
      };

      renderTempOnly(forecastToday, getMiddayForecast(todayStr), 'Today');
      renderTempOnly(forecastWed, getMiddayForecast(wedStr), 'Next Wednesday');
      renderTempOnly(forecastThu, getMiddayForecast(thuStr), 'Next Thursday');
    })
    .catch(error => {
      console.error(error);
      forecastToday.textContent = 'Forecast unavailable';
      forecastWed.textContent = '';
      forecastThu.textContent = '';
    });
}

// Start weather fetch
getWeatherByCity('Chihuahua', 'MX');
