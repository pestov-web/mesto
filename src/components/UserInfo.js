export default class UserInfo {
  constructor(data, handleAvatarClick) {
    this._namePlace = data.name;
    this._profPlace = data.about;
    this._avaPlace = data.avatar;
    this._handleAvatarClick = handleAvatarClick;
  }
  // получаем текст профиля с дом
  getUserInfo() {
    const info = {
      name: this._namePlace.textContent,
      about: this._profPlace.textContent,
    };
    return info;
  }
  // устанавливаем новые значения текста профиля
  setUserInfo(info) {
    this._namePlace.textContent = info.name;
    this._profPlace.textContent = info.about;
  }
  setUserAvatar(info) {
    this._avaPlace.src = info.avatar;
  }
}
