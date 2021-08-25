import "./index.css";

import { initialCards } from "../utils/initial-сards.js";
import { validatorConfig } from "../utils/validator-config.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  placesList,
  placesTemplate,
  popupImg,
  popupSelectors,
  formSelectors,
  buttonSelectors,
  userInputs,
  cardInputs,
  profileText,
} from "../utils/constants.js";

// сохраняем отредактированный профиль
formSelectors.edit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileText.name.textContent = formInputs.name.value;
  profileText.prof.textContent = formInputs.prof.value;
  closePopup(popupSelectors.edit);
});

// // сохраняем новую карточку
// formSelectors.add.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   placesList.prepend(
//     createCard({ name: formInputs.loc.value, link: formInputs.link.value })
//   );
//   closePopup(popupSelectors.add);
//   formSelectors.add.reset();
// });

// попап редактирования профиля
buttonSelectors.edit.addEventListener("click", () => {
  formInputs.name.value = profileText.name.textContent;
  formInputs.prof.value = profileText.prof.textContent;

  openPopup(popupSelectors.edit);
});

// попап добавления картинок
buttonSelectors.add.addEventListener("click", () => {
  popupAdd();
});

const popupAdd = new PopupWithForm(popupSelectors.add, cardInputs, {
  submit: (data) => {
    const card = new Card(item, placesTemplate, handleImageClick);
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
