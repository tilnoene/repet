import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { ToastContainer } from 'react-toastify';

import Router from './services/router';

import 'react-toastify/dist/ReactToastify.css';

dayjs.extend(customParseFormat)
dayjs.locale('pt-br');

const App = () => {

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
