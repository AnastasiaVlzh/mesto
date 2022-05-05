

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 


function enableValidation(config){
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form)=>{
        const button = form.querySelector(config.submitButtonSelector);
        form.addEventListener('submit', (event) => handleFormSubmit(event,form,config));
        const inputs = form.querySelectorAll(config.inputSelector);
        inputs.forEach((input)=>{
            input.addEventListener('input', (event) => handleFormInput(event,form,config,button));
        });
        toggleButton (form, button, config);
    });
  }

function toggleButton (form,button){
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
    button.disabled = !form.checkValidity();
}


  function handleFormSubmit(event,form){
      event.preventDefault();
  };

function handleFormInput(event,form,config,button){
    const input = event.target;
    const formError = document.querySelector(`#${input.id}-error`);
    
    if(input.validity.valid){
        formError.textContent="";
        input.classList.remove(config.inputErrorClass);
        
    } else{
        formError.textContent=input.validationMessage;
        input.classList.add(config.inputErrorClass);
        formError.classList.add(config.errorClass);
    }
    toggleButton (form, button);
}

enableValidation(config);



function cleanError(config, placeAddPopup) {
    const inputs = Array.from(
        placeAddPopup.querySelectorAll(config.inputSelector)
    );
    inputs.forEach((input) => {
      hideError(input, config.inputErrorClass, config.errorClass);
    });
  };


  function hideError (inputElement,inputErrorClass, errorClass) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  };







