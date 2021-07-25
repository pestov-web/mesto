const placesList = document.querySelector('.places__cards');
const popup = document.querySelector('.popup');
const gallery = document.querySelector('.gallery');
// находим темплэйты
const placesTemplate = document.querySelector('.places-template').content;
const popupTemplate = document.querySelector('.popup-template').content;
const galleryTemplate = document.querySelector('.gallery-template').content;
// находим кнопки
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");




// массив обьектов попапа
const initialPopup = [{
    title: 'Редактировать профиль',
    firstInput: profileName.textContent,
    secondInput: profileJob.textContent,
    button: 'Сохранить'
  },
  {
    title: 'Новое место',
    firstInput: 'Название',
    secondInput: 'Ссылка на картинку',
    button: 'Создать'
  }
];

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

// добавляем карточки с массива
initialCards.forEach(function(element) {
  const placesElement = placesTemplate.cloneNode(true);
  const placesDeleteButton = placesElement.querySelector('.places__delete-button');
  const images = placesElement.querySelector('.places__image');

  placesElement.querySelector('.places__title').textContent = element.name;
  placesElement.querySelector('.places__image').src = element.link;
  placesElement.querySelector('.places__image').alt = (element.name);

  // добавляем возможность лайков
  placesElement.querySelector('.places__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('places__like-button_active');
  });
  //добовляем возможность удалять карточки
  placesDeleteButton.addEventListener('click', function() {
    const itemToDelete = placesDeleteButton.closest('.places__card');
    itemToDelete.remove();
  });

  images.addEventListener('click', function(evt) {
    const galleryElement = galleryTemplate.cloneNode(true);
    const closeButton = galleryElement.querySelector('.gallery__close-button');
    const galleryToDelete = closeButton.closest('.gallery__container');

    galleryElement.querySelector('.gallery__image').src = evt.target.src;
    galleryElement.querySelector('.gallery__image').alt = evt.target.alt;
    galleryElement.querySelector('.gallery__title').textContent = evt.target.alt;

    // удаляем элемент из DOM
    function deleteFromDom() {
      galleryToDelete.remove();
    }
    // удаляем попап по нажатию на крестик
    function deletePopup() {
      deletePopupClass();
      setTimeout(deleteFromDom, 500);
    }

    closeButton.addEventListener('click', deletePopup);

    gallery.append(galleryElement)

    gallery.classList.add('gallery_opened');

  });

  placesList.append(placesElement)
});



// создаем попап редактирования профиля
editButton.addEventListener('click', function() {
  const popupElement = popupTemplate.cloneNode(true);
  const closeButton = popupElement.querySelector('.popup__close-button');
  const popupForm = popupElement.querySelector(".popup__form");
  const popupToDelete = closeButton.closest('.popup__container');
  // находим инпуты формы
  const firstInput = popupElement.querySelector('.popup__input_type_name');
  const secondInput = popupElement.querySelector('.popup__input_type_prof');

  popupElement.querySelector('.popup__title').textContent = initialPopup[0].title;
  popupElement.querySelector('.popup__input_type_name').value = initialPopup[0].firstInput;
  popupElement.querySelector('.popup__input_type_prof').value = initialPopup[0].secondInput;
  popupElement.querySelector('.popup__submit-button').textContent = initialPopup[0].button;

  // удаляем элемент из DOM
  function deleteFromDom() {
    popupToDelete.remove();
  }
  // удаляем попап по нажатию на крестик
  function deletePopup() {
    deletePopupClass();
    setTimeout(deleteFromDom, 500);
  }

  closeButton.addEventListener('click', deletePopup);

  // соxраняем значения по кнопке сабмит
  popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.textContent = firstInput.value;
    profileJob.textContent = secondInput.value;
    deletePopup();
  });

  popup.append(popupElement);

  popup.classList.add('popup_opened');
  popup.classList.add('popup-edit');
});

// создаем попап добавляения карточек
addButton.addEventListener('click', function() {
  const popupElement = popupTemplate.cloneNode(true);
  const closeButton = popupElement.querySelector('.popup__close-button');
  const popupForm = popupElement.querySelector(".popup__form");
  const popupToDelete = closeButton.closest('.popup__container');
  // находим инпуты формы
  const firstInput = popupElement.querySelector('.popup__input_type_name');
  const secondInput = popupElement.querySelector('.popup__input_type_prof');

  popupElement.querySelector('.popup__title').textContent = initialPopup[1].title;
  popupElement.querySelector('.popup__input_type_name').placeholder = initialPopup[1].firstInput;
  popupElement.querySelector('.popup__input_type_prof').placeholder = initialPopup[1].secondInput;
  popupElement.querySelector('.popup__submit-button').textContent = initialPopup[1].button;

  // удаляем элемент из DOM
  function deleteFromDom() {
    popupToDelete.remove();
  }
  // удаляем попап по нажатию на крестик
  function deletePopup() {
    deletePopupClass();
    setTimeout(deleteFromDom, 500);
  }

  closeButton.addEventListener('click', deletePopup);

  // соxраняем значения по кнопке сабмит
  popupForm.addEventListener('submit', function() {
    const placesElement = placesTemplate.cloneNode(true);
    const placesDeleteButton = placesElement.querySelector('.places__delete-button');

    placesElement.querySelector('.places__title').textContent = firstInput.value;
    placesElement.querySelector('.places__image').src = secondInput.value;
    placesElement.querySelector('.places__image').alt = firstInput.value;

    // добавляем возможность лайков
    placesElement.querySelector('.places__like-button').addEventListener('click', function(evt) {
      evt.target.classList.toggle('places__like-button_active');
    });
    //добовляем возможность удалять карточки
    placesDeleteButton.addEventListener('click', function() {
      const itemToDelete = placesDeleteButton.closest('.places__card');
      itemToDelete.remove();
    });

    placesList.prepend(placesElement)
    deletePopup();
  });



  popup.append(popupElement);

  popup.classList.add('popup_opened');
  popup.classList.add('popup-add');
});

// удаляем классы попапа 
function deletePopupClass() {
  popup.classList.remove('popup_opened');
  popup.classList.remove('popup-edit');
  popup.classList.remove('popup-add');
  gallery.classList.remove('gallery_opened');
}