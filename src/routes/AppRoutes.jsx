import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout   from '../components/layout/PublicLayout';
import AdminLayout    from '../components/layout/AdminLayout';
import PrivateRoute   from '../components/layout/PrivateRoute';

// Páginas públicas
import HomePage             from '../pages/HomePage';
import DestinationsPage     from '../pages/DestinationsPage';
import DestinationDetailPage from '../pages/DestinationDetailPage';
import OffersPage           from '../pages/OffersPage';
import SearchResultsPage    from '../pages/SearchResultsPage';
import CheckoutPage         from '../pages/CheckoutPage';
import AuthPage             from '../pages/AuthPage';
import ProfilePage          from '../pages/ProfilePage';
import NotFoundPage         from '../pages/NotFoundPage';

// Páginas admin
import DashboardPage        from '../pages/DashboardPage';
import BookingsPage         from '../pages/BookingsPage';
import UsersPage            from '../pages/UsersPage';

// CRUDs admin (componentes existentes)
import Hoteles    from '../components/crud-hotel/Hoteles';
import Buses      from '../components/crud-buses/Buses';
import Drivers    from '../components/crud-drivers/Drivers';
import Travels    from '../components/crud-travel/Travels';
import Bookings   from '../components/bookings-crud/Bookings';

export default function AppRoutes() {
  return (
    <Routes>

      {/* ── Rutas públicas ── */}
      <Route element={<PublicLayout />}>
        <Route path="/"                    element={<HomePage />} />
        <Route path="/destinations"        element={<DestinationsPage />} />
        <Route path="/destinations/:id"    element={<DestinationDetailPage />} />
        <Route path="/offers"              element={<OffersPage />} />
        <Route path="/search"              element={<SearchResultsPage />} />
        <Route path="/auth"                element={<AuthPage />} />
        <Route path="/profile"             element={
          <PrivateRoute><ProfilePage /></PrivateRoute>
        } />
        <Route path="/checkout"            element={
          <PrivateRoute><CheckoutPage /></PrivateRoute>
        } />
      </Route>

      {/* ── Rutas admin (protegidas) ── */}
      <Route path="/admin" element={
        <PrivateRoute adminOnly>
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index                       element={<DashboardPage />} />
        <Route path="bookings"             element={<BookingsPage />} />
        <Route path="users"                element={<UsersPage />} />
        <Route path="hotels"               element={<Hoteles />} />
        <Route path="buses"                element={<Buses />} />
        <Route path="drivers"              element={<Drivers />} />
        <Route path="travels"              element={<Travels />} />
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}