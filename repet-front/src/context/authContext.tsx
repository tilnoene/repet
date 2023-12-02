import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';

import api from '../services/api';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useLocalStorage('token', null);
  const [userId, setUserId] = useLocalStorage('user_id', null);

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    await api
      .post('/login/', {
        username: username,
        password: password,
      })
      .then(response => {
        setToken(response.data.token);
        setUserId(response.data.user_id);
      })
      .catch(error => {
        setToken(null);
        setUserId(null);
        throw new Error(error);
      });
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    navigate('/sign-in', { replace: true });
  };

  const isAuthenticated = async () => {
    if (!token) {
      return false;
    }

    let isAuth = false;

    await api.get('/check-token/').then(response => {
      isAuth = response.data.detail && response.data?.detail === true;
    });

    return isAuth;
  };

  const value = useMemo(
    () => ({
      token,
      userId,
      login,
      logout,
      isAuthenticated,
    }),
    [token, userId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
