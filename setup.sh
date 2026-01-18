#!/bin/bash

echo "================================================================="
echo "  CHATBOT LSTM - QUICK START SETUP"
echo "================================================================="
echo ""

echo "[1] Setting up Backend..."
echo ""
cd backend/backend-chatbot-lstm-main

if [ ! -d venv ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt -q

echo "Creating .env file from example..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ .env created - please edit with your SECRET_KEY and other settings"
fi

echo "Running migrations..."
python manage.py migrate -q

echo ""
echo "================================================================="
echo "[2] Setting up Frontend..."
echo ""
cd ../../frontend/frontend-chatbot-lstm-main

echo "Installing Node dependencies..."
if [ ! -d node_modules ]; then
    npm install -q
fi

echo "Creating .env.local file from example..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✓ .env.local created"
fi

echo ""
echo "================================================================="
echo "  ✅ SETUP COMPLETE!"
echo "================================================================="
echo ""
echo "To start development:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend/backend-chatbot-lstm-main"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend/frontend-chatbot-lstm-main"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
echo "================================================================="
echo ""
