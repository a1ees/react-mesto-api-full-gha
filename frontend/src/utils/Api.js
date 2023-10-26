import { apiConfig } from "./constants";

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // при портировании, мы объединили метод удаления лайка и постановки в changeLikeCardStatus
  // В метод бы будем передавать кард id и функцию, проверяющую состояние лайка карточки
  changeLikeCardStatus(cardId, isLiked) {
    // сделали метод, проверяющий, лайкнута ли карточка, true = удаляем лайк, false = добавляем
    const method = isLiked ? 'DELETE' : 'PUT';
    const url = `${this.baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      // метод delete || put будет выбран в зависимости от состояния лайка карточки
      method: method,
      credentials: 'include',
      headers: this.headers,
      // если метод = put, мы отправляем на сервер данные json, если нет - ничего не отправляем
      body: method === 'PUT' ? JSON.stringify({}) : undefined
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  sendCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  sendUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  sendAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(avatar)
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  getCardsItem() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers
    })
      .then(this._checkResponse)
  }
}

export const api = new Api(apiConfig);
