import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector,{handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._selector.querySelector('.popup__form');
    
    }
    _getInputValues(){
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._inputForm = {};
    this._inputList.forEach((input)=>{
        this._inputForm[input.name]=input.value;
    });
    return this._inputForm;
    }

    setEventListeners(){
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
            });
        super.setEventListeners();
    }

    close(){
        this._popupForm.reset();
        super.close();
    }

}