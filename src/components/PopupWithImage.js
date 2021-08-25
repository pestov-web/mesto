import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImg, data) {
    super(popupSelector);
    this._image = popupImg.img;
    this._imageTitle = popupImg.title;
    this._name = data.name;
    this._link = data.link;
  }

  // устанавливаем информацию о картинке
  _setImageInfo() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageTitle.textContent = this._name;
  }

  // открываем попап картинки
  open() {
    this._setImageInfo();
    super.open();
  }
}
