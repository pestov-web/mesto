export class Card {
  constructor(data, templateElement, handleImageClick) {
    this._templateElement = templateElement;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleImageClick = handleImageClick;
  }

  // генерируем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".places__image");

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
    this._element
      .querySelector(".places__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    // Кнопка лайков
    this._element
      .querySelector(".places__like-button")
      .addEventListener("click", () => {
        this._handleCardLike();
      });
    // попап картинки
    this._element
      .querySelector(".places__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }
  // добавляем возможность лайков
  _handleCardLike() {
    this._element
      .querySelector(".places__like-button")
      .classList.toggle("places__like-button_active");
    console.log("card id = " + this._cardId);
    console.log("owner id = " + this._ownerId);
  }
  //добовляем возможность удалять карточки
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }
}
