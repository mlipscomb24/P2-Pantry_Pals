document.addEventListener('DOMContentLoaded', () => {
  const stockForm = document.getElementById('stock-form');
  const addButton = document.querySelector('button.add-input');
  const inputDiv = document.querySelector('form.input');

  stockForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const item = document.getElementById('item').value.trim();
    const icon = document.getElementById('icon').value.trim();
    const date = document.getElementById('date').value.trim();
  });
  //Add more items button
  addButton.addEventListener('click', () => {
    let newInput = document.createElement('stockForm');

    inputDiv.appendChild(newInput);
  });

  if (item && icon && date) {
    const response = fetch('api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ item, icon, date }),
    });
  }
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to add item(s).');
  }
});
