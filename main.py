"""
Railway entry point - helps detect and run the Django app
"""
import os
import sys
import django

# Add backend app to path
backend_path = os.path.join(os.path.dirname(__file__), 'backend', 'backend-chatbot-lstm-main')
sys.path.insert(0, backend_path)

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# This allows Railway to detect it as a Python app
if __name__ == '__main__':
    print("Django app ready for Railway deployment!")
