// находим попапы
const addPopupContainer = document.querySelector(".popup_type_add");
const editPopupContainer = document.querySelector(".popup_type_edit");
const imagePopupContainer = document.querySelector(".popup_type_image");
const avatarPopupContainer = document.querySelector(".popup_type_avatar");
const confirmPopupContainer = document.querySelector(".popup_type_confirm");
// находим формы
const editForm = editPopupContainer.querySelector(".popup__form");
const addForm = addPopupContainer.querySelector(".popup__form");
const avatarForm = avatarPopupContainer.querySelector(".popup__form");
// находим кнопки
const editButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const avatarButton = document.querySelector(".profile__avatar-edit-button");
// находим элемнты профиля
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");
const profileAvatar = document.querySelector(".profile__avatar");

export const placesList = document.querySelector(".places__cards");
export const placesTemplate =
  document.querySelector(".places-template").content;

export const popupSelectors = {
  add: addPopupContainer,
  edit: editPopupContainer,
  image: imagePopupContainer,
  avatar: avatarPopupContainer,
  confirm: confirmPopupContainer,
};

export const formSelectors = {
  add: addForm,
  edit: editForm,
  avatar: avatarForm,
};

export const buttonSelectors = {
  add: addButton,
  edit: editButton,
  closeBtns: closeButtons,
  avatar: avatarButton,
};

export const profileElements = {
  name: profileName,
  about: profileJob,
  avatar: profileAvatar,
};
