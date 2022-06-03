export class Popup{
    constructor(popupSelector){
        this._selector = document.querySelector(popupSelector)
    }
    open(){
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown',  this._handleEscClose);
    }
    close = () =>{
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (event) =>{
        if (event.key === "Escape") {
            this.close();
          }
    }
    setEventListeners() {
        this._selector.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("popup") ||
                event.target.classList.contains("popup_opened")
            ) {
            this.close();
        }
            if (
                event.target.classList.contains("popup__close")
                ) {
            this.close();
        }
        }); 
    }
}
