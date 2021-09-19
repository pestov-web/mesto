import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._handleSubmitButton);
  }

  _handleSubmitButton = (evt) => {
    evt.preventDefault();

    super.close();
  };
  hadleShit() {
    console.log("pizda");
  }
}
