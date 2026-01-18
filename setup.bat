@echo off
echo.
echo =================================================================
echo   CHATBOT LSTM - QUICK START SETUP
echo =================================================================
echo.

REM Colors and styling
setlocal enabledelayedexpansion

echo [1] Setting up Backend...
echo.
cd backend\backend-chatbot-lstm-main

if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt --quiet

echo Creating .env file from example...
if not exist .env (
    copy .env.example .env
    echo ✓ .env created - please edit with your SECRET_KEY and other settings
)

echo Running migrations...
python manage.py migrate --quiet

echo.
echo =================================================================
echo [2] Setting up Frontend...
echo.
cd ..\..\frontend\frontend-chatbot-lstm-main

echo Installing Node dependencies...
if not exist node_modules (
    call npm install --quiet
)

echo Creating .env.local file from example...
if not exist .env.local (
    copy .env.example .env.local
    echo ✓ .env.local created
)

echo.
echo =================================================================
echo   ✅ SETUP COMPLETE!
echo =================================================================
echo.
echo To start development:
echo.
echo Terminal 1 (Backend):
echo   cd backend\backend-chatbot-lstm-main
echo   venv\Scripts\activate
echo   python manage.py runserver
echo.
echo Terminal 2 (Frontend):
echo   cd frontend\frontend-chatbot-lstm-main
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.
echo =================================================================
echo.
pause
