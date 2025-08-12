document.getElementById('subscribeForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const purposeInput = document.querySelector('input[name="purpose"]:checked');
  const message = document.getElementById('message').value.trim();

  // Simple email regex for basic validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation checks
  if (!firstName) {
    alert('Please enter your first name.');
    return;
  }
  if (!lastName) {
    alert('Please enter your last name.');
    return;
  }
  if (!email || !emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!purposeInput) {
    alert('Please select the purpose of your message.');
    return;
  }
  if (!message) {
    alert('Please enter your message.');
    return;
  }

  // If all validations pass, encode and redirect
  const params = new URLSearchParams({
    firstName: encodeURIComponent(firstName),
    lastName: encodeURIComponent(lastName),
    email: encodeURIComponent(email),
    phone: encodeURIComponent(phone),
    purpose: encodeURIComponent(purposeInput.value),
    message: encodeURIComponent(message)
  });

  window.location.href = 'user-message.html?' + params.toString();
});
