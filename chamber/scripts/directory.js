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

const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-view-btn');
const listBtn = document.getElementById('list-view-btn');

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load members data');   
    const members = await response.json();
    renderMembers(members);
  } catch (error) {
    membersContainer.textContent = 'Error loading members.';
    console.error(error);
  }
}

function renderMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = `member-card member-level-${member.membershipLevel}`;

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p>${member.description || ''}</p>
    `;

    membersContainer.appendChild(card);
  });
}

function setGridView() {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
}

function setListView() {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
}

gridBtn.addEventListener('click', () => {
  setGridView();
});

listBtn.addEventListener('click', () => {
  setListView();
});

fetchMembers();
setGridView();

