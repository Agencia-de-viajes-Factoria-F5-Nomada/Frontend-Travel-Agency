@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║   MATANDO TODO Y REINICIANDO - ESPERA A QUE TERMINES         ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [1/5] Matando todos los procesos node...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.exe 2>nul
taskkill /F /IM cmd.exe 2>nul

echo [2/5] Esperando 3 segundos...
timeout /t 3 /nobreak >nul

echo [3/5] Limpiando puertos 8080 y 5173...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :8080') do taskkill /PID %%a /F 2>nul
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :5173') do taskkill /PID %%a /F 2>nul
timeout /t 1 /nobreak >nul

echo [4/5] Cambiando a carpeta...
cd /d c:\Users\mpo19\OneDrive\Documentos\Escritorio\NOMADA\front

echo [5/5] Iniciando servidor...
echo.
echo ══════════════════════════════════════════════════════════════════
echo Espera a ver: ✅ SERVIDOR DE VIAJES INICIADO CORRECTAMENTE
echo ══════════════════════════════════════════════════════════════════
echo.

npm run server
