let formEdit = document.querySelector('.profile__edit-button');
let formOpen = document.querySelector('.popup');
let formCloseBtn = formOpen.querySelector('.popup__close');
let formSubmit = formOpen.querySelector('.popup__form')

let nameInput = formSubmit.querySelector('.popup__input_name');
let jobInput = formSubmit.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__user-name');
let profileDescription = document.querySelector('.profile__description');
let formSaveBtn = formSubmit.querySelector('.popup__save');
let formElement = formOpen.querySelector('.popup__content');


function togglePopup () {
    formOpen.classList.toggle ('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function formSubmitHandler (evt){
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup ();
}


formEdit.addEventListener('click', togglePopup); 
formCloseBtn.addEventListener ('click',togglePopup);
formElement.addEventListener('submit', formSubmitHandler); 
