export const FEATURED_DESTINATIONS = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    price: 1280,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70',
    tag: 'Tendencia',
  },
  {
    id: 'kyoto',
    name: 'Kioto',
    country: 'Japón',
    price: 1640,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1493997181344-712f2f19d87a?auto=format&fit=crop&w=1200&q=70',
    tag: 'Nuevo',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Grecia',
    price: 1495,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=70',
    tag: 'Mejor valorado',
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina',
    price: 2105,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=70',
    tag: 'Aventura',
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Marruecos',
    price: 980,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=70',
    tag: 'Cultura',
  },
  {
    id: 'reykjavik',
    name: 'Reikiavik',
    country: 'Islandia',
    price: 1820,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1504542982118-59308b40fe0c?auto=format&fit=crop&w=1200&q=70',
    tag: 'Naturaleza',
  },
]

export const BOOKINGS = [
  {
    id: 'TR-1042',
    destination: 'Bali, Indonesia',
    dates: '12 jun - 22 jun',
    travelers: 2,
    total: 2560,
    status: 'confirmed',
    name: 'Marta Sánchez',
    dni: '12345678A',
    email: 'marta@travel.io',
    phone: '+34 654 321 987',
    signalPaid: 512,
  },
  {
    id: 'TR-1043',
    destination: 'Kioto, Japón',
    dates: '03 jul - 13 jul',
    travelers: 1,
    total: 1640,
    status: 'pending',
    name: 'Marta Sánchez',
    dni: '12345678A',
    email: 'marta@travel.io',
    phone: '+34 654 321 987',
    signalPaid: 328,
  },
  {
    id: 'TR-1044',
    destination: 'Patagonia, Argentina',
    dates: '20 ago - 04 sep',
    travelers: 4,
    total: 8420,
    status: 'confirmed',
    name: 'Marta Sánchez',
    dni: '12345678A',
    email: 'marta@travel.io',
    phone: '+34 654 321 987',
    signalPaid: 1684,
  },
]

export const USERS = [
  { id: 'U-001', name: 'Marta Sánchez', email: 'marta@travel.io', role: 'Cliente', status: 'active' },
  { id: 'U-002', name: 'Carlos Pérez', email: 'carlos@travel.io', role: 'Admin', status: 'active' },
  { id: 'U-003', name: 'Lin Wei', email: 'lin@travel.io', role: 'Cliente', status: 'inactive' },
  { id: 'U-004', name: 'Aisha Khan', email: 'aisha@travel.io', role: 'Cliente', status: 'active' },
]

export const CHECKOUT_STEPS = [
  { id: 1, label: 'Viajeros' },
  { id: 2, label: 'Pago' },
  { id: 3, label: 'Revisión' },
  { id: 4, label: 'Confirmación' },
]

export const BUSES = [
  { id: 'BUS-001', name: 'Volvo B11R', seats: 55, amenities: 'WiFi, AC, Baño' },
  { id: 'BUS-002', name: 'Mercedes Benz Citaro', seats: 48, amenities: 'AC, USB, Baño' },
  { id: 'BUS-003', name: 'Scania Touring', seats: 60, amenities: 'WiFi, AC, Baño, Enchufes' },
  { id: 'BUS-004', name: 'Setra S 531 DT', seats: 57, amenities: 'WiFi, AC, Baño, Cama' },
]

export const DRIVERS = [
  { id: 'DRV-001', name: 'Juan García', experience: '15 años', rating: 4.9 },
  { id: 'DRV-002', name: 'María López', experience: '10 años', rating: 4.8 },
  { id: 'DRV-003', name: 'Carlos Rodríguez', experience: '12 años', rating: 4.7 },
  { id: 'DRV-004', name: 'Ana Martínez', experience: '8 años', rating: 4.9 },
  { id: 'DRV-005', name: 'Pedro Gómez', experience: '18 años', rating: 5.0 },
]
