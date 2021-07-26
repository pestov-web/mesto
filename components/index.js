const placesList = document.querySelector('.places__cards');
const placesTemplate = document.querySelector('.places-template').content;
// находим кнопки
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
// массив обьектов карточек мест
const initialCards = [{
    name: 'Владивосток',
    link: './images/places/vlad.jpg'
  },
  {
    name: 'Воронеж',
    link: './images/places/voronej.jpg'
  },
  {
    name: 'Санья',
    link: './images/places/sanya.jpg'
  },
  {
    name: 'Южно-Сахалинск',
    link: './images/places/saha.jpg'
  },
  {
    name: 'Дальнегорск',
    link: './images/places/dalas.jpg'
  },
  {
    name: 'Рудная пристань',
    link: './images/places/rudnaya.jpg'
  }
];

// рендлерим карточки
const renderCard = (place, data) => {

  // добавляем возможность лайков
  data.querySelector('.places__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('places__like-button_active');
  });

  //добовляем возможность удалять карточки
  data.querySelector('.places__delete-button').addEventListener('click', (evt) => {
    const itemToDelete = evt.target.closest('.places__card');
    itemToDelete.remove();
  });

  //добовляем возможность увеличивать картинки
  data.querySelector('.places__image').addEventListener('click', (evt) => {
    const popupContainer = document.querySelector('.popup_type_image');
    const closeButton = popupContainer.querySelector(".popup__close-button");

    popupContainer.querySelector('.popup__image').src = evt.target.src;
    popupContainer.querySelector('.popup__image').alt = evt.target.alt;
    popupContainer.querySelector('.popup__title').textContent = evt.target.alt;

    closeButton.addEventListener('click', () => closePopup(popupContainer));

    openPopup(popupContainer);
  });

  place.prepend(data);
}

// добавляем карты из массива в DOM
initialCards.forEach(function(element) {
  const placesElement = placesTemplate.cloneNode(true);

  placesElement.querySelector('.places__title').textContent = element.name;
  placesElement.querySelector('.places__image').src = element.link;
  placesElement.querySelector('.places__image').alt = element.name;

  renderCard(placesList, placesElement);
});

// попап редактирования профиля
editButton.addEventListener('click', () => {
  const popupContainer = document.querySelector('.popup_type_edit');
  const popupForm = popupContainer.querySelector('.popup__form');
  const nameInput = popupContainer.querySelector('.popup__input_type_name');
  const profInput = popupContainer.querySelector('.popup__input_type_prof');
  const closeButton = popupContainer.querySelector(".popup__close-button");
  const profileName = document.querySelector(".profile__info-title");
  const profileJob = document.querySelector(".profile__info-subtitle");

  nameInput.value = profileName.textContent;
  profInput.value = profileJob.textContent;

  popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = profInput.value;
    closePopup(popupContainer);
  });

  closeButton.addEventListener('click', () => closePopup(popupContainer));

  openPopup(popupContainer);
});

// попап добавления картинок
addButton.addEventListener('click', () => {
  const popupContainer = document.querySelector('.popup_type_add');
  const popupForm = popupContainer.querySelector('.popup__form');
  const locInput = popupContainer.querySelector('.popup__input_type_loc');
  const linkInput = popupContainer.querySelector('.popup__input_type_link');
  const closeButton = popupContainer.querySelector(".popup__close-button");
  const cardElement = placesTemplate.cloneNode(true);

  popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    cardElement.querySelector('.places__title').textContent = locInput.value;
    cardElement.querySelector('.places__image').src = linkInput.value;
    cardElement.querySelector('.places__image').alt = locInput.value;

    renderCard(placesList, cardElement);
    closePopup(popupContainer);
  });

  closeButton.addEventListener('click', () => closePopup(popupContainer));

  openPopup(popupContainer);
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}