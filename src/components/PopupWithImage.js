import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector, imageSelector, captionSelector,handleOpenCardImage){
        super(popupSelector);
        this._imageSelector = document.querySelector(imageSelector);
        this._captionSelector = document.querySelector(captionSelector);
    }
    
    openPopup(item){
        this._captionSelector.textContent = item.name;
        this._imageSelector.src = item.link;
        this._imageSelector.alt = item.name;
        super.open();
    }
}