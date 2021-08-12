export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._data = data;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._data.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._data.submitButtonSelector
    );
  }

  // включаем валидацию
  enableValidation() {
    this._setEventListeners();
  }

  // показываем ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  // убераем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = "";
  }

  // меняем активость кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // проверяем ввод
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // показываем скрываем ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // устанавливаем обработчики
  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }
}
