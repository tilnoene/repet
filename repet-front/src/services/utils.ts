import dayjs from 'dayjs';
import { ToastOptions } from 'react-toastify';

export const petTypeOptions = [
  'Gato',
  'Cachorro',
  'Peixe',
  'Roedor',
  'Ave',
  'Outro',
];

export const petGenderOptions = ['Macho', 'Fêmea'];

export const checkServiceWorkerAvailability = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!');
  }

  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!');
  }
};

export const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('./service.js'); //notice the file name
  return swRegistration;
};

export const saveSubscription = async (subscription: any, userId: number) => {
  // const apiUrl = 'http://localhost:4001';
  const apiUrl = 'https://repet-notification.vercel.app';

  const SERVER_URL = `${apiUrl}/subscription`;

  const body = JSON.stringify({
    endpoint: subscription.endpoint,
    // expirationTime: null,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    user_id: userId,
  });

  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });

  return response.json();
};

export const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const formatDate = (date: string) => {
  return date
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d/, '$1');
};

export const formatWeight = (weight: string) => {
  return weight.replace(/[^\d.-]+/g, '');
};

export const formatTime = (time: string) => {
  return time
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .substring(0, 5);
};

export const getAge = (date: string) => {
  const oldDate = dayjs(date, 'YYYY-MM-DD');
  const currentDate = dayjs();

  let value;
  let measurementUnit;

  if (currentDate.diff(oldDate, 'year') > 0) {
    value = currentDate.diff(oldDate, 'year');
    measurementUnit = 'ano';

    if (value !== 1) {
      measurementUnit += 's';
    }
  } else if (currentDate.diff(oldDate, 'month') > 0) {
    value = currentDate.diff(oldDate, 'month');
    measurementUnit = 'mes';

    if (value !== 1) {
      measurementUnit += 'es';
    }
  } else {
    value = currentDate.diff(oldDate, 'day');
    measurementUnit = 'dia';

    if (value !== 1) {
      measurementUnit += 's';
    }
  }

  return `${value} ${measurementUnit}`;
};

export const parseVaccines = (vaccines: any) => {
  return vaccines.map((vaccine: any) => {
    return {
      id: vaccine.id,
      title: vaccine.record.title,
      description: vaccine.record.description,
      pet: { name: vaccine.pet.name },
      date: vaccine.record.date,
      time: vaccine.record.time,
      veterinarian: vaccine.veterinarian,
      place: vaccine.place,
    };
  });
};
