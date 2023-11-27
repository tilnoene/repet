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
