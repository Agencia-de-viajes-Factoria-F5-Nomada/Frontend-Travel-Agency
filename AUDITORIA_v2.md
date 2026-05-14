# Auditoría Completa del Proyecto — Nomada Travel Agency

**Fecha:** 14/05/2026 (Actualizada post-merge PR#5)
**Proyecto:** Agencia de Viajes — Frontend (React) + Backend (Spring Boot)
**Stakeholder:** Carla
**Equipo:** G1

---

## Resumen General del Proyecto

| Aspecto | Frontend | Backend |
|---------|----------|---------|
| Tecnología | React 19 + Vite 8 + Tailwind CSS | Spring Boot 4.0.6 + Java 25 + MySQL |
| Entidades cubiertas | 9 (componentes CRUD) | 9 (JPA entities) |
| Endpoints API | 9 servicios (fetch) | 47 endpoints (10 controllers) |
| Tests | ❌ 0 tests | ✅ ~96 unit tests (JUnit 5 + Mockito) |
| Autenticación | ✅ JWT + PrivateRoute + authService | ✅ JWT filter + BCrypt |
| Documentación | README básico | Swagger/OpenAPI + AUDITORIA.md |
| Estado general | ⚠️ Funcional tras merge, CRUDs enrutados con auth | ⚠️ Funcional pero con brechas |

---

## Novedades post-merge PR #5

| Cambio | Archivos | Beneficio |
|--------|----------|-----------|
| **Servicios refactorizados a fetch** | 9 services | Sin dependencia de axios, usa `API` constante |
| **PrivateRoute** | `PrivateRoute.jsx` | Protege `/profile`, `/checkout`, `/admin/*` |
| **authService** | `authService.js` | Login/logout JWT con localStorage |
| **cloudinaryService** | `cloudinaryService.js` | Subida de imágenes a Cloudinary |
| **API constante centralizada** | `constants/api.js` + `.env` | URL configurable via `VITE_API_URL` |
| **CRUDs enrutados en admin** | `AppRoutes.jsx` | Hoteles, Buses, Conductores, Viajes accesibles |
| **Proxy Vite** | `vite.config.js` | `/api` → `localhost:8080` sin CORS |
| **Imports de CRUD corregidos** | 6 componentes | Coinciden con exports camelCase |

---

## Cumplimiento vs Requisitos del Briefing

### Requisitos Obligatorios

| # | Requisito | Estado | Frontend | Backend | Notas |
|---|-----------|--------|----------|---------|-------|
| 1 | 4 entidades (Usuarios, Hoteles, Autobuses, Conductores) | ✅ | ✅ CRUD components | ✅ JPA + Controller + Service | Además: Travels, Bookings, Offers, TripSegments, Employees |
| 2 | CRUD completo para todas las entidades | ✅ | ✅ CRUDs enrutados en `/admin/*` | ✅ 47 endpoints | Bookings CRUD necesita adaptarse al API real |
| 3 | Frontend React conectado al backend | ⚠️ Parcial | ✅ Servicios fetch con proxy Vite | ✅ CORS + JWT | Falta rebuild backend con JWT modificado |
| 4 | Responsive | ✅ | ✅ Tailwind + hamburger menus mobile | N/A | |
| 5 | Manejo de excepciones | ⚠️ Parcial | ⚠️ Servicios lanzan Error con fetch | ✅ GlobalExceptionHandler (6 tipos) | Frontend muestra error en CRUDs pero no en páginas públicas |
| 6 | DTOs | ⚠️ Parcial | N/A | ⚠️ 5/9 entidades con DTO completos | Booking, TripSegment, Offer, Employee usan entidades raw |
| 7 | Validaciones | ⚠️ Parcial | ❌ Sin validación frontend | ✅ @Valid en 7/10 controllers | Offer, Employee, Auth controllers sin @Valid |
| 8 | **Cloudinary** | ⚠️ Parcial | ✅ `cloudinaryService.js` creado | ❌ No en pom.xml | Servicio frontend listo, backend pendiente |
| 9 | Tests | ❌ Frontend sin tests | ❌ 0 tests, sin librerías | ✅ ~96 tests | Backend testing ok |

### Funcionalidades Específicas

| # | Funcionalidad | Estado | Frontend | Backend | Notas |
|---|--------------|--------|----------|---------|-------|
| 10 | Vista de viajes en oferta | ✅ | ✅ OffersPage.jsx | ✅ /api/travels/sale | |
| 11 | Comprar plazas con info acompañantes | ⚠️ Parcial | ⚠️ CheckoutPage protegido con PrivateRoute | ✅ BookingQuoteRequestDTO con customerIds | Flujo quote + confirm conectado |
| 12 | Tarifa niño/adulto/pensionista | ✅ | ❌ No implementada en frontend | ✅ BookingPricingService | 15% niño, 10% pensionista |
| 13 | Cliente puede coger viaje existente o crear propio | ⚠️ | ⚠️ Destinos públicos conectados | Viajes existentes OK; crear propio no implementado | |
| 14 | **Email detallado post-compra** | ❌ **No implementado** | ❌ | ❌ Sin spring-boot-starter-mail | |
| 15 | Vista de todos los usuarios | ⚠️ | ⚠️ UsersPage admin (mock) + UsersCRUD | ✅ GET /api/users | CRUD conectado pero página admin usa mock |
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

### Estado Actual de Rutas

```
/ (público)
├── /                        → HomePage
├── /destinations            → DestinationsPage
├── /destinations/:id        → DestinationDetailPage
├── /offers                  → OffersPage
├── /search                  → SearchResultsPage
├── /auth                    → AuthPage
├── /profile                 → PrivateRoute → ProfilePage
├── /checkout                → PrivateRoute → CheckoutPage
└── *                        → NotFoundPage

/admin (PrivateRoute + adminOnly)
├── /admin                   → DashboardPage (mock data)
├── /admin/bookings          → BookingsPage (mock data)
├── /admin/users             → UsersPage (mock data)
├── /admin/hotels            → Hoteles CRUD (conectado)
├── /admin/buses             → Buses CRUD (conectado)
├── /admin/drivers           → Drivers CRUD (conectado)
└── /admin/travels           → Travels CRUD (conectado)
```

### Problemas Identificados

#### 🔴 Críticos

| # | Problema | Archivos | Impacto |
|---|----------|----------|---------|
| F1 | **Dashboard dirección sin endpoints** | Backend | No hay analytics reales |
| F2 | **Email post-compra no implementado** | Backend | Stakeholder lo espera |
| F3 | **Cloudinary backend no implementado** | Backend | No se pueden subir imágenes |
| F4 | **JWT filter bloquea CRUDs** | Backend JwtFilter.java | 401 en todas las llamadas API |
| F5 | **Páginas admin con mock data** | DashboardPage, BookingsPage, UsersPage, DestinationsPage | No muestran datos reales |
| F6 | **Sin tests frontend** | Todo el proyecto | 0 tests, sin librerías |

#### 🟡 Medios

| # | Problema | Detalle |
|---|----------|---------|
| F7 | **Duplicate Hoteles.jsx** | `src/components/Hoteles.jsx` (viejo) + `crud-hotel/Hoteles.jsx` (nuevo) |
| F8 | **Sin validación frontend** | No hay React Hook Form, validaciones inline, etc. |
| F9 | **Sin loading states en páginas públicas** | HomePage, Search, Offers usan mock data síncrono |
| F10 | **Sin Error Boundaries** | Un error en un componente rompe toda la app |
| F11 | **Sin Context API** | No hay estado global de sesión/usuario |

#### 🟢 Leves

| # | Problema | Detalle |
|---|----------|---------|
| F12 | Código muerto: `offersService`, `employeesService`, `tripSegmentsService` apuntan a endpoints sin `/api/` | Actualizar URLs si se usan |
| F13 | `Bookings.jsx` CRUD usa `confirm()` para crear y actualizar | No hay método PUT en bookingService |
| F14 | `handlers/`, `hooks/`, `styles/` vacíos | Carpetas con solo `.gitkeep` |

---

## Análisis Detallado: Backend

### Problemas Identificados

#### 🔴 Críticos

| # | Problema | Archivos | Impacto |
|---|----------|----------|---------|
| B1 | **Cloudinary no implementado** | Ninguno | Requisito obligatorio del briefing |
| B2 | **Email no implementado** | Ninguno | Stakeholder espera email post-compra |
| B3 | **Dashboard no implementado** | Ninguno | No hay endpoints para analytics anuales |
| B4 | **JWT filter bloquea todo** | `JwtFilter.java` | Solo permite `/api/authentication/login` |
| B5 | **Capacidad bus no validada** | `BusServiceImpl.java`, `BookingService.java` | No vender si bus completo |
| B6 | **`reducirPlazas()` de hotel nunca se llama** | `HotelService.java`, `BookingService.java` | Capacidad no se descuenta al reservar |

#### 🟡 Medios

| # | Problema | Archivos | Impacto |
|---|----------|----------|---------|
| B7 | **Driver overlap query existe pero no se invoca** | `TripSegmentRepository.java`, `TripSegmentService.java` | Conductor puede estar en 2 buses a la vez |
| B8 | **DTOs faltantes** | `BookingController`, `TripSegmentController`, `OfferController`, `EmployeeController` | Usan entidades JPA en la API |
| B9 | **Seguridad débil** | `JwtUtil.java`, `JwtFilter.java` | Secret hardcodeado, sin expiración, sin roles |
| B10 | **`@Valid` faltante en 3 controllers** | `OfferController`, `EmployeeController`, `AuthenticationController` | Sin validación |

#### 🟢 Leves

| # | Problema | Detalle |
|---|----------|---------|
| B11 | `application.properties` sin perfiles | Sin separación dev/prod |
| B12 | `data.sql` con contraseñas en texto plano | "123456" |
| B13 | Employee expone password | Entidad usada directamente en respuestas |

---

## Plan de Acción Recomendado

### Paso 0 — Urgente (backend)

| # | Tarea | Archivo | Esfuerzo |
|---|-------|---------|----------|
| 0 | **Modificar JwtFilter** para permitir CRUDs sin token | `JwtFilter.java` | 5 min |

### Paso 1 — Bugs (Sprint actual)

| # | Tarea | Repo | Esfuerzo |
|---|-------|------|----------|
| 1 | Implementar Cloudinary (backend) | Backend | 1-2 días |
| 2 | Implementar email post-compra | Backend | 1 día |
| 3 | Endpoints de dashboard + conectar frontend | Ambos | 2 días |
| 4 | Validar capacidad bus/hotel en reservas | Backend | 1 día |

### Paso 2 — Mejoras (Sprint siguiente)

| # | Tarea | Repo | Esfuerzo |
|---|-------|------|----------|
| 5 | Llamar `findOverlappingByDriver()` | Backend | 2h |
| 6 | DTOs para Booking, TripSegment, Offer, Employee | Backend | 1 día |
| 7 | Tests frontend (Vitest + RTL) | Frontend | 2-3 días |
| 8 | Eliminar Hoteles.jsx duplicado | Frontend | 15min |
| 9 | `@Valid` en controllers faltantes | Backend | 1h |
| 10 | Añadir Error Boundary global | Frontend | 1h |

### Paso 3 — Deuda técnica

| # | Tarea | Esfuerzo |
|---|-------|----------|
| 11 | Endurecer JWT (secret externo, expiración, roles) | 1 día |
| 12 | Separar perfiles Spring Boot (dev/prod) | 2h |
| 13 | Limpiar carpetas vacías | 15min |

---

## Leyenda de Estados

| Símbolo | Significado |
|---------|-------------|
| ✅ | Implementado correctamente y funcional |
| ⚠️ | Implementado parcialmente o con carencias |
| ❌ | No implementado |
| N/A | No aplica |
