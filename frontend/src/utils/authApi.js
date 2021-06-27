const authApi = {
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.mesto.dima.nomoredomains.monster' : 'http://localhost:3000',
  parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка запроса на сервер ${res.status}`);
  },
  signin(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(res => this.parseResponse(res));
  },
  register(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(res => this.parseResponse(res));
  },
  getInfo(JWT) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + JWT,
      },
    })
      .then(res => this.parseResponse(res));
  },
};

export default authApi;
