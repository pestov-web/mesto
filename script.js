let popupContainer = document.querySelector('.popup__container');
let editButton = document.querySelector('.profile__info-edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__submit-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-prof');



function openPopup() {
  popupContainer.classList.add('popup__opened');
}

function closePopup() {
  popupContainer.classList.remove('popup__opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile__info-title");
  let profileJob = document.querySelector(".profile__info-subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);