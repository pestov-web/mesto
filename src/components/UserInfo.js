export default class UserInfo {
  constructor(data, handleAvatarClick) {
    this._namePlace = data.name;
    this._profPlace = data.about;
    this._avaPlace = data.avatar;
    this._userId = data;
    this._handleAvatarClick = handleAvatarClick;
  }
  // получаем текст профиля с дом
  getUserInfo() {
    const info = {
      name: this._namePlace.textContent,
      about: this._profPlace.textContent,
      id: this._userId,
    };
    return info;
  }
  // устанавливаем новые значения текста профиля
  setUserInfo(info) {
    if (info) {
      this._namePlace.textContent = info.name;
      this._profPlace.textContent = info.about;
    } else {
      console.log(`не удалось установить новые данные, ошибка: ${info}`);
    }
  }
  // устанавливаем новый аватар
  setUserAvatar(info) {
    if (info.avatar) {
      this._avaPlace.src = info.avatar;
    } else {
      console.log(`не удалось установить аватар, ошибка: ${info.avatar}`);
    }
  }
}
