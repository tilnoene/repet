import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: 'https://repet-back-login.vercel.app', // http://localhost:4000 // TODO: env to api
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token && JSON.parse(token)}`,
  },
});

export default api;
