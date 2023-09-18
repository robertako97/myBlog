const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },

    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');

      return response;
    } else {
      alert('Login failed. Please try again.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const lastname = document.querySelector('#last-name-signup').value.trim();




  if (name && email && password && lastname && username) {
    const response = await fetch('api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, lastname, username }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Sign Up failed, verify credentials and try again.');

    }
  }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
