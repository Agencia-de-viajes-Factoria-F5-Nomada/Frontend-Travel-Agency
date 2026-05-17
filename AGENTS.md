# AGENTS.md — Frontend Agencia de Viajes (Nómada)

## Instrucción obligatoria para agentes

Antes de hacer cualquier cambio en este proyecto, cualquier agente de IA o asistente de programación debe leer este documento completo.

Además, antes de modificar cualquier elemento relacionado con la comunicación entre frontend y backend, también debe leer:
- `docs/AUDIT.md`
- `docs/API_CONTRACT.md` (si existe)
- `docs/CONTRACT_TESTING.md` (si existe)

---

## 1. Contexto del proyecto

Frontend de una agencia de viajes. React + Vite + Tailwind CSS + JavaScript (JSX).

Nombre de la aplicación: **Nómada**.

Usuarios: Agentes de viajes en ordenadores de oficina.

---

## 2. Idioma y naming

**En inglés:** Componentes, hooks, servicios, API client, carpetas técnicas, variables, funciones.

**En castellano:** Textos visibles en interfaz, mensajes de error para el usuario, README, documentación.

- Componentes React: `PascalCase` (`HotelCard`, `BookingForm`)
- Hooks: `use` + camelCase (`useHotels`, `useBookings`)
- Variables/funciones: `camelCase`
- Carpetas: minúsculas, plural (`components/`, `pages/`, `services/`)

---

## 3. Stack técnico

- React 18+
- Vite
- JavaScript (JSX)
- Tailwind CSS
- Axios (para llamadas API)
- React Router DOM (v6)
- Lucide React (iconos)
- Vitest + React Testing Library (tests unitarios)
- Playwright (tests E2E, opcional)

Comandos:
```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
```

---

## 4. Estructura recomendada

```
src/
├── api/           # apiClient.js + servicios por dominio
├── assets/        # imágenes estáticas
├── components/    # componentes reutilizables
│   ├── ui/        # primitivas (Button, Card, Input, Badge)
│   ├── common/    # componentes compartidos (modales, cards)
│   └── layout/    # layouts (AdminLayout, PublicLayout)
├── hooks/         # custom hooks
├── pages/         # páginas del router
├── router/        # configuración de rutas
├── services/      # lógica de negocio (opcional, separar de api/)
├── styles/        # estilos globales
├── utils/         # formateadores, helpers
└── constants/     # constantes, mock data, rutas
```

---

## 5. Comunicación con API

- **Centralizar en `src/api/apiClient.js`**: instancia única de Axios con `baseURL` desde `VITE_API_URL`.
- **Servicios por dominio**: `userApi.js`, `hotelApi.js`, `bookingApi.js`, etc. que reutilizan `apiClient`.
- **NO hacer llamadas HTTP dentro de componentes JSX.** Toda la comunicación API en `src/api/`.
- **NO duplicar URLs.** Usar variables de entorno.
- Nombres de campos deben coincidir exactamente con el contrato del backend.

---

## 6. Estado y manejo de errores

- Usar estado local de React (useState, useReducer).
- Hooks propios para lógica reutilizable.
- NO introducir estado global (Redux, Context) sin necesidad real.
- Errores del backend deben mostrarse en español al usuario.
- NO mostrar trazas técnicas ni errores crudos.
- Casos mínimos: 400 (validación), 404 (no encontrado), 409 (conflicto), 500 (error genérico).

---

## 7. Estilo visual

- Tailwind CSS. NO estilos inline, NO CSS clásico.
- Colores del theme en `tailwind.config.js`. NO colores hardcodeados (`bg-[#...]`).
- Componentes reutilizables para: botones, cards, formularios, badges, tablas, mensajes de error, estados de carga.
- Diseño responsive obligatorio.

---

## 8. Imágenes

- Usar imports de JavaScript (`import logo from '../assets/logo.png'`).
- NO rutas relativas de filesystem (`src="src/assets/..."`).
- Las imágenes de entidades vendrán del backend vía Cloudinary.

---

## 9. Testing

- Tests con Vitest + React Testing Library.
- Cubrir: renderizado de componentes principales, formularios CRUD, servicios API, manejo de errores.
- Tests E2E con Playwright (opcional pero recomendado).
- Script `"test"` debe estar en `package.json`.

---

## 10. Seguridad y variables de entorno

- NO hardcodear URLs. Usar `VITE_API_URL` en `.env`.
- Crear `.env.example` con las variables necesarias.
- NO subir `.env` al repositorio (ya debe estar en `.gitignore`).
- Input sanitization en formularios.

---

## 11. Auditoría inicial

Ver `docs/AUDIT.md` para el listado completo de problemas. Prioridades:

1. 🔴 Reemplazar `App.jsx` (starter Vite) por entrada real con `BrowserRouter`
2. 🔴 Cablear `AppRoutes.jsx` con los layouts y páginas
3. 🔴 Crear `apiClient.js` centralizado con `VITE_API_URL`
4. 🔴 Añadir `axios` a `package.json`
5. 🔴 Crear `.env.example`
6. 🟡 Migrar CRUDs a servicios API separados
7. 🟡 Eliminar componente duplicado `Hoteles.jsx`
8. 🟡 Añadir manejo de errores con mensajes en español
9. 🟡 Implementar autenticación real (login, tokens, route guards)
10. 🟡 Configurar Vitest y escribir tests básicos
