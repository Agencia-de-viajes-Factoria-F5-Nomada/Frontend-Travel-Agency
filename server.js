import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

// Middleware para logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(express.json());
app.use(cors());

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const JWT_SECRET = 'tu_secreto_super_seguro_aqui';

// Base de datos simulada
const db = {
  users: [
    { id: 1, name: 'Admin User', email: 'admin@travel.io', password: 'admin123', role: 'ADMIN', active: true },
    { id: 2, name: 'Marta Sánchez', email: 'marta@travel.io', password: 'user123', role: 'USER', dni: '12345678A', phone: '+34 654 321 987', active: true },
    // Empleados del sistema NOMADA
    { id: 3, name: 'Carlos', surname: 'Pérez', email: 'carlos.perez@travelagency.com', password: '1234', role: 'ADMIN', active: true },
    { id: 4, name: 'Ana', surname: 'Sánchez', email: 'ana.sanchez@travelagency.com', password: '1234', role: 'EDITOR', active: true },
    { id: 5, name: 'Sofía', surname: 'Oliveira', email: 'sofia.oliveira@travelagency.com', password: '1234', role: 'EDITOR', active: true },
    { id: 6, name: 'David', surname: 'Thimotheo', email: 'david.thimotheo@travelagency.com', password: '1234', role: 'VIEWER', active: true },
  ],
  hotels: [
    { id: 1,  name: 'Royal London Hotel',           address: 'Cromwell Rd 123',          city: 'Londres',               country: 'Reino Unido',      stars: 3, capacity: 120, availablePlaces: 120, fullBoardPrice: 150.00, halfBoardPrice: 110.00, imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=480&fit=crop', active: true },
    { id: 2,  name: 'St Giles London Hotel',         address: 'Bedford Ave',               city: 'Londres',               country: 'Reino Unido',      stars: 4, capacity: 250, availablePlaces: 250, fullBoardPrice: 185.00, halfBoardPrice: 140.00, imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=480&fit=crop', active: true },
    { id: 3,  name: 'President Hotel London',        address: 'Russell Square',            city: 'Londres',               country: 'Reino Unido',      stars: 4, capacity: 180, availablePlaces: 180, fullBoardPrice: 160.00, halfBoardPrice: 125.00, imageUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&h=480&fit=crop', active: true },
    { id: 4,  name: 'Hotel Roma Centro',             address: 'Via Nazionale 22',          city: 'Roma',                  country: 'Italia',           stars: 4, capacity: 100, availablePlaces: 100, fullBoardPrice: 180.00, halfBoardPrice: 130.00, imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=480&fit=crop', active: true },
    { id: 5,  name: 'Hotel París Eiffel',            address: 'Av. de la Bourdonnais 72', city: 'París',                 country: 'Francia',          stars: 4, capacity: 150, availablePlaces: 150, fullBoardPrice: 200.00, halfBoardPrice: 155.00, imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=480&fit=crop', active: true },
    { id: 6,  name: 'Hotel Ámsterdam Canal',         address: 'Keizersgracht 148',         city: 'Ámsterdam',             country: 'Países Bajos',     stars: 3, capacity: 80,  availablePlaces: 80,  fullBoardPrice: 160.00, halfBoardPrice: 120.00, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=480&fit=crop', active: true },
    { id: 7,  name: 'Hotel Berlín Mitte',            address: 'Unter den Linden 77',       city: 'Berlín',                country: 'Alemania',         stars: 4, capacity: 120, availablePlaces: 120, fullBoardPrice: 170.00, halfBoardPrice: 125.00, imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=480&fit=crop', active: true },
    { id: 8,  name: 'Hotel Lisboa Alfama',           address: 'Rua Augusta 45',            city: 'Lisboa',                country: 'Portugal',         stars: 3, capacity: 90,  availablePlaces: 90,  fullBoardPrice: 140.00, halfBoardPrice: 100.00, imageUrl: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=480&fit=crop', active: true },
    { id: 9,  name: 'Hotel Praga Centro',            address: 'Wenceslas Square 12',       city: 'Praga',                 country: 'República Checa',  stars: 4, capacity: 110, availablePlaces: 110, fullBoardPrice: 155.00, halfBoardPrice: 115.00, imageUrl: 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=800&h=480&fit=crop', active: true },
    { id: 10, name: 'Hotel Viena Imperial',          address: 'Kärntner Strasse 38',       city: 'Viena',                 country: 'Austria',          stars: 5, capacity: 130, availablePlaces: 130, fullBoardPrice: 220.00, halfBoardPrice: 170.00, imageUrl: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=480&fit=crop', active: true },
    { id: 11, name: 'Hotel Dubrovnik Pearl',         address: 'Stradun 24',                city: 'Dubrovnik',             country: 'Croacia',          stars: 4, capacity: 70,  availablePlaces: 70,  fullBoardPrice: 190.00, halfBoardPrice: 145.00, imageUrl: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&h=480&fit=crop', active: true },
    { id: 12, name: 'Hotel Tokio Shinjuku',          address: 'Shinjuku 3-chome',          city: 'Tokio',                 country: 'Japón',            stars: 4, capacity: 100, availablePlaces: 100, fullBoardPrice: 250.00, halfBoardPrice: 190.00, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=480&fit=crop', active: true },
    { id: 13, name: 'Hotel Bangkok Riverside',       address: 'Charoen Krung Rd',          city: 'Bangkok',               country: 'Tailandia',        stars: 4, capacity: 120, availablePlaces: 120, fullBoardPrice: 180.00, halfBoardPrice: 130.00, imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=480&fit=crop', active: true },
    { id: 14, name: 'Hotel Bali Ubud',               address: 'Jl. Monkey Forest',         city: 'Bali',                  country: 'Indonesia',        stars: 5, capacity: 80,  availablePlaces: 80,  fullBoardPrice: 200.00, halfBoardPrice: 150.00, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=480&fit=crop', active: true },
    { id: 15, name: 'Hotel Vuelta al Mundo',         address: 'World Tour HQ',             city: 'Nueva York · Sídney',   country: 'Mundial',          stars: 5, capacity: 20,  availablePlaces: 20,  fullBoardPrice: 350.00, halfBoardPrice: 280.00, imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=480&fit=crop', active: true },
    { id: 16, name: 'Hotel Ciudad de México Centro', address: 'Av. Juárez 70',             city: 'Ciudad de México',      country: 'México',           stars: 4, capacity: 100, availablePlaces: 100, fullBoardPrice: 185.00, halfBoardPrice: 145.00, imageUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=480&fit=crop', active: true },
    { id: 17, name: 'Hotel Nueva York Manhattan',    address: '5th Avenue 350',            city: 'Nueva York',            country: 'Estados Unidos',   stars: 5, capacity: 120, availablePlaces: 120, fullBoardPrice: 520.00, halfBoardPrice: 420.00, imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=480&fit=crop', active: true },
    { id: 18, name: 'Hotel Alaska Wilderness',       address: 'Denali Rd 12',              city: 'Anchorage',             country: 'Alaska',           stars: 4, capacity: 60,  availablePlaces: 60,  fullBoardPrice: 380.00, halfBoardPrice: 310.00, imageUrl: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=480&fit=crop', active: true },
    { id: 19, name: 'Hotel Canadá Rockies',          address: 'Banff Ave 200',             city: 'Banff',                 country: 'Canadá',           stars: 4, capacity: 80,  availablePlaces: 80,  fullBoardPrice: 340.00, halfBoardPrice: 270.00, imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=480&fit=crop', active: true },
    { id: 20, name: 'Hotel Vietnam Hanoi',           address: 'Hoan Kiem 45',              city: 'Hanói',                 country: 'Vietnam',          stars: 3, capacity: 90,  availablePlaces: 90,  fullBoardPrice: 160.00, halfBoardPrice: 120.00, imageUrl: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=480&fit=crop', active: true },
  ],
  buses: [
    { id: 1, busNumber: 'B001', capacity: 50, model: 'Scania', available: true },
    { id: 2, busNumber: 'B002', capacity: 45, model: 'Volvo', available: true },
  ],
  drivers: [
    { id: 1, name: 'Juan García', license: 'D12345678', active: true, experience: 15 },
    { id: 2, name: 'María López', license: 'D87654321', active: true, experience: 10 },
  ],
  travels: [
    { id: 1,  destiny: 'Londres Clásico y Real - Grupo A',            startDate: '2026-06-10', endDate: '2026-06-14', sale: true,  discountPercentage: 10, hotelId: 1,  availablePlaces: 35, active: true },
    { id: 2,  destiny: 'Londres Clásico y Real - Grupo B',            startDate: '2026-06-10', endDate: '2026-06-14', sale: true,  discountPercentage: 5,  hotelId: 2,  availablePlaces: 40, active: true },
    { id: 3,  destiny: 'Londres Edición Verano',                      startDate: '2026-08-15', endDate: '2026-08-19', sale: false, discountPercentage: 0,  hotelId: 3,  availablePlaces: 50, active: true },
    { id: 4,  destiny: 'Roma Imperial y Vaticano',                    startDate: '2026-07-01', endDate: '2026-07-06', sale: false, discountPercentage: 0,  hotelId: 4,  availablePlaces: 40, active: true },
    { id: 5,  destiny: 'París Ciudad de la Luz',                      startDate: '2026-07-15', endDate: '2026-07-20', sale: true,  discountPercentage: 10, hotelId: 5,  availablePlaces: 35, active: true },
    { id: 6,  destiny: 'Ámsterdam Canales y Museos',                  startDate: '2026-08-01', endDate: '2026-08-05', sale: false, discountPercentage: 0,  hotelId: 6,  availablePlaces: 30, active: true },
    { id: 7,  destiny: 'Berlín Historia y Arte',                      startDate: '2026-07-10', endDate: '2026-07-15', sale: false, discountPercentage: 0,  hotelId: 7,  availablePlaces: 45, active: true },
    { id: 8,  destiny: 'Lisboa y Sintra Encantadora',                 startDate: '2026-07-20', endDate: '2026-07-25', sale: true,  discountPercentage: 5,  hotelId: 8,  availablePlaces: 38, active: true },
    { id: 9,  destiny: 'Praga Ciudad Dorada',                         startDate: '2026-08-05', endDate: '2026-08-10', sale: false, discountPercentage: 0,  hotelId: 9,  availablePlaces: 42, active: true },
    { id: 10, destiny: 'Viena Música y Palacios',                     startDate: '2026-08-20', endDate: '2026-08-25', sale: true,  discountPercentage: 10, hotelId: 10, availablePlaces: 30, active: true },
    { id: 11, destiny: 'Dubrovnik Perla del Adriático',               startDate: '2026-09-01', endDate: '2026-09-06', sale: false, discountPercentage: 0,  hotelId: 11, availablePlaces: 25, active: true },
    { id: 12, destiny: 'Tokio Cultura y Tecnología',                  startDate: '2026-09-10', endDate: '2026-09-17', sale: true,  discountPercentage: 10, hotelId: 12, availablePlaces: 30, active: true },
    { id: 13, destiny: 'Bangkok Templos y Sabores',                   startDate: '2026-09-20', endDate: '2026-09-27', sale: false, discountPercentage: 0,  hotelId: 13, availablePlaces: 35, active: true },
    { id: 14, destiny: 'Bali Paraíso Tropical',                       startDate: '2026-10-01', endDate: '2026-10-08', sale: true,  discountPercentage: 5,  hotelId: 14, availablePlaces: 25, active: true },
    { id: 15, destiny: 'Vuelta al Mundo - Nueva York · Sídney · Dubái', startDate: '2026-10-15', endDate: '2026-11-15', sale: true,  discountPercentage: 10, hotelId: 15, availablePlaces: 20, active: true },
    { id: 16, destiny: 'México Azteca y Colonial',                    startDate: '2026-11-01', endDate: '2026-11-08', sale: true,  discountPercentage: 5,  hotelId: 16, availablePlaces: 35, active: true },
    { id: 17, destiny: 'Nueva York La Ciudad que Nunca Duerme',       startDate: '2026-11-15', endDate: '2026-11-22', sale: false, discountPercentage: 0,  hotelId: 17, availablePlaces: 30, active: true },
    { id: 18, destiny: 'Alaska Naturaleza Salvaje',                   startDate: '2026-12-01', endDate: '2026-12-08', sale: true,  discountPercentage: 10, hotelId: 18, availablePlaces: 20, active: true },
    { id: 19, destiny: 'Canadá Montañas Rocosas',                     startDate: '2026-12-10', endDate: '2026-12-17', sale: false, discountPercentage: 0,  hotelId: 19, availablePlaces: 25, active: true },
    { id: 20, destiny: 'Vietnam Tour Cultural',                       startDate: '2026-11-20', endDate: '2026-11-27', sale: true,  discountPercentage: 5,  hotelId: 20, availablePlaces: 30, active: true },
  ],
  bookings: [
    { id: 'TR-1042', destination: 'Bali, Indonesia', dates: '12 jun - 22 jun', travelers: 2, total: 2560, status: 'confirmed', userId: 2 },
    { id: 'TR-1043', destination: 'Kioto, Japón', dates: '03 jul - 13 jul', travelers: 1, total: 1640, status: 'pending', userId: 2 },
  ],
  offers: [
    { id: 1, title: 'Verano en Bali', description: 'Descuento especial', discount: 20, validUntil: '2026-06-30' },
    { id: 2, title: 'Otoño en Japón', description: 'Oferta limitada', discount: 15, validUntil: '2026-08-31' },
  ],
};

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(`[TOKEN] Authorization header: ${authHeader}`);
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    console.log(`[TOKEN] ❌ No hay token en el header`);
    return res.status(401).json({ error: 'No autorizado - token faltante' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(`[TOKEN] ✅ Token válido para usuario: ${decoded.email}`);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(`[TOKEN] ❌ Token inválido:`, error.message);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// ============ AUTENTICACIÓN ============
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`[LOGIN] Intentando login con email: ${email}, password: ${password}`);
  console.log(`[LOGIN] Usuarios disponibles:`, db.users.map(u => ({ email: u.email, pass: u.password })));
  
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    console.log(`[LOGIN] ❌ Usuario no encontrado o contraseña incorrecta`);
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  
  console.log(`[LOGIN] ✅ Login exitoso para ${email}`);
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
  console.log(`[LOGIN] Token generado:`, token.substring(0, 50) + '...');
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { id: db.users.length + 1, name, email, password, role: 'USER', active: true };
  db.users.push(newUser);
  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET);
  res.json({ token, user: newUser });
});

// ============ USUARIOS ============
app.get('/api/users', (req, res) => {
  res.json(db.users);
});

app.get('/api/users/:id', (req, res) => {
  const user = db.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});

app.get('/api/users/activos', (req, res) => {
  res.json(db.users.filter(u => u.active));
});

app.post('/api/users', (req, res) => {
  const newUser = { id: db.users.length + 1, ...req.body, active: true };
  db.users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const user = db.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  Object.assign(user, req.body);
  res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const index = db.users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
  db.users.splice(index, 1);
  res.json({ message: 'Usuario eliminado' });
});

// ============ HOTELES ============
app.get('/api/hotels', (req, res) => {
  res.json(db.hotels);
});

app.get('/api/hotels/:id', (req, res) => {
  const hotel = db.hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) return res.status(404).json({ error: 'Hotel no encontrado' });
  res.json(hotel);
});

app.post('/api/hotels', (req, res) => {
  const newHotel = { id: db.hotels.length + 1, ...req.body };
  db.hotels.push(newHotel);
  res.status(201).json(newHotel);
});

app.put('/api/hotels/:id', (req, res) => {
  const hotel = db.hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) return res.status(404).json({ error: 'Hotel no encontrado' });
  Object.assign(hotel, req.body);
  res.json(hotel);
});

app.delete('/api/hotels/:id', (req, res) => {
  const index = db.hotels.findIndex(h => h.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Hotel no encontrado' });
  db.hotels.splice(index, 1);
  res.json({ message: 'Hotel eliminado' });
});

// ============ BUSES ============
app.get('/api/buses', (req, res) => {
  res.json(db.buses);
});

app.get('/api/buses/:id', (req, res) => {
  const bus = db.buses.find(b => b.id === parseInt(req.params.id));
  if (!bus) return res.status(404).json({ error: 'Bus no encontrado' });
  res.json(bus);
});

app.post('/api/buses', (req, res) => {
  const newBus = { id: db.buses.length + 1, ...req.body };
  db.buses.push(newBus);
  res.status(201).json(newBus);
});

app.put('/api/buses/:id', (req, res) => {
  const bus = db.buses.find(b => b.id === parseInt(req.params.id));
  if (!bus) return res.status(404).json({ error: 'Bus no encontrado' });
  Object.assign(bus, req.body);
  res.json(bus);
});

app.delete('/api/buses/:id', (req, res) => {
  const index = db.buses.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Bus no encontrado' });
  db.buses.splice(index, 1);
  res.json({ message: 'Bus eliminado' });
});

// ============ CONDUCTORES ============
app.get('/api/drivers', (req, res) => {
  res.json(db.drivers);
});

app.get('/api/drivers/:id', (req, res) => {
  const driver = db.drivers.find(d => d.id === parseInt(req.params.id));
  if (!driver) return res.status(404).json({ error: 'Conductor no encontrado' });
  res.json(driver);
});

app.post('/api/drivers', (req, res) => {
  const newDriver = { id: db.drivers.length + 1, ...req.body };
  db.drivers.push(newDriver);
  res.status(201).json(newDriver);
});

app.put('/api/drivers/:id', (req, res) => {
  const driver = db.drivers.find(d => d.id === parseInt(req.params.id));
  if (!driver) return res.status(404).json({ error: 'Conductor no encontrado' });
  Object.assign(driver, req.body);
  res.json(driver);
});

app.delete('/api/drivers/:id', (req, res) => {
  const index = db.drivers.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Conductor no encontrado' });
  db.drivers.splice(index, 1);
  res.json({ message: 'Conductor eliminado' });
});

// ============ VIAJES ============
app.get('/api/travels', (req, res) => {
  res.json(db.travels);
});

app.get('/api/travels/:id', (req, res) => {
  const travel = db.travels.find(t => t.id === parseInt(req.params.id));
  if (!travel) return res.status(404).json({ error: 'Viaje no encontrado' });
  res.json(travel);
});

app.post('/api/travels', (req, res) => {
  const newTravel = { id: db.travels.length + 1, ...req.body };
  db.travels.push(newTravel);
  res.status(201).json(newTravel);
});

app.put('/api/travels/:id', (req, res) => {
  const travel = db.travels.find(t => t.id === parseInt(req.params.id));
  if (!travel) return res.status(404).json({ error: 'Viaje no encontrado' });
  Object.assign(travel, req.body);
  res.json(travel);
});

app.delete('/api/travels/:id', (req, res) => {
  const index = db.travels.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Viaje no encontrado' });
  db.travels.splice(index, 1);
  res.json({ message: 'Viaje eliminado' });
});

// ============ RESERVAS ============
app.get('/api/bookings', (req, res) => {
  res.json(db.bookings);
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });
  res.json(booking);
});

app.post('/api/bookings', (req, res) => {
  const newBooking = { id: `TR-${Date.now()}`, ...req.body };
  db.bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.put('/api/bookings/:id', (req, res) => {
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });
  Object.assign(booking, req.body);
  res.json(booking);
});

app.delete('/api/bookings/:id', (req, res) => {
  const index = db.bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Reserva no encontrada' });
  db.bookings.splice(index, 1);
  res.json({ message: 'Reserva eliminada' });
});

// ============ OFERTAS ============
app.get('/api/offers', (req, res) => {
  res.json(db.offers);
});

app.get('/api/offers/:id', (req, res) => {
  const offer = db.offers.find(o => o.id === parseInt(req.params.id));
  if (!offer) return res.status(404).json({ error: 'Oferta no encontrada' });
  res.json(offer);
});

app.post('/api/offers', (req, res) => {
  const newOffer = { id: db.offers.length + 1, ...req.body };
  db.offers.push(newOffer);
  res.status(201).json(newOffer);
});

app.put('/api/offers/:id', (req, res) => {
  const offer = db.offers.find(o => o.id === parseInt(req.params.id));
  if (!offer) return res.status(404).json({ error: 'Oferta no encontrada' });
  Object.assign(offer, req.body);
  res.json(offer);
});

app.delete('/api/offers/:id', (req, res) => {
  const index = db.offers.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Oferta no encontrada' });
  db.offers.splice(index, 1);
  res.json({ message: 'Oferta eliminada' });
});

// ============ DASHBOARD ============
app.get('/api/dashboard', (req, res) => {
  console.log(`[DASHBOARD] Dashboard consultado (SIN AUTENTICACIÓN PARA DEBUGGING)`);
  res.json({
    currentYearEarnings: 156000,
    travelsPerYear: { 2024: 15, 2025: 22, 2026: 8 },
    topTravels: [
      { destiny: 'Londres Clásico y Real' },
      { destiny: 'París Ciudad de la Luz' },
      { destiny: 'Bali Paraíso Tropical' }
    ]
  });
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// ============ TRIP SEGMENTS (para rutas multi-etapa) ============
app.get('/api/trip-segments', (req, res) => {
  res.json([]);
});

app.post('/api/trip-segments', (req, res) => {
  const newSegment = { id: 1, ...req.body };
  res.status(201).json(newSegment);
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║  ✅ SERVIDOR DE VIAJES INICIADO CORRECTAMENTE                ║
║                                                               ║
║  🌐 URL: http://localhost:${PORT}                              ║
║  📡 API: http://localhost:${PORT}/api                          ║
║  💚 Health: http://localhost:${PORT}/api/health                ║
║                                                               ║
║  🔑 CREDENCIALES DISPONIBLES:                                ║
║                                                               ║
║  👨‍💼 ADMIN:                                                     ║
║     Email: admin@travel.io                                   ║
║     Contraseña: admin123                                     ║
║                                                               ║
║  👨‍💼 EMPLEADOS (NOMADA):                                        ║
║     Email: carlos.perez@travelagency.com / Contraseña: 1234  ║
║     Email: ana.sanchez@travelagency.com / Contraseña: 1234   ║
║     Email: sofia.oliveira@travelagency.com / Contraseña: 1234║
║     Email: david.thimotheo@travelagency.com / Contraseña: 1234║
║                                                               ║
║  👤 USUARIO:                                                  ║
║     Email: marta@travel.io / Contraseña: user123             ║
║                                                               ║
║  📊 DATOS DISPONIBLES:                                        ║
║     ✓ 20 hoteles en todo el mundo                            ║
║     ✓ 12 viajes disponibles                                  ║
║     ✓ 6 usuarios + empleados                                 ║
║     ✓ Sistema de autenticación JWT                           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

// Manejo de errores del servidor
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ El puerto ${PORT} ya está en uso. Intenta: npm run kill:port`);
  } else {
    console.error('❌ Error del servidor:', err);
  }
  process.exit(1);
});
