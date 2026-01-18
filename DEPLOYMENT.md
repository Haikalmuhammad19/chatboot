# 🚀 DEPLOYMENT GUIDE

Panduan lengkap untuk men-deploy project ini ke GitHub dan Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Git installed
- Backend API sudah siap (accessible URL)

---

## STEP 1: Prepare Project untuk GitHub

### 1.1 Verify .gitignore files

✅ Backend `.gitignore` sudah ada
✅ Frontend `.gitignore` sudah ada
✅ Root `.gitignore` sudah ada

File-file penting akan di-ignore:
- `node_modules/`
- `venv/` / `env/`
- `.env` files
- `__pycache__/`
- `*.db` (database)

### 1.2 Verify Environment Files

**Backend:**
- ✅ `.env.example` sudah ada
- Berisi: `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, dll

**Frontend:**
- ✅ `.env.example` sudah ada
- Berisi: `VITE_API_BASE_URL`

---

## STEP 2: Setup Git & GitHub

### 2.1 Initialize Git Repository (if not exists)

```bash
cd "f:\JOKI\BARUDAK NUSA PUTRA\BARUDAK TI\LALA\Chatbot"
git init
git add .
git commit -m "Initial commit - Ready for deployment"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create repository: `chatbot-lstm` (or your preferred name)
3. Follow GitHub instructions untuk connect local repo

```bash
git remote add origin https://github.com/your-username/chatbot-lstm.git
git branch -M main
git push -u origin main
```

---

## STEP 3: Frontend Deployment to Vercel

### 3.1 Build Frontend Locally (Test)

```bash
cd frontend/frontend-chatbot-lstm-main
npm run build
```

Verify `dist/` folder tercipta dengan baik.

### 3.2 Deploy to Vercel

**Option A: CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend/frontend-chatbot-lstm-main
vercel
```

Follow prompts:
- Link to existing Vercel project? → No
- Project name → `chatbot-lstm-frontend`
- Framework preset → Vite
- Root directory → ./

**Option B: Vercel Dashboard**

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select GitHub repository `chatbot-lstm`
4. Framework → Vite (auto-detected)
5. Root directory → `frontend/frontend-chatbot-lstm-main`
6. Click Deploy

### 3.3 Configure Environment Variables

Di Vercel Dashboard → Project Settings → Environment Variables

Tambahkan:
```
VITE_API_BASE_URL = https://your-backend-domain.com/api
```

(Update dengan backend URL Anda)

### 3.4 Verify Deployment

1. Vercel akan provide domain (misal: `chatbot-lstm-frontend.vercel.app`)
2. Test buka di browser
3. Check browser console untuk errors

---

## STEP 4: Backend Deployment Options

### Option A: Deploy ke Render (Recommended untuk Django)

1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect GitHub repository
5. Configure:
   - Root directory: `backend/backend-chatbot-lstm-main`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`
6. Environment Variables:
   ```
   SECRET_KEY = generate-secret-key
   DEBUG = False
   ALLOWED_HOSTS = render-domain.onrender.com,yourfrontend.vercel.app
   CORS_ALLOWED_ORIGINS = https://yourfrontend.vercel.app
   ```
7. Click Deploy

**Update Vercel Environment:**
```
VITE_API_BASE_URL = https://your-render-backend.onrender.com/api
```

### Option B: Railway.app

1. Go to https://railway.app
2. New Project → GitHub Repo
3. Select repository
4. Configure environment & deploy

### Option C: DigitalOcean App Platform

1. Go to https://www.digitalocean.com/products/app-platform
2. Create App → GitHub
3. Configure & deploy

### Option D: AWS / Azure

Lebih complex, untuk production enterprise.

---

## STEP 5: Post-Deployment Checks

### 5.1 Frontend Check

- [ ] Website loads di Vercel domain
- [ ] No console errors
- [ ] API calls work (check Network tab)
- [ ] Chatbot responds correctly

### 5.2 Backend Check

- [ ] Health check endpoint responds: `GET /api/health/`
- [ ] Predict endpoint works: `POST /api/predict/`
- [ ] CORS headers properly set

Test API dengan curl:
```bash
# Health check
curl https://your-backend-domain.com/api/health/

# Predict
curl -X POST https://your-backend-domain.com/api/predict/ \
  -H "Content-Type: application/json" \
  -d '{"text":"I am feeling sad"}'
```

### 5.3 Update Frontend Environment

After backend deployment, update Vercel environment:

Dashboard → Settings → Environment Variables:
```
VITE_API_BASE_URL = https://your-actual-backend-domain.com/api
```

Redeploy:
```bash
vercel --prod
```

---

## STEP 6: Custom Domain (Optional)

### Frontend Custom Domain

Vercel Dashboard → Domains:
1. Add custom domain (misal: `chatbot.example.com`)
2. Update DNS records sesuai instruksi Vercel
3. SSL auto-configured

### Backend Custom Domain

Tergantung platform:
- **Render**: Settings → Custom Domain
- **Railway**: Add domain via dashboard
- **DigitalOcean**: Configure DNS

---

## 🔐 Security Checklist

Before Production:

- [ ] Change `SECRET_KEY` di backend (.env)
- [ ] Set `DEBUG = False` di backend
- [ ] Verify `ALLOWED_HOSTS` correct
- [ ] Setup HTTPS (auto di Vercel, configure di backend)
- [ ] Check CORS configuration
- [ ] Database backup strategy
- [ ] Rate limiting (if needed)
- [ ] Input validation

---

## 📝 Important Files for Deployment

**Backend:**
- `requirements.txt` ✅
- `.env.example` ✅
- `manage.py` ✅
- `backend/settings.py` ✅
- `.gitignore` ✅

**Frontend:**
- `package.json` ✅
- `vite.config.ts` ✅
- `.env.example` ✅
- `vercel.json` ✅
- `.gitignore` ✅

**Root:**
- `README.md` ✅
- `.gitignore` ✅

---

## 🆘 Troubleshooting

### Frontend Error: "Cannot reach API"

**Solution:**
1. Check `VITE_API_BASE_URL` di Vercel environment
2. Verify backend URL is correct & accessible
3. Check CORS headers in backend
4. Check browser Network tab for actual requests

### Backend Error: "Module not found"

**Solution:**
```bash
pip install -r requirements.txt
python manage.py migrate
```

### CORS Issues

**Check backend settings.py:**
```python
CORS_ALLOWED_ORIGINS = [
    'https://your-vercel-domain.com',
    # other domains
]
```

### Database Issues

```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## 📞 Support

Jika ada masalah saat deployment:

1. Check Vercel logs: Dashboard → Deployments → Logs
2. Check backend server logs (where you deploy it)
3. Use browser DevTools → Network tab untuk debug API calls
4. Check environment variables sudah set correctly

---

## 🎉 Success!

Setelah semua steps selesai, project Anda sudah live di:

- **Frontend**: `https://your-domain.vercel.app`
- **Backend**: `https://your-backend-domain.com`

Congratulations! 🚀
