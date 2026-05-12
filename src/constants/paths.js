export const PUBLIC_PATHS = {
  HOME: '/',
  SEARCH: '/search',
  DESTINATION: '/destinations/:id',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  OFFERS: '/offers',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
}

export const ADMIN_PATHS = {
  ROOT: '/admin',
  DASHBOARD: '/admin',
  BOOKINGS: '/admin/bookings',
  DESTINATIONS: '/admin/destinations',
  USERS: '/admin/users',
}

export const buildDestinationPath = (id) => `/destinations/${id}`
