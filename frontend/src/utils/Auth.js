import { authConfig } from "./constants";

class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(login, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": login
      })
    })
      .then(this._checkResponse)
  }

  login(login, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": login
      })
    })
      .then(this._checkResponse)
  }

  checkToken() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    } 
    })
      .then(this._checkResponse)
  }

  clearCookie() {
    return fetch(`${this.baseUrl}/clear-cookie`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    } 
    })
      .then(this._checkResponse)
  }

}

export const auth = new Auth(authConfig);