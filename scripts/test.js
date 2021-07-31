// закрываем попапы и удаляем обработчики
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closeOnClick);
  document.removeEventListener('keydown', closeOnEsc);
};

// вешаем обработчики действий пользователя
const closePopupOnEvent = (popup) => {

  const toggleThisPopup = (popup) => {
    togglePopup(popup);
    deleteEventListeners(popup);
    console.log('удаляем обработчики');
  };

  // закрываем попап и удаляем обработчики по нажатию ESC
  const closeOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      console.log('сравниваем кнопки');
      toggleThisPopup(popup);
      deleteEventListeners(popup);
    };
  };
  // закрываем попап и удаляем обработчики по клику на оверлэй
  const closeOnClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      console.log('сравниваем таргет');
      toggleThisPopup(popup);
      deleteEventListeners(popup);
    };
  };

  console.log('добавляем обработчики');
  popup.addEventListener('mousedown', closeOnClick);
  document.addEventListener('keydown', closeOnEsc);
};