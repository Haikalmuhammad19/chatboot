# Quick Start Guide - Run Local Development

## Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

## Option 1: Quick Start (Recommended for Windows)

### Start Backend
```bash
cd backend/backend-chatbot-lstm-main
run.bat
```

The script will:
1. Create virtual environment
2. Install dependencies
3. Run migrations
4. Start server at http://localhost:8000

### Start Frontend (in new terminal)
```bash
cd frontend/frontend-chatbot-lstm-main
npm install
npm run dev
```

Frontend will run at http://localhost:5173

---

## Option 2: Manual Start

### Backend Setup
```bash
# Navigate to backend
cd backend/backend-chatbot-lstm-main

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Server will run at: **http://localhost:8000**

### Frontend Setup (in new terminal)
```bash
# Navigate to frontend
cd frontend/frontend-chatbot-lstm-main

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

## Testing the API

### 1. Check Backend Health
```bash
curl http://localhost:8000/api/health/
```

Expected response:
```json
{
  "status": "healthy",
  "message": "Subreddit Prediction API is running"
}
```

### 2. Register User (Optional)
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123",
    "email": "test@example.com"
  }'
```

### 3. Login & Get Token
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

Save the `access` token from response.

### 4. Make Prediction
```bash
curl -X POST http://localhost:8000/api/predict/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "text": "I am feeling very stressed and anxious about my future"
  }'
```

---

## Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

JWT_SECRET_KEY=your-jwt-secret-key
JWT_EXPIRATION_HOURS=24

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## Common Issues & Solutions

### Backend: ModuleNotFoundError
**Solution**: Make sure virtual environment is activated and requirements are installed
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Backend: Port 8000 already in use
**Solution**: Kill the process or use a different port
```bash
# Windows
netstat -ano | findstr :8000

# macOS/Linux
lsof -i :8000
```

Then run server on different port:
```bash
python manage.py runserver 8001
```

### Frontend: API connection error
**Solution**: Make sure backend is running at http://localhost:8000
- Check `.env` file has correct `VITE_API_BASE_URL`
- Make sure Django server is running
- Check browser console for detailed error

### Database migration errors
**Solution**: Reset database and run migrations again
```bash
# Remove db.sqlite3
rm db.sqlite3

# Run migrations
python manage.py migrate
```

---

## What's Running?

| Service | URL | Purpose |
|---------|-----|---------|
| Django Backend | http://localhost:8000 | REST API server |
| Django Admin | http://localhost:8000/admin | Database management |
| API Health | http://localhost:8000/api/health/ | API status check |
| Frontend | http://localhost:5173 | React chatbot UI |
| Vite Dev Server | http://localhost:5173 | Hot reload development |

---

## Next Steps

1. ✅ Backend running locally
2. ✅ Frontend running locally
3. Test the chatbot interface
4. When ready: Deploy to GitHub + Vercel/Production

---

## Need Help?

- Check error messages in terminal
- Review [JWT_SETUP.md](backend/backend-chatbot-lstm-main/JWT_SETUP.md) for auth details
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Review [README.md](README.md) for project overview
