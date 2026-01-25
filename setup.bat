@echo off
echo Setting up Trail Journal...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

REM Generate icons if they don't exist
if not exist "public\icon-192.png" (
    echo Generating PWA icons...
    node generate-icons.js
    node convert-icons.js
) else (
    echo Icons already exist
)

REM Build the app
echo Building production app...
call npm run build

echo.
echo Setup complete!
echo.
echo To start the app, run: npm start
echo The app will be available at http://localhost:3000
pause
