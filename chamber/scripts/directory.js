// Footer date info ----------------------------------------------------------------------------------
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString();

// Hamburger menu toggle ----------------------------------------------------------------------------------
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("show");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinksContainer.classList.remove("show");
  }
});

// Highlight current page link ----------------------------------------------------------------------------------
const currentPage = location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-links a"); 

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  // Special case for index.html or root
  if ((linkPage === currentPage) || (currentPage === "" && linkPage === "index.html")) {
    link.classList.add("active");
  }
});

// WEATHER INFO ----------------------------------------------------------------------------------
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

// Helper function to format Unix timestamps
function formatTime(unixTime, timezoneOffset) {
  const date = new Date((unixTime + timezoneOffset) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Fetch current weather
function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Weather fetch failed');
      return response.json();
    })
    .then(data => {
      const { name, sys, main, weather, timezone } = data;
      const iconCode = weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weatherLocation.textContent = `${name}, ${sys.country}`;
      weatherDescription.textContent = weather[0].description;
      weatherTemp.textContent = `Temperature: ${main.temp} °C`;
      weatherHighLow.textContent = `High: ${main.temp_max} °C / Low: ${main.temp_min} °C`;
      weatherHumidity.textContent = `Humidity: ${main.humidity}%`;
      weatherSunrise.textContent = `Sunrise: ${formatTime(sys.sunrise, timezone)}`;
      weatherSunset.textContent = `Sunset: ${formatTime(sys.sunset, timezone)}`;

      weatherIcon.src = iconUrl;
      weatherIcon.alt = weather[0].description;
      weatherIcon.style.display = 'inline';
    })
    .catch(error => {
      console.error(error);
      weatherLocation.textContent = 'Unable to get weather data';
    });
}

// Fetch 5-day forecast and extract specific days
function getForecastByCoords(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then(response => {
      if (!response.ok) throw new Error('Forecast fetch failed');
      return response.json();
    })
    .then(data => {
      const forecastList = data.list;
      const timezoneOffset = data.city.timezone;

      const today = new Date();
      const nextWednesday = new Date(today);
      const nextThursday = new Date(today);

      // Sets to next Wednesday and Thursday
      nextWednesday.setDate(today.getDate() + ((3 + 7 - today.getDay()) % 7 || 7));
      nextThursday.setDate(today.getDate() + ((4 + 7 - today.getDay()) % 7 || 7));

      const todayStr = today.toISOString().split('T')[0];
      const wedStr = nextWednesday.toISOString().split('T')[0];
      const thuStr = nextThursday.toISOString().split('T')[0];

      const getMiddayForecast = (dateStr) => {
        return forecastList.find(f => f.dt_txt.startsWith(dateStr) && f.dt_txt.includes("12:00:00"));
      };

      const renderForecast = (elementId, forecast, label) => {
        const container = document.getElementById(elementId);
        if (!forecast) {
          container.textContent = `${label}: No forecast data available`;
          return;
        }

        const html = `
          <h3>${label}</h3>
          <p>Condition: ${forecast.weather[0].description}</p>
          <p>Temperature: ${forecast.main.temp} °C</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
        `;
        container.innerHTML = html;
      };

      renderForecast('forecast-today', getMiddayForecast(todayStr), 'Today');
      renderForecast('forecast-wed', getMiddayForecast(wedStr), 'Next Wednesday');
      renderForecast('forecast-thu', getMiddayForecast(thuStr), 'Next Thursday');
    })
    .catch(error => {
      console.error(error);
      document.getElementById('forecast').textContent = 'Unable to load forecast';
    });
}

// Gets user location and run both weather and forecast
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        getWeatherByCoords(lat, lon);
        getForecastByCoords(lat, lon);
      },
      err => {
        console.error(err);
        weatherLocation.textContent = 'Location access denied';
      }
    );
  } else {
    weatherLocation.textContent = 'Geolocation not supported';
  }
}

getUserLocation();
