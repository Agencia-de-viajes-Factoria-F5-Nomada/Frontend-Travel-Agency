export const PUBLIC_PATHS = {
  HOME:        '/',
  SEARCH:      '/search',
  DESTINATION: '/destinations/:id',
  CHECKOUT:    '/checkout',
  PROFILE:     '/profile',
  OFFERS:      '/offers',
  AUTH:        '/auth',
  DASHBOARD:   '/dashboard',
};

export const ADMIN_PATHS = {
  ROOT:          '/admin',
  DASHBOARD:     '/admin',
  BOOKINGS:      '/admin/bookings',
  DESTINATIONS:  '/admin/destinations',
  USERS:         '/admin/users',
  HOTELS:        '/admin/hotels',
  BUSES:         '/admin/buses',
  DRIVERS:       '/admin/drivers',
  TRAVELS:       '/admin/travels',
  OFFERS:        '/admin/offers',
  EMPLOYEES:     '/admin/employees',
  TRIP_SEGMENTS: '/admin/trip-segments',
};

export const buildDestinationPath = (id) => `/destinations/${id}`;