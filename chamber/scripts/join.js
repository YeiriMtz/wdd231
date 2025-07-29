// Set current timestamp
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('timestamp').value = new Date().toISOString();
  
  // Handle modals
  const links = document.querySelectorAll('.membership-cards a');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modal = document.querySelector(link.getAttribute('href'));
      modal.style.display = 'block';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(modal => modal.style.display = 'none');
    });
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
});

// THANK YOU PAGE
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const fields = ["firstName", "lastName", "email", "phone", "organization", "timestamp"];

  fields.forEach(field => {
    const el = document.getElementById(field);
    if (el && params.has(field)) {
      el.textContent = decodeURIComponent(params.get(field));
    }
  });

  // Set footer year and last modified
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString();
});
