document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name && email && password) {
      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.redirect) {
            document.location.replace(data.redirect);
          } else {
            document.location.replace('/dashboard');
          }
        } else {
          const errorData = await response.json();
          console.error('Signup error:', errorData);
          alert(
            errorData.message ||
              'Failed to sign up. Please check the console for more details.',
          );
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert(
          'An error occurred during signup. Please check the console for more details.',
        );
      }
    }
  });
});
