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
  return time; // TODO: implementar
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
