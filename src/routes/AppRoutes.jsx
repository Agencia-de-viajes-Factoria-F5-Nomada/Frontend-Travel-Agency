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
import TravelsPage          from '../pages/TravelsPage';
import CheckoutPage         from '../pages/CheckoutPage';
import AuthPage             from '../pages/AuthPage';
import EntitiesPage          from '../pages/EntitiesPage';
import PersonalAreaPage     from '../pages/PersonalAreaPage';
import LegalPage            from '../pages/LegalPage';
import NotFoundPage         from '../pages/NotFoundPage';

// Páginas admin
import DashboardPage        from '../pages/DashboardPage';

// CRUD generico (reemplaza los CRUDs individuales)
import EntityTable       from '../components/organisms/EntityTable';

export default function AppRoutes() {
  return (
    <Routes>

      {/* ── Rutas públicas ── */}
      <Route element={<PublicLayout />}>
        <Route path="/"                    element={<AuthPage />} />
        <Route path="/home"               element={<HomePage />} />
        <Route path="/destinations"        element={<DestinationsPage />} />
        <Route path="/destinations/:id"    element={<DestinationDetailPage />} />
        <Route path="/offers"              element={<OffersPage />} />
        <Route path="/search"              element={<SearchResultsPage />} />
        <Route path="/travels"             element={<TravelsPage />} />
        <Route path="/legal/:slug"         element={<LegalPage />} />
        <Route path="/profile"             element={<PrivateRoute><EntitiesPage /></PrivateRoute>} />
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
        <Route path="bookings"             element={<EntityTable entityType="bookings" />} />
        <Route path="users"                element={<EntityTable entityType="users" />} />
        <Route path="hotels"               element={<EntityTable entityType="hotels" />} />
        <Route path="buses"                element={<EntityTable entityType="buses" />} />
        <Route path="drivers"              element={<EntityTable entityType="drivers" />} />
        <Route path="travels"              element={<EntityTable entityType="travels" />} />
        <Route path="employees"            element={<EntityTable entityType="employees" />} />
        <Route path="offers"               element={<EntityTable entityType="offers" />} />
        <Route path="trip-segments"        element={<EntityTable entityType="trip-segments" />} />
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}