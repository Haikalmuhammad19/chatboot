#!/bin/bash
# Backend startup script for local development

cd "$(dirname "$0")"

echo "==================================="
echo "🚀 Starting Django Backend Server"
echo "==================================="

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/update requirements
echo "📥 Installing requirements..."
pip install -r requirements.txt -q

# Run migrations
echo "🗄️ Running database migrations..."
python manage.py migrate

# Start server
echo ""
echo "✅ Backend ready!"
echo "🌐 Server running at: http://localhost:8000"
echo "📚 API docs at: http://localhost:8000/api/"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

python manage.py runserver
