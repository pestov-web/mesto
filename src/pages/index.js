import "./index.css";

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
  profileText,
} from "../utils/constants.js";

// попап редактирования профиля
const userInfo = new UserInfo(profileText);
buttonSelectors.edit.addEventListener("click", () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
});

// добавляем новую информацию профиля
const popupEdit = new PopupWithForm(popupSelectors.edit, {
  submit: (data) => {
    userInfo.setUserInfo(data);
  },
});
popupEdit.setEventListeners();

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
const setFormValidation = (formElement) => {
  const form = new FormValidator(validatorConfig, formElement);
  form.enableValidation(formElement);
};

formSelectors.all.forEach((formElement) => {
  setFormValidation(formElement);
});

// создаем карточку
const createCard = (data) => {
  const card = new Card(data, placesTemplate, handleImageClick);
  return card.generateCard();
};

// добавляем новую карточку
const popupAdd = new PopupWithForm(popupSelectors.add, {
  submit: (data) => {
    cardList.addItem(createCard(data));
  },
});
popupAdd.setEventListeners();

// добавляем начальные карточки из массива
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  placesList
);

cardList.renderItems();
