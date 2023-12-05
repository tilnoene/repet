import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // TODO: env to api
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

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      const win: Window = window;

      if (win.location.pathname !== 'sign-in') {
        win.location = '/sign-in';
      }
    }
  },
);

export default api;
