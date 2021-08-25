export default class Userinfo {
  constructor(data) {
    this._newName = data;
    this._newJob = data;
    this._namePlace = document.querySelector(".profile__info-title");
    this._profPlace = document.querySelector(".profile__info-subtitle");
  }
  // получаем текст профиля с дом
  getUserInfo() {
    const info = {
      name: this._namePlace.textContent,
      prof: this._profPlace.textContent,
    };
    return info;
  }
  // устанавливаем новые значения текста профиля
  setUserInfo(info) {
    this._namePlace.textContent = info.name;
    this._profPlace.textContent = info.prof;
  }
}
