# NOMADA Frontend

Frontend de la plataforma NOMADA, una aplicación web para una agencia de viajes que permite explorar viajes disponibles, consultar ofertas, iniciar sesión, realizar reservas, solicitar viajes personalizados y administrar entidades internas desde un panel de gestión.

El proyecto está desarrollado con React, Vite y Tailwind CSS, consumiendo una API REST mediante una capa de servicios basada en Axios. La interfaz está organizada con una arquitectura de componentes reutilizables inspirada en Atomic Design.

## Autores

Este frontend ha sido desarrollado por:

- Maria, desarrolladora frontend.
- Facun, desarrollador frontend.

Ambos autores han trabajado en la construcción de la experiencia de usuario, la estructura de rutas, los componentes visuales, la integración con servicios HTTP, el flujo de autenticación, la navegación pública y las vistas privadas de administración.

## Objetivo del Proyecto

NOMADA nace como una aplicación orientada a digitalizar la experiencia de una agencia de viajes. El frontend proporciona una interfaz clara para dos perfiles principales:

- Usuarios finales, que pueden buscar viajes, ver detalles, consultar ofertas, iniciar sesión, reservar y solicitar viajes personalizados.
- Personal administrador, que puede gestionar entidades operativas como viajes, hoteles, buses, conductores, reservas, usuarios, empleados, ofertas y segmentos de viaje.

La aplicación busca ser funcional, mantenible y escalable, priorizando una navegación sencilla y una estructura técnica que permita seguir creciendo sin duplicar lógica ni acoplar componentes innecesariamente.

## Funcionalidades Principales

### Área Pública

- Página de inicio con acceso rápido a destinos y viajes personalizados.
- Catálogo de destinos y viajes disponibles.
- Página de detalle para cada viaje.
- Búsqueda de viajes por destino, fechas y pasajeros.
- Filtros por precio, duración, región, estrellas, disponibilidad y tipo de pensión.
- Página de ofertas.
- Página de solicitud de viaje personalizado.
- Páginas legales.
- Registro e inicio de sesión.

### Viajes Personalizados

La sección de viaje personalizado permite al usuario enviar una solicitud completa con preferencias específicas:

- Destino o idea de viaje.
- Ciudad de salida.
- Fechas de salida y vuelta.
- Número de viajeros.
- Presupuesto por persona.
- Tipo de experiencia: playa, aventura, ruta, cultura, gastronomía o naturaleza.
- Ritmo del viaje: relajado, equilibrado o intenso.
- Tipo de alojamiento preferido.
- Servicios incluidos: avión, hotel y actividades.
- Imprescindibles del viaje.
- Aspectos a evitar.

Esta información se envía al backend como una solicitud personalizada para que el equipo pueda preparar una propuesta adaptada.

### Área Privada

- Perfil de usuario.
- Área personal.
- Checkout de reservas.
- Confirmación de reservas.
- Acceso protegido mediante rutas privadas.

### Área Administrativa

El panel de administración permite gestionar entidades clave del negocio:

- Viajes.
- Hoteles.
- Reservas.
- Usuarios.
- Buses.
- Conductores.
- Empleados.
- Ofertas.
- Segmentos de viaje.

El acceso administrativo está protegido y reservado a usuarios con permisos adecuados.

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 19 | Construcción de interfaces |
| Vite 8 | Servidor de desarrollo y build |
| React Router DOM | Enrutado SPA |
| Tailwind CSS | Sistema de estilos utility-first |
| Axios | Cliente HTTP para consumir la API |
| Lucide React | Iconografía |
| ESLint | Revisión estática de código |
| Express | Servidor local/API auxiliar del proyecto |
| JWT | Autenticación basada en token |

## Arquitectura Frontend

La estructura sigue una separación por responsabilidades:

```text
src/
  assets/       Recursos estáticos
  components/   Componentes reutilizables
  constants/    Constantes de navegación y rutas
  hooks/        Hooks personalizados
  pages/        Vistas completas de la aplicación
  routes/       Definición centralizada de rutas
  services/     Capa de comunicación con la API
  utils/        Funciones auxiliares
```

### Organización de Componentes

Los componentes están agrupados según su nivel de responsabilidad:

```text
components/
  atoms/        Elementos base: Button, Input, Card, Badge, Select
  molecules/    Composiciones pequeñas: filtros, buscadores, alertas
  organisms/    Bloques funcionales: tablas, formularios CRUD, tarjetas
  layout/       Layouts públicos y privados
```

Esta organización ayuda a mantener una UI consistente y reduce la duplicación de código.

