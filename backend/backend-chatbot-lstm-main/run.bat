@echo off
REM Backend startup script for Windows

echo ===================================
echo 🚀 Starting Django Backend Server
echo ===================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed
    exit /b 1
)

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install/update requirements
echo 📥 Installing requirements...
pip install -r requirements.txt -q

REM Run migrations
echo 🗄️ Running database migrations...
python manage.py migrate

REM Start server
echo.
echo ✅ Backend ready!
echo 🌐 Server running at: http://localhost:8000
echo 📚 API docs at: http://localhost:8000/api/
echo.
echo Press CTRL+C to stop the server
echo.

python manage.py runserver
pause
