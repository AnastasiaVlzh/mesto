import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards,config,profileEdit,profileForm,placeAddBtn,placeAddPopup,placeInput,linkInput,placeForm} from '../script/utils.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import '../pages/index.css'

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
  }});
  popupOpenPicture.setEventListeners();
  const cardElement = card.generateCard()
  return cardElement;
}

// class Section - отрисовка элементов на странице

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