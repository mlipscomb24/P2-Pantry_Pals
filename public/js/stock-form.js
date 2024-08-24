// Helper function to convert icon names to emojis
const iconToEmoji = (iconName) => {
  const iconMap = {
    apple: '🍎',
    carrot: '🥕',
    pepper: '🌶️',
    fish: '🐟',
    cheese: '🧀',
    egg: '🥚',
    bread: '🍞',
    bacon: '🥓',
    pizza: '🍕',
    seedling: '🌱',
    cookie: '🍪',
    rice: '🍚',
    bottle: '🍶',
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

        tippy('#expiration-date', {
        content:
`	Refrigerated Items:
1.	Milk: 7–10 days
2.	Eggs: 3–5 weeks, hard-boiled: 1 week
3.  Bacon: 2 weeks (unopened), 1 week (opened)
4.	Cheese(Hard): 3–4 weeks
5.  Bread: 2 weeks
6.	Chicken(Raw): 1–2 days
7.	Ground Beef: 1–2 days
8.  Deli Meat: 2 weeks (unopened), 3-5 days (opened)
9.	Apples: 4–6 weeks
10.  Berries: 5 days
11.  Lemon/Lime: 3 weeks
12.	Butter: 1–3 months
13.	Yogurt: 2 weeks
14.	Carrots: 3–4 weeks
15. Lettuce: 1 week
16. Broccoli/Cauliflower: 1 week
17. Chard/Kale/Spinach: 5 days
18.	Fruit Juice: 1–2 weeks
19.	Rice: 6 months(cooked)
20. Jelly/Jam/Preserves: 1 year (unopened), 8 months (opened)
21. Nut Butter: 6-9 months
22. Mayonnaise: 4 months (unopened), 2 months (opened)
23. Ketchup: 1 year (unopened), 5 months (opened)
24. Mustard: 2 years (unopened), 1 year (opened)
25. Pickles/Olives/Relishes: 1 year (unopened), 3 months (opened)

Pantry Items:
1.  Onions: 1–2 months
2.	Potatoes: 1–2 weeks
3.	Tomatoes: 1 week
4.  Avocados: 5-7 days (unripened)
5.	Apples: 5–7 days
6.  Bananas: 2–7 days
7.  Bread: 5–7 days
8. Olive Oil: 18-24 months
9. Oils(Canola/Corn/Vegetable): 1-2 years (unopened), 6-8 months (opened)`,
    trigger: focus,
    interactive: true,
    });
});
