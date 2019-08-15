

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`https://adventure-ahead.herokuapp.com/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(response =>
        (!response.ok)
          ? response.json().then(e => Promise.reject(e))
          : response.json()
      )
  },
  postUser(user) {
    return fetch(`https://adventure-ahead.herokuapp.com/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}


export default AuthApiService