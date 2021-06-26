class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this.deleteLike = this.deleteLike.bind(this);
    this.putLike = this.putLike.bind(this)
  }

  _getHeaders() {
    this._headers = {
      Authorization: 'Bearer ' + localStorage.getItem('JWT')
    }
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка запроса на сервер ${res.status}`);
  }

  getInitialCards() {
    this._getHeaders();
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => this._parseResponse(res))
  }

  getUserInfo() {
    this._getHeaders();
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => this._parseResponse(res))
  }

  updateUserInfo(newInfo) {
    this._getHeaders();
    return fetch(this._baseUrl + '/users/me', {
      headers: { ...this._headers, 'content-type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(newInfo)
    })
      .then(res => this._parseResponse(res))
  }

  addCard(newCard) {
    this._getHeaders();
    return fetch(this._baseUrl + '/cards', {
      headers: { ...this._headers, 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newCard)
    })
      .then(res => this._parseResponse(res))
  }

  deleteCard(cardId) {
    this._getHeaders();
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
  }

  putLike(cardId) {
    this._getHeaders();
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(res => this._parseResponse(res))
  }

  deleteLike(cardId) {
    this._getHeaders();
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
  }

  changeCardLikeStatus(cardId, isCurrentlyLiked) {
    return isCurrentlyLiked ? this.deleteLike(cardId) : this.putLike(cardId);
  }

  updateAvatar(avatar) {
    this._getHeaders();
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: { ...this._headers, 'content-type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(avatar)
    })
      .then(res => this._parseResponse(res))
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.dima.nomoredomains.monster'
})

export default api
