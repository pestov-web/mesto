import { initialCards } from "./initial-сards.js";
import { validatorConfig } from "./validator-config.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const placesList = document.querySelector(".places__cards");
const placesTemplate = document.querySelector(".places-template").content;

// находим попапы
const addPopupContainer = document.querySelector(".popup_type_add");
const editPopupContainer = document.querySelector(".popup_type_edit");
const imagePopupContainer = document.querySelector(".popup_type_image");

// находим формы
const editForm = editPopupContainer.querySelector(".popup__form");
const addForm = addPopupContainer.querySelector(".popup__form");
const popupForms = document.querySelectorAll(".popup__form");

// находим кнопки
const editButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");

// находим поля форм
const nameInput = editPopupContainer.querySelector(".popup__input_type_name");
const profInput = editPopupContainer.querySelector(".popup__input_type_prof");
const locInput = addPopupContainer.querySelector(".popup__input_type_loc");
const linkInput = addPopupContainer.querySelector(".popup__input_type_link");

// находим картинку
const imagePopupContainerImage =
  imagePopupContainer.querySelector(".popup__image");

// находим текст картинки
const imagePopupContainerTitle =
  imagePopupContainer.querySelector(".popup__title");

// находим текст профиля
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

// деактивируем кнопку сабмит для добавления картинок
const disableImageSubmitButton = (imageSubmitButton) => {
  imageSubmitButton.classList.add("popup__submit-button_disabled");
  imageSubmitButton.disabled = true;
};

// открываем попап и вешаем обработчики действий пользователя
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  closeOnEsc.openedPopup = popup;
  popup.addEventListener("mousedown", closeOnClick);
  document.addEventListener("keydown", closeOnEsc);
};

// закрываем попап и удаляем обработчики
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closeOnClick);
  document.removeEventListener("keydown", closeOnEsc);
};

// закрываем попап и удаляем обработчики по клику на оверлэй
const closeOnClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

// закрываем попап и удаляем обработчики по нажатию ESC
const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(closeOnEsc.openedPopup);
  }
};

// обработчики закрыйтия попапов по кнопке закрыть
closeButtons.forEach(function (buttonElement) {
  buttonElement.addEventListener("click", () =>
    closePopup(buttonElement.closest(".popup"))
  );
});

// сохраняем отредактированный профиль
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = profInput.value;
  closePopup(editPopupContainer);
});

// сохраняем новую карточку
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const card = new Card(
    { name: locInput.value, link: linkInput.value },
    placesTemplate
  );
  card.addCard(placesList);

  closePopup(addPopupContainer);
  addForm.reset();
  disableImageSubmitButton(evt.target.querySelector(".popup__submit-button"));
});

// открываем попап картинки
const handleImageClick = (name, link) => {
  console.log(name);
  imagePopupContainerImage.src = link;
  imagePopupContainerImage.alt = name;
  imagePopupContainerTitle.textContent = name;

  openPopup(imagePopupContainer);
};

// попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  profInput.value = profileJob.textContent;

  openPopup(editPopupContainer);
});

// попап добавления картинок
addButton.addEventListener("click", () => {
  openPopup(addPopupContainer);
});

// Добавляем карточки из массива
initialCards.forEach((data) => {
  const card = new Card(data, placesTemplate, handleImageClick);
  card.addCard(placesList);
});

// вызываем валидацию

popupForms.forEach((formElement) => {
  const form = new FormValidator(validatorConfig, formElement);
  form.enableValidation();
});
