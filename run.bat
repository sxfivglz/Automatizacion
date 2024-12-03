@echo off
cd /d C:\xampp
start /B xampp_start.exe
timeout /t 3 /nobreak
cd /d O:\UTT\Automatizacion
npm start


