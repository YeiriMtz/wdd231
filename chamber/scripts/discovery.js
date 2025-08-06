async function loadDiscoveryItems() {
  try {
    const response = await fetch('data/discovery.json');
    const data = await response.json();
    const container = document.querySelector('.discovery-grid');

    data.items.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('discovery-card');
      card.setAttribute('style', `grid-area: card${index + 1};`);

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button">Learn More</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading discovery items:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadDiscoveryItems);

function displayLastVisitMessage() {
  const messageEl = document.getElementById('visit-message');
  if (!messageEl) return; // safety check

  const now = new Date();
  const lastVisit = localStorage.getItem('lastVisit');
  
  if (!lastVisit) {
    // First visit
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = new Date(lastVisit);
    const diffMs = now - lastVisitDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      messageEl.textContent = "Back so soon! Awesome!";
    } else {
      messageEl.textContent = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
    }
  }

  // Update lastVisit for next time
  localStorage.setItem('lastVisit', now.toISOString());
}

document.addEventListener('DOMContentLoaded', displayLastVisitMessage);
