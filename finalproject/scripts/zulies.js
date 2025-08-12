// ===== Current year =====
const currentYearEl = document.getElementById("currentyear");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// ===== Last modified =====
const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  const modified = new Date(document.lastModified);
  const formatted = modified.toLocaleString();
  lastModifiedEl.textContent = formatted;
}

// ===== Hamburger menu toggle =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}
