export class FormValidator{
    constructor (formElement,config){
        this._form = formElement;
        this._config = config;
    }
    enableValidation(){
            const _inputs = this._form.querySelectorAll(this._config.inputSelector);
            _inputs.forEach((_input)=>{
                _input.addEventListener('input', (event) => this._handleFormInput());
            });
            this.toggleButton ();
        };

    toggleButton (){
        const button = this._form.querySelector(this._config.submitButtonSelector);
        button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity());
        button.disabled = !this._form.checkValidity();
    }
    _handleFormInput(){
        const input = event.target;
        const formError = document.querySelector(`#${input.id}-error`);
        
        if(input.validity.valid){
            formError.textContent="";
            input.classList.remove(this._config.inputErrorClass);
            
        } else{
            formError.textContent=input.validationMessage;
            input.classList.add(this._config.inputErrorClass);
            formError.classList.add(this._config.errorClass);
        }
        this.toggleButton ();
    }


    cleanError() {
        const inputs = Array.from(
            this._form.querySelectorAll(this._config.inputSelector)
        );
        inputs.forEach((input) => {
          this._hideError(input, this._config.inputErrorClass, this._config.errorClass);
        });
      };
    _hideError (inputElement,inputErrorClass, errorClass) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
      };
}