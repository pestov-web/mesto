import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector(".popup__image");
    this._imageTitle = this._popup.querySelector(".popup__title");
  }

  // устанавливаем информацию о картинке
  _setImageInfo(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageTitle.textContent = name;
  }

  // открываем попап картинки
  open(name, link) {
    this._setImageInfo(name, link);
    super.open();
  }
}
