

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`http://localhost:8000/login`, {
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
    return fetch(`http://localhost:8000/user`, {
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