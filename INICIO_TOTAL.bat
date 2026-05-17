@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║         🚀 NOMADA - INICIALIZADOR AUTOMÁTICO COMPLETO          ║
echo ║                                                                ║
echo ║     Este script reinicia el servidor Y abre el navegador      ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Cambiar a la carpeta correcta
cd /d c:\Users\mpo19\OneDrive\Documentos\Escritorio\NOMADA\front

REM Matar procesos Node anteriores
echo [1/4] Limpiando procesos anteriores...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :8080') do taskkill /PID %%a /F 2>nul
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :5173') do taskkill /PID %%a /F 2>nul
timeout /t 1 /nobreak >nul

REM Iniciar el servidor en background
echo [2/4] Iniciando servidor (esperando conexión)...
start "" cmd /k "npm run server"
timeout /t 5 /nobreak

REM Iniciar el frontend en background
echo [3/4] Iniciando frontend...
start "" cmd /k "npm run dev"
timeout /t 3 /nobreak

REM Abrir el navegador
echo [4/4] Abriendo navegador...
timeout /t 2 /nobreak

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  ✅ SISTEMA INICIADO                                           ║
echo ║                                                                ║
echo ║  🌐 Frontend: http://localhost:5173                            ║
echo ║  📡 API: http://localhost:8080/api                             ║
echo ║                                                                ║
echo ║  🔑 CREDENCIALES:                                              ║
echo ║     Email: carlos.perez@travelagency.com                      ║
echo ║     Contraseña: 1234                                           ║
echo ║                                                                ║
echo ║  Abriendo navegador en 2 segundos...                           ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

timeout /t 2 /nobreak
start http://localhost:5173

echo.
echo Ventanas de terminal abiertas. Puedes cerrar esta ventana.
echo.
pause
