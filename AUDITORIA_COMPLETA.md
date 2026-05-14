# Auditoría Completa del Proyecto — Nomada Travel Agency

**Fecha:** 14/05/2026 (Actualizada post-PR #4)
**Proyecto:** Agencia de Viajes — Frontend (React) + Backend (Spring Boot)
**Stakeholder:** Carla
**Equipo:** G1

---

## Resumen General del Proyecto

| Aspecto | Frontend | Backend |
|---------|----------|---------|
| Tecnología | React 19 + Vite 8 + Tailwind CSS | Spring Boot 4.0.6 + Java 25 + MySQL |
| Entidades cubiertas | 9 (componentes CRUD) | 9 (JPA entities) |
| Endpoints API | 9 servicios (axios) | 47 endpoints (10 controllers) |
| Tests | ❌ 0 tests | ✅ ~96 unit tests (JUnit 5 + Mockito) |
| Documentación | README básico | Swagger/OpenAPI + AUDITORIA.md |
| Estado general | 🔴 CRUD components creados pero con 4 bugs bloqueantes de import | ⚠️ Funcional pero con brechas |

---

## ⚠️ Regresión crítica: Bugs introducidos por PR #4

El pull reciente (`feature/admin-cruds`) añadió infraestructura CRUD pero introdujo **4 bugs bloqueantes** que impiden que la app compile o funcione:

| # | Bug | Archivo | Línea | Causa | Solución |
|---|-----|---------|-------|-------|----------|
| 🔴 B1 | `import { busService }` → el servicio exporta `BusService` (PascalCase) | `crud-buses/Buses.jsx` | 2 | Mismatch camelCase vs PascalCase en 5 componentes | Cambiar a `{ BusService }` |
| 🔴 B2 | `import { cloudinaryService }` — **archivo inexistente** | `crud-hotel/Hoteles.jsx` | 3 | Importa `cloudinaryService.js` que no está creado | Crear servicio o comentar import |
| 🔴 B3 | `import { BookingService } from '../services/...'` — **ruta incorrecta** | `bookings-crud/Bookings.jsx` | 2 | Usa `../services/` en vez de `../../services/` | Corregir ruta |
| 🔴 B4 | **`axios` no está en `package.json`** | `package.json` | — | Todos los servicios importan axios pero no es dependencia | `npm install axios` |

### Componentes con import incorrecto (B1)

| Componente | Import incorrecto | Export real del servicio |
|------------|------------------|------------------------|
| `crud-buses/Buses.jsx:2` | `{ busService }` | `BusService` |
| `crud-drivers/Drivers.jsx:2` | `{ driverService }` | `DriverService` |
| `crud-hotel/Hoteles.jsx:2` | `{ hotelService }` | `HotelService` |
| `crud-travel/Travels.jsx:2,3,4` | `{ travelService, hotelService, busService }` | `TravelsService`, `HotelService`, `BusService` |
| `crud-users/Users.jsx:2` | `{ userService }` | `UserService` |

---

## Comparativa: Estado anterior vs Estado actual (post-PR #4)

| Aspecto | Auditoría anterior (v1) | Auditoría actual (v2) | Cambio |
|---------|------------------------|----------------------|--------|
| axios en package.json | ❌ No | ❌ No | = |
| Proxy Vite | ❌ No | ❌ No | = |
| CRUD components creados | ✅ Sí | ✅ Sí (pero con bugs) | ⚠️ Bugs nuevos |
| CRUD components enrutados | ❌ No | ❌ No | = |
| Mock data en páginas admin | ✅ Sí | ✅ Sí | = |
| Import errors bloqueantes | ❌ 0 | 🔴 **4 nuevos** | ❌ **PEOR** |
| cloudinaryService | ❌ No existe | ❌ No existe | = |
| Duplicate Hoteles.jsx | ✅ Sí | ✅ Sí | = |
| Tests frontend | ❌ 0 | ❌ 0 | = |
| Loading states en CRUDs | ❌ No | ✅ 5/6 CRUDs | ✅ Mejor |
| Error handling visible | ❌ No | ✅ 5/6 CRUDs | ✅ Mejor |
| Ruta `/dashboard` pública | ❌ No | ✅ Añadida | ✅ Mejor |

---

## Cumplimiento vs Requisitos del Briefing

### Requisitos Obligatorios

| # | Requisito | Estado | Frontend | Backend | Notas |
|---|-----------|--------|----------|---------|-------|
| 1 | 4 entidades (Usuarios, Hoteles, Autobuses, Conductores) | ✅ | ✅ CRUD components | ✅ JPA + Controller + Service | Además: Travels, Bookings, Offers, TripSegments, Employees |
| 2 | CRUD completo para todas las entidades | ⚠️ Parcial | ⚠️ CRUD components existen pero NO están enrutados + 4 bugs import | ✅ 47 endpoints | Frontend usa mock data en páginas públicas |
| 3 | Frontend React conectado al backend | ⚠️ Parcial | ⚠️ Servicios axios creados, axios no está en package.json, imports rotos | ✅ CORS configurado para :5173 | Sin proxy en Vite |
| 4 | Responsive | ✅ | ✅ Tailwind + hamburger menus mobile | N/A | |
| 5 | Manejo de excepciones | ⚠️ Parcial | ⚠️ 5/6 CRUDs con error visible, páginas sin manejo | ✅ GlobalExceptionHandler (6 tipos) | Mejorado en CRUDs pero páginas admin siguen sin él |
| 6 | DTOs | ⚠️ Parcial | N/A | ⚠️ 5/9 entidades con DTO completos | Booking, TripSegment, Offer, Employee usan entidades raw |
| 7 | Validaciones | ⚠️ Parcial | ❌ Sin validación frontend | ✅ @Valid en 7/10 controllers | Offer, Employee, Auth controllers sin @Valid |
| 8 | **Cloudinary** | ❌ **No implementado** | ❌ | ❌ No en pom.xml | Obligatorio según briefing |
| 9 | Tests | ❌ Frontend sin tests | ❌ 0 tests, sin librerías | ✅ ~96 tests | Backend testing ok |

### Funcionalidades Específicas

| # | Funcionalidad | Estado | Frontend | Backend | Notas |
|---|--------------|--------|----------|---------|-------|
| 10 | Vista de viajes en oferta | ✅ | ✅ OffersPage.jsx | ✅ /api/travels/sale | Precios media pensión y pensión completa OK |
| 11 | Comprar plazas con info acompañantes | ⚠️ Parcial | ⚠️ CheckoutPage con mock data | ✅ BookingQuoteRequestDTO con customerIds | No conectado entre sí |
| 12 | Tarifa niño/adulto/pensionista | ✅ | ❌ No implementada en frontend | ✅ BookingPricingService | 15% niño, 10% pensionista |
| 13 | Cliente puede coger viaje existente o crear propio | ⚠️ | Mock data de destinos | Viajes existentes OK; crear propio no implementado | |
| 14 | **Email detallado post-compra** | ❌ **No implementado** | ❌ | ❌ Sin spring-boot-starter-mail | |
| 15 | Vista de todos los usuarios | ⚠️ | ⚠️ UsersPage con mock data | ✅ GET /api/users | No conectado |
| 16 | **Dashboard dirección** (viajes/año, ganancias, top 3) | ❌ **No implementado** | ⚠️ DashboardPage con mock data | ❌ **No hay endpoints** | |
| 17 | Descuento por cantidad (IMSERSO/colegio) | ✅ | ❌ No visible en frontend | ✅ 5% grupo ≥10 pax | |
| 18 | Autobús disponible ida/vuelta | ⚠️ | ❌ | ⚠️ TripSegment existe, bus capacity no se valida | |
| 19 | No reservar si bus/hotel completo | ❌ | ❌ | ⚠️ HotelNotAvailableException existe, bus no | |

### Criterios de Aceptación

| # | Criterio | Estado | Implementación |
|---|----------|--------|----------------|
| 20 | Cliente puede comprar para varias personas | ✅ | BookingQuoteRequestDTO.customerIds como lista |
| 21 | No vender si bus completo | ❌ | No implementado |
| 22 | No vender viajes pasados | ✅ | @Future + TravelService filtra fechas futuras |
| 23 | Menor acompañado de adulto | ✅ | MinorWithoutTutorException |
| 24 | Conductor no puede conducir 2 buses a la vez | ⚠️ | Query existe pero no se invoca |

---

## Análisis Detallado: Frontend

### Estructura del Proyecto

```
Frontend-Travel-Agency/
├── src/
│   ├── components/
│   │   ├── bookings-crud/    → Bookings.jsx (CRUD, import path roto)
│   │   ├── common/           → BookingFormModal, DestinationCard, StatCard, StatusPill
│   │   ├── crud-buses/       → Buses.jsx (CRUD, import casing roto)
│   │   ├── crud-drivers/     → Drivers.jsx (CRUD, import casing roto)
│   │   ├── crud-employees/   → EmployeesForm.jsx (solo formulario)
│   │   ├── crud-hotel/       → Hoteles.jsx (CRUD, import casing roto + cloudinaryService missing)
│   │   ├── crud-offers/      → OffersForm.jsx (solo formulario)
│   │   ├── crud-travel/      → Travels.jsx (CRUD, import casing roto)
│   │   ├── crud-tripsegments/→ TripSegmentsForm.jsx (solo formulario)
│   │   ├── crud-users/       → Users.jsx (CRUD, import casing roto)
│   │   ├── Hoteles.jsx       → ⚠️ DUPLICADO (versión antigua con axios directo)
│   │   ├── layout/           → AdminLayout, PublicLayout, Sidebar, Topbar, Footer, BrandMark
│   │   └── ui/               → Button, Card, Input, Badge, PageHeader
│   ├── pages/                → 13 páginas (públicas + admin, todas con mock data)
│   ├── routes/               → AppRoutes.jsx (React Router v6, sin rutas CRUD)
│   ├── services/             → 9 servicios API (todos sin axios en package.json)
│   ├── constants/            → mockData.js, navigation.js, paths.js
│   └── utils/                → classNames.js, formatters.js
```

### Problemas Identificados

#### 🔴 Bloqueantes (impiden compilar/ejecutar)

| # | Problema | Archivos | Impacto |
|---|----------|----------|---------|
| F1 | **`axios` no está en `package.json`** | Todos los servicios en `src/services/` | **Toda la app falla en runtime.** Las importaciones de axios dan error. |
| F2 | **Import casing mismatch** (5 componentes) | `crud-buses/Buses`, `crud-drivers/Drivers`, `crud-hotel/Hoteles`, `crud-travel/Travels`, `crud-users/Users` | **Runtime error**: el servicio importado es `undefined` porque el nombre no coincide con el export. |
| F3 | **`cloudinaryService.js` no existe** | `crud-hotel/Hoteles.jsx:3` | **Build/import fail**: El archivo importado no existe en el repositorio. |
| F4 | **Import path incorrecto en Bookings.jsx** | `bookings-crud/Bookings.jsx:2` | **Import fail**: `../services/BookingService` resuelve a `src/components/services/` que no existe. Debería ser `../../services/`. |

#### 🟡 Críticos (arquitectura)

| # | Problema | Archivos | Impacto |
|---|----------|----------|---------|
| F5 | **CRUD components no enrutados** | `crud-users/`, `crud-buses/`, `crud-hotel/`, `crud-drivers/`, `crud-travel/`, `bookings-crud/` | Las páginas de admin usan mock data. Los CRUD reales existen pero nadie los ve. |
| F6 | **Mock data en todas las páginas principales** | `mockData.js`, `HomePage`, `SearchResultsPage`, `DestinationDetailPage`, `CheckoutPage`, `ProfilePage`, `OffersPage`, `DashboardPage`, `BookingsPage`, `DestinationsPage`, `UsersPage` | Sin conexión real al backend en la experiencia de usuario. |
| F7 | **Sin proxy de Vite** | `vite.config.js` | Las peticiones a `localhost:8080` dependen de CORS del backend. |
| F8 | **Sin tests** | Todo el proyecto | 0 tests. Sin librerías de testing. Breaking changes no detectables. |
| F9 | **Sin autenticación real** | `AuthPage.jsx` es mock. Rutas `/admin` sin guard. | Cualquiera puede acceder al panel admin. |
| F10 | **Código duplicado** | `src/components/Hoteles.jsx` (viejo) vs `src/components/crud-hotel/Hoteles.jsx` (nuevo) | Mantenimiento duplicado, confusión. |

#### 🟢 Medios

| # | Problema | Detalle |
|---|----------|---------|
| F11 | Sin Error Boundaries | Un error en un componente rompe toda la app |
| F12 | Sin Context API / estado global | Estado duplicado, props drilling |
| F13 | `hooks/`, `styles/`, `assets/` vacíos | Carpetas muertas con solo `.gitkeep` |
| F14 | `docs/` vacío | Sin documentación adicional |
| F15 | Sin formularios de pago reales | CheckoutPage tiene campos de tarjeta mock |

### API Services (Frontend)

| Servicio | Base URL | Métodos | Error Handling | Estado |
|----------|----------|---------|----------------|--------|
| `UserService.js` | `/api/users` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |
| `HotelService.js` | `/api/hotels` | GET, POST, PUT, DELETE | ✅ console.error + rethrow | 🔴 Sin axios |
| `BusService.js` | `/api/buses` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |
| `DriverService.js` | `/api/drivers` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |
| `TravelsService.js` | `/api/travels` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |
| `BookingService.js` | `/api/bookings` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |
| `offersService.js` | `/offers` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |
| `employeesService.js` | `/employees` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |
| `tripSegmentsService.js` | `/trip_segments` | GET, POST, PUT, DELETE | ❌ Ninguno | 🔴 Sin axios |

---

## Análisis Detallado: Backend

### Estructura del Proyecto

```
Backend-Travel-Agency-dev/
└── src/main/java/com/inditex/g1_agencia_viajes/
    ├── config/          → CorsConfig.java
    ├── controller/      → 10 controllers (47 endpoints)
    ├── dto/             → 8 Request DTOs + 7 Response DTOs + 1 Login
    ├── exception/       → 4 custom exceptions + GlobalExceptionHandler
    ├── mapper/          → 5 mappers (User, Hotel, Travel, Driver, BookingUser)
    ├── model/           → 9 JPA entities + 2 enums (Gender, TypeBoard)
    ├── repository/      → 9 repositories
    ├── security/        → JwtFilter, JwtUtil, SecurityConfig
    └── service/         → 10 services (incl. BookingPricingService)
```

### Problemas Identificados

#### 🔴 Críticos

| # | Problema | Archivos | Impacto |
|---|----------|----------|---------|
| B1 | **Cloudinary no implementado** | Ninguno | Requisito obligatorio del briefing. No hay subida de imágenes. |
| B2 | **Email no implementado** | Ninguno | El stakeholder espera email detallado post-compra. |
| B3 | **Dashboard no implementado** | Ninguno | No hay endpoints para analytics anuales. |
| B4 | **Capacidad bus no validada** | `BusServiceImpl.java`, `BookingService.java` | Criterio de aceptación: no vender si bus completo. No implementado. |
| B5 | **`reducirPlazas()` de hotel nunca se llama** | `HotelService.java`, `BookingService.java` | La capacidad del hotel no se descuenta al reservar. |

#### 🟡 Medios

| # | Problema | Archivos | Impacto |
|---|----------|----------|---------|
| B6 | **Driver overlap query existe pero no se invoca** | `TripSegmentRepository.java`, `TripSegmentService.java` | Un conductor puede asignarse a 2 buses a la vez. |
| B7 | **DTOs faltantes** | `BookingController`, `TripSegmentController`, `OfferController`, `EmployeeController` | Booking, TripSegment, Offer, Employee usan entidades JPA en la API. |
| B8 | **Seguridad débil** | `JwtUtil.java`, `JwtFilter.java` | Secret hardcodeado (`"your_secret_password"`), sin expiración, sin roles. |
| B9 | **`@Valid` faltante en 3 controllers** | `OfferController`, `EmployeeController`, `AuthenticationController` | Sin validación en endpoints de ofertas, empleados y login. |
| B10 | **Employee expone password** | `Employee.java` entity | La entidad se usa directamente en respuestas (sin DTO), exponiendo el hash. |

#### 🟢 Leves

| # | Problema | Detalle |
|---|----------|---------|
| B11 | `application.properties` sin perfiles | Sin separación dev/prod |
| B12 | Booking usa entidad cruda en create/update | Debería usar BookingRequestDTO |
| B13 | `data.sql` con contraseñas en texto plano | "123456" para todos los empleados (aunque BCrypt las hashea) |

---

## Comparativa: Backend AUDITORIA.md existente vs Estado Real

La `AUDITORIA.md` del backend (realizada por el equipo) identifica correctamente:

| Brecha detectada | Coincide con nuestro análisis |
|-----------------|-------------------------------|
| Cloudinary ❌ | ✅ Sí |
| Email ❌ | ✅ Sí |
| Dashboard ❌ | ✅ Sí |
| Capacidad bus ❌ | ✅ Sí |
| Capacidad hotel ⚠️ | ✅ Sí |
| Conductor ocupado ⚠️ | ✅ Sí |
| Viajes pasados ⚠️ | ✅ Sí |
| DTOs faltantes ⚠️ | ✅ Sí |
| Seguridad ⚠️ | ✅ Sí |

**Nuevos hallazgos no cubiertos en la AUDITORIA.md del backend:**
- Frontend: `axios` no está en `package.json`
- Frontend: 4 bugs de import en CRUD components (PR #4)
- Frontend: CRUD components no enrutados
- Frontend: Sin tests
- Frontend: Sin autenticación real
- Frontend: Código duplicado (Hoteles.jsx)
- Frontend: Sin proxy de Vite
- Backend: `reducirPlazas()` de hotel nunca se invoca

---

## Plan de Acción Recomendado

### Prioridad 🔴 — Bugs Bloqueantes (Aplicar AHORA)

| # | Tarea | Repo | Esfuerzo |
|---|-------|------|----------|
| 1 | `npm install axios` | Frontend | 1 min |
| 2 | Corregir imports casing: `busService` → `BusService`, `driverService` → `DriverService`, etc. (5 archivos) | Frontend | 10 min |
| 3 | Corregir import path en `bookings-crud/Bookings.jsx`: `../services/` → `../../services/` | Frontend | 1 min |
| 4 | Crear `cloudinaryService.js` o comentar import en `crud-hotel/Hoteles.jsx` | Frontend | 5 min |
| 5 | Configurar proxy en `vite.config.js` | Frontend | 5 min |

### Prioridad 🔴 — Funcionalidades Críticas (Sprint Actual)

| # | Tarea | Repo | Esfuerzo | Dependencias |
|---|-------|------|----------|--------------|
| 6 | Implementar Cloudinary (backend + frontend) | Ambos | 1-2 días | Dependencia Maven + Componente upload |
| 7 | Implementar envío de email post-compra | Backend | 1 día | spring-boot-starter-mail + JavaMailSender |
| 8 | Crear endpoints de dashboard (viajes/año, ganancias, top 3) | Backend | 1 día | Repository queries agregadas |
| 9 | Conectar DashboardPage frontend a endpoints reales | Frontend | 1 día | Depende de #8 |
| 10 | Validar capacidad bus en reservas | Backend | 1 día | Lógica en BookingService |

### Prioridad 🟡 — Sprint Siguiente

| # | Tarea | Repo | Esfuerzo |
|---|-------|------|----------|
| 11 | Integrar CRUD components en las rutas (reemplazar mock data) | Frontend | 2-3 días |
| 12 | Llamar a `findOverlappingByDriver()` en TripSegmentService | Backend | 2h |
| 13 | Invocar `reducirPlazas()`/`liberarPlazas()` en BookingService | Backend | 4h |
| 14 | Añadir DTOs para Booking, TripSegment, Offer, Employee | Backend | 1 día |
| 15 | Añadir `@Valid` a OfferController, EmployeeController, AuthController | Backend | 1h |
| 16 | Implementar autenticación real en frontend (JWT guard) | Frontend | 1-2 días |
| 17 | Añadir tests al frontend (Vitest + React Testing Library) | Frontend | 2-3 días |
| 18 | Añadir loading states y manejo de errores en páginas admin | Frontend | 1 día |

### Prioridad 🟢 — Mejora Continua

| # | Tarea | Repo | Esfuerzo |
|---|-------|------|----------|
| 19 | Eliminar código duplicado (Hoteles.jsx antiguo) | Frontend | 30min |
| 20 | Añadir Error Boundary global | Frontend | 1h |
| 21 | Refactorizar estado global con Context API | Frontend | 1-2 días |
| 22 | Endurecer seguridad JWT (secret externo, expiración, roles) | Backend | 1 día |
| 23 | Separar perfiles Spring Boot (dev/prod) | Backend | 2h |
| 24 | Añadir documentación Swagger descriptiva | Backend | 2h |
| 25 | Limpiar carpetas vacías (hooks/, styles/, assets/, docs/) | Frontend | 15min |

---

## Resumen de Estados por Área

### Frontend
```
✅ Implementado correctamente:   Layout, UI Components, Routing, Responsive CSS,
                                 Loading states (5/6 CRUDs), Error visible (5/6 CRUDs)
⚠️ Implementado parcialmente:    API services, Auth
🔴 Con bugs bloqueantes:        4 imports rotos (PR #4), axios faltante
❌ No implementado:              Tests, Cloudinary, Email, Dashboard real,
                                 Enrutamiento CRUD, Proxy Vite
```

### Backend
```
✅ Implementado correctamente:   Entities, CRUD endpoints, Pricing logic, Exceptions, Tests
⚠️ Implementado parcialmente:    DTOs, Validations, Hotel capacity, Driver overlap, Security
❌ No implementado:              Cloudinary, Email, Dashboard analytics, Bus capacity
```

---

## Leyenda de Estados

| Símbolo | Significado |
|---------|-------------|
| ✅ | Implementado correctamente y funcional |
| ⚠️ | Implementado parcialmente o con carencias |
| ❌ | No implementado |
| 🔴 | Con bugs que impiden su funcionamiento |
| N/A | No aplica |
