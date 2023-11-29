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
  return time
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d/, '$1');
};
