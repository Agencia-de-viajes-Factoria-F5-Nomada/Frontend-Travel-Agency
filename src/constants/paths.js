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
  HOTELS: '/admin/hotels',
  BUSES: '/admin/buses',
  DRIVERS: '/admin/drivers',
  TRAVELS: '/admin/travels',
  USERS: '/admin/users',
}

export const buildDestinationPath = (id) => `/destinations/${id}`
