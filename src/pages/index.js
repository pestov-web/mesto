import "./index.css";

import Api from "../components/Api.js";
import { initialCards } from "../utils/initial-сards.js";
import { validatorConfig } from "../utils/validator-config.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";

import {
  placesList,
  placesTemplate,
  popupSelectors,
  formSelectors,
  buttonSelectors,
  profileElements,
  submitButtons,
} from "../utils/constants.js";

let userId = null;
let cardData = {};

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

// попап подтвеждения удаления
const popupConfirm = new PopupWithConfirmation(popupSelectors.confirm, {
  submit: () => {
    submitButtons.delete.textContent = "Удаление...";
    api
      .removeCard(cardData.id)
      .catch((err) => {
        console.log(`не могу удалить карточку: ${err}.`);
      })
      .finally(() => {
        cardData.element.remove();
        cardData.element = null;
        popupConfirm.close();
        submitButtons.delete.textContent = "Да";
      });
  },
});
const handleDeleteCardClick = (cardId, element) => {
  cardData = {
    id: cardId,
    element: element,
  };
  popupConfirm.open();
};
popupConfirm.setEventListeners();

// меняем аватар пользователя
const popupAvatar = new PopupWithForm(popupSelectors.avatar, {
  submit: (data) => {
    submitButtons.ava.textContent = "Сохранение...";
    api
      .patchUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => {
        console.log(`не могу поменять аватар: ${err}.`);
      })
      .finally(() => {
        popupAvatar.close();
        submitButtons.ava.textContent = "Сохранить";
      });
  },
});
popupAvatar.setEventListeners();

// добавляем новую информацию профиля
const popupEdit = new PopupWithForm(popupSelectors.edit, {
  submit: (data) => {
    submitButtons.edit.textContent = "Сохранение...";
    api
      .patchUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(`не могу поменять данные пользователя: ${err}.`);
      })
      .finally(() => {
        popupEdit.close();
        submitButtons.edit.textContent = "Сохранить";
      });
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

const editAvatarFormValidator = new FormValidator(
  validatorConfig,
  formSelectors.avatar
);

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

// создаем карточку
const createCard = (data) => {
  const card = new Card(
    data,
    placesTemplate,
    handleImageClick,
    {
      setLike: (id) => {
        api
          .likeCard(id)
          .then((res) => {
            card.setLikeCount(res.likes.length);
          })
          .catch((err) => {
            console.log(`не могу поставить лайк: ${err}.`);
          });
      },
      removeLike: (id) => {
        api
          .removeLike(id)
          .then((res) => {
            card.setLikeCount(res.likes.length);
          })
          .catch((err) => {
            console.log(`не могу удалить лайк: ${err}.`);
          });
      },
    },
    userId,
    handleDeleteCardClick
  );
  return card.generateCard();
};

// попап добавления новй карточки
const popupAdd = new PopupWithForm(popupSelectors.add, {
  submit: (data) => {
    submitButtons.add.textContent = "Сохранение...";
    api
      .postNewCard(data)
      .then((res) => {
        addCard(res);
      })
      .catch((err) => {
        console.log(`не могу добавить карточку: ${err}.`);
      })
      .finally(() => {
        popupAdd.close();
        submitButtons.add.textContent = "Создать";
      });
  },
});

popupAdd.setEventListeners();

// добавляекм карточку в дом
const addCard = (data) => {
  cardList.addItem(createCard(data));
};
// устанавливаем данные пользователя
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.setUserAvatar(res);
    userId = res._id;
  })
  .catch((err) => {
    console.log(`ошибка: ${err}.`);
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
