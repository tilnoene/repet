import axios from 'axios';

const api = axios.create({
  baseURL: 'https://repet-back-login.vercel.app', // http://localhost:4000 // TODO: env to api
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: any) => {
  let token = localStorage.getItem('token');

  if (token) {
    token = JSON.parse(token);
  }

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  } else {
    config.headers['Authorization'] = '';
  }

  return config;
});

export default api;
