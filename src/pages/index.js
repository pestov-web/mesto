import "./index.css";

import Api from "../components/Api.js";
import { initialCards } from "../utils/initial-сards.js";
import { validatorConfig } from "../utils/validator-config.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  placesList,
  placesTemplate,
  popupSelectors,
  formSelectors,
  buttonSelectors,
  profileElements,
} from "../utils/constants.js";

// авторизация в апи
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-27",
  headers: {
    authorization: "13487b8e-c128-4492-9187-00285c5e1c9d",
    "Content-Type": "application/json",
  },
});

// попап редактирования профиля
const userInfo = new UserInfo(profileElements);
buttonSelectors.edit.addEventListener("click", () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
});

// добавляем новую информацию профиля
const popupAvatar = new PopupWithForm(popupSelectors.avatar, {
  submit: (data) => {
    api.patchUserAvatar(data);
    userInfo.setUserAvatar(data);
  },
});

popupAvatar.setEventListeners();

// добавляем новую информацию профиля
const popupEdit = new PopupWithForm(popupSelectors.edit, {
  submit: (data) => {
    api.patchUserInfo(data);
    userInfo.setUserInfo(data);
  },
});
popupEdit.setEventListeners();

buttonSelectors.avatar.addEventListener("click", () => {
  popupAvatar.open();
});

// попап добавления карточек
buttonSelectors.add.addEventListener("click", () => {
  popupAdd.open();
});

// открываем попап картинки
const image = new PopupWithImage(popupSelectors.image);
const handleImageClick = (name, link) => {
  image.open(name, link);
};
image.setEventListeners();

// вызываем валидацию
const addCardFormValidator = new FormValidator(
  validatorConfig,
  formSelectors.add
);

const editProfileFormValidator = new FormValidator(
  validatorConfig,
  formSelectors.edit
);

// FIXME: переделать валидация для формы с одним инпутом

const editAvatarFormValidator = new FormValidator(
  validatorConfig,
  formSelectors.avatar
);

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

// создаем карточку
const createCard = (data) => {
  const card = new Card(data, placesTemplate, handleImageClick);
  return card.generateCard();
};

// попап добавления новй карточки
const popupAdd = new PopupWithForm(popupSelectors.add, {
  submit: (data) => {
    addCard(data);
  },
});
popupAdd.setEventListeners();

// добавляекм карточку в дом
const addCard = (data) => {
  cardList.addItem(createCard(data));
};
// устанавливаем данные пользователя
api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
});

// добавляем начальные карточки
api
  .getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    console.log(`не могу получить карточки. ${err}.`);
    cardList.renderItems(initialCards);
  });

const cardList = new Section(
  {
    renderer: (item) => {
      addCard(item);
    },
  },
  placesList
);
