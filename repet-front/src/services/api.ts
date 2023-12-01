import axios from 'axios';

const api = axios.create({
  baseURL: 'https://repet-back.vercel.app/', // http://localhost:4000
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
