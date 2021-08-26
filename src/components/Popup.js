export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this.close = this.close.bind(this);
  }

  // открываем попап и вешаем обработчики
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // закрываем попап и удаляем обработчики
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
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

  // вешаем обработчики
  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleClickClose);
    this._closeButton.addEventListener("click", this.close);
  }
}
