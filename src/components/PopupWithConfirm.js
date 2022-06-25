import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup{
    setSubmitAction(action){
        this._handleConfirmRemove = action;
    }

    setEventListeners(){
        this._selector.addEventListener('submit',(evt)=>{
            evt.preventDefault();
            this._handleConfirmRemove(); 
        });
        super.setEventListeners();
        }
}