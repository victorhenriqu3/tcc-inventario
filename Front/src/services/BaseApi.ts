import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3333',
});

export function getAuthorizationHeaders() {
  const storedToken = localStorage.getItem('@App:token');

  if (!storedToken) {
    return;
  }

  return {
    Authorization: storedToken,
  };
}

export function getAuthorizationValue() {
  const storedAuthorization = localStorage.getItem('@App:Authorization');
  if (!storedAuthorization) {
    return void 0;
  }

  return JSON.parse(storedAuthorization);
}
