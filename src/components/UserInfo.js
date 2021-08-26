export default class UserInfo {
  constructor(data) {
    this._namePlace = data.name;
    this._profPlace = data.prof;
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
