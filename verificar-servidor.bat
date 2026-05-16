@echo off
REM Script para verificar que el servidor está corriendo

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          VERIFICANDO SERVIDOR DE VIAJES                   ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar conexión al servidor
curl -s http://localhost:8080/api/health > nul 2>&1

if %errorlevel% equ 0 (
    echo ✅ Servidor está activo en http://localhost:8080
    echo.
    echo 📊 Verificando datos...
    echo.
    
    for /f %%A in ('powershell -Command "(Invoke-WebRequest -Uri 'http://localhost:8080/api/hotels' -UseBasicParsing | ConvertFrom-Json).Count"') do set hotels=%%A
    for /f %%B in ('powershell -Command "(Invoke-WebRequest -Uri 'http://localhost:8080/api/travels' -UseBasicParsing | ConvertFrom-Json).Count"') do set travels=%%B
    
    echo 🏨 Hoteles disponibles: %hotels%
    echo ✈️  Viajes disponibles: %travels%
    echo.
    echo ✅ SERVIDOR FUNCIONANDO CORRECTAMENTE
    echo.
    echo Abre en tu navegador: http://localhost:5173
    echo.
) else (
    echo ❌ El servidor no está corriendo
    echo.
    echo Para iniciarlo, ejecuta en otra terminal:
    echo npm run server
    echo.
)

pause
