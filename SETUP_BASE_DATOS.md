# 🚀 INSTRUCCIONES PARA EJECUTAR LA BASE DE DATOS

## Problema
El proyecto frontend intentaba conectarse a un backend en `http://localhost:8080/api` que no estaba disponible.

## Solución
Se ha creado un **servidor mock en Node.js** que simula completamente la base de datos y API del backend Java.

---

## 📦 Instalación

1. **Instala las nuevas dependencias:**
```bash
npm install
```

Esto instalará:
- `express` - Servidor web
- `cors` - Para permitir conexiones del frontend
- `jsonwebtoken` - Para autenticación
- `concurrently` - Para ejecutar dos procesos simultáneamente

---

## ▶️ Cómo ejecutar

### **Opción 1: Ejecutar solo el frontend**
```bash
npm run dev
```
El frontend estará en: `http://localhost:5173`

### **Opción 2: Ejecutar backend + frontend juntos (RECOMENDADO)**
```bash
npm run dev:full
```

Esto iniciará automáticamente:
- ✅ Servidor backend en `http://localhost:8080`
- ✅ Frontend en `http://localhost:5173`

### **Opción 3: Solo el servidor backend**
```bash
npm run server
```

---

## 🔑 Credenciales de prueba

Una vez que el servidor esté ejecutándose, puedes iniciar sesión con:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@travel.io | admin123 | Admin |
| marta@travel.io | user123 | User |

---

## 📊 Base de datos incluida

El servidor incluye datos simulados para:
- ✅ Usuarios (Users)
- ✅ Hoteles (Hotels)
- ✅ Buses (Buses)
- ✅ Conductores (Drivers)
- ✅ Viajes (Travels)
- ✅ Reservas (Bookings)
- ✅ Ofertas (Offers)

---

## 🔌 Endpoints disponibles

### **Autenticación**
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse

### **Usuarios**
- `GET /api/users` - Obtener todos
- `GET /api/users/:id` - Obtener uno
- `POST /api/users` - Crear
- `PUT /api/users/:id` - Actualizar
- `DELETE /api/users/:id` - Eliminar

### **Hoteles, Buses, Conductores, Viajes, Reservas, Ofertas**
- Todos tienen los mismos endpoints CRUD

---

## ⚠️ Notas importantes

1. La base de datos es **en memoria**, los datos se reinician al reiniciar el servidor
2. Para persistencia real, necesitarías MongoDB, PostgreSQL o MySQL
3. Los tokens JWT expiran en 24 horas (configurable)
4. El servidor CORS permite cualquier origen (configurable para producción)

---

## 🐛 Si algo no funciona

Si el servidor no inicia:
```bash
# Verifica que no hay algo usando el puerto 8080
# En Windows:
netstat -ano | findstr :8080

# Para detener un proceso:
taskkill /PID <PID> /F
```

---

¡Tu aplicación ya debería estar funcionando! 🎉
