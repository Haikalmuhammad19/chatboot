# Chatbot LSTM - Mental Health Prediction

Fullstack aplikasi chatbot dengan LSTM model untuk prediksi mental health. Terdiri dari Django REST API backend dan React TypeScript frontend.

## 🎯 Project Overview

Aplikasi ini menggunakan:
- **Backend**: Django REST Framework + LSTM model (TensorFlow/Keras)
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Deployment**: Django (local/server) + Vercel (frontend)

## 📦 Project Structure

```
Chatbot/
├── backend/
│   └── backend-chatbot-lstm-main/
│       ├── backend/              # Django project config
│       ├── prediction_api/       # API app
│       ├── manage.py
│       ├── requirements.txt
│       └── README.md
├── frontend/
│   └── frontend-chatbot-lstm-main/
│       ├── src/
│       ├── package.json
│       ├── vite.config.ts
│       └── README.md
└── README.md
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend/backend-chatbot-lstm-main

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# atau: source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend akan berjalan di: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend/frontend-chatbot-lstm-main

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

## 📚 API Documentation

### Base URL
- Local: `http://localhost:8000/api`
- Production: `https://your-api-domain.com/api`

### Endpoints

#### 1. Health Check
```
GET /health/
```

#### 2. Predict
```
POST /predict/
Content-Type: application/json

{
  "text": "I'm feeling really down"
}
```

Response:
```json
{
  "text": "I'm feeling really down",
  "predicted_subreddit": "depression",
  "confidence": 0.95,
  "timestamp": "2024-01-18T10:00:00Z"
}
```

#### 3. Prediction History
```
GET /predictions/
```

## 🌍 Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
```

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📦 Build & Deployment

### Development

Buka 2 terminals:

**Terminal 1 (Backend)**
```bash
cd backend/backend-chatbot-lstm-main
python manage.py runserver
```

**Terminal 2 (Frontend)**
```bash
cd frontend/frontend-chatbot-lstm-main
npm run dev
```

### Production Build

**Backend**
```bash
pip install gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
```

**Frontend**
```bash
npm run build
```

### Deploy ke Vercel (Frontend)

1. Push ke GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Go to https://vercel.com
3. Create New Project dari GitHub repository
4. Set environment variables:
   - `VITE_API_BASE_URL`: Your backend URL
5. Deploy!

### Deploy Backend

Options:
- **Render**: https://render.com
- **Railway**: https://railway.app
- **Heroku**: https://heroku.com (deprecated)
- **DigitalOcean**: https://digitalocean.com
- **AWS**: https://aws.amazon.com

## 🔧 Development

### Install Dependencies

```bash
# Backend
cd backend/backend-chatbot-lstm-main
pip install -r requirements.txt

# Frontend
cd frontend/frontend-chatbot-lstm-main
npm install
```

### Linting & Type Checking

```bash
# Frontend
cd frontend/frontend-chatbot-lstm-main
npm run lint
npm run typecheck
```

## 📝 Notes

- Pastikan Python 3.8+ dan Node.js 16+ terinstall
- CORS sudah dikonfigurasi di settings.py
- TensorFlow/Keras model harus ada di backend folder
- Tokenizer dan label encoder pkl files harus ada

## 📄 License

MIT License

## 👨‍💼 Author

Created with ❤️ for mental health support

---

**Ready to deploy! Push to GitHub dan deploy ke Vercel sekarang!** 🚀
