import {
  BrowserRouter,
  Navigate,
  Route,
  RouteObject,
  Routes,
} from 'react-router-dom';

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

import { AuthProvider, useAuth } from '../context/authContext';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth() || {};

  if (!isAuthenticated || !isAuthenticated()) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Reminders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <Pets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:id"
          element={
            <ProtectedRoute>
              <PetProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-pet"
          element={
            <ProtectedRoute>
              <CreatePet />
            </ProtectedRoute>
          }
        />

        <Route path="/pets/:id" element={<PetProfile />} />
        <Route path="/create-reminder" element={<CreateReminder />} />
        <Route path="/create-record" element={<CreateRecord />} />
        <Route path="/edit-reminder/:id" element={<EditReminder />} />
        <Route path="/edit-record/:id" element={<EditRecord />} />
        <Route path="*" element={<NotFound />} />
        {/* TODO: refazer not found */}
        {/* TODO: refazer header com logout */}
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default Router;
