// dashboard.js
document.addEventListener('DOMContentLoaded', (event) => {
  const addButton = document.getElementById('add-item');
  const itemsContainer = document.getElementById('items-container');

  addButton.addEventListener('click', () => {
    const newItem = itemsContainer.querySelector('.item-entry').cloneNode(true);

    // Clear input values
    newItem.querySelectorAll('input, select').forEach((input) => {
      input.value = '';
    });

    // Update name attributes to ensure they're unique
    newItem.querySelectorAll('[name]').forEach((el) => {
      el.name = el.name.replace(
        '[]',
        '[' + itemsContainer.children.length + ']',
      );
    });

    itemsContainer.appendChild(newItem);
  });
});
