import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, inputs, { submit }) {
    super(popupSelector);
    this._popupSelector = popupSelector;
  }

  _getInputValues() {}

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this.close();
    });
  }

  close() {
    this._popupSelector.reset();
    super.close();
  }
}
