// utils/auth.js
export const getToken = () => {
  return localStorage.getItem('deriv_api_token')
}

export const setToken = (token) => {
  localStorage.setItem('deriv_api_token', token)
}
