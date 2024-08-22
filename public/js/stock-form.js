document.addEventListener('DOMContentLoaded', () => {
        const modalTriggers = document.querySelectorAll('.js-modal-trigger');
        const modal = document.querySelector('#modal-js');
        const closeModal = modal.querySelector('.delete');
      
        modalTriggers.forEach(trigger => {
          trigger.addEventListener('click', () => {
            modal.classList.add('is-active');
          });
        });
      
        closeModal.addEventListener('click', () => {
          modal.classList.remove('is-active');
        });
      
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
    addButton.addEventListener('click', ()=>{ // button to add the inputs
        let newInput = document.createElement('stockForm'); 

        inputDiv.appendChild(newInput)

    });

    
    if (item && icon && date) {
    const response = await fetch('api/dashboard', {
    method: 'POST', 
    body: JSON.stringify({ item, icon, date }), 
    })};
    
    if (response.ok) {
    document.location.replace('/dashboard'); 
    } else {
    alert ('Failed to add item(s).'); 

    }});
    
