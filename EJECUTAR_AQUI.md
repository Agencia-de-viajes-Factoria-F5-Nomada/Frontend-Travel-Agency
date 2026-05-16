# 🚀 SOLUCIÓN: Failed to Fetch - Guía de Ejecución

## ⚠️ El problema

El error "Failed to fetch" significa que el frontend no puede conectar con el servidor backend en `http://localhost:8080`.

## ✅ SOLUCIÓN PASO A PASO

### **PASO 1: Abre dos terminales CMD**

#### **Terminal 1 - Para el SERVIDOR (Backend)**
```bash
cd c:\Users\mpo19\OneDrive\Documentos\Escritorio\NOMADA\front
npm run server
```

**Deberías ver:**
```
╔═══════════════════════════════════════════════════════════════╗
║  ✅ SERVIDOR DE VIAJES INICIADO CORRECTAMENTE                ║
║  🌐 URL: http://localhost:8080                               ║
║  📡 API: http://localhost:8080/api                           ║
║                                                               ║
║  🔑 CREDENCIALES:                                            ║
║     Email: admin@travel.io                                   ║
║     Contraseña: admin123                                     ║
╚═══════════════════════════════════════════════════════════════╝
```

⏳ **Espera a que veas este mensaje - NO CIERRES ESTA VENTANA**

---

#### **Terminal 2 - Para el FRONTEND**
```bash
cd c:\Users\mpo19\OneDrive\Documentos\Escritorio\NOMADA\front
npm run dev
```

**Deberías ver:**
```
  VITE v8.0.10  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

### **PASO 2: Abre el navegador**

Abre: **http://localhost:5173**

---

## 🐛 Si AÚN NO funciona:

### **Opción A: Puerto 8080 ocupado**
```bash
netstat -ano | findstr :8080
```

Si ves algo, ejecuta:
```bash
taskkill /PID <numero> /F
```

Luego intenta de nuevo.

---

### **Opción B: Reinstalar dependencias**
```bash
npm install
npm run server
```

---

### **Opción C: Usar un solo comando**
En una sola terminal:
```bash
npm run dev:full
```

Esto ejecutará servidor + frontend automáticamente.

---

## 🔍 Verificación rápida

Para verificar que el servidor está funcionando, abre en tu navegador:
- http://localhost:8080/api/health

Deberías ver: `{"status":"OK","message":"Servidor funcionando"}`

---

## 📋 Datos disponibles

- **20 hoteles** en ciudades europeas, asiáticas y americanas
- **12 viajes** con fechas disponibles desde mayo 2026
- **Usuarios de prueba:**
  - `admin@travel.io` / `admin123` (Admin)
  - `marta@travel.io` / `user123` (Usuario)

---

## 🎯 Resumen

✅ **Terminal 1:** `npm run server` → Puerto 8080  
✅ **Terminal 2:** `npm run dev` → Puerto 5173  
✅ **Navegador:** http://localhost:5173

¡Listo! 🎉
