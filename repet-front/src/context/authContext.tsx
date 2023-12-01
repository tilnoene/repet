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

        console.error(error);
      });

    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    navigate('/sign-in', { replace: true });
  };

  const isAuthenticated = () => {
    if (!token) {
      return false;
    }

    // TODO: api request

    return true;
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
