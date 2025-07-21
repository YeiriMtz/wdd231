// Footer date info
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString();

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.querySelector(".nav-links"); // renamed

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
const navLinks = document.querySelectorAll(".nav-links a"); // original name OK here

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  // Special case for index.html or root
  if ((linkPage === currentPage) || (currentPage === "" && linkPage === "index.html")) {
    link.classList.add("active");
  }
});
