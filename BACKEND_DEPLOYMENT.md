# Backend Deployment Guide - Render.com (Free & Easy)

## Overview

This guide will help you deploy the Django backend to **Render.com** in 5 minutes. Backend will be publicly accessible without any local setup needed.

## Prerequisites

- GitHub account (you already have this ✅)
- Render.com account (free signup)
- Project pushed to GitHub (you already did this ✅)

## Quick Deploy to Render (5 minutes)

### Step 1: Sign Up to Render.com

1. Go to https://render.com
2. Click "Get Started" → "Sign up with GitHub"
3. Authorize Render to access your GitHub
4. Create free account

### Step 2: Create New Web Service

1. On Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Choose repository: **Haikalmuhammad19/chatboot**
4. Click **"Connect"**

### Step 3: Configure Deployment

**Service Settings:**

| Field | Value |
|-------|-------|
| **Name** | `chatbot-backend` (or any name you prefer) |
| **Environment** | `Python 3` |
| **Region** | `Singapore` or `US (Ohio)` |
| **Branch** | `main` |
| **Build Command** | `pip install -r requirements.txt && python manage.py migrate` |
| **Start Command** | `gunicorn backend.wsgi` |

### Step 4: Add Environment Variables

Click **"Advanced"** and add these environment variables:

```
SECRET_KEY = [generate new with: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"]
DEBUG = False
ALLOWED_HOSTS = *.onrender.com,chatbot-tawny.vercel.app,localhost
CORS_ALLOWED_ORIGINS = https://chatbot-tawny.vercel.app,http://localhost:5173
JWT_SECRET_KEY = q#gk_k)i*&1^s--4&t1b7gz0si(gjhc$k0(ft**bs2342_6#jp
JWT_ALGORITHM = HS256
JWT_EXPIRATION_HOURS = 24
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://chatbot-backend-xxxxx.onrender.com`
4. Copy this URL!

### Step 6: Update Frontend API URL

Now update your frontend to use production backend:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click project **chatboot-tawny**
3. Click **Settings** → **Environment Variables**
4. Update: `VITE_API_BASE_URL = https://chatbot-backend-xxxxx.onrender.com/api`
5. **Redeploy** the frontend

### Step 7: Test

1. Open https://chatboot-tawny.vercel.app/
2. Health check should work: https://chatbot-backend-xxxxx.onrender.com/api/health/
3. Chatbot should work without errors!

---

## Alternative: Deploy to Railway.app

If you prefer Railway.app:

### Step 1: Go to Railway

1. https://railway.app
2. Sign up with GitHub
3. Authorize Railway

### Step 2: Create New Project

1. Dashboard → **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: **Haikalmuhammad19/chatboot**
4. Click **"Add Variables"**

### Step 3: Add Environment Variables

Same variables as Render (see Step 4 above).

### Step 3: Deploy

1. Railway will auto-detect it's a Django project
2. Build and deploy automatically
3. Get your production URL from the Railway dashboard

---

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `SECRET_KEY` | Django secret key (must be random) | `django-insecure-xxx...` |
| `DEBUG` | Production mode (MUST be False) | `False` |
| `ALLOWED_HOSTS` | Which domains can access API | `*.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | Which frontend domains allowed | `https://chatboot-tawny.vercel.app` |
| `JWT_SECRET_KEY` | JWT token secret | Your generated key |
| `JWT_ALGORITHM` | JWT algorithm | `HS256` |
| `JWT_EXPIRATION_HOURS` | Token expiration time | `24` |

---

## API Endpoints (After Deployment)

### Public Endpoints

```
GET https://chatbot-backend-xxxxx.onrender.com/api/health/
```

### Authentication Endpoints

```
POST https://chatbot-backend-xxxxx.onrender.com/api/auth/register/
POST https://chatbot-backend-xxxxx.onrender.com/api/auth/login/
POST https://chatbot-backend-xxxxx.onrender.com/api/auth/refresh/
GET  https://chatbot-backend-xxxxx.onrender.com/api/auth/test/
```

### Protected Endpoints (require JWT)

```
POST https://chatbot-backend-xxxxx.onrender.com/api/predict/
GET  https://chatbot-backend-xxxxx.onrender.com/api/history/
```

---

## Troubleshooting

### Deploy fails with "ModuleNotFoundError"

**Solution**: Make sure all dependencies are in `requirements.txt`
```bash
pip freeze > requirements.txt
git add requirements.txt
git commit -m "Update requirements"
git push
```

### Backend returning 500 errors

1. Go to Render/Railway dashboard
2. Click your service
3. Check **"Logs"** tab for error messages
4. Common issues:
   - Missing environment variables
   - Database connection error
   - Python version mismatch

### CORS errors from frontend

Add your frontend URL to `CORS_ALLOWED_ORIGINS`:
```
CORS_ALLOWED_ORIGINS = https://chatboot-tawny.vercel.app,https://your-new-domain.com
```

### Database errors

SQLite won't work on production. If needed, Render provides free PostgreSQL:

1. In Render dashboard: **"New +"** → **"PostgreSQL"**
2. Create database
3. Add connection string to environment: `DATABASE_URL`

But for now, SQLite is fine for testing.

---

## Monitoring Your Deployment

### Render.com

1. Go to your service
2. **"Logs"** tab - see real-time logs
3. **"Metrics"** tab - monitor CPU/Memory
4. **"Settings"** tab - modify configuration

### Railway.app

1. Go to your project
2. **"Logs"** tab - see deployment logs
3. **"Metrics"** - monitor resource usage
4. Can redeploy with one click

---

## Summary

| Step | What | Time |
|------|------|------|
| 1 | Sign up to Render | 2 min |
| 2 | Connect GitHub | 1 min |
| 3 | Add environment variables | 1 min |
| 4 | Deploy | 3-5 min |
| 5 | Update frontend URL | 1 min |
| **Total** | **Backend in production!** | **~10 min** |

---

## Your Deployment Checklist

- [ ] Sign up to Render.com
- [ ] Create Web Service from GitHub
- [ ] Add all environment variables
- [ ] Deploy (wait for success)
- [ ] Copy production backend URL
- [ ] Update frontend VITE_API_BASE_URL in Vercel
- [ ] Redeploy frontend on Vercel
- [ ] Test: Open frontend → should work without errors!
- [ ] Celebrate! 🎉

---

## Next Steps

1. **Deploy now** using steps above
2. **Test thoroughly** - register, login, make predictions
3. **Monitor logs** - make sure no errors
4. **Share with others** - your app is live!

## Need Help?

- Render docs: https://render.com/docs
- Railway docs: https://docs.railway.app
- Django docs: https://docs.djangoproject.com
- Check logs in your platform dashboard for errors

---

## Backend URL After Deployment

Once deployed, your backend will be at:

```
https://chatbot-backend-xxxxx.onrender.com
```

Use this in your frontend's `VITE_API_BASE_URL`!

---

**You're almost there! Deploy now and your app will be 100% live!** 🚀
