import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import AdminLayout from '../components/layout/AdminLayout'
import HomePage from '../pages/HomePage'
import SearchResultsPage from '../pages/SearchResultsPage'
import DestinationDetailPage from '../pages/DestinationDetailPage'
import CheckoutPage from '../pages/CheckoutPage'
import ProfilePage from '../pages/ProfilePage'
import OffersPage from '../pages/OffersPage'
import PublicDashboardPage from '../pages/PublicDashboardPage'
import AuthPage from '../pages/AuthPage'
import NotFoundPage from '../pages/NotFoundPage'
import DashboardPage from '../pages/DashboardPage'
import BookingsPage from '../pages/BookingsPage'
import DestinationsPage from '../pages/DestinationsPage'
import UsersPage from '../pages/UsersPage'
import { ADMIN_PATHS, PUBLIC_PATHS } from '../constants/paths'

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path={PUBLIC_PATHS.HOME} element={<HomePage />} />
      <Route path={PUBLIC_PATHS.SEARCH} element={<SearchResultsPage />} />
      <Route path={PUBLIC_PATHS.DESTINATION} element={<DestinationDetailPage />} />
      <Route path={PUBLIC_PATHS.CHECKOUT} element={<CheckoutPage />} />
      <Route path={PUBLIC_PATHS.PROFILE} element={<ProfilePage />} />
      <Route path={PUBLIC_PATHS.OFFERS} element={<OffersPage />} />
      <Route path={PUBLIC_PATHS.DASHBOARD} element={<PublicDashboardPage />} />
      <Route path={PUBLIC_PATHS.AUTH} element={<AuthPage />} />
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
