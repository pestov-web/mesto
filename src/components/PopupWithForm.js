import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, { submit }) {
    super(popup);
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._submit = submit;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  // устанавливаем значения в полях ввода
  setInputValues(data) {
    const inputs = Array.from(this._inputList);
    inputs.forEach((element) => {
      element.value = data[element.name];
    });
  }
  // получаем значения полей ввода
  _getInputValues() {
    const data = {};
    this._inputList.forEach((element) => {
      {
        data[element.name] = element.value;
      }
    });
    return data;
  }
  // вешаем обработчик на кнопку сабмит
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._handleSubmitButton);
  }
  // кнопка сабмит
  _handleSubmitButton = (evt) => {
    evt.preventDefault();

    this._submit(this._getInputValues());
    this._popupForm.reset();
  };
}
