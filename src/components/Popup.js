export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
  }

  // открываем попап и вешаем обработчики
  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  }

  // закрываем попап и удаляем обработчики
  close() {
    this._popupSelector.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  // закрываем попап по нажатию ESC
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // закрываем попап по клику на оверлэй
  _handleClickClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  // закрываем попап по нажатию на крестик
  _handleButtonClose = () => {
    this.close();
  };

  // вешаем обработчики
  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
    this._closeButton.addEventListener("click", this._handleButtonClose);
  }

  // удаляем обработчики
  removeEventListeners() {
    this._popupSelector.removeEventListener(
      "mousedown",
      this._handleClickClose
    );
    document.removeEventListener("keydown", this._handleEscClose);
    this._closeButton.removeEventListener("click", this._handleButtonClose);
  }
}
