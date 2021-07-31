// проверка полей для кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// делаем кнопку не активной ели поля не прошли проверку
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  console.log(inactiveButtonClass);
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// убираем ошибки
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// показываем ошибки 
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// проверяем ошибки воода в полях и показываем ошибки
const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, { inputSelector, inactiveButtonClass, submitButtonSelector, ...rest }) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = ({ formSelector, ...rest }) => {

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, rest)
  });
};

// вызываем валидацию, передаем обьект
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});