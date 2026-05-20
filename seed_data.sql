-- =============================================================
--  NOMADA · Seed completo de base de datos
--  35 viajes (20 originales + 15 incorporados del catálogo)
--  Ejecutar contra el schema que usa el backend Java
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE customers_bookings;
TRUNCATE TABLE bookings;
TRUNCATE TABLE trip_segments;
TRUNCATE TABLE travels;
TRUNCATE TABLE hotels;
TRUNCATE TABLE offers;
TRUNCATE TABLE buses;
TRUNCATE TABLE drivers;
TRUNCATE TABLE employees;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ── EMPLEADOS ────────────────────────────────────────────────
INSERT INTO employees (gender, name, surname, work_hour, hired, password, role, email) VALUES
('MALE',   'Carlos', 'Pérez',     40, true, '1234', 'ADMIN',  'carlos.perez@travelagency.com'),
('FEMALE', 'Ana',    'Sánchez',   35, true, '1234', 'EDITOR', 'ana.sanchez@travelagency.com'),
('FEMALE', 'Sofía',  'Oliveira',  40, true, '1234', 'EDITOR', 'sofia.oliveira@travelagency.com'),
('MALE',   'David',  'Thimotheo', 20, true, '1234', 'VIEWER', 'david.thimotheo@travelagency.com');

-- ── OFERTAS ──────────────────────────────────────────────────
-- IDs 1-3 originales + 4-9 para los nuevos porcentajes
INSERT INTO offers (offer_id, discount_percentage, start_date, end_date) VALUES
(1, 10.00, '2026-01-01', '2026-12-31'),
(2,  5.00, '2026-01-01', '2026-12-31'),
(3,  0.00, '2026-01-01', '2026-12-31'),
(4, 12.00, '2026-01-01', '2026-12-31'),
(5, 15.00, '2026-01-01', '2026-12-31'),
(6, 18.00, '2026-01-01', '2026-12-31'),
(7, 20.00, '2026-01-01', '2026-12-31'),
(8, 22.00, '2026-01-01', '2026-12-31'),
(9, 25.00, '2026-01-01', '2026-12-31');

