const placesList = document.querySelector('.places__cards');
const placesTemplate = document.querySelector('.places-template').content;

// находим попапы
const addPopupContainer = document.querySelector('.popup_type_add');
const editPopupContainer = document.querySelector('.popup_type_edit');
const imagePopupContainer = document.querySelector('.popup_type_image');

// находим формы 
const editForm = editPopupContainer.querySelector('.popup__form');
const addForm = addPopupContainer.querySelector('.popup__form');

// находим кнопки
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');

// находим поля форм
const nameInput = editPopupContainer.querySelector('.popup__input_type_name');
const profInput = editPopupContainer.querySelector('.popup__input_type_prof');
const locInput = addPopupContainer.querySelector('.popup__input_type_loc');
const linkInput = addPopupContainer.querySelector('.popup__input_type_link');

// находим текст профиля
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

// закрываем попапы
const closeButtons = document.querySelectorAll(".popup__close-button");

closeButtons.forEach(function(buttonElement) {
  buttonElement.addEventListener('click', () => closePopup(buttonElement.closest('.popup')));
});

// сохраняем отредактированный профиль
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = profInput.value;
  closePopup(editPopupContainer);
});

// сохраняем новую карточку 
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardElement = { name: locInput.value, link: linkInput.value };
  renderCard(createCard(cardElement), placesList);
  closePopup(addPopupContainer);
  addForm.reset();
});

// рендерим карточки 
const renderCard = (element, place) => {
  place.prepend(element);
}

// создаем карточки
const createCard = (data) => {
  const placesElement = placesTemplate.cloneNode(true);
  const placesImageElement = placesElement.querySelector('.places__image');

  placesElement.querySelector('.places__title').textContent = data.name;
  placesImageElement.src = data.link;
  placesImageElement.alt = data.name;

  // добавляем возможность лайков
  placesElement.querySelector('.places__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('places__like-button_active');
  });

  //добовляем возможность удалять карточки
  placesElement.querySelector('.places__delete-button').addEventListener('click', (evt) => {
    const itemToDelete = evt.target.closest('.places__card');
    itemToDelete.remove();
  });

  //добовляем возможность увеличивать картинки
  placesElement.querySelector('.places__image').addEventListener('click', (evt) => {
    const imagePopupContainerImage = imagePopupContainer.querySelector('.popup__image');
    imagePopupContainerImage.src = evt.target.src;
    imagePopupContainerImage.alt = evt.target.alt;
    imagePopupContainer.querySelector('.popup__title').textContent = evt.target.alt;

    openPopup(imagePopupContainer);
  });

  return placesElement;
}

// добавляем карочки из массива в DOM
initialCards.forEach(function(element) {
  const cardElement = { name: element.name, link: element.link };
  renderCard(createCard(cardElement), placesList);
});

// попап редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  profInput.value = profileJob.textContent;

  openPopup(editPopupContainer);
});

// попап добавления картинок
addButton.addEventListener('click', () => {;
  openPopup(addPopupContainer);
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}