const placesList = document.querySelector('.places__cards');
const placesTemplate = document.querySelector('.places-template').content;

// находим попапы
const addPopupContainer = document.querySelector('.popup_type_add');
const editPopupContainer = document.querySelector('.popup_type_edit');
const imagePopupContainer = document.querySelector('.popup_type_image');

// находим формы 
const editForm = document.forms.edit;
const addForm = document.forms.add;

// находим кнопки
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll(".popup__close-button");

// находим поля форм
const nameInput = editForm.name;
const profInput = editForm.prof;
const locInput = addForm.loc;
const linkInput = addForm.link;

// находим текст профиля
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

// закрываем попапы
closeButtons.forEach(function(buttonElement) {
  buttonElement.addEventListener('click', () => togglePopup(buttonElement.closest('.popup')));
});

// сохраняем отредактированный профиль
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = profInput.value;
  togglePopup(editPopupContainer);
});

// сохраняем новую карточку 
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardElement = { name: locInput.value, link: linkInput.value };
  renderCard(createCard(cardElement), placesList);
  togglePopup(addPopupContainer);
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

    togglePopup(imagePopupContainer);
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

  togglePopup(editPopupContainer);
});

// попап добавления картинок
addButton.addEventListener('click', () => {;
  togglePopup(addPopupContainer);
});

// добавляем или удаляем класс открытия попапа
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}