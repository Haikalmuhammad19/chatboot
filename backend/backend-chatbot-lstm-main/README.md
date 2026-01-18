# Chatbot LSTM Backend API

Django REST API untuk mental health prediction menggunakan LSTM model.

## 📋 Requirements

- Python 3.8+
- Django 5.1+
- TensorFlow 2.15+
- Keras 3.0+

## 🚀 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd backend/backend-chatbot-lstm-main
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env dengan konfigurasi Anda
```

### 5. Initialize Database
```bash
python manage.py migrate
python manage.py createsuperuser
```

## 🏃 Running Locally

```bash
python manage.py runserver
```

API akan tersedia di `http://localhost:8000`

## 📚 API Endpoints

### Health Check
```
GET /api/health/
```

Response:
```json
{
  "status": "healthy",
  "message": "Subreddit Prediction API is running"
}
```

### Predict
```
POST /api/predict/
Content-Type: application/json

{
  "text": "I'm feeling really down and have no motivation."
}
```

Response:
```json
{
  "text": "I'm feeling really down and have no motivation.",
  "predicted_subreddit": "depression",
  "confidence": 0.95,
  "timestamp": "2024-01-18T10:00:00Z"
}
```

### Prediction History
```
GET /api/predictions/
```

## 🔧 Configuration

### Environment Variables

- `SECRET_KEY` - Django secret key (generate new untuk production)
- `DEBUG` - Set ke `False` untuk production
- `ALLOWED_HOSTS` - Comma-separated list hosts
- `CORS_ALLOWED_ORIGINS` - Comma-separated list CORS origins

## 📦 Deployment

### Gunicorn
```bash
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
```

### Environment Setup untuk Production
```bash
SECRET_KEY=your-secret-key-here DEBUG=False ALLOWED_HOSTS=yourdomain.com gunicorn backend.wsgi:application
```

## 🐳 Docker (Optional)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## 📄 License

MIT License
    "confidence": 0.89,
    "created_at": "2025-10-07T10:30:00Z"
  }
]
```

## Contoh Penggunaan dari Frontend

### JavaScript (Fetch API)
```javascript
const response = await fetch('http://localhost:8000/api/predict/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'I feel anxious'
  })
});

const data = await response.json();
console.log(data);
```

### cURL
```bash
curl -X POST http://localhost:8000/api/predict/ \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel anxious"}'
```

## Admin Panel

Akses admin panel di `http://localhost:8000/admin/` untuk melihat history prediksi.

## Testing

Jalankan unit test:
```bash
python manage.py test
```

## Struktur Project

```
backend/
├── manage.py
├── requirements.txt
├── backend/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── prediction_api/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    ├── ml_service.py
    └── tests.py
```

## Fitur

- ✅ REST API untuk prediksi subreddit
- ✅ Menyimpan history prediksi ke database
- ✅ CORS enabled untuk frontend
- ✅ Admin panel untuk monitoring
- ✅ Singleton pattern untuk loading model (efisien)
- ✅ Error handling
- ✅ Unit tests
- ✅ Health check endpoint
