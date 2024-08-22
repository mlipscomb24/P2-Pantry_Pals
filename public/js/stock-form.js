document.addEventListener('DOMContentLoaded', () => {
        /* const modalTriggers = document.querySelectorAll('.js-modal-trigger');
        const modal = document.querySelector('#modal-js');
        const closeModal = modal.querySelector('.delete');
      
        modalTriggers.forEach(trigger => {
          trigger.addEventListener('click', () => {
            modal.classList.add('is-active');
          });
        });
      
        closeModal.addEventListener('click', () => {
          modal.classList.remove('is-active');
        }); */
      
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
    
// Bulma Modal Event Listener: https://bulma.io/documentation/components/modal/
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
  
    (
      document.querySelectorAll(
        ".modal-close, .modal-card-head .delete, .modal-card-foot .button"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");
  
      $close.addEventListener("click", () => {
  
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
  
  
    document.addEventListener('keydown', (event) => {
      if(event.key === "") {
  
        closeAllModals();
      }
    });
  });