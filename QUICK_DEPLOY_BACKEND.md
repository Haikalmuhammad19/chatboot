# 🚀 Full Stack Deployment Guide (5 Minutes!)

## Status
- ✅ Frontend: Deployed to Vercel
- ⏳ Backend: Ready to deploy (this guide)

## Deploy Backend in 5 Minutes

### 1️⃣ Go to Render.com
```
https://render.com
```
Click "Get Started" → Sign up with GitHub

### 2️⃣ Create Web Service
- Click **"New +"** → **"Web Service"**
- Connect your GitHub repo: **Haikalmuhammad19/chatboot**
- Name: **chatbot-backend**

### 3️⃣ Configure (copy-paste these exactly):

| Setting | Value |
|---------|-------|
| Build Command | `pip install -r requirements.txt && python manage.py migrate` |
| Start Command | `gunicorn backend.wsgi` |

### 4️⃣ Add Environment Variables (click Advanced)

```
SECRET_KEY = (generate new: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")
DEBUG = False
ALLOWED_HOSTS = *.onrender.com,chatbot-tawny.vercel.app
CORS_ALLOWED_ORIGINS = https://chatbot-tawny.vercel.app
JWT_SECRET_KEY = q#gk_k)i*&1^s--4&t1b7gz0si(gjhc$k0(ft**bs2342_6#jp
JWT_ALGORITHM = HS256
JWT_EXPIRATION_HOURS = 24
```

### 5️⃣ Deploy!
Click **"Create Web Service"** and wait 3-5 minutes

### 6️⃣ Get Your Backend URL
Render will give you: `https://chatbot-backend-xxxxx.onrender.com`

### 7️⃣ Update Frontend

Go to Vercel:
1. Dashboard → **chatboot-tawny**
2. Settings → **Environment Variables**
3. Add: `VITE_API_BASE_URL = https://chatbot-backend-xxxxx.onrender.com/api`
4. **Redeploy**

### 8️⃣ Done! 🎉
- Frontend: https://chatboot-tawny.vercel.app
- Backend: https://chatbot-backend-xxxxx.onrender.com
- Both live and connected!

---

## Verify It Works

### Test Backend Health
```bash
curl https://chatbot-backend-xxxxx.onrender.com/api/health/
```
Should return:
```json
{
  "status": "healthy",
  "message": "Subreddit Prediction API is running"
}
```

### Test Frontend
Open: https://chatboot-tawny.vercel.app
- Should load without errors
- Type a message and send
- Should get prediction response

---

## Troubleshooting

**Deployment fails?**
- Check Render logs (Logs tab)
- Most common: wrong environment variables
- Make sure Python 3.11.5 is used

**Frontend still shows error?**
- Verify environment variable is set correctly in Vercel
- Check capitalization: `VITE_API_BASE_URL` (all caps)
- Make sure you redeploy frontend after changing env vars

**CORS error?**
- Add frontend domain to `CORS_ALLOWED_ORIGINS` in backend env vars
- Render: https://chatbot-tawny.vercel.app

---

## Platform Comparison

| | Render | Railway | Heroku |
|---|--------|---------|--------|
| Free tier | ✅ Yes | ✅ Yes | ❌ No |
| Ease | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Sleep mode | 15 min idle | 30 min idle | N/A |
| **Recommend** | **✅ Best** | ✅ Good | ❌ Paid |

---

## Summary

1. Signup Render (2 min)
2. Connect GitHub (1 min)
3. Add env vars (1 min)
4. Deploy (3-5 min)
5. Update frontend (1 min)

**Total: ~10 minutes to full production! 🚀**

---

## Read More

Full detailed guide: [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md)

---

**Next: Go deploy! Your app is ready to go live!** 🎉
