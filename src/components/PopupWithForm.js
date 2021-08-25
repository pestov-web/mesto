import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._submit = submit;
    this._popupForm = this._popupSelector.querySelector(".popup__form");
  }

  // устанавливаем значения в полях ввода
  setInputs(data) {
    const inputs = Array.from(this._inputList);
    inputs.forEach((element) => {
      element.value = data[element.name];
    });
  }
  // получаем значения полей ввода
  _getInputValues() {
    let data = {};
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
    this._popupSelector.addEventListener("submit", this._handleSubmitButton);
  }
  // кнопка сабмит
  _handleSubmitButton = (evt) => {
    evt.preventDefault();

    this._submit(this._getInputValues());
    this._popupForm.reset();
    super.close();
  };
  // убираем обработчики
  removeEventListeners() {
    super.removeEventListeners();
    this._popupSelector.removeEventListener("submit", this._handleSubmitButton);
  }

  // закрытие попапа ( также отчищает форму при любом закрытии)
  // close() {
  //   super.close();
  //   this._popupForm.reset();
  // }
}
