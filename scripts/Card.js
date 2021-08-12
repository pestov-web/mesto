export class Card {
  constructor(data, templateElement, handleImageClick) {
    this._templateElement = templateElement;
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".places__image");

    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".places__title").textContent = this._name;

    // Вернём элемент
    return this._element;
  }

  // Получаем теиплэйт
  _getTemplate() {
    return this._templateElement.querySelector(".places__card").cloneNode(true);
  }

  addCard(cardPlace) {
    const cardElement = this._generateCard();
    // Добавляем в DOM
    cardPlace.append(cardElement);
  }

  // добавляем обработчики
  _setEventListeners() {
    // Конопка удалить
    this._element
      .querySelector(".places__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    // Кнопка лайков
    this._element
      .querySelector(".places__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    // попап картинки
    this._element
      .querySelector(".places__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }
  // добавляем возможность лайков
  _handleLikeButton() {
    this._element
      .querySelector(".places__like-button")
      .classList.toggle("places__like-button_active");
  }
  //добовляем возможность удалять карточки
  _handleDeleteButton() {
    this._element.remove();
  }
}
