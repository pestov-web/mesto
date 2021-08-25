import "./index.css";

import { initialCards } from "../utils/initial-сards.js";
import { validatorConfig } from "../utils/validator-config.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";

import {
  placesList,
  placesTemplate,
  popupImg,
  popupSelectors,
  formSelectors,
  buttonSelectors,
  profileText,
} from "../utils/constants.js";

// попап редактирования профиля
buttonSelectors.edit.addEventListener("click", () => {
  popupEdit.open();
  popupEdit.setInputs(userInfo.getUserInfo());
});

// экземпляр класса Userinfo
const userInfo = new Userinfo(profileText);

// добавляем новую информацию профиля
const popupEdit = new PopupWithForm(popupSelectors.edit, {
  submit: (data) => {
    userInfo.setUserInfo(data);
  },
});

// попап добавления карточек
buttonSelectors.add.addEventListener("click", () => {
  popupAdd.open();
});

// добавляем новую карточку
const popupAdd = new PopupWithForm(popupSelectors.add, {
  submit: (data) => {
    const card = new Card(data, placesTemplate, handleImageClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  },
});

// открываем попап картинки
const handleImageClick = (name, link) => {
  const image = new PopupWithImage(popupSelectors.image, popupImg, {
    name,
    link,
  });
  image.open();
};

// вызываем валидацию
formSelectors.all.forEach((formElement) => {
  const form = new FormValidator(validatorConfig, formElement);
  form.enableValidation();
});

// добавляем начальные карточки из массива
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, placesTemplate, handleImageClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  placesList
);

cardList.renderItems();
