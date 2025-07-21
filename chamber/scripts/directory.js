// Footer date info
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString();

// Hamburger menu toggle
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

// Highlight current page link
const currentPage = location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-links a"); 

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  // Special case for index.html or root
  if ((linkPage === currentPage) || (currentPage === "" && linkPage === "index.html")) {
    link.classList.add("active");
  }
});

// Weather info
const apiKey = '694f3d563d3489dfbfc9bcb22b0cc292';

const weatherLocation = document.getElementById('weather-location');
const weatherDescription = document.getElementById('weather-description');
const weatherTemp = document.getElementById('weather-temp');
const weatherHighLow = document.getElementById('weather-high-low');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherSunrise = document.getElementById('weather-sunrise');
const weatherSunset = document.getElementById('weather-sunset');
const weatherIcon = document.getElementById('weather-icon');

function formatTime(unixTime, timezoneOffset) {
  const date = new Date((unixTime + timezoneOffset) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

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
      weatherTemp.textContent = `${main.temp} °C`;
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

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        getWeatherByCoords(lat, lon);
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
