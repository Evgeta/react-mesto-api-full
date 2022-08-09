import {
  BASE_URL
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
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        password,
        email
      })
    })
    .then((response) => checkResponse(response));
}

//запрос на авторизацию
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        password,
        email
      })
    })
    .then((response => checkResponse(response)))
    .then((data) => {
      if (data.token){
        return data;
      } 
    })
    .catch(err => console.log(err))
};

//проверки валидности токена и получениe email
// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       credentials: 'include',
//     })
//     .then(res => checkResponse(res))
//     .then(data => data)
// }

