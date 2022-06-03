import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards,config } from './utils.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import '../pages/index.css'

const popups = document.querySelectorAll('.popup');
const profileEdit = document.querySelector('.profile__edit-button');
const profileOpen = document.querySelector('.popup_profile-form');
const profileCloseBtn = profileOpen.querySelector('.popup__close');
const profileForm = document.querySelector('.popup__form')
const popupInput = profileForm.querySelector('.popup__input');

const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__user-name');
const profileDescription = document.querySelector('.profile__description');
const profileSaveBtn = document.querySelector('.popup__save');

const placeAddBtn = document.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('.popup_place-profile');
const placeCloseBtn = placeAddPopup.querySelector('.popup__close');
const placeSubmitBtn = placeAddPopup.querySelector('.popup__save');
const placeSubmit = placeAddPopup.querySelector('.popup__content');
const imageViewPopup = document.querySelector('.popup_place-image');
const imageViewCloseBtn = imageViewPopup.querySelector('.popup__close');
const popupImage = imageViewPopup.querySelector('.popup__image');
const popupSubtitle = imageViewPopup.querySelector('.popup__caption');
const placeInput = placeAddPopup.querySelector('.popup__input_place_name');
const linkInput = placeAddPopup.querySelector('.popup__input_place_link');
const placeForm = placeAddPopup.querySelector('.popup__form');

const elements = document.querySelector('.elements');

const cardFormValidator = new FormValidator(placeForm,config);
const profileFormValidator = new FormValidator(profileForm,config);

const popupOpenPicture = new PopupWithImage('.popup_place-image', '.popup__image', '.popup__caption');

const profileUserInfo = new UserInfo({
  name: '.profile__user-name',
  job: '.profile__description'
})

// попап с профилем страницы

const popupProfileForm = new PopupWithForm('.popup_profile-form',
  {handleFormSubmit: (data) => {
    profileUserInfo.setUserInfo(data);
  }})
  popupProfileForm.setEventListeners();

profileEdit.addEventListener('click', () => {
  popupProfileForm.open(profileUserInfo.getUserInfo());
});

profileForm.addEventListener('submit', () => {
  popupProfileForm.close();
}); 


//попап с добавлением картинки

const popupPlaceAdd = new PopupWithForm('.popup_place-profile',
{handleFormSubmit: () => {
  const card = createCard({name: placeInput.value, link: linkInput.value});
  
  defaultCardList.addItem(card);
}})
popupPlaceAdd.setEventListeners();

 placeAddBtn.addEventListener('click', () => {
  cardFormValidator.toggleButton();
  popupPlaceAdd.open();
  cardFormValidator.cleanError()
}); 

placeForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  popupPlaceAdd.close();
}); 


// class Card - отрисовка новой карточки


const createCard = (item) => {
  const card = new Card(item, '.template',{handleOpenCardImage:()=>{
    popupOpenPicture.openPopup(item);
    popupOpenPicture.setEventListeners();
  }});
  const cardElement = card.generateCard()
  return cardElement;
}


  //class Section - отрисовка элементов на странице.

  const defaultCardList = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        defaultCardList.addItem(createCard(item));
      },
    },
    ".elements"
  );
  
  defaultCardList.renderItems(initialCards);

  // валидация форм

  cardFormValidator.enableValidation();
  profileFormValidator.enableValidation();

