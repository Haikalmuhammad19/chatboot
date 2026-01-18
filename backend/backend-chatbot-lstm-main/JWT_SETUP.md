# JWT Authentication Setup & Usage

## Overview

JWT (JSON Web Token) authentication has been added to your Django backend. This allows secure authentication for your frontend application.

## Setup Instructions

### 1. Backend Setup (Already Completed ✅)

- ✅ Added `djangorestframework-simplejwt` to requirements.txt
- ✅ Created JWT authentication views in `prediction_api/auth_views.py`
- ✅ Updated `backend/settings.py` with JWT configuration
- ✅ Added JWT environment variables to `.env.example`
- ✅ Created migration for user field in PredictionHistory model

### 2. Environment Variables

You need to set these in your production environment (Vercel):

```env
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
```

**How to generate a secure JWT_SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 3. API Endpoints

#### Authentication Endpoints

**Register New User**
```
POST /api/auth/register/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password_123",
  "email": "john@example.com"
}

Response (201 Created):
{
  "message": "User registered successfully",
  "user_id": 1,
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Login (Get JWT Token)**
```
POST /api/auth/login/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password_123"
}

Response (200 OK):
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_id": 1,
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Refresh Access Token**
```
POST /api/auth/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

Response (200 OK):
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Test Protected Endpoint**
```
GET /api/auth/test/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

Response (200 OK):
{
  "message": "JWT Authentication is working!",
  "user": "john_doe",
  "user_id": 1
}
```

#### Protected API Endpoints (Require JWT Token)

**Make Prediction**
```
POST /api/predict/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
Content-Type: application/json

{
  "text": "This is a sample text for prediction"
}

Response (200 OK):
{
  "text": "This is a sample text for prediction",
  "predicted_subreddit": "technology",
  "confidence": 0.95,
  "timestamp": "2024-01-18T10:30:00Z"
}
```

**Get Prediction History**
```
GET /api/history/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

Response (200 OK):
[
  {
    "id": 1,
    "text": "Sample prediction text",
    "predicted_subreddit": "technology",
    "confidence": 0.95,
    "created_at": "2024-01-18T10:30:00Z"
  }
]
```

#### Public Endpoints (No Authentication Required)

**Health Check**
```
GET /api/health/

Response (200 OK):
{
  "status": "healthy",
  "message": "Subreddit Prediction API is running"
}
```

## Frontend Integration

### 1. Store JWT Token

After login, store the tokens in local storage or session storage:

```javascript
const response = await fetch('https://your-api.com/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});

const data = await response.json();
localStorage.setItem('access_token', data.access);
localStorage.setItem('refresh_token', data.refresh);
```

### 2. Use JWT in API Calls

Include the access token in the Authorization header:

```javascript
const accessToken = localStorage.getItem('access_token');

const response = await fetch('https://your-api.com/api/predict/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({ text: 'prediction text' })
});
```

### 3. Handle Token Refresh

When access token expires (401 error), use refresh token:

```javascript
const refreshToken = localStorage.getItem('refresh_token');

const response = await fetch('https://your-api.com/api/auth/refresh/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refresh: refreshToken })
});

const data = await response.json();
localStorage.setItem('access_token', data.access);
```

## Local Testing

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Create .env File
```bash
cp .env.example .env
```

Edit `.env` and set JWT_SECRET_KEY:
```env
JWT_SECRET_KEY=your-local-test-secret-key
```

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Run Server
```bash
python manage.py runserver
```

### 5. Test with curl

Register:
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123","email":"test@test.com"}'
```

Login:
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

Make Prediction (replace TOKEN with access token):
```bash
curl -X POST http://localhost:8000/api/predict/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"text":"example text"}'
```

## Security Best Practices

1. **Never hardcode JWT_SECRET_KEY** - Always use environment variables
2. **Use HTTPS in production** - JWT tokens should only be transmitted over HTTPS
3. **Store tokens securely** - Use httpOnly cookies when possible to prevent XSS attacks
4. **Set short token expiration** - Default is 24 hours, adjust in settings.py if needed
5. **Implement logout** - Clear tokens from storage on logout
6. **Rotate refresh tokens** - Already enabled in settings.py

## Configuration Details

Current JWT settings in `backend/settings.py`:

- **Access Token Lifetime**: 24 hours (configurable via `JWT_EXPIRATION_HOURS`)
- **Refresh Token Lifetime**: 7 days
- **Algorithm**: HS256
- **Rotate Refresh Tokens**: Enabled (new refresh token on each use)
- **Token Blacklist**: Enabled after rotation

## Troubleshooting

### Invalid Token Error
```json
{
  "detail": "Invalid token."
}
```
**Solution**: Check that token hasn't expired and is being sent correctly in Authorization header.

### Token Expired Error
```json
{
  "detail": "Token is invalid or expired"
}
```
**Solution**: Use refresh endpoint to get a new access token.

### Missing Authorization Header
```json
{
  "detail": "Authentication credentials were not provided."
}
```
**Solution**: Include `Authorization: Bearer TOKEN` header in request.

## Vercel Deployment

### 1. Add Environment Variables to Vercel

Go to Vercel Dashboard → Project Settings → Environment Variables

Add these variables:
- `JWT_SECRET_KEY`: Generate with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- `JWT_EXPIRATION_HOURS`: 24 (or your preferred value)

### 2. Deploy Backend

Your backend is ready to be deployed. Follow the [DEPLOYMENT.md](../DEPLOYMENT.md) guide.

### 3. Update Frontend

Update your frontend API calls to use the JWT authentication endpoints.

## Next Steps

1. ✅ Backend JWT setup completed
2. ⏳ Update frontend to use JWT authentication
3. ⏳ Deploy backend to production (Render, Railway, or DigitalOcean)
4. ⏳ Update frontend API_BASE_URL to production backend
5. ⏳ Test full authentication flow in production

---

**Questions?** Check the [DEPLOYMENT.md](../DEPLOYMENT.md) or [README.md](../README.md) for more information.
