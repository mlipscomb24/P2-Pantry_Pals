import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

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

            const responseData = await response.json();
            console.log('Server response:', response.status, responseData);

            if (response.ok) {
              // Instead of redirecting, update the UI
              const itemsList = document.getElementById('items-list');
              const newItem = document.createElement('li');
              newItem.textContent = `${itemName} - ${iconValue} - ${exp_dateValue}`;
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

        tippy('#expiration-date', {
        content:
`	1.	Milk
	•	Expiration: 7–10 days(refrigerated)
	2.	Bread
	•	Expiration: 5–7 days(room temperature), 3 months(frozen)
	3.	Eggs
	•	Expiration: 3–5 weeks(refrigerated)
	4.	Bananas
	•	Expiration: 2–7 days(room temperature)
	5.	Chicken(Raw)
	•	Expiration: 1–2 days(refrigerated), 9 months(frozen)
	6.	Apples
	•	Expiration: 4–6 weeks(refrigerated), 5–7 days(room temperature)
	7.	Cheese(Hard)
	•	Expiration: 3–4 weeks(refrigerated)
	8.	Ground Beef
	•	Expiration: 1–2 days(refrigerated), 3–4 months(frozen)
	9.	Butter
	•	Expiration: 1–3 months(refrigerated), 6–9 months(frozen)
	10.	Tomatoes
	•	Expiration: 1 week(room temperature)
	11.	Yogurt
	•	Expiration: 1–3 weeks(refrigerated)
	12.	Potatoes
	•	Expiration: 1–2 weeks(room temperature), 2–3 months(cool, dark place)
	13.	Carrots
	•	Expiration: 3–4 weeks(refrigerated)
	14.	Cereal
	•	Expiration: 6–12 months(unopened), 3–4 months(opened)
	15.	Lettuce
	•	Expiration: 1 week(refrigerated)
	16.	Orange Juice(Unopened)
	•	Expiration: 1–2 weeks(refrigerated)
	17.	Onions
	•	Expiration: 1–2 months(cool, dry place)
	18.	Pasta(Dry)
	•	Expiration: 1–2 years(pantry)
	19.	Rice(Uncooked)
	•	Expiration: Indefinite(if kept dry), 6 months(cooked, refrigerated)
                20.	Frozen Vegetables
	•	Expiration: 8–12 months(frozen) `,
    trigger: focus,
    interactive: true,
    });
});
