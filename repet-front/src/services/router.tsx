import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Settings from '../pages/Settings';
import Reminders from '../pages/Reminders';
import Pets from '../pages/Pets';
import Records from '../pages/Records';
import Profile from '../pages/Profile';
import PetProfile from '../pages/PetProfile';

import CreateReminder from '../pages/CreateReminder';
import CreatePet from '../pages/CreatePet';
import CreateRecord from '../pages/CreateRecord';

import EditReminder from '../pages/EditReminder';
import EditRecord from '../pages/EditRecord';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
<<<<<<< HEAD
import About from '../pages/About';
=======
// import About from '../pages/About';
>>>>>>> main

import { AuthProvider } from '../context/authContext';

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        {/* <Route path="/about" element={<About />} /> */}

        <Route path="/" element={<Reminders />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/records" element={<Records />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pets/:id" element={<PetProfile />} />

        <Route path="/pets/:id" element={<PetProfile />} />

        <Route path="/create-reminder" element={<CreateReminder />} />
        <Route path="/create-record" element={<CreateRecord />} />
        <Route path="/create-pet" element={<CreatePet />} />

        <Route path="/edit-reminder/:id" element={<EditReminder />} />
        <Route path="/edit-record/:id" element={<EditRecord />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default Router;
