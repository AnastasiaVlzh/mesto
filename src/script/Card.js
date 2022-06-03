
export class Card{
    constructor(data,cardSelector,{handleOpenCardImage}){
      this._name = data.name;
      this._link= data.link;
      this._cardSelector = cardSelector;
      this._handleOpenCardImage = handleOpenCardImage;
    }
    _getTemplate(){
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;
    }
    
    generateCard(){
        this._element = this._getTemplate();
        this._elementPic = this._element.querySelector('.element__picture');

        this._setEventListeners();
        
        this._elementPic.src= this._link;
        this._elementPic.alt= this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        

        return this._element
    }
    _handleRemoveElement(evt){
         this._element.remove();
         this._element = null;
    }

    _handleLikeElement(){
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _setEventListeners(){
        this._element.querySelector('.element__remove').addEventListener ('click',()=>{
            this._handleRemoveElement()
        });

        this._element.querySelector('.element__like').addEventListener('click',()=>{
            this._handleLikeElement();
        });

        this._elementPic.addEventListener('click',()=>{
            this._handleOpenCardImage({name: this._name, link: this._link});
        });

    }
  }