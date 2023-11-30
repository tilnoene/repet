import dayjs from 'dayjs';

import { ToastContainer } from 'react-toastify';

import Router from './services/router';

import 'react-toastify/dist/ReactToastify.css';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const App = () => {
  dayjs.locale('pt-br');
  dayjs.extend(customParseFormat);

  return (
    <>
      <Router />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
