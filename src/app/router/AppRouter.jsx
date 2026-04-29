import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import HomePage from "../../pages/public/HomePage";
import TripsPage from "../../pages/public/TripsPage";
import TripDetailPage from "../../pages/public/TripDetailPage";
import CheckoutPage from "../../pages/public/CheckoutPage";
import ConfirmationPage from "../../pages/public/ConfirmationPage";
import LoginPage from "../../pages/public/LoginPage";
import RegisterPage from "../../pages/public/RegisterPage";
import ContactPage from "../../pages/public/ContactPage";
import ProfilePage from "../../pages/private/ProfilePage";
import FavoritesPage from "../../pages/private/FavoritesPage";
import DashboardPage from "../../pages/admin/DashboardPage";
import ReservationsPage from "../../pages/admin/ReservationsPage";
import DestinationsPage from "../../pages/admin/DestinationsPage";
import UsersPage from "../../pages/admin/UsersPage";
import HotelsPage from "../../pages/admin/HotelsPage";
import BusesPage from "../../pages/admin/BusesPage";
import DriversPage from "../../pages/admin/DriversPage";

const protect = (element, role) => (
  <ProtectedRoute role={role}>{element}</ProtectedRoute>
);

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TripDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Private Routes */}
          <Route path="/profile" element={protect(<ProfilePage />)} />
          <Route path="/favorites" element={protect(<FavoritesPage />)} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={protect(<DashboardPage />, "admin")} />
          <Route path="/admin/reservations" element={protect(<ReservationsPage />, "admin")} />
          <Route path="/admin/destinations" element={protect(<DestinationsPage />, "admin")} />
          <Route path="/admin/users" element={protect(<UsersPage />, "admin")} />
          <Route path="/admin/hotels" element={protect(<HotelsPage />, "admin")} />
          <Route path="/admin/buses" element={protect(<BusesPage />, "admin")} />
          <Route path="/admin/drivers" element={protect(<DriversPage />, "admin")} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
