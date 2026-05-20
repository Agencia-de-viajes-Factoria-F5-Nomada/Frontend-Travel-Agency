-- =============================================================
--  NOMADA - Seed completo de base de datos
--  50 viajes internacionales con precios escalados por cercanía a España
--  Ejecutar contra el schema que usa el backend Java
-- =============================================================

SET SQL_SAFE_UPDATES = 0;
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

INSERT INTO employees (gender, name, surname, work_hour, hired, password, role, email) VALUES
('MALE',   'Carlos', 'Pérez',     40, true, '1234', 'ADMIN',  'carlos.perez@travelagency.com'),
('FEMALE', 'Ana',    'Sánchez',   35, true, '1234', 'EDITOR', 'ana.sanchez@travelagency.com'),
('FEMALE', 'Sofía',  'Oliveira',  40, true, '1234', 'EDITOR', 'sofia.oliveira@travelagency.com'),
('MALE',   'David',  'Thimotheo', 20, true, '1234', 'VIEWER', 'david.thimotheo@travelagency.com');

INSERT INTO offers (offer_id, discount_percentage, start_date, end_date) VALUES
(1, 10.00, '2026-01-01', '2026-12-31'),
(2,  5.00, '2026-01-01', '2026-12-31'),
(3,  0.00, '2026-01-01', '2026-12-31'),
(4, 15.00, '2026-01-01', '2026-12-31'),
(5, 12.00, '2026-01-01', '2026-12-31'),
(6, 20.00, '2026-01-01', '2026-12-31'),
(7, 18.00, '2026-01-01', '2026-12-31'),
(8, 25.00, '2026-01-01', '2026-12-31'),
(9, 22.00, '2026-01-01', '2026-12-31');

