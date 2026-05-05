import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import AdminLayout from '../components/layout/AdminLayout'
import HomePage from '../pages/public/HomePage'
import SearchResultsPage from '../pages/public/SearchResultsPage'
import DestinationDetailPage from '../pages/public/DestinationDetailPage'
import CheckoutPage from '../pages/public/CheckoutPage'
import ProfilePage from '../pages/public/ProfilePage'
import FavoritesPage from '../pages/public/FavoritesPage'
import AuthPage from '../pages/public/AuthPage'
import ContactPage from '../pages/public/ContactPage'
import NotFoundPage from '../pages/public/NotFoundPage'
import DashboardPage from '../pages/admin/DashboardPage'
import BookingsPage from '../pages/admin/BookingsPage'
import DestinationsPage from '../pages/admin/DestinationsPage'
import UsersPage from '../pages/admin/UsersPage'
import { ADMIN_PATHS, PUBLIC_PATHS } from '../constants/paths'

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path={PUBLIC_PATHS.HOME} element={<HomePage />} />
      <Route path={PUBLIC_PATHS.SEARCH} element={<SearchResultsPage />} />
      <Route path={PUBLIC_PATHS.DESTINATION} element={<DestinationDetailPage />} />
      <Route path={PUBLIC_PATHS.CHECKOUT} element={<CheckoutPage />} />
      <Route path={PUBLIC_PATHS.PROFILE} element={<ProfilePage />} />
      <Route path={PUBLIC_PATHS.FAVORITES} element={<FavoritesPage />} />
      <Route path={PUBLIC_PATHS.AUTH} element={<AuthPage />} />
      <Route path={PUBLIC_PATHS.CONTACT} element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>

    <Route path={ADMIN_PATHS.ROOT} element={<AdminLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="bookings" element={<BookingsPage />} />
      <Route path="destinations" element={<DestinationsPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="*" element={<Navigate to={ADMIN_PATHS.DASHBOARD} replace />} />
    </Route>
  </Routes>
)

export default AppRoutes
