
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
        toggleButton (form, config);
        form.addEventListener('submit', (event) => handleFormSubmit(event,form,config));
        const inputs = form.querySelectorAll(config.inputSelector);
        inputs.forEach((input)=>{
            input.addEventListener('input', (event) => handleFormInput(event,form,config));
        });
    });
  }

function toggleButton (form, config){
    console.log(form);
    const button = form.querySelector(config.submitButtonSelector);
    button.classList.toggle('popup__save_disabled', !form.checkValidity());
    button.disabled = !form.checkValidity();
}


  function handleFormSubmit(event,form){
      event.preventDefault();
      console.log(form.checkValidity());
     
  };

function handleFormInput(event,form,config){
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
   toggleButton (form, config);
}

enableValidation(config);



function cleanError(config, popups) {
    const inputs = Array.from(
      popups.querySelectorAll(config.inputSelector)
    );
    inputs.forEach((input) => {
      hideError(input, config.inputErrorClass, config.errorClass);
    });
  };


  function hideError (inputElement,inputErrorClass, errorClass) {
    console.log(inputElement);
    const errorElement = document.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  };




