import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards,config } from './utils.js';

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
const profileSaveBtn = profileForm.querySelector('.popup__save');

const placeAddBtn = document.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('.popup_place-profile');
const placeCloseBtn = placeAddPopup.querySelector('.popup__close');
const placeSubmitBtn = placeAddPopup.querySelector('.popup__save');
const placeSubmit = placeAddPopup.querySelector('.popup__content');
const imageViewPopup = document.querySelector('.popup_place-image');
const imageViewCloseBtn = imageViewPopup.querySelector('.popup__close');
const popupImage = imageViewPopup.querySelector('.popup__image');
const popupSubtitle = imageViewPopup.querySelector('.popup__caption');
const placeInput = placeAddPopup.querySelector('.popup__input_place_name')
const linkInput = placeAddPopup.querySelector('.popup__input_place_link')
const placeForm = document.querySelector('.popup__form-place')

const cardFormValidator = new FormValidator(placeForm,config);
const profileFormValidator = new FormValidator(profileForm,config);

function openPopup(popups) {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseOnEsc);
}

function closePopup(popups) {
  popups.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseOnEsc);
}

function openProfileForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent; 
  openPopup(profileOpen);
}

function handleProfileFormSubmit (evt){
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profileOpen);
}

function handleCloseOnEsc(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

profileEdit.addEventListener('click', openProfileForm); 
profileCloseBtn.addEventListener ('click', () => closePopup(profileOpen));
profileForm.addEventListener('submit', handleProfileFormSubmit); 


 placeAddBtn.addEventListener('click', function() {
  cardFormValidator.toggleButton();;
  openPopup(placeAddPopup);
  cardFormValidator.cleanError()
}); 

placeCloseBtn.addEventListener ('click',() => closePopup(placeAddPopup));
imageViewCloseBtn.addEventListener('click',() => closePopup(imageViewPopup));

initialCards.forEach((item) => {
  const card = new Card(item, '.template',handleOpenCardImage);
  const cardElement = card.generateCard();

  document.querySelector('.elements').append(cardElement);
});

 function handleOpenCardImage (item){
      popupSubtitle.textContent = item.name;
      popupImage.src = item.link;
      popupImage.alt = item.name;
      openPopup(imageViewPopup);
  };

  function handleAddPlace(evt){
        evt.preventDefault();
        const card = new Card({name: placeInput.value, link: linkInput.value},'.template',handleOpenCardImage);
        const cardElement = card.generateCard();
        document.querySelector('.elements').prepend(cardElement);
        closePopup(placeAddPopup);
        placeForm.reset();
    }
  
  placeSubmitBtn.addEventListener('submit', handleAddPlace); 

  placeSubmit.addEventListener('submit', handleAddPlace); 


  cardFormValidator.enableValidation();
  profileFormValidator.enableValidation();

  profileOpen.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup_opened")
    ) {
      closePopup(profileOpen);
    }
  });
  
  placeAddPopup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup_opened")
    ) {
      closePopup(placeAddPopup);
    }
  });
 
  
  imageViewPopup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup_opened")
    ) {
      closePopup(imageViewPopup);
    }
  });