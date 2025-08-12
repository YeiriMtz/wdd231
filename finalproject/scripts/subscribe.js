document.getElementById('subscribeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('first-name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name && email) {
    localStorage.setItem('subscriberName', name);
    localStorage.setItem('subscriberEmail', email);
    window.location.href = 'thankyou.html';  // Adjust path if needed
  } else {
    alert('Please enter both your name and email.');
  }
});
