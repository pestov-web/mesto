export class Card {
  constructor(
    data,
    templateElement,
    handleImageClick,
    handleCardRemove,
    handleUserId,
    setLike,
    removeLike
  ) {
    this._templateElement = templateElement;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleImageClick = handleImageClick;
    this._handleCardRemove = handleCardRemove;
    this._UserId = handleUserId;
  }

  // генерируем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector(".places__delete-button");
    this._likeButton = this._element.querySelector(".places__like-button");
    this._cardImage = this._element.querySelector(".places__image");

    this._setEventListeners();
    this._checkLikeState();
    this._hideDeleteButton();
    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".places__title").textContent = this._name;
    this._element.querySelector(".places__like-counter").textContent =
      this._likes.length;

    // Вернём элемент
    return this._element;
  }

  // Получаем теиплэйт
  _getTemplate() {
    return this._templateElement.querySelector(".places__card").cloneNode(true);
  }

  // добавляем обработчики
  _setEventListeners() {
    // Конопка удалить
    this._deleteButton.addEventListener("click", () => {
      this._handleCardRemove(this._cardId);
      this._deleteCard();
    });
    // Кнопка лайков
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });
    // попап картинки
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  // добавляем возможность лайков
  _handleCardLike() {
    this._likeButton.classList.toggle("places__like-button_active");
    console.log("card id = " + this._cardId);
    console.log("owner id = " + this._ownerId);
  }
  //добовляем возможность удалять карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _hideDeleteButton() {
    console.log(this._ownerId + " = " + this._UserId());
  }

  _checkLikeState() {
    this._likes.forEach((owner) => {
      if (owner._id === this._UserId) {
        this._handleCardLike();
        console.log("like_on");
      } else {
        console.log("like_off");
      }
    });
  }
}
