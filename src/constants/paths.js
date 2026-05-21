export const PUBLIC_PATHS = {
  HOME:        '/',
  SEARCH:      '/search',
  DESTINATION: '/destinations/:id',
  TRAVEL:      '/travels/:id',
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
  EMPLOYEES:    '/admin/employees',
  OFFERS:       '/admin/offers',
  TRIP_SEGMENTS:'/admin/trip-segments',
};

export const buildDestinationPath = (id) => `/destinations/${id}`;
export const buildTravelPath = (id) => `/travels/${id}`;
