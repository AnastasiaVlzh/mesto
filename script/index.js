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



//add new card

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

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


 placeAddBtn.addEventListener('click', function() {
  toggleButton (placeForm, placeSubmitBtn);
  openPopup(placeAddPopup);
  cleanError(config, placeAddPopup)
}); 


 placeCloseBtn.addEventListener ('click',() => closePopup(placeAddPopup));
 placeSubmitBtn.addEventListener ('submit',handleAddPlace);
 imageViewCloseBtn.addEventListener('click',() => closePopup(imageViewPopup));
 


const elementsContainer = document.querySelector('.elements');
const template = document.querySelector('.template');


function render(){
      const html = initialCards.map(getElement);
      elementsContainer.append(...html);
  }

function getElement(item){
      const getElementTemplate = template.content.cloneNode(true);
      const title = getElementTemplate.querySelector('.element__name');
      const img = getElementTemplate.querySelector('.element__picture');
      const removeButton = getElementTemplate.querySelector('.element__remove');
   
      title.textContent = item.name;
      img.src = item.link;
      img.alt = item.name;
      
      removeButton.addEventListener('click', handleRemoveElement);
    
      img.addEventListener('click',function(){
        popupSubtitle.textContent = item.name;
        popupImage.src = item.link;
        popupImage.alt = item.name;
        openPopup(imageViewPopup);
      });

      const likeButton = getElementTemplate.querySelector('.element__like');

        likeButton.addEventListener('click', function(){
            likeButton.classList.toggle('element__like_active');
       });
      
      return getElementTemplate;
  }


  function handleAddPlace(evt){
    evt.preventDefault();
    const element = getElement({name: placeInput.value, link: linkInput.value});
    elementsContainer.prepend(element);
    closePopup(placeAddPopup);
    placeInput.value = ""; 
    linkInput.value = ""; 
    
}

function handleRemoveElement(evt){
    const element = evt.target.closest('.element');
    element.remove();
}


placeSubmit.addEventListener('submit', handleAddPlace); 

  render();


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