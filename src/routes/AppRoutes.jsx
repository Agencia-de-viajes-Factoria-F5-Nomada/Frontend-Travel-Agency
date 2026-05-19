import { Routes, Route } from 'react-router-dom';

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
import PersonalAreaPage     from '../pages/PersonalAreaPage';
import LegalPage            from '../pages/LegalPage';
import NotFoundPage         from '../pages/NotFoundPage';

// Páginas admin
import DashboardPage        from '../pages/DashboardPage';
import UsersPage            from '../pages/UsersPage';

// CRUDs admin (nuevos componentes Atomic Design)
import HotelsCRUD   from '../components/organisms/HotelsCRUD';
import BusesCRUD    from '../components/organisms/BusesCRUD';
import DriversCRUD  from '../components/organisms/DriversCRUD';
import TravelsCRUD  from '../components/organisms/TravelsCRUD';
import BookingsCRUD from '../components/organisms/BookingsCRUD';

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
        <Route path="/legal/:slug"         element={<LegalPage />} />
        <Route path="/profile"             element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/personal/:section"   element={<PrivateRoute><PersonalAreaPage /></PrivateRoute>} />
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
        <Route path="bookings"             element={<BookingsCRUD />} />
        <Route path="users"                element={<UsersPage />} />
        <Route path="hotels"               element={<HotelsCRUD />} />
        <Route path="buses"                element={<BusesCRUD />} />
        <Route path="drivers"              element={<DriversCRUD />} />
        <Route path="travels"              element={<TravelsCRUD />} />
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}