import {
  BrowserRouter,
  Navigate,
  Route,
  RouteObject,
  Routes,
} from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Reminders from '../pages/Reminders';
import Pets from '../pages/Pets';
import Records from '../pages/Records';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import PetProfile from '../pages/PetProfile';
import CreatePet from '../pages/CreatePet';

import { AuthProvider, useAuth } from '../context/authContext';
import SignIn from '../pages/SignIn';

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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<NotFound />} />{' '}
        {/* TODO: criar tela */}
        <Route path="*" element={<NotFound />} />
        {/* TODO: refazer not found */}
        {/* TODO: refazer header com logout */}
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default Router;
