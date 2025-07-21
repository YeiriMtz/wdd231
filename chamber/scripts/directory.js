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

function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather fetch failed');
      }
      return response.json();
    })
    .then(data => {
      weatherLocation.textContent = `${data.name}, ${data.sys.country}`;
      weatherDescription.textContent = data.weather[0].description;
      weatherTemp.textContent = `Temperature: ${data.main.temp} °C`;
    })
    .catch(error => {
      console.error(error);
      weatherLocation.textContent = 'Unable to get weather data';
    });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      },
      error => {
        console.error(error);
        weatherLocation.textContent = 'No weather info, location access denied';
      }
    );
  } else {
    weatherLocation.textContent = 'Geolocation not supported';
  }
}

getUserLocation();


