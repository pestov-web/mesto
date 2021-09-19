export class Card {
  constructor(
    data,
    templateElement,
    handleImageClick,
    handleCardRemove,
    { setLike, removeLike },
    userId,
    handleDeleteCardClick
  ) {
    this._templateElement = templateElement;
    this._card = data;
    this._name = this._card.name;
    this._link = this._card.link;
    this._likes = this._card.likes;
    this._cardId = this._card._id;
    this._ownerId = this._card.owner._id;
    this._handleImageClick = handleImageClick;
    this._handleCardRemove = handleCardRemove;
    // this._handleCardLike = this._handleCardLike.bind(this);
    this._userId = userId;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._isLiked = false;
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector(".places__delete-button");
    this._likeButton = this._element.querySelector(".places__like-button");
    this._cardImage = this._element.querySelector(".places__image");
    this._cardTitle = this._element.querySelector(".places__title");
    this._likeCount = this._element.querySelector(".places__like-counter");
    this._handleDeleteCardClick = handleDeleteCardClick;
  }

  // генерируем карточку
  generateCard() {
    this._setEventListeners();
    this._checkLikeState();
    this._hideDeleteButton();

    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this.setLikeCount(this._likes.length);

    // Вернём элемент
    return this._element;
  }

  setLikeCount(count) {
    this._likeCount.textContent = count;
  }

  // Получаем теиплэйт
  _getTemplate() {
    return this._templateElement.querySelector(".places__card").cloneNode(true);
  }

  // добавляем обработчики
  _setEventListeners() {
    // Конопка удалить
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCardClick();
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
    if (this._isLiked) {
      this._removeLike(this._cardId);
      this._toggleCardLike();
      this._isLiked = false;
      this._likeCount.textContent = this._likes.length;
    } else {
      this._setLike(this._cardId);
      this._toggleCardLike();
      this._isLiked = true;
      this._likeCount.textContent = this._likes.length;
    }
  }

  _toggleCardLike() {
    this._likeButton.classList.toggle("places__like-button_active");
  }

  //добовляем возможность удалять карточки
  _deleteCard() {
    this._handleCardRemove(this._cardId);
    this._element.remove();
    this._element = null;
  }

  _hideDeleteButton() {
    if (this._ownerId === this._userId) {
      this._deleteButton.classList.remove("places__delete-button_hiden");
    }
  }

  _checkLikeState() {
    this._likes.forEach((owner) => {
      if (owner._id === this._userId) {
        this._isLiked = true;
        this._toggleCardLike();
      }
    });
  }
}
