document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('stock-form');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const itemName = formData.get('item-name');
      const icon = formData.get('icon');
      const expirationDate = formData.get('expiration-date');

      // Log the form data for debugging
      console.log('Sending data:', { itemName, icon, expirationDate });

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
        });

        if (response.ok) {
          const newItem = await response.json();
          console.log('Received new item:', newItem);

          const itemList = document.querySelector('.box ul');
          if (itemList) {
            const listItem = document.createElement('li');
            listItem.textContent = `${newItem.item} - ${newItem.icon}`;
            itemList.appendChild(listItem);
            form.reset();
          } else {
            console.error('Item list container not found');
          }
        } else {
          console.error('Failed to add the item. Status:', response.status);
          const errorText = await response.text();
          console.error('Error details:', errorText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  } else {
    console.error('Form element not found.');
  }
});
