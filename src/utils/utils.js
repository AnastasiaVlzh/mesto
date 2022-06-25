
  export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 
  
  export const profileEdit = document.querySelector('.profile__edit-button');
  export const profileForm = document.querySelector('.popup__form')
  export const placeAddBtn = document.querySelector('.profile__add-button');
  export const placeAddPopup = document.querySelector('.popup_place-profile');
  export const placeInput = placeAddPopup.querySelector('.popup__input_place_name');
  export const linkInput = placeAddPopup.querySelector('.popup__input_place_link');
  export const placeForm = placeAddPopup.querySelector('.popup__form');
  export const placeDeleteBtn = document.querySelector('.element__remove');
  export const profileAvatar = document.querySelector('.profile__avatar_edit');
  export const profileFormAvatar = document.querySelector('.popup__form_avatar')