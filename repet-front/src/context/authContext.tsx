import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';

import api from '../services/api';
import {
  checkServiceWorkerAvailability,
  registerServiceWorker,
  saveSubscription,
} from '../services/utils';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useLocalStorage('token', null);
  const [userId, setUserId] = useLocalStorage('user_id', null);

  const navigate = useNavigate();

  const urlB64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const login = async (username: string, password: string) => {
    await api
      .post('/login/', {
        username: username,
        password: password,
      })
      .then(async response => {
        setToken(response.data.token);
        setUserId(response.data.user_id);

        try {
          const swRegistration = await registerServiceWorker();

          const applicationServerKey = urlB64ToUint8Array(
            'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk',
          );
          const options = { applicationServerKey, userVisibleOnly: true };
          const subscription = await swRegistration.pushManager.subscribe(
            options,
          );

          await saveSubscription(
            JSON.parse(JSON.stringify(subscription)),
            response.data.user_id,
          );

          console.log('Notifications enabled.');
        } catch (err) {
          console.log('Error', err);
        }
      })
      .catch(error => {
        setToken(null);
        setUserId(null);
        throw new Error(error);
      });
  };

  const logout = () => {
    try {
      checkServiceWorkerAvailability();

      // console.log(`${window.location.host}/service.js`);
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          if (
            registration.active?.scriptURL ===
              `http://${window.location.host}/service.js` ||
            registration.active?.scriptURL ===
              `https://${window.location.host}/service.js`
          ) {
            registration.unregister();
          }
        }
      });
    } catch (error) {
      console.error(error);
    }

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
