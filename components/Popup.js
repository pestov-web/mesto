const popupContainer = document.querySelector('.popup');
const editButton = document.querySelector('.profile__info-edit-button');
const closeButton = document.querySelector('.popup__close-button');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_prof');
// Находим имя и проффессию 
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

// открываем попап, получаем текст
function openPopup() {
  popupContainer.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// закрываем попап
function closePopup() {
  popupContainer.classList.remove('popup_opened');
}
// созраняем новые значения из формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
// обработать событие
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);