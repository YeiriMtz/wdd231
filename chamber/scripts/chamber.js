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
  let href = link.getAttribute("href");
  if (href === currentPage || (currentPage === "" && href === "index.html")) {
    link.classList.add("active");
  }
});

// Directory Grid/List View elements
const membersContainer = document.getElementById("members-container");
const gridBtn = document.getElementById("grid-view-btn");
const listBtn = document.getElementById("list-view-btn");

// Only run directory related code if elements exist (i.e., on directory.html)
if (membersContainer && gridBtn && listBtn) {

  async function fetchMembers() {
    try {
      let response = await fetch("data/members.json");
      if (!response.ok) throw Error("Failed to load members data");
      let members = await response.json();
      renderMembers(members);
    } catch (err) {
      membersContainer.textContent = "Error loading members.";
      console.error(err);
    }
  }

  function renderMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
      let card = document.createElement("div");
      card.className = `member-card member-level-${member.membershipLevel}`;

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p>${member.description || ""}</p>
      `;

      membersContainer.appendChild(card);
    });
  }

  function setGridView() {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
  }

  function setListView() {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
  }

  gridBtn.addEventListener("click", () => {
    setGridView();
  });

  listBtn.addEventListener("click", () => {
    setListView();
  });

  fetchMembers();
  setGridView();
}

// Spotlights (for homepage, spotlights container should exist)
const spotlightContainer = document.getElementById("spotlight-container");

if (spotlightContainer) {
  async function fetchSpotlights() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Failed to fetch spotlight members.");
      const members = await response.json();

      // Filter for Gold (3) and Silver (2)
      const eligible = members.filter(member =>
        member.membershipLevel === 2 || member.membershipLevel === 3
      );

      // Shuffle and select 3
      const shuffled = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

      spotlightContainer.innerHTML = "";

      shuffled.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
          <h3>${member.name}</h3>
          <p><strong>Membership:</strong> ${member.membershipLevel === 3 ? "Gold" : "Silver"}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p>${member.description}</p>
        `;

        spotlightContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Spotlight Error:", error);
      spotlightContainer.textContent = "Unable to load spotlights.";
    }
  }

  fetchSpotlights();
}
