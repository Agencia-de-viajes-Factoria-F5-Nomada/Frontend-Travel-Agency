# 🧭 NÓMADA — Frontend

> Plataforma web para una agencia de viajes terrestre y aérea con foco en Europa. Permite explorar destinos, realizar reservas, solicitar viajes personalizados y administrar entidades internas desde un panel de gestión dedicado.

---

## 📋 Índice

- [Descripción](#descripción)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas](#rutas)
- [Servicios de API](#servicios-de-api)
- [Autenticación](#autenticación)
- [Flujo de reserva](#flujo-de-reserva)
- [Viaje personalizado](#viaje-personalizado)
- [Panel de administración](#panel-de-administración)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Scripts disponibles](#scripts-disponibles)
- [Build de producción](#build-de-producción)
- [Convenciones de desarrollo](#convenciones-de-desarrollo)
- [Estado del proyecto](#estado-del-proyecto)
- [Autores](#autores)

---

## Descripción

NÓMADA es una aplicación web administrativa interna orientada a digitalizar la operativa de una agencia de viajes. Está pensada para ser utilizada por el personal de la agencia, con dos perfiles de acceso diferenciados:

- **Usuario autenticado** — puede buscar viajes, consultar detalles y ofertas, realizar reservas y solicitar viajes personalizados.
- **Administrador** — tiene acceso al panel de gestión para administrar viajes, hoteles, autobuses, conductores, reservas, usuarios, empleados, ofertas y segmentos de viaje.

El frontend consume una API REST desarrollada con Spring Boot y MySQL, con gestión de imágenes a través de Cloudinary.

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Construcción de interfaces |
| Vite | 8 | Servidor de desarrollo y build |
| React Router DOM | — | Enrutado SPA |
| Tailwind CSS | — | Sistema de estilos utility-first |
| Axios | — | Cliente HTTP para consumir la API REST |
| Lucide React | — | Librería de iconos |
| JWT | — | Autenticación basada en token |
| Express | — | Servidor local auxiliar |
| ESLint | — | Análisis estático de código |
| Playwright | — | Tests end-to-end |

---

## Arquitectura

El frontend sigue una separación clara por responsabilidades, inspirada en **Atomic Design**:

```
src/
├── assets/         # Recursos estáticos (imágenes, fuentes)
├── components/     # Componentes reutilizables organizados por nivel
│   ├── atoms/      # Elementos base: Button, Input, Card, Badge, Select
│   ├── molecules/  # Composiciones: filtros, buscadores, alertas
│   ├── organisms/  # Bloques funcionales: tablas, formularios CRUD, tarjetas
│   └── layout/     # Layouts públicos y privados
├── constants/      # Constantes de navegación y rutas (paths.js, navigation.js)
├── hooks/          # Hooks personalizados
├── pages/          # Vistas completas de la aplicación
├── routes/         # Definición centralizada de rutas (AppRoutes.jsx)
├── services/       # Capa de comunicación con la API
├── test/           # Tests unitarios y de integración
└── utils/          # Funciones auxiliares (formatters, classNames, etc.)
```

### Principios aplicados

- Las páginas no construyen URLs ni llaman directamente a Axios — eso es responsabilidad de la capa de servicios.
- Los componentes de `atoms` son agnósticos al dominio; los de `organisms` tienen contexto de negocio.
- Las rutas protegidas se envuelven con `PrivateRoute`, que redirige a login si no hay sesión activa.
- Los estados locales se gestionan con hooks de React; no se usa estado global externo salvo lo estrictamente necesario.

---

## Estructura del proyecto

```
NÓMADA Frontend
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Select.jsx
│   │   ├── molecules/
│   │   ├── organisms/
│   │   │   └── DestinationCard.jsx
│   │   └── layout/
│   ├── constants/
│   │   ├── paths.js
│   │   └── navigation.js
│   ├── hooks/
│   ├── pages/
│   │   └── HomePage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── TravelsService.js
│   │   ├── BookingService.js
│   │   ├── HotelService.js
│   │   ├── BusService.js
│   │   ├── DriverService.js
│   │   ├── UsersService.js
│   │   ├── offersService.js
│   │   ├── tripSegmentsService.js
│   │   ├── employeesService.js
│   │   └── cloudinaryService.js
│   ├── test/
│   └── utils/
│       ├── classNames.js
│       └── formatters.js
├── server.js
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
└── README.md
```

---

## Rutas

### Públicas / autenticadas

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio con login/registro y destinos destacados |
| `/home` | Página de inicio |
| `/destinations` | Catálogo de destinos disponibles |
| `/destinations/:id` | Detalle de un destino |
| `/travels` | Listado de viajes |
| `/travels/:id` | Detalle de un viaje |
| `/offers` | Viajes en oferta |
| `/search` | Resultados de búsqueda con filtros |
| `/auth` | Login y registro |

### Privadas (requieren sesión)

| Ruta | Descripción |
|---|---|
| `/profile` | Perfil del usuario |
| `/personal/:section` | Área personal del usuario |
| `/checkout` | Proceso de reserva (pasajeros → precio → confirmar) |
| `/checkout/custom` | Solicitud de viaje personalizado |

### Administrativas (requieren rol admin)

| Ruta | Descripción |
|---|---|
| `/admin` | Panel de administración |
| `/admin/travels` | Gestión de viajes |
| `/admin/hotels` | Gestión de hoteles |
| `/admin/bookings` | Gestión de reservas |
| `/admin/users` | Gestión de usuarios |
| `/admin/buses` | Gestión de autobuses |
| `/admin/drivers` | Gestión de conductores |

---

## Servicios de API

Toda la comunicación con el backend está centralizada en `src/services`. Las páginas importan el servicio correspondiente en lugar de construir peticiones directamente.

```js
// Ejemplo de uso en una página
import { travelService } from '../services/TravelsService'

const data = await travelService.getFeatured()
```

### Servicios disponibles

| Archivo | Responsabilidad |
|---|---|
| `api.js` | Instancia base de Axios con interceptores y base URL |
| `authService.js` | Login, registro, logout, persistencia de sesión y JWT |
| `TravelsService.js` | Listado, detalle, búsqueda y featured de viajes |
| `BookingService.js` | Creación, consulta y quote de reservas |
| `HotelService.js` | CRUD de hoteles |
| `BusService.js` | CRUD de autobuses |
| `DriverService.js` | CRUD de conductores |
| `UsersService.js` | CRUD de usuarios |
| `offersService.js` | Consulta y gestión de ofertas |
| `tripSegmentsService.js` | Segmentos de viaje |
| `employeesService.js` | Gestión de empleados |
| `cloudinaryService.js` | Subida de imágenes a Cloudinary |

### Base URL

La URL base del backend se configura mediante variable de entorno:

```
VITE_API_URL=http://localhost:8080
```

El cliente Axios la recoge automáticamente al inicializarse.

---

## Autenticación

La aplicación usa autenticación basada en **JWT**. El token se persiste en el cliente y se adjunta automáticamente a las peticiones protegidas mediante un interceptor de Axios.

### Flujo

1. El usuario introduce email y contraseña en el formulario de la home.
2. `authService.login()` hace POST a `/auth/login` y almacena el token recibido.
3. Las peticiones a rutas protegidas incluyen el token en el header `Authorization: Bearer <token>`.
4. `PrivateRoute` verifica si hay sesión activa antes de renderizar una ruta privada; si no la hay, redirige a `/`.
5. Las rutas administrativas verifican además que el usuario tenga rol de administrador.

### Registro

- Contraseña mínima de 8 caracteres.
- Debe contener al menos una mayúscula y un número.
- Tras el registro se hace login automático.

### Validaciones de contraseña (frontend)

```js
if (form.password.length < 8) { /* error */ }
if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) { /* error */ }
```

---

## Flujo de reserva

El checkout está dividido en 4 pasos:

```
1. Pasajeros  →  2. Precio  →  3. Confirmar  →  4. Confirmado
```

### Paso 1 — Pasajeros
- Selección del número de pasajeros.
- Introducción de datos personales de cada pasajero: nombre, apellido, fecha de nacimiento, DNI o pasaporte.
- Validación de menores: deben ir acompañados de un adulto tutor.

### Paso 2 — Precio
- Cálculo del precio total mediante el endpoint `GET /api/bookings/quote`.
- Desglose por tipo de pensión (media pensión / pensión completa).
- Precio con IVA incluido.

### Paso 3 — Confirmar
- Resumen completo de la reserva.
- Confirmación mediante `POST /api/bookings`.

### Paso 4 — Confirmado
- Vista de confirmación con los datos de la reserva.
- Opción de volver al catálogo.

---

## Viaje personalizado

La ruta `/checkout/custom` permite al usuario enviar una solicitud de viaje a medida con los siguientes campos:

| Campo | Descripción |
|---|---|
| Destino | Destino o idea de viaje |
| Ciudad de salida | Punto de partida |
| Fechas | Salida y vuelta aproximadas |
| Viajeros | Número de personas |
| Presupuesto | Por persona |
| Tipo de experiencia | Playa, aventura, ruta, cultura, gastronomía, naturaleza |
| Ritmo | Relajado, equilibrado o intenso |
| Alojamiento | Tipo preferido |
| Servicios | Avión, hotel, actividades |
| Imprescindibles | Lo que no puede faltar |
| A evitar | Aspectos que no se desean |

La solicitud se envía al backend para que el equipo prepare una propuesta personalizada.

---

## Panel de administración

El área `/admin` está protegida y reservada a usuarios con rol de administrador. Desde aquí se pueden gestionar todas las entidades operativas de la agencia:

- **Viajes** — crear, editar, activar/desactivar viajes.
- **Hoteles** — CRUD completo con imagen (Cloudinary), estrellas, capacidad y precios.
- **Autobuses** — gestión de flota con capacidad, matrícula y servicios (wifi, AC, USB, baño).
- **Conductores** — alta, edición y control de licencia activa.
- **Reservas** — listado y detalle de todas las reservas.
- **Usuarios** — listado y gestión de usuarios registrados.
- **Empleados** — gestión del personal de la agencia.
- **Ofertas** — porcentajes de descuento y fechas de vigencia.
- **Segmentos de viaje** — etapas o tramos que componen un viaje.

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto a partir del ejemplo:

```bash
cp .env.example .env
```

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `http://localhost:8080` |

> El backend debe estar corriendo antes de levantar el frontend en modo desarrollo.

---

## Instalación y ejecución

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Backend de NÓMADA corriendo en `http://localhost:8080`

### Instalación

```bash
git clone https://github.com/Agencia-de-viajes-Factoria-F5-Nomada/Frontend-Travel-Agency.git
cd Frontend-Travel-Agency
npm install
cp .env.example .env
```

### Desarrollo

Levantar solo el frontend:

```bash
npm run dev
```

Levantar frontend y backend en paralelo:

```bash
npm run dev:full
```

| Servicio | URL por defecto |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend / API | `http://localhost:8080` |

> El puerto del frontend puede cambiar automáticamente si el `5173` está ocupado.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Genera la build de producción en `/dist` |
| `npm run preview` | Sirve la build generada localmente |
| `npm run lint` | Ejecuta ESLint sobre el código fuente |
| `npm run server` | Inicia el servidor Express auxiliar |
| `npm run dev:full` | Ejecuta frontend y backend en paralelo |
| `npm run e2e:install` | Instala dependencias de Playwright |
| `npm run e2e:test` | Ejecuta los tests end-to-end |

---

## Build de producción

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`. Para previsualizar antes de desplegar:

```bash
npm run preview
```

---

## Convenciones de desarrollo

### Componentes

- `atoms/` — elementos sin lógica de negocio: `Button`, `Input`, `Card`, `Badge`, `Select`.
- `molecules/` — composiciones pequeñas reutilizables: filtros, buscadores, alertas.
- `organisms/` — bloques con lógica de presentación: tablas CRUD, tarjetas de destino, formularios de reserva.
- `pages/` — vistas completas que orquestan organisms y consumen servicios.

### Servicios

- Todas las llamadas HTTP van en `src/services`.
- Las páginas nunca construyen URLs directamente.
- La lógica de transformación de datos vive junto al servicio correspondiente.

### Estilos

- Se usa Tailwind CSS como sistema principal.
- Se reutilizan los colores y tokens ya definidos en `tailwind.config.js` (`brand-500`, `surface-*`, `ink-*`).
- No se introducen estilos globales innecesarios.
- Las clases condicionales se gestionan con la utilidad `classNames()`.

### Rutas

- Todas las rutas se definen en `src/routes/AppRoutes.jsx`.
- Las rutas privadas se envuelven con `<PrivateRoute>`.
- Las rutas administrativas requieren rol de administrador.
- Las constantes de rutas se centralizan en `src/constants/paths.js`.

### Git

- Ramas por funcionalidad: `feat/nombre`, `fix/nombre`, `chore/nombre`.
- Un PR por funcionalidad; se hace merge a `dev` antes de pasar a `main`.

---

## Estado del proyecto

El frontend está en desarrollo activo. Las funcionalidades principales están implementadas:

- ✅ Navegación pública y autenticación
- ✅ Catálogo de viajes y detalle
- ✅ Búsqueda y filtros
- ✅ Flujo de reserva completo (pasajeros → precio → confirmación)
- ✅ Solicitud de viaje personalizado
- ✅ Área personal y perfil de usuario
- ✅ Panel de administración (viajes, hoteles, autobuses, conductores, reservas, usuarios, ofertas)
- ✅ Integración con Cloudinary para imágenes
- ✅ Autenticación JWT con rutas protegidas

### Próximas mejoras

- [ ] Ampliar cobertura de tests unitarios y E2E
- [ ] Conectar la vista de viaje personalizado con recomendaciones de viajes existentes
- [ ] Añadir filtrado avanzado en el panel de reservas
- [ ] Añadir capturas de pantalla de las principales vistas en este README

---

## Autores

Desarrollado por **Maria Perez** y **Facundo Garavaglia** como parte del proyecto NÓMADA en el contexto formativo de **Factoría F5**.

El proyecto tiene enfoque en desarrollo web moderno, arquitectura de componentes, integración frontend-backend y construcción de una experiencia real de producto.

---

*Agencia de Viajes NÓMADA · Factoría F5 · 2026*