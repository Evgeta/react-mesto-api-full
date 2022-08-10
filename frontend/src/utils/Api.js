import {
  baseUrl,
} from './constants.js';
 
class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers; 
  }
  
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  //проверка ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._getHeaders()
      })
      .then((res) => this._checkResponse(res)
      )
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._getHeaders()
      })
      .then((res) => this._checkResponse(res)
      )
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then((res) => this._checkResponse(res))
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => this._checkResponse(res))
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then((res) => this._checkResponse(res))
  }

  setLike(data) {
     return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
        method: 'PUT',
        headers: this._getHeaders(),
      })
      .then((res) => this._checkResponse(res))
  }

  removeLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then((res) => this._checkResponse(res))
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then((res) => this._checkResponse(res))
  }

  changeLikeCardStatus (data, isLiked) {
    if (isLiked) {
        return this.setLike(data);
    } else {
        return this.removeLike(data);        
    }
}
}

//инициализация API
export const api = new Api({
  baseUrl: baseUrl,
  headers: {
  //  authorization: token,
    'Content-Type': 'application/json'
  }
});


