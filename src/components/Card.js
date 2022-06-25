
export class Card{
  constructor(item,cardSelector,userId, handleOpenCardImage,handleRemoveButtonClick){
    this._name = item.name;
    this._link= item.link;
    this._likes = item.likes;
    this._cardSelector = cardSelector;
    this._handleOpenCardImage = handleOpenCardImage;
    this._handleDeleteIcon = handleRemoveButtonClick;
    this._userId = userId;
    this._ownerId = item.owner._id;
    this._id = item._id;

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
    this._element.setAttribute("id", this._id);
    this._elementPic = this._element.querySelector('.element__picture');
    this._setEventListeners();

    if (this._ownerId === this._userId) {
      this._element.querySelector('.element__remove').classList.add('element__remove_active');
    };
        
    this._elementPic.src= this._link;
    this._elementPic.alt= this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    
    this._element.querySelector('.element__like-number').textContent = this._likes.length;

    if(this.isLiked()){
      this._element.querySelector('.element__like').classList.add('element__like_active');
    }
        
    return this._element
    }

    removeCard(){
    this._element.remove();
    this._element = null;
    }

    isLiked(){
      return this._likes.some((item) => {
        return item._id === this._userId
      })
    }
    
    _handleLikeElement(){
    }
    

  _setEventListeners(){
    this._element.querySelector('.element__remove').addEventListener ('click',()=>{
      this._handleDeleteIcon(this._ownerId)
  });

    this._element.querySelector('.element__like').addEventListener('click',()=>{
      this._handleLikeElement(this)
  });

    this._elementPic.addEventListener('click',()=>{
      this._handleOpenCardImage({name: this._name, link: this._link});
  });

  }
}