export class FormValidator{
  constructor (formElement,config){
    this._form = formElement;
    this._config = config;
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._inputErrorClass = this._form.querySelector(this._config.inputErrorClass);
    this._errorClass = this._form.querySelector(this._config.errorClass);
    }

  enableValidation(){
    this._inputs.forEach((_input)=>{
      _input.addEventListener('input', (event) => this._handleFormInput());
    });
    this.toggleButton ();
    };

  toggleButton(){
    this._button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity());
    this._button.disabled = !this._form.checkValidity();
    }

  _handleFormInput(){
    const input = event.target;
    const formError = document.querySelector(`#${input.id}-error`);
        
    if(input.validity.valid){
      this._hideError(input);        
    } else {
      formError.textContent=input.validationMessage;
      input.classList.add(this._config.inputErrorClass);
      formError.classList.add(this._config.errorClass);
    }
      this.toggleButton();
    }

  cleanError() {
      this._inputs.forEach((input) => {
        this._hideError(input);
      });
      this.toggleButton();
    };
    
  _hideError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    };
}