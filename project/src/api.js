import axios from 'axios';

const BASE_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const token = localStorage.getItem('token') ?? '';

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
