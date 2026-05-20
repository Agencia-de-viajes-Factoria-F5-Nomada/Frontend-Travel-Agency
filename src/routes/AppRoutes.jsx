import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts (no se lazy-loadean — son parte del shell)
import PublicLayout   from '../components/layout/PublicLayout';
import AdminLayout    from '../components/layout/AdminLayout';
import PrivateRoute   from '../components/layout/PrivateRoute';

// Páginas públicas
const HomePage             = lazy(() => import('../pages/HomePage'));
const DestinationsPage     = lazy(() => import('../pages/DestinationsPage'));
const DestinationDetailPage = lazy(() => import('../pages/DestinationDetailPage'));
const OffersPage           = lazy(() => import('../pages/OffersPage'));
const SearchResultsPage    = lazy(() => import('../pages/SearchResultsPage'));
const CheckoutPage         = lazy(() => import('../pages/CheckoutPage'));
const AuthPage             = lazy(() => import('../pages/AuthPage'));
const ProfilePage          = lazy(() => import('../pages/ProfilePage'));
const PersonalAreaPage     = lazy(() => import('../pages/PersonalAreaPage'));
const LegalPage            = lazy(() => import('../pages/LegalPage'));
const NotFoundPage         = lazy(() => import('../pages/NotFoundPage'));

// Páginas admin
const DashboardPage        = lazy(() => import('../pages/DashboardPage'));
const UsersPage            = lazy(() => import('../pages/UsersPage'));

// CRUDs admin
const HotelsCRUD           = lazy(() => import('../components/organisms/HotelsCRUD'));
const BusesCRUD            = lazy(() => import('../components/organisms/BusesCRUD'));
const DriversCRUD          = lazy(() => import('../components/organisms/DriversCRUD'));
const TravelsCRUD          = lazy(() => import('../components/organisms/TravelsCRUD'));
const BookingsCRUD         = lazy(() => import('../components/organisms/BookingsCRUD'));

const Loader = () => (
  <div className="flex h-screen items-center justify-center text-brand-200">
    Cargando...
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
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
          <Route path="/dashboard"           element={<DashboardPage />} />
          <Route path="/profile"             element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/personal/:section"   element={<PrivateRoute><PersonalAreaPage /></PrivateRoute>} />
          <Route path="/checkout"            element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
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
    </Suspense>
  );
}