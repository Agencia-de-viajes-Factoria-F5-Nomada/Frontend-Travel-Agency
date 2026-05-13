export const PUBLIC_PATHS = {
  HOME: '/',
  SEARCH: '/search',
  DESTINATION: '/destinations/:id',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  OFFERS: '/offers',
  AUTH: '/auth',
};

export const ADMIN_PATHS = {
  ROOT: '/admin',
  DASHBOARD: '/admin',
  BOOKINGS: 'bookings',
  DESTINATIONS: 'destinations',
  USERS: 'users',
  HOTELS: 'hotels',
  BUSES: 'buses',
  DRIVERS: 'drivers',
};

export const buildDestinationPath = (id) => `/destinations/${id}`;