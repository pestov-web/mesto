import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, { submit }) {
    super(popup);
    this._submit = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._handleSubmitButton);
  }

  _handleSubmitButton = (evt) => {
    evt.preventDefault();
    this._submit();
  };
}
