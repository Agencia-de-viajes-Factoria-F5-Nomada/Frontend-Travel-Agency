export const PUBLIC_PATHS = {
  HOME:        '/',
  SEARCH:      '/search',
  DESTINATION: '/destinations/:id',
  CHECKOUT:    '/checkout',
  PROFILE:     '/profile',
  ENTITIES:    '/profile',
  OFFERS:      '/offers',
  TRAVELS:     '/travels',
  AUTH:        '/auth',
  DASHBOARD:   '/dashboard',
  LEGAL:       '/legal/:slug',
  PRIVACY:     '/legal/privacidad',
  TERMS:       '/legal/terminos',
  COOKIES:     '/legal/cookies',
  COPYRIGHT:   '/legal/copyright',
};

export const ADMIN_PATHS = {
  ROOT:         '/admin',
  DASHBOARD:    '/admin',
  BOOKINGS:     '/admin/bookings',
  DESTINATIONS: '/admin/destinations',
  USERS:        '/admin/users',
  HOTELS:       '/admin/hotels',
  BUSES:        '/admin/buses',
  DRIVERS:      '/admin/drivers',
  TRAVELS:      '/admin/travels',
};

export const buildDestinationPath = (id) => `/destinations/${id}`;
