@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║            🔄 REINICIANDO SERVIDOR - NOMADA                    ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Matar procesos Node anteriores en puerto 8080
echo [1/3] Deteniendo servidor anterior...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do taskkill /PID %%a /F 2>nul

timeout /t 2 /nobreak

REM Ir a la carpeta correcta
cd /d c:\Users\mpo19\OneDrive\Documentos\Escritorio\NOMADA\front

REM Reiniciar el servidor
echo [2/3] Iniciando servidor...
echo.
npm run server

pause
