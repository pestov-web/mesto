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
// находим текст профиля
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

export const placesList = document.querySelector(".places__cards");
export const placesTemplate =
  document.querySelector(".places-template").content;
// находим картинку
export const imagePopupContainerImage =
  imagePopupContainer.querySelector(".popup__image");
// находим текст картинки
export const imagePopupContainerTitle =
  imagePopupContainer.querySelector(".popup__title");

export const popupImg = {
  img: imagePopupContainerImage,
  title: imagePopupContainerTitle,
};
export const popupSelectors = {
  add: addPopupContainer,
  edit: editPopupContainer,
  image: imagePopupContainer,
};

export const formSelectors = {
  add: addForm,
  edit: editForm,
  all: popupForms,
};

export const buttonSelectors = {
  add: addButton,
  edit: editButton,
  closeBtns: closeButtons,
};

export const userInputs = {
  name: nameInput,
  prof: profInput,
};

export const cardInputs = {
  loc: locInput,
  link: linkInput,
};

export const profileText = {
  name: profileName,
  prof: profileJob,
};