## Rutas Principales

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/home` | Página de inicio |
| `/destinations` | Catálogo de destinos |
| `/destinations/:id` | Detalle de destino/viaje |
| `/travels` | Listado de viajes |
| `/travels/:id` | Detalle de viaje |
| `/offers` | Ofertas disponibles |
| `/search` | Resultados de búsqueda |
| `/checkout` | Proceso de reserva |
| `/checkout/custom` | Solicitud de viaje personalizado |
| `/auth` | Login y registro |
| `/profile` | Perfil protegido |
| `/personal/:section` | Área personal |
| `/admin` | Panel de administración |

## Servicios de API

La comunicación con el backend se centraliza en `src/services`.

Servicios principales:

```text
api.js
authService.js
TravelsService.js
BookingService.js
HotelService.js
BusService.js
DriverService.js
UsersService.js
offersService.js
tripSegmentsService.js
employeesService.js
cloudinaryService.js
```

La capa de servicios evita que las páginas llamen directamente a Axios, concentrando la lógica de endpoints y facilitando cambios futuros en la API.

## Autenticación y Seguridad

La aplicación utiliza autenticación basada en JWT. El token se conserva en el cliente y se usa para consumir rutas protegidas.

Características implementadas:

- Inicio de sesión.
- Registro.
- Persistencia de sesión.
- Rutas privadas.
- Protección de rutas administrativas.
- Redirección a login cuando el usuario no está autenticado.

El componente `PrivateRoute` controla el acceso a vistas restringidas.

## Flujo de Reserva

El flujo de reserva permite:

1. Seleccionar un viaje.
2. Ver el detalle del viaje.
3. Elegir tipo de pensión.
4. Iniciar el checkout.
5. Añadir pasajeros.
6. Calcular precio.
7. Confirmar reserva.

El flujo contempla validaciones como:

- Número de pasajeros.
- Datos personales.
- Fecha de nacimiento.
- DNI o pasaporte.
- Menores acompañados por adultos.
- Tipo de pensión.
- Precio total con IVA.

## Viaje Personalizado

La página `/checkout/custom` resuelve el flujo de solicitud personalizada. Esta ruta evita el error 404 que aparecía al hacer clic en el botón de viaje personalizado desde la página de inicio.

La vista está pensada para recopilar datos útiles para que la agencia pueda preparar una propuesta realista:

- Preferencias de destino.
- Estilo del viaje.
- Nivel de actividad.
- Tipo de alojamiento.
- Presupuesto.
- Fechas aproximadas.
- Servicios deseados.
- Notas relevantes.

El objetivo es que el usuario pueda expresar qué tipo de experiencia quiere sin estar limitado a un paquete ya creado.

## Instalación

### Requisitos Previos

- Node.js 18 o superior.
- npm 9 o superior.
- Acceso al backend/API configurado.

### Pasos

```bash
git clone https://github.com/Agencia-de-viajes-Factoria-F5-Nomada/Frontend-Travel-Agency.git
cd Frontend-Travel-Agency
npm install
```

Crear el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

Configurar la URL de API si es necesario:

```env
VITE_API_URL=http://localhost:8080
```

## Ejecución en Desarrollo

Levantar solo el frontend:

```bash
npm run dev
```

Levantar backend y frontend en paralelo:

```bash
npm run dev:full
```

Ejecutar el servidor backend auxiliar:

```bash
npm run server
```

Por defecto:

| Servicio | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend/API | `http://localhost:8080` |

El puerto del frontend puede cambiar automáticamente si el puerto `5173` está ocupado.

## Scripts Disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Sirve la build generada |
| `npm run lint` | Ejecuta ESLint |
| `npm run server` | Inicia el servidor Express |
| `npm run dev:full` | Ejecuta frontend y backend en paralelo |
| `npm run e2e:install` | Instala dependencias de Playwright |
| `npm run e2e:test` | Ejecuta pruebas end-to-end |

## Build de Producción

Para generar una build optimizada:

```bash
npm run build
```

El resultado se genera en:

```text
dist/
```

Para previsualizar la build:

```bash
npm run preview
```

## Convenciones de Desarrollo

### Componentes

- Los componentes base deben mantenerse en `components/atoms`.
- Las composiciones pequeñas deben ir en `components/molecules`.
- Los bloques de funcionalidad más grandes deben ir en `components/organisms`.
- Las vistas completas deben ir en `pages`.

### Servicios

- Las llamadas HTTP deben centralizarse en `services`.
- Las páginas no deberían construir URLs complejas directamente.
- La lógica de transformación de datos debe mantenerse cerca del servicio correspondiente.

### Estilos

- Se prioriza Tailwind CSS.
- Se reutilizan colores y clases ya presentes en el proyecto.
- Se evita introducir estilos globales innecesarios.
- Se mantiene una UI consistente con el diseño existente.

### Rutas

- Las rutas se definen en `src/routes/AppRoutes.jsx`.
- Las rutas protegidas se envuelven con `PrivateRoute`.
- Las rutas administrativas requieren permisos de administrador.

## Calidad y Mantenibilidad

El proyecto está orientado a mantener una base de código clara:

- Componentes pequeños y reutilizables.
- Separación entre vistas y servicios.
- Rutas centralizadas.
- Estados locales simples mediante hooks.
- Formularios controlados.
- Feedback visual para errores y estados de carga.
- Reutilización de componentes comunes como `Button`, `Card`, `Input` y `PageHeader`.

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `http://localhost:8080` |

## Estructura Resumida

```text
NOMADA Frontend
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── layout/
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── test/
│   └── utils/
├── server.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Estado del Proyecto

El frontend se encuentra en desarrollo activo. Las funcionalidades principales ya están implementadas, incluyendo navegación pública, autenticación, área privada, panel administrativo, reservas y solicitudes de viaje personalizado.

Próximas mejoras recomendadas:

- Mejorar cobertura de tests.
- Añadir pruebas visuales de flujos críticos.
- Conectar la página de viaje personalizado con recomendaciones reales de viajes existentes.
- Mejorar la gestión de estados globales si la aplicación sigue creciendo.
- Documentar contratos exactos de API.
- Añadir capturas actualizadas de las principales pantallas.

## Créditos

Desarrollado por Maria y Facun como desarrolladores frontend del proyecto NOMADA.

El proyecto forma parte del contexto formativo y práctico de Factoría F5, con enfoque en desarrollo web moderno, arquitectura de componentes, integración frontend-backend y construcción de una experiencia real de producto.