-- Precios por persona: media pensión desde 400 EUR y pensión completa aprox. +20%.
-- La escala sube por distancia estimada desde España: cercanos, Europa, larga distancia y rutas premium.
INSERT INTO hotels (name, address, city, country, stars, capacity, available_places, full_board_price, half_board_price, image_url, active) VALUES
('Hotel Costa del Sol Boutique', 'Paseo Marítimo 20', 'Málaga', 'España', 4, 80, 80, 480.00, 400.00, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=480&fit=crop', true),
('Hotel Lisboa Alfama', 'Rua Augusta 45', 'Lisboa', 'Portugal', 4, 90, 90, 504.00, 420.00, 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=480&fit=crop', true),
('Riad Atlas Medina', 'Rue Riad Zitoun 14', 'Marrakech', 'Marruecos', 4, 70, 70, 540.00, 450.00, 'https://images.unsplash.com/photo-1548018560-c7196548e84d?w=800&h=480&fit=crop', true),
('Hotel París Eiffel', 'Av. de la Bourdonnais 72', 'París', 'Francia', 4, 120, 120, 576.00, 480.00, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=480&fit=crop', true),
('Hotel Roma Centro', 'Via Nazionale 22', 'Roma', 'Italia', 4, 100, 100, 600.00, 500.00, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=480&fit=crop', true),
('Hotel Londres Royal', 'Cromwell Rd 123', 'Londres', 'Reino Unido', 4, 130, 130, 624.00, 520.00, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=480&fit=crop', true),
('Hotel Ámsterdam Canal', 'Keizersgracht 148', 'Ámsterdam', 'Países Bajos', 4, 90, 90, 648.00, 540.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=480&fit=crop', true),
('Hotel Berlín Mitte', 'Unter den Linden 77', 'Berlín', 'Alemania', 4, 110, 110, 660.00, 550.00, 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=480&fit=crop', true),
('Hotel Bruselas Grand Place', 'Rue du Marché 18', 'Bruselas', 'Bélgica', 4, 90, 90, 684.00, 570.00, 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=800&h=480&fit=crop', true),
('Hotel Zúrich Lake View', 'Bahnhofstrasse 40', 'Zúrich', 'Suiza', 5, 80, 80, 720.00, 600.00, 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=480&fit=crop', true),
('Hotel Viena Imperial', 'Kärntner Strasse 38', 'Viena', 'Austria', 5, 120, 120, 744.00, 620.00, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=480&fit=crop', true),
('Hotel Praga Centro', 'Wenceslas Square 12', 'Praga', 'República Checa', 4, 100, 100, 768.00, 640.00, 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=800&h=480&fit=crop', true),
('Danube Palace Hotel', 'Andrássy út 45', 'Budapest', 'Hungría', 4, 100, 100, 792.00, 660.00, 'https://images.unsplash.com/photo-1616432902940-b7a1acbc60b3?w=800&h=480&fit=crop', true),
('Adriatic View Hotel', 'Stradun 48', 'Dubrovnik', 'Croacia', 4, 70, 70, 816.00, 680.00, 'https://images.unsplash.com/photo-1575540291670-8d3b26f7d327?w=800&h=480&fit=crop', true),
('Acropolis View Suites', 'Dionysiou Areopagitou 12', 'Atenas', 'Grecia', 4, 90, 90, 840.00, 700.00, 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=800&h=480&fit=crop', true),
('Bosphorus Grand Hotel', 'Beşiktaş Cd 22', 'Estambul', 'Turquía', 4, 120, 120, 864.00, 720.00, 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&h=480&fit=crop', true),
('Old Town Comfort', 'Rynek Główny 5', 'Cracovia', 'Polonia', 3, 90, 90, 888.00, 740.00, 'https://images.unsplash.com/photo-1636903364559-0dfc358abd94?w=800&h=480&fit=crop', true),
('Royal Mile Inn', 'Royal Mile 34', 'Edimburgo', 'Reino Unido', 4, 80, 80, 912.00, 760.00, 'https://images.unsplash.com/photo-1535448033526-c0e85c9e6968?w=800&h=480&fit=crop', true),
('Fjord View Hotel', 'Aker Brygge 8', 'Oslo', 'Noruega', 4, 80, 80, 960.00, 800.00, 'https://images.unsplash.com/photo-1561794047-33d68ec7f6f6?w=800&h=480&fit=crop', true),
('Hotel Estocolmo Archipiélago', 'Strandvägen 12', 'Estocolmo', 'Suecia', 4, 85, 85, 984.00, 820.00, 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=480&fit=crop', true),
('Hotel Copenhague Nyhavn', 'Nyhavn 20', 'Copenhague', 'Dinamarca', 4, 85, 85, 1008.00, 840.00, 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=480&fit=crop', true),
('Hotel Reikiavik Northern', 'Laugavegur 55', 'Reikiavik', 'Islandia', 4, 60, 60, 1080.00, 900.00, 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&h=480&fit=crop', true),
('Hotel El Cairo Nile', 'Corniche El Nile 100', 'El Cairo', 'Egipto', 4, 110, 110, 1056.00, 880.00, 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=480&fit=crop', true),
('Hotel Petra Desert', 'Tourism Street 9', 'Petra', 'Jordania', 4, 75, 75, 1116.00, 930.00, 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=800&h=480&fit=crop', true),
('Hotel Dubái Marina', 'Marina Walk 30', 'Dubái', 'Emiratos Árabes Unidos', 5, 140, 140, 1200.00, 1000.00, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=480&fit=crop', true),
('Hotel Nueva York Manhattan', '5th Avenue 350', 'Nueva York', 'Estados Unidos', 5, 120, 120, 1320.00, 1100.00, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=480&fit=crop', true),
('Hotel Ciudad de México Centro', 'Av. Juárez 70', 'Ciudad de México', 'México', 4, 100, 100, 1260.00, 1050.00, 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=480&fit=crop', true),
('Hotel La Habana Colonial', 'Malecón 120', 'La Habana', 'Cuba', 4, 90, 90, 1224.00, 1020.00, 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=800&h=480&fit=crop', true),
('Hotel Punta Cana Beach', 'Playa Bávaro 10', 'Punta Cana', 'República Dominicana', 5, 130, 130, 1296.00, 1080.00, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=480&fit=crop', true),
('Hotel San José Verde', 'Avenida Central 14', 'San José', 'Costa Rica', 4, 80, 80, 1344.00, 1120.00, 'https://images.unsplash.com/photo-1519821172141-b5d8f1c0dc3f?w=800&h=480&fit=crop', true),
('Hotel Lima Miraflores', 'Malecón de la Reserva 50', 'Lima', 'Perú', 4, 95, 95, 1380.00, 1150.00, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=480&fit=crop', true),
('Hotel Buenos Aires Palermo', 'Av. Santa Fe 2000', 'Buenos Aires', 'Argentina', 4, 110, 110, 1440.00, 1200.00, 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=480&fit=crop', true),
('Hotel Río Copacabana', 'Av. Atlântica 1700', 'Río de Janeiro', 'Brasil', 5, 130, 130, 1500.00, 1250.00, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=480&fit=crop', true),
('Hotel Cartagena Caribe', 'Centro Histórico 8', 'Cartagena', 'Colombia', 4, 95, 95, 1368.00, 1140.00, 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=480&fit=crop', true),
('Hotel Santiago Andes', 'Providencia 101', 'Santiago de Chile', 'Chile', 4, 100, 100, 1464.00, 1220.00, 'https://images.unsplash.com/photo-1540820658620-e933b581d3d7?w=800&h=480&fit=crop', true),
('Hotel Tokio Shinjuku', 'Shinjuku 3-chome', 'Tokio', 'Japón', 4, 100, 100, 1620.00, 1350.00, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=480&fit=crop', true),
('Hotel Seúl Han River', 'Gangnam-daero 12', 'Seúl', 'Corea del Sur', 4, 100, 100, 1584.00, 1320.00, 'https://images.unsplash.com/photo-1538485399081-7c8edb4fbd1f?w=800&h=480&fit=crop', true),
('Hotel Bangkok Riverside', 'Charoen Krung Rd', 'Bangkok', 'Tailandia', 4, 120, 120, 1500.00, 1250.00, 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=480&fit=crop', true),
('Hotel Bali Ubud', 'Jl. Monkey Forest', 'Bali', 'Indonesia', 5, 80, 80, 1560.00, 1300.00, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=480&fit=crop', true),
('Hotel Hanói Old Quarter', 'Hoan Kiem 45', 'Hanói', 'Vietnam', 4, 90, 90, 1488.00, 1240.00, 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=480&fit=crop', true),
('Hotel Singapur Marina', 'Marina Bay 1', 'Singapur', 'Singapur', 5, 120, 120, 1680.00, 1400.00, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=480&fit=crop', true),
('Hotel Delhi Heritage', 'Connaught Place 12', 'Nueva Delhi', 'India', 4, 110, 110, 1440.00, 1200.00, 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=480&fit=crop', true),
('Hotel Nairobi Safari', 'Kenyatta Avenue 25', 'Nairobi', 'Kenia', 4, 70, 70, 1380.00, 1150.00, 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=480&fit=crop', true),
('Hotel Ciudad del Cabo Waterfront', 'Waterfront Road 8', 'Ciudad del Cabo', 'Sudáfrica', 5, 100, 100, 1536.00, 1280.00, 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=480&fit=crop', true),
('Hotel Zanzíbar Beach', 'Nungwi Beach 3', 'Zanzíbar', 'Tanzania', 5, 75, 75, 1500.00, 1250.00, 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=480&fit=crop', true),
('Hotel Sídney Harbour', 'Circular Quay 5', 'Sídney', 'Australia', 5, 120, 120, 1800.00, 1500.00, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=480&fit=crop', true),
('Hotel Auckland Bay', 'Queen Street 90', 'Auckland', 'Nueva Zelanda', 4, 80, 80, 1860.00, 1550.00, 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=480&fit=crop', true),
('Hotel Toronto Downtown', 'King Street 100', 'Toronto', 'Canadá', 4, 110, 110, 1392.00, 1160.00, 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=480&fit=crop', true),
('Hotel Vancouver Rockies', 'Granville Street 44', 'Vancouver', 'Canadá', 4, 100, 100, 1488.00, 1240.00, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=480&fit=crop', true),
('Hotel Maldivas Lagoon', 'North Malé Atoll', 'Malé', 'Maldivas', 5, 50, 50, 1920.00, 1600.00, 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=480&fit=crop', true);

INSERT INTO buses (capacity, license_plate, bath, wifi, AC, USB) VALUES
(50, '1234-ABC', true,  true,  true, true),
(55, '5678-DEF', true,  false, true, true),
(30, '9012-GHI', false, true,  true, false);

INSERT INTO drivers (name, phone, licence_active) VALUES
('John Smith',    '447111222', true),
('William Hill',  '447333444', true),
('Michael Brown', '447555666', true);

INSERT INTO users (name, surname, email, tutor_id, age, passport, dni, active) VALUES
('María',   'García López',   'maria.garcia@email.com', NULL, 42, 'PAA111222', '12345678A', true),
('Carlos',  'García López',   'carlos.garcia@email.com', 1,    14, 'PAB333444', '87654321B', true),
('Javier',  'Martínez Ruiz',  'javi.mar@email.com',      NULL, 29, 'PAC555666', '45678912C', true),
('Elena',   'Sanz Gómez',     'elena.sanz@email.com',    NULL, 28, 'PAD777888', '98765432D', true),
('Lucas',   'Fernández Tomé', 'lucas.ft@email.com',      NULL, 35, 'PAE999000', '34567890E', true),
('Roberto', 'Díaz Montero',   'roberto.diaz@email.com',  NULL, 50, 'PAF123456', '23456789F', true),
('Lucía',   'Díaz Montero',   'lucia.diaz@email.com',    6,    17, 'PAG654321', '76543210G', true);

INSERT INTO travels (destiny, start_date, end_date, sale, offer_id, hotel_id, available_places, active) VALUES
('Málaga Sol y Cultura', '2026-06-05', '2026-06-10', true, 2, 1, 35, true),
('Lisboa Atlántica y Sintra', '2026-06-12', '2026-06-17', true, 1, 2, 38, true),
('Marrakech Medina y Desierto', '2026-06-19', '2026-06-24', true, 4, 3, 30, true),
('París Ciudad de la Luz', '2026-07-01', '2026-07-06', true, 1, 4, 35, true),
('Roma Imperial y Vaticano', '2026-07-08', '2026-07-14', false, 3, 5, 40, true),
('Londres Clásico y Real', '2026-07-15', '2026-07-20', true, 2, 6, 42, true),
('Ámsterdam Canales y Museos', '2026-07-22', '2026-07-27', false, 3, 7, 32, true),
('Berlín Historia y Arte', '2026-07-29', '2026-08-04', false, 3, 8, 45, true),
('Bruselas Capital Europea', '2026-08-05', '2026-08-10', true, 5, 9, 28, true),
('Zúrich Alpes y Lago', '2026-08-12', '2026-08-17', false, 3, 10, 24, true),
('Viena Música y Palacios', '2026-08-19', '2026-08-25', true, 1, 11, 30, true),
('Praga Ciudad Dorada', '2026-08-26', '2026-09-01', false, 3, 12, 36, true),
('Budapest Joya del Danubio', '2026-09-02', '2026-09-08', true, 4, 13, 34, true),
('Dubrovnik Costa Dálmata', '2026-09-09', '2026-09-15', true, 5, 14, 25, true),
('Atenas Cuna de la Civilización', '2026-09-16', '2026-09-22', true, 8, 15, 30, true),
('Estambul entre dos Continentes', '2026-09-23', '2026-09-30', true, 9, 16, 38, true),
('Cracovia Joya Medieval', '2026-10-01', '2026-10-06', true, 4, 17, 30, true),
('Edimburgo Historia y Whisky', '2026-10-07', '2026-10-12', false, 3, 18, 24, true),
('Oslo Fiordos del Norte', '2026-10-13', '2026-10-19', true, 1, 19, 22, true),
('Estocolmo Archipiélago Nórdico', '2026-10-20', '2026-10-26', false, 3, 20, 25, true),
('Copenhague Diseño y Canales', '2026-10-27', '2026-11-02', true, 7, 21, 26, true),
('Reikiavik Auroras y Géiseres', '2026-11-03', '2026-11-09', true, 6, 22, 18, true),
('Egipto Nilo y Pirámides', '2026-11-10', '2026-11-17', true, 4, 23, 35, true),
('Petra Ruta del Desierto', '2026-11-18', '2026-11-24', false, 3, 24, 22, true),
('Dubái Lujo y Desierto', '2026-11-25', '2026-12-01', true, 8, 25, 40, true),
('Nueva York La Ciudad que Nunca Duerme', '2026-12-02', '2026-12-09', false, 3, 26, 35, true),
('México Azteca y Colonial', '2026-12-10', '2026-12-17', true, 2, 27, 36, true),
('La Habana Ritmo Colonial', '2026-12-18', '2026-12-24', true, 5, 28, 30, true),
('Punta Cana Caribe Todo Incluido', '2027-01-08', '2027-01-15', true, 6, 29, 45, true),
('Costa Rica Naturaleza Viva', '2027-01-16', '2027-01-24', false, 3, 30, 28, true),
('Perú Andes y Machu Picchu', '2027-01-25', '2027-02-02', true, 4, 31, 26, true),
('Buenos Aires Tango y Cultura', '2027-02-03', '2027-02-10', false, 3, 32, 34, true),
('Río de Janeiro Carnaval y Playa', '2027-02-11', '2027-02-18', true, 7, 33, 40, true),
('Cartagena Caribe Colonial', '2027-02-19', '2027-02-26', true, 5, 34, 30, true),
('Chile Santiago y Andes', '2027-02-27', '2027-03-06', false, 3, 35, 28, true),
('Tokio Cultura y Tecnología', '2027-03-07', '2027-03-15', true, 1, 36, 30, true),
('Seúl Tradición y Futuro', '2027-03-16', '2027-03-23', true, 4, 37, 32, true),
('Bangkok Templos y Sabores', '2027-03-24', '2027-04-01', false, 3, 38, 35, true),
('Bali Paraíso Tropical', '2027-04-02', '2027-04-10', true, 2, 39, 28, true),
('Vietnam Ruta Cultural', '2027-04-11', '2027-04-19', true, 5, 40, 30, true),
('Singapur Futuro Urbano', '2027-04-20', '2027-04-26', false, 3, 41, 26, true),
('India Triángulo Dorado', '2027-04-27', '2027-05-05', true, 7, 42, 34, true),
('Kenia Safari y Naturaleza', '2027-05-06', '2027-05-14', true, 6, 43, 24, true),
('Sudáfrica Ruta del Cabo', '2027-05-15', '2027-05-23', false, 3, 44, 28, true),
('Zanzíbar Playas del Índico', '2027-05-24', '2027-05-31', true, 8, 45, 22, true),
('Sídney Ópera y Bahía', '2027-06-01', '2027-06-10', true, 4, 46, 30, true),
('Nueva Zelanda Naturaleza Extrema', '2027-06-11', '2027-06-20', false, 3, 47, 22, true),
('Toronto Urbana y Cataratas', '2027-06-21', '2027-06-28', true, 2, 48, 34, true),
('Vancouver Montañas Rocosas', '2027-06-29', '2027-07-07', true, 5, 49, 26, true),
('Maldivas Laguna Premium', '2027-07-08', '2027-07-15', true, 9, 50, 18, true);

SELECT id, destiny, hotel_id, available_places FROM travels ORDER BY id LIMIT 10;
SELECT id, name, city, country, half_board_price, full_board_price FROM hotels ORDER BY id LIMIT 10;

SET SQL_SAFE_UPDATES = 1;
