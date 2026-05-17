@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║        🔍 VERIFICADOR DE SERVIDOR - NOMADA                     ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar si puerto 8080 está en uso
echo [1/3] Verificando puerto 8080...
netstat -ano | findstr :8080 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ El servidor está corriendo en puerto 8080
    echo.
    
    REM Intentar conectarse a health check
    echo [2/3] Probando conexión al servidor...
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/health' -TimeoutSec 2; Write-Host '✅ Servidor respondiendo'; $response.Content | ConvertFrom-Json | Out-Host } catch { Write-Host '❌ No se puede conectar. Intenta reiniciar.' -ForegroundColor Red }" 2>nul
    
) else (
    echo ❌ El servidor NO está corriendo en puerto 8080
    echo.
    echo Para iniciar el servidor ejecuta:
    echo   npm run server
    echo.
    goto :eof
)

echo.
echo [3/3] Próximos pasos:
echo ────────────────────────────────────────────────────────────────
echo 1. Abre tu navegador en: http://localhost:5173
echo 2. Intenta login con:
echo    Email: carlos.perez@travelagency.com
echo    Contraseña: 1234
echo 3. Si ves error, presiona Ctrl+Shift+Delete y limpia caché
echo.
pause
