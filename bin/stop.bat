echo off
cls
echo.

if "%~1"=="" goto BLANK

if "%~1"=="-p" goto SPECIFIC

if not "%~1"=="-p" goto UNKNOWN

:SPECIFIC

set PREFIX_PATH=%2

cd ../api/nginx-1.11.4-windows
nginx -c "%PREFIX_PATH%/conf" -p "%PREFIX_PATH%" -s stop
cd ../../bin

goto DONE

:BLANK

echo No Parameter

goto DONE

:UNKNOWN

echo Unknown Option %1

goto DONE

:DONE

echo nginx stopped
