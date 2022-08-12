import {
  baseUrl 
} from './constants.js'

//проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//запрос на регистрацию
export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email
      })
    })
    .then((response) => checkResponse(response));
}

//запрос на авторизацию
export const authorize = (password, email) => {
  return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email
      })
    })
    .then((response => checkResponse(response)))
    .catch(err => console.log(err))
};

//проверки валидности токена и получениe email
export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => checkResponse(res))
    .then(data => data)
}