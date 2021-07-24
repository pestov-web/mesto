const placesList = document.querySelector('.places__cards');
const placesTemplate = document.querySelector('.places-template').content;


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

initialCards.forEach(function(element) {
  const placesElement = placesTemplate.cloneNode(true);
  const placesDeleteButton = placesElement.querySelector('.places__delete-button');

  placesElement.querySelector('.places__title').textContent = element.name;
  placesElement.querySelector('.places__image').src = element.link;
  placesElement.querySelector('.places__image').alt = ('Фотография ' + element.name);

  placesElement.querySelector('.places__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('places__like-button_active');
  });

  placesDeleteButton.addEventListener('click', function() {
    const itemToDelete = placesDeleteButton.closest('.places__card');
    itemToDelete.remove();
  });

  placesList.append(placesElement)
});