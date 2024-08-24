// Helper function to convert icon names to emojis
const iconToEmoji = (iconName) => {
  const iconMap = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grapes: '🍇',
    kiwi: '🥝',
    peach: '🍑',
    berry: '🫐',
    watermelon: '🍉',
    lemon: '🍋',
    melon: '🍈',
    pineapple: '🍍',
    strawberry: '🍓',
    mango: '🥭',
    avocado: '🥑',
    carrot: '🥕',
    pepper: '🌶️',
    eggplant: '🍆',
    tomato: '🍅',
    corn: '🌽 ',
    broccoli: '🥦',
    leafygreen: '🥬',
    fish: '🐟',
    shrimp: '🍤',
    cheese: '🧀',
    milk: '🥛',
    steak: '🥩',
    chicken: '🍗',
    egg: '🥚',
    bread: '🍞',
    bacon: '🥓',
    pizza: '🍕',
    seedling: '🌱',
    cookie: '🍪',
    rice: '🍚',
    bottle: '🍶',
    juice: '🧃',
  };
  return iconMap[iconName] || iconName;
};

document.addEventListener('DOMContentLoaded', () => {
  const stockForm = document.getElementById('stock-form');
  console.log('Form found:', stockForm);

  if (stockForm) {
    stockForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const item = document.getElementById('item-name');
      const icon = document.getElementById('icon');
      const exp_date = document.getElementById('expiration-date');

      console.log('Form elements:', { item, icon, exp_date });
      if (item && icon && exp_date) {
        const itemName = item.value.trim();
        const iconValue = icon.value.trim();
        const exp_dateValue = exp_date.value.trim();

        console.log('Form data:', { itemName, iconValue, exp_dateValue });

        if (itemName && iconValue && exp_dateValue) {
          try {
            console.log('Performing fetch POST to /api/stock endpoint');
            const response = await fetch('/api/stock', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                'item-name': itemName,
                icon: iconValue,
                'expiration-date': exp_dateValue,
              }),
            });
            console.log('Initiating content type check');
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
              console.log('Content type check passed');
              const responseData = await response.json();
              console.log('Server response:', response.status, responseData);

              if (response.ok) {
                // Instead of redirecting, update the UI
                const itemsList = document.getElementById('items-list');
                const newItem = document.createElement('li');
                newItem.classList.add('item-card');
                newItem.setAttribute('data-id', responseData.item_id);
                newItem.innerHTML = `
                    <span class="item-icon">${iconToEmoji(iconValue)}</span>
                    <div class="item-details">
                        <h3 class="item-name">${itemName}</h3>
                        <p class="item-date">Expires: ${exp_dateValue}</p>
                    </div>
                    <a href="" class="button is-warning">Remove</a>
                `;
                // newItem.textContent = `${itemName} - ${iconValue} - ${exp_dateValue}`;
                itemsList.appendChild(newItem);
                // Clear the form
                console.log('Clearing the form...');
                stockForm.reset();
              } else {
                console.error('Failed to add item:', responseData.error);
              }
            } else {
              console.error('ExprectedJSON but received:', contentType);
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

  //DELETE function
  document.querySelectorAll('.button.is-warning').forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      const itemId = btn.closest('li').dataset.id;
      console.log('Detected click', itemId);
      const response = await fetch(`/api/stock/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Deleting item:', itemId);
        const itemToRemove = document.querySelector(`li[data-id="${itemId}"]`);
        if (itemToRemove) {
          itemToRemove.remove();
          const deletedItem = await response.json();
          console.log('Deleted item:', deletedItem);
        } else {
          console.error('Failed to delete the item');
        }
      } else {
        console.error('Failed to delete the item');
      }
    });
  });
});