-- ── HOTELES (35 en total) ─────────────────────────────────────
-- IDs 1-20 originales
INSERT INTO hotels (name, address, city, country, stars, capacity, available_places, full_board_price, half_board_price, image_url, active) VALUES
('Royal London Hotel',            'Cromwell Rd 123',              'Londres',                   'Reino Unido',      3, 120, 120, 150.00, 110.00, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=480&fit=crop', true),
('St Giles London Hotel',         'Bedford Ave',                  'Londres',                   'Reino Unido',      4, 250, 250, 185.00, 140.00, 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=480&fit=crop', true),
('President Hotel London',        'Russell Square',               'Londres',                   'Reino Unido',      4, 180, 180, 160.00, 125.00, 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&h=480&fit=crop', true),
('Hotel Roma Centro',             'Via Nazionale 22',             'Roma',                      'Italia',           4, 100, 100, 180.00, 130.00, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=480&fit=crop', true),
('Hotel París Eiffel',            'Av. de la Bourdonnais 72',     'París',                     'Francia',          4, 150, 150, 200.00, 155.00, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=480&fit=crop', true),
('Hotel Ámsterdam Canal',         'Keizersgracht 148',            'Ámsterdam',                 'Países Bajos',     3,  80,  80, 160.00, 120.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=480&fit=crop', true),
('Hotel Berlín Mitte',            'Unter den Linden 77',          'Berlín',                    'Alemania',         4, 120, 120, 170.00, 125.00, 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=480&fit=crop', true),
('Hotel Lisboa Alfama',           'Rua Augusta 45',               'Lisboa',                    'Portugal',         3,  90,  90, 140.00, 100.00, 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=480&fit=crop', true),
('Hotel Praga Centro',            'Wenceslas Square 12',          'Praga',                     'República Checa',  4, 110, 110, 155.00, 115.00, 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=800&h=480&fit=crop', true),
('Hotel Viena Imperial',          'Kärntner Strasse 38',          'Viena',                     'Austria',          5, 130, 130, 220.00, 170.00, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=480&fit=crop', true),
('Hotel Dubrovnik Pearl',         'Stradun 24',                   'Dubrovnik',                 'Croacia',          4,  70,  70, 190.00, 145.00, 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&h=480&fit=crop', true),
('Hotel Tokio Shinjuku',          'Shinjuku 3-chome',             'Tokio',                     'Japón',            4, 100, 100, 250.00, 190.00, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=480&fit=crop', true),
('Hotel Bangkok Riverside',       'Charoen Krung Rd',             'Bangkok',                   'Tailandia',        4, 120, 120, 180.00, 130.00, 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=480&fit=crop', true),
('Hotel Bali Ubud',               'Jl. Monkey Forest',            'Bali',                      'Indonesia',        5,  80,  80, 200.00, 150.00, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=480&fit=crop', true),
('Hotel Vuelta al Mundo',         'World Tour HQ',                'Nueva York · Sídney · Dubái','Mundial',         5,  20,  20, 350.00, 280.00, 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=480&fit=crop', true),
('Hotel Ciudad de México Centro', 'Av. Juárez 70',                'Ciudad de México',          'México',           4, 100, 100, 185.00, 145.00, 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=480&fit=crop', true),
('Hotel Nueva York Manhattan',    '5th Avenue 350',               'Nueva York',                'Estados Unidos',   5, 120, 120, 520.00, 420.00, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=480&fit=crop', true),
('Hotel Alaska Wilderness',       'Denali Rd 12',                 'Anchorage',                 'Alaska',           4,  60,  60, 380.00, 310.00, 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=480&fit=crop', true),
('Hotel Canadá Rockies',          'Banff Ave 200',                'Banff',                     'Canadá',           4,  80,  80, 340.00, 270.00, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=480&fit=crop', true),
('Hotel Vietnam Hanoi',           'Hoan Kiem 45',                 'Hanói',                     'Vietnam',          3,  90,  90, 160.00, 120.00, 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=480&fit=crop', true),
-- IDs 21-35 del catálogo externo incorporado
('Hotel Mirador Atlantico',       'Av. da Liberdade 100',         'Lisboa',                    'Portugal',         4,  18,  18, 890.00, 740.00, 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=80', true),
('Central Prague Stay',           'Wenceslas Square 25',          'Praga',                     'República Checa',  4,  22,  22,1020.00, 860.00, 'https://images.unsplash.com/photo-1564511287568-54483b52a35e?auto=format&fit=crop&w=800&q=80', true),
('Quinta Verde',                  'Rua do Palácio 15',            'Sintra',                    'Portugal',         3,  14,  14, 760.00, 620.00, 'https://images.unsplash.com/photo-1562195168-c82fea0f0953?auto=format&fit=crop&w=800&q=80', true),
('Ringstrasse Boutique Hotel',    'Ringstraße 45',                'Viena',                     'Austria',          4,  20,  20,1180.00, 980.00, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80', true),
('Adriatic View Hotel',           'Stradun 18',                   'Dubrovnik',                 'Croacia',          4,  16,  16,1090.00, 920.00, 'https://images.unsplash.com/photo-1575540291670-8d3b26f7d327?auto=format&fit=crop&w=800&q=80', true),
('Canal House Boutique',          'Herengracht 200',              'Ámsterdam',                 'Países Bajos',     4,  24,  24,1050.00, 890.00, 'https://images.unsplash.com/photo-1459679749680-18eb1eb37418?auto=format&fit=crop&w=800&q=80', true),
('Danube Palace Hotel',           'Andrássy út 88',               'Budapest',                  'Hungría',          4,  19,  19, 910.00, 750.00, 'https://images.unsplash.com/photo-1616432902940-b7a1acbc60b3?auto=format&fit=crop&w=800&q=80', true),
('Palazzo Toscano',               'Piazza della Repubblica 10',   'Florencia',                 'Italia',           5,  12,  12,1380.00,1150.00, 'https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?auto=format&fit=crop&w=800&q=80', true),
('Caldera Blue Suites',           'Oia Main Street 5',            'Santorini',                 'Grecia',           5,  10,  10,1720.00,1480.00, 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80', true),
('Bosphorus Grand Hotel',         'İstiklal Caddesi 120',         'Estambul',                  'Turquía',          4,  28,  28, 990.00, 820.00, 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80', true),
('Royal Mile Inn',                'Royal Mile 75',                'Edimburgo',                 'Reino Unido',      3,  16,  16, 830.00, 690.00, 'https://images.unsplash.com/photo-1535448033526-c0e85c9e6968?auto=format&fit=crop&w=800&q=80', true),
('Old Town Comfort',              'Rynek Główny 30',              'Cracovia',                  'Polonia',          3,  20,  20, 720.00, 580.00, 'https://images.unsplash.com/photo-1636903364559-0dfc358abd94?auto=format&fit=crop&w=800&q=80', true),
('Promenade des Anglais Hotel',   'Promenade des Anglais 50',     'Niza',                      'Francia',          4,  15,  15,1240.00,1050.00, 'https://images.unsplash.com/photo-1643914729809-4aa59fdc4c17?auto=format&fit=crop&w=800&q=80', true),
('Fjord View Hotel',              'Karl Johans gate 31',          'Oslo',                      'Noruega',          4,  18,  18,1520.00,1290.00, 'https://images.unsplash.com/photo-1561794047-33d68ec7f6f6?auto=format&fit=crop&w=800&q=80', true),
('Acropolis View Suites',         'Dionysiou Areopagitou 12',     'Atenas',                    'Grecia',           4,  22,  22,1040.00, 870.00, 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=800&q=80', true);

-- ── BUSES ────────────────────────────────────────────────────
INSERT INTO buses (capacity, license_plate, bath, wifi, AC, USB) VALUES
(50, '1234-ABC', true,  true,  true, true),
(55, '5678-DEF', true,  false, true, true),
(30, '9012-GHI', false, true,  true, false);

-- ── CONDUCTORES ──────────────────────────────────────────────
INSERT INTO drivers (name, phone, licence_active) VALUES
('John Smith',     '447111222', true),
('William Hill',   '447333444', true),
('Michael Brown',  '447555666', true);

-- ── USUARIOS ─────────────────────────────────────────────────
INSERT INTO users (name, surname, email, tutor_id, age, passport, dni, active) VALUES
('María',   'García López',    'maria.garcia@email.com', NULL, 42, 'PAA111222', '12345678A', true),
('Carlos',  'García López',    'carlos.garcia@email.com',   1, 14, 'PAB333444', '87654321B', true),
('Javier',  'Martínez Ruiz',   'javi.mar@email.com',     NULL, 29, 'PAC555666', '45678912C', true),
('Elena',   'Sanz Gómez',      'elena.sanz@email.com',   NULL, 28, 'PAD777888', '98765432D', true),
('Lucas',   'Fernández Tomé',  'lucas.ft@email.com',     NULL, 35, 'PAE999000', '34567890E', true),
('Roberto', 'Díaz Montero',    'roberto.diaz@email.com', NULL, 50, 'PAF123456', '23456789F', true),
('Lucía',   'Díaz Montero',    'lucia.diaz@email.com',      6, 17, 'PAG654321', '76543210G', true);

-- ── VIAJES (35 en total) ──────────────────────────────────────
INSERT INTO travels (destiny, start_date, end_date, sale, offer_id, hotel_id, available_places, active) VALUES
-- Originales 1-20
('Londres Clásico y Real - Grupo A',              '2026-06-10', '2026-06-14', true,  1,  1, 35, true),
('Londres Clásico y Real - Grupo B',              '2026-06-10', '2026-06-14', true,  2,  2, 40, true),
('Londres Edición Verano',                        '2026-08-15', '2026-08-19', false, 3,  3, 50, true),
('Roma Imperial y Vaticano',                      '2026-07-01', '2026-07-06', false, 3,  4, 40, true),
('París Ciudad de la Luz',                        '2026-07-15', '2026-07-20', true,  1,  5, 35, true),
('Ámsterdam Canales y Museos',                    '2026-08-01', '2026-08-05', false, 3,  6, 30, true),
('Berlín Historia y Arte',                        '2026-07-10', '2026-07-15', false, 3,  7, 45, true),
('Lisboa y Sintra Encantadora',                   '2026-07-20', '2026-07-25', true,  2,  8, 38, true),
('Praga Ciudad Dorada',                           '2026-08-05', '2026-08-10', false, 3,  9, 42, true),
('Viena Música y Palacios',                       '2026-08-20', '2026-08-25', true,  1, 10, 30, true),
('Dubrovnik Perla del Adriático',                 '2026-09-01', '2026-09-06', false, 3, 11, 25, true),
('Tokio Cultura y Tecnología',                    '2026-09-10', '2026-09-17', true,  1, 12, 30, true),
('Bangkok Templos y Sabores',                     '2026-09-20', '2026-09-27', false, 3, 13, 35, true),
('Bali Paraíso Tropical',                         '2026-10-01', '2026-10-08', true,  2, 14, 25, true),
('Vuelta al Mundo - Nueva York · Sídney · Dubái', '2026-10-15', '2026-11-15', true,  1, 15, 20, true),
('México Azteca y Colonial',                      '2026-11-01', '2026-11-08', true,  2, 16, 35, true),
('Nueva York La Ciudad que Nunca Duerme',         '2026-11-15', '2026-11-22', false, 3, 17, 30, true),
('Alaska Naturaleza Salvaje',                     '2026-12-01', '2026-12-08', true,  1, 18, 20, true),
('Canadá Montañas Rocosas',                       '2026-12-10', '2026-12-17', false, 3, 19, 25, true),
('Vietnam Tour Cultural',                         '2026-11-20', '2026-11-27', true,  2, 20, 30, true),
-- Incorporados 21-35
('Lisboa Portugal Mágica',                        '2026-06-18', '2026-06-23', true,  5, 21, 18, true),
('Praga Medieval y Moderna',                      '2026-07-04', '2026-07-10', false, 3, 22, 22, true),
('Sintra Escapada Encantada',                     '2026-08-12', '2026-08-16', true,  1, 23, 14, true),
('Viena Cultura y Gastronomía',                   '2026-09-05', '2026-09-12', false, 3, 24, 20, true),
('Dubrovnik Costa Dálmata',                       '2026-10-02', '2026-10-08', true,  4, 25, 16, true),
('Ámsterdam Oferta Flash',                        '2026-06-28', '2026-07-03', true,  7, 26, 24, true),
('Budapest Joya del Danubio',                     '2026-07-18', '2026-07-24', false, 3, 27, 19, true),
('Florencia Arte y Renacimiento',                 '2026-08-22', '2026-08-28', true,  6, 28, 12, true),
('Santorini Lujo en el Egeo',                     '2026-09-14', '2026-09-20', false, 3, 29, 10, true),
('Estambul Entre Dos Continentes',                '2026-10-15', '2026-10-22', true,  9, 30, 28, true),
('Edimburgo Castillos y Whisky',                  '2026-07-28', '2026-08-02', false, 3, 31, 16, true),
('Cracovia Joyas de Polonia',                     '2026-09-26', '2026-10-01', true,  5, 32, 20, true),
('Niza Costa Azul Francesa',                      '2026-08-06', '2026-08-12', false, 3, 33, 15, true),
('Oslo Fiordos del Norte',                        '2026-11-06', '2026-11-12', true,  1, 34, 18, true),
('Atenas Cuna de la Civilización',                '2026-10-25', '2026-10-31', true,  8, 35, 22, true);