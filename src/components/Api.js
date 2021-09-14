export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`ошибка ! : ${res.status}`);
  }

  // получаем начальные карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleResponse(res));
  }

  patchUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/$id`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/$id`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }
  // другие методы работы с API
}
