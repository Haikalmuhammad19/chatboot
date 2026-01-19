#!/bin/bash
set -e

echo "Starting Django application..."
echo "Current directory: $(pwd)"

# Django project is in nested folder in git
cd backend-chatbot-lstm-main

echo "New directory: $(pwd)"
echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear 2>/dev/null || true

echo "Starting Gunicorn..."
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
