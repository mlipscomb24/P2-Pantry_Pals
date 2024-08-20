document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stock-form');
    const addButton = document.querySelector('button.add-input') 
    
    stockForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const item = document.getElementById('item').value.trim();
    const icon = document.getElementById('icon').value.trim();
    const date = document.getElementById('date').value.trim();
    
    });
    //Add more items button
    document.querySelector('addButton').addEventListener('click', () => {
        let field = document.createElement('stockForm');
        document.querySelector('stockForm').insertBefore(field, document.querySelector('form:last-child'))};
    
    
    if (item && icon && date) {
    const response = await fetch('api/stock', {
    method: 'POST', 
    body: JSON.stringify({ item, icon, date }), 
    })};
    
    if (response.ok) {
    document.location.replace('/dashboard'); 
    } else {
    alert ('Failed to add item.'); 
    }
    {
    });
    
    $(document).on('click', '.add_field', function() {
      $('<div class="input-group"><input type="email" class="input" name="email[]" value="" placeholder="Your email"><input type="password" class="input" name="password[]" value="" placeholder="Your password"></div>').insertAfter('.input-group:last');
})
});