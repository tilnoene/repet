import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Reminders from '../pages/Reminders';
import Pets from '../pages/Pets';
import Records from '../pages/Records';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import PetProfile from '../pages/PetProfile';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Reminders />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/records" element={<Records />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/pet/:id" element={<PetProfile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
