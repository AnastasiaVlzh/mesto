import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { config,
profileEdit,
profileForm,
placeAddBtn,
placeInput,
linkInput,
placeForm,
placeDeleteBtn,
profileAvatar,
profileFormAvatar,
inputName,
inputJob
} from '../utils/utils.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import '../pages/index.css'
import { Api } from '../components/api.js';
import { data } from 'autoprefixer';
import { PopupWithConfirm} from '../components/PopupWithConfirm.js';

const cardFormValidator = new FormValidator(placeForm,config);
const profileFormValidator = new FormValidator(profileForm,config);
const profilePhotoValidator = new FormValidator(profileFormAvatar,config);

const popupOpenPicture = new PopupWithImage('.popup_place-image', '.popup__image', '.popup__caption');
popupOpenPicture.setEventListeners();

const profileUserInfo = new UserInfo({
  name: '.profile__user-name',
  about: '.profile__description',
  avatar: '.profile__avatar',
  formName:'#name-input',
  formJob:'#job-input'
})

const api = new Api('8e904e2d-1e9e-4822-a1dc-ac070e02dd13');

const defaultCardList = new Section ({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  }
},  ".elements");

  Promise.all([api.getUserData(), api.getCardsData()])
  .then(([data, cards]) => {
    profileUserInfo.setUserInfo(data);
    profileUserInfo.setUserId(data._id);
    defaultCardList.renderItems(cards);
  })
  .catch((err)=>{
    console.log(err)
  })

// кнопка загрузки

const isLoading = (state,buttonSelector,loadedText = "Сохранить",loadingtext = "Сохранение...") =>{
  if(!state){
    document.querySelector(buttonSelector).textContent = loadedText;
  } else{
    document.querySelector(buttonSelector).textContent = loadingtext;
  }
}

// попап с профилем страницы

const handleOpenPopupProfileForm = () => {
  const data = profileUserInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.about;
  profileFormValidator.cleanError();
  popupProfileForm.open();
}

const popupProfileForm = new PopupWithForm('.popup_profile-form',
  {handleFormSubmit: (user) => {
    isLoading(true,'.popup__save_profile')
    api.updateUserData(user)
    .then((res)=>{
      profileUserInfo.setUserInfo(res);
    })
    .then(()=>{
      popupProfileForm.close();
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      isLoading(false,'.popup__save_profile');
    })
  }})

popupProfileForm.setEventListeners();

profileEdit.addEventListener('click',handleOpenPopupProfileForm);


// попап с аватаром страницы

const popupProfilePhoto = new PopupWithForm('.popup_avatar',
{handleFormSubmit: (user) => {
  isLoading(true,'.popup__save_avatar');
  api.updateAvatar(user)
  .then((res)=>{
    profileUserInfo.setUserInfo(res);
  })
  .then(()=>{
    popupProfilePhoto.close();
  })
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    isLoading(false,'.popup__save_avatar');
  })
}})

popupProfilePhoto.setEventListeners();

profileAvatar.addEventListener('click', () => {
  popupProfilePhoto.open(profileUserInfo.getUserInfo());
  profilePhotoValidator.cleanError();
});

//попап с добавлением картинки

const popupPlaceAdd = new PopupWithForm('.popup_place-profile',
{handleFormSubmit: (card) => {
  isLoading(true,'.popup__save_place',"Создать","Создание...");
  api.addCard(card)
    .then((card)=>{
      return defaultCardList.addCardToTheBeginning(createCard(card));
    })
    .then(()=>{
      popupPlaceAdd.close();
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      isLoading(false,'.popup__save_place',"Создать","Создание...");
    })
}})

popupPlaceAdd.setEventListeners();

placeAddBtn.addEventListener('click', () => {
  cardFormValidator.toggleButton();
  popupPlaceAdd.open();
  cardFormValidator.cleanError()
}); 

// отрисовка новой карточки, удаление, установка лайков

const popupDeleteCard = new PopupWithConfirm('.popup_place-delete')
popupDeleteCard.setEventListeners();


const createCard = (item) => {
  const newCard = new Card(
    item, 
    '.template',
    profileUserInfo.getUserId(), 
    ()=>{
     popupOpenPicture.openPopup(item);
    },
    (card)=>{
    popupDeleteCard.open();
    popupDeleteCard.setSubmitAction(()=>{
      isLoading(true,'.popup__save_delete');
      api.deleteCard(item._id)
      .then(()=>{
        newCard.removeCard();
      })
      .then(()=>{
        popupDeleteCard.close();
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        isLoading(false,'.popup__save_delete');
      })
    });
  },
  );
  newCard._handleLikeElement = (card) => {
    const element = document.getElementById(card._id)
    element.querySelector('.element__like').classList.toggle('element__like_active');
    const requestType = card.isLiked() ? 'DELETE' : 'PUT';
  
    api.updateLike(card._id, requestType)
      .then((res) => {
        card._likes = res.likes
        element.querySelector('.element__like-number').innerHTML = res.likes? res.likes.length : 0;
      })
      .catch((err)=>
    console.log(err))
  }
   const cardElement = newCard.generateCard()
   return cardElement;
 }


// валидация форм

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
profilePhotoValidator.enableValidation();





