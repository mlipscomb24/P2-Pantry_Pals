document.addEventListener('DOMContentLoaded', () => {
  const stockForm = document.getElementById('stock-form');
  console.log('Form found:', stockForm);

  if (stockForm) {
    stockForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const item = document.getElementById('item-name');
      const icon = document.getElementById('icon');
      const date = document.getElementById('expiration-date');

      console.log('Form elements:', { item, icon, date });

      if (item && icon && date) {
        const itemName = item.value.trim();
        const iconValue = icon.value.trim();
        const dateValue = date.value.trim();

        console.log('Form data:', { itemName, iconValue, dateValue });

        if (itemName && iconValue && dateValue) {
          try {
            const response = await fetch('/api/stock', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                'item-name': itemName,
                icon: iconValue,
                'expiration-date': dateValue,
              }),
            });

            const responseData = await response.json();
            console.log('Server response:', response.status, responseData);

            if (response.ok) {
              // Instead of redirecting, update the UI
              const itemsList = document.getElementById('items-list');
              const newItem = document.createElement('li');
              newItem.textContent = `${itemName} - ${iconValue} - ${dateValue}`;
              itemsList.appendChild(newItem);

              // Clear the form
              stockForm.reset();
            } else {
              console.error('Failed to add item:', responseData.error);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          console.error('All fields are required');
        }
      } else {
        console.error('Form fields not found.');
      }
    });
  } else {
    console.error('Stock form element not found.');
  }
});
