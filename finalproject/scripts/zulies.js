// Current year
const currentYearEl = document.getElementById("currentyear");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Last modified
const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  const modified = new Date(document.lastModified);
  const formatted = modified.toLocaleString();
  lastModifiedEl.textContent = formatted;
}

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Random quote (Homepage)
async function getRandomQuote() {
  try {
    const response = await fetch('data/quotes.json');
    if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
    const quotes = await response.json();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = `"${randomQuote.content}" — ${randomQuote.author}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
    document.getElementById('quote').textContent = 'Could not load quote.';
  }
}

getRandomQuote();
