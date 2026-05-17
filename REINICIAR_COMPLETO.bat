@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║        🔄 REINICIO COMPLETO CON CREDENCIALES CORRECTAS         ║
echo ║                                                                ║
echo ║      Esto va a cerrar TODO y reiniciar el servidor             ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Cambiar a directorio
cd /d c:\Users\mpo19\OneDrive\Documentos\Escritorio\NOMADA\front

echo [PASO 1] Matando procesos Node antiguos...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [PASO 2] Limpiando puertos...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :8080') do taskkill /PID %%a /F 2>nul
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :5173') do taskkill /PID %%a /F 2>nul
timeout /t 1 /nobreak >nul

echo [PASO 3] Iniciando SERVIDOR...
echo.
echo ══════════════════════════════════════════════════════════════════
npm run server
echo ══════════════════════════════════════════════════════════════════
echo.
pause
