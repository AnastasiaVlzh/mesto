let profileEdit = document.querySelector('.profile__edit-button');
let profileOpen = document.querySelector('.popup__profile_form');
let profileCloseBtn = profileOpen.querySelector('.popup__close');
let profileSubmit = profileOpen.querySelector('.popup__form')

let nameInput = profileSubmit.querySelector('.popup__input_type_name');
let jobInput = profileSubmit.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__user-name');
let profileDescription = document.querySelector('.profile__description');
let profileSaveBtn = profileSubmit.querySelector('.popup__save');
let profileElement = profileOpen.querySelector('.popup__content');


function togglePopup () {
    profileOpen.classList.toggle ('popup_opened');
    if (profileOpen.classList.contains ('popup_opened')){
        nameInput.value = profileName.textContent;
        jobInput.value = profileDescription.textContent; 
    }
}

function formSubmitHandler (evt){
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup ();
}

profileEdit.addEventListener('click', togglePopup); 
profileCloseBtn.addEventListener ('click',togglePopup);
profileElement.addEventListener('submit', formSubmitHandler); 

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
const placeAddPopup = document.querySelector('.popup__place_profile');
const placeCloseBtn = placeAddPopup.querySelector('.popup__close');
const placeSubmitBtn = placeAddPopup.querySelector('.popup__save_place')
const placeSubmit = placeAddPopup.querySelector('.popup__content')



function togglePopupAddPlace () {
    placeAddPopup.classList.toggle ('popup_opened');
 } 


 placeAddBtn.addEventListener('click', togglePopupAddPlace); 
 placeCloseBtn.addEventListener ('click',togglePopupAddPlace);
 placeSubmitBtn.addEventListener ('click',togglePopupAddPlace);
 


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

      
      const imageViewPopup = document.querySelector('.popup__place_image');
      const imageViewCloseBtn = document.querySelector('.popup__close_image');
      
      function togglePopupImageView(){
        imageViewPopup.classList.add('popup_opened');
     }
    

      img.addEventListener('click',function(){
        const popupImage = imageViewPopup.querySelector('.popup__image');
        const popupSubtitle = imageViewPopup.querySelector('.popup__caption');
        popupSubtitle.textContent = item.name;
        popupImage.src = item.link;
        popupImage.alt = item.name;
        togglePopupImageView(imageViewPopup);
      });

      imageViewCloseBtn.addEventListener('click',function(){
          imageViewPopup.classList.remove('popup_opened');
      });

      const likeButton = getElementTemplate.querySelector('.element__like');

        likeButton.addEventListener('click', function(){
            likeButton.classList.toggle('element__like_active');
       });
      
      return getElementTemplate;
  }


  function handleAddPlace(evt){
    evt.preventDefault();
    const placeInput = document.querySelector('.popup__input_place_name').value;
    const linkInput = document.querySelector('.popup__input_place_link').value;
    const element = getElement({name: placeInput, link: linkInput});
    elementsContainer.prepend(element);
}

function handleRemoveElement(evt){
    const element = evt.target.closest('.element');
    element.remove();
}


placeSubmit.addEventListener('submit', handleAddPlace); 
  render();
