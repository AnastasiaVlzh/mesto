let formEdit = document.querySelector('.profile__edit-button');
let formSubmit = document.querySelector('.popup');
let formCloseBtn = formSubmit.querySelector('.popup__close');

let nameInput = formSubmit.querySelector('.popup__input-name');
let jobInput = formSubmit.querySelector('.popup__input-job');
let profileName = document.querySelector('.profile__user-name');
let profileDescription = document.querySelector('.profile__description');
let formSaveBtn = formSubmit.querySelector('.popup__save');
let formElement = formSubmit.querySelector('.popup__content');


function togglePopup () {
    formSubmit.classList.toggle ('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}
function formSubmitHandler (){
    formSubmit.classList.toggle ('popup_opened');
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}


formEdit.addEventListener('click', togglePopup); 
formCloseBtn.addEventListener ('click',togglePopup);
formSaveBtn.addEventListener('click',formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler); 
