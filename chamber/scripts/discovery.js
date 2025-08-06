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
