# 🔧 FIX 404 ERROR - DEPLOYMENT TROUBLESHOOTING

**Error**: 404: NOT_FOUND  
**Cause**: Vercel configuration issue atau build process tidak sempurna

---

## ✅ SOLUSI - LANGKAH DEMI LANGKAH

### STEP 1: Update vercel.json ✅ (Sudah Selesai!)

File sudah di-update dengan:
- ✅ SPA fallback rewrite (untuk React Router)
- ✅ Correct outputDirectory
- ✅ Environment variable configuration

### STEP 2: Push Changes ke GitHub

```bash
cd "f:\JOKI\BARUDAK NUSA PUTRA\BARUDAK TI\LALA\Chatbot"
git add .
git commit -m "Fix: Update vercel.json for SPA routing"
git push origin main
```

### STEP 3: Re-deploy di Vercel

**Option A: Automatic (via GitHub)**
1. Go to https://vercel.com/dashboard
2. Select your project (chatbot-lstm-frontend)
3. Click "Redeploy" atau tunggu automatic deployment
4. Tunggu sampai status "Ready"

**Option B: Force Rebuild**
1. Vercel Dashboard → Project Settings
2. Click "Redeploy" button
3. Jangan ubah settings, langsung deploy

**Option C: Via CLI**
```bash
npm install -g vercel
cd frontend/frontend-chatbot-lstm-main
vercel --prod
```

---

## 🔍 DEBUG CHECKLIST

### Backend Issues (Most Common for 404)
- [ ] Backend SUDAH di-deploy dan running
- [ ] Backend URL dapat diakses (test: `curl https://your-backend-url/api/health/`)
- [ ] CORS configured di backend settings.py
- [ ] Environment variable `VITE_API_BASE_URL` set di Vercel

### Frontend Issues
- [ ] `npm run build` success locally (test it!)
- [ ] `dist/` folder ter-generate dengan `index.html`
- [ ] vercel.json file exists dan valid JSON
- [ ] All dependencies installed (`npm install`)
- [ ] No TypeScript errors (`npm run typecheck`)

### Vercel Configuration
- [ ] Framework: Vite
- [ ] Root Directory: `frontend/frontend-chatbot-lstm-main`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm ci` atau `npm install`

---

## 🚨 COMMON FIXES

### Fix #1: Clean Build & Redeploy
```bash
# Locally
cd frontend/frontend-chatbot-lstm-main
rm -rf node_modules dist
npm install
npm run build

# Check if dist/index.html exists
ls dist/index.html  # Should succeed

# Then push to GitHub and redeploy
git add .
git commit -m "Fix: Force clean build"
git push origin main
```

### Fix #2: Verify vercel.json
Make sure file exists and is valid:
```bash
cd frontend/frontend-chatbot-lstm-main
cat vercel.json  # Should output valid JSON
```

Should output:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Fix #3: Check package.json Scripts
```bash
cd frontend/frontend-chatbot-lstm-main
cat package.json | grep -A 10 '"scripts"'
```

Should have `"build": "vite build"`

### Fix #4: Environment Variables in Vercel
1. Go to Vercel Dashboard
2. Select Project → Settings → Environment Variables
3. Add/Update:
   ```
   VITE_API_BASE_URL = http://localhost:8000/api  (untuk dev)
   ```
   OR
   ```
   VITE_API_BASE_URL = https://your-backend-url.com/api  (untuk prod)
   ```
4. Re-run deployment

---

## 📋 COMPLETE DEPLOYMENT CHECKLIST

### Before Deploy
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `dist/index.html` exists
- [ ] vercel.json valid JSON
- [ ] Pushed to GitHub main branch

### In Vercel Dashboard
- [ ] Project linked to GitHub repo
- [ ] Root directory: `frontend/frontend-chatbot-lstm-main`
- [ ] Environment variables set
- [ ] Build preview looks good
- [ ] Click "Promote to Production"

### After Deploy
- [ ] Can access website via Vercel domain
- [ ] Page loads without 404 errors
- [ ] Open Network tab in DevTools
- [ ] Check API calls to backend
- [ ] Test chatbot functionality

---

## 🆘 STILL GETTING 404?

### Debug Steps:

**1. Check Vercel Logs**
```
Vercel Dashboard 
  → Project 
  → Deployments 
  → Select latest deployment 
  → Click "Logs"
```

Look for:
- ❌ Build errors
- ❌ Missing files
- ❌ Installation errors

**2. Test Build Locally**
```bash
cd frontend/frontend-chatbot-lstm-main
npm run build
npm run preview
# Open http://localhost:4173
# Try navigating around, check console
```

**3. Check API Connection**
In browser DevTools → Network tab:
- API calls should go to `VITE_API_BASE_URL`
- Should see responses (or CORS errors)

**4. Verify Backend is Running**
```bash
# Test backend API
curl https://your-backend-url/api/health/
# Should return: {"status":"healthy",...}
```

---

## 🔧 IF STILL BROKEN: NUCLEAR OPTION

### Complete Fresh Deployment

```bash
# 1. Clean everything locally
cd "f:\JOKI\BARUDAK NUSA PUTRA\BARUDAK TI\LALA\Chatbot"
git status  # Should be clean

# 2. If not clean, stash changes
git stash

# 3. Go to Vercel Dashboard
# 4. Delete old project (optional)
# 5. Create new project from GitHub

# OR just redeploy:
# Vercel → Project Settings → Danger Zone → Redeploy All
```

---

## 📞 QUICK REFERENCE

| Issue | Check |
|-------|-------|
| 404 on all routes | vercel.json rewrites |
| API not working | VITE_API_BASE_URL env var |
| Styles missing | dist/ folder exists |
| Build failed | Check Vercel build logs |
| Page blank | Check browser console |

---

## ✅ EXPECTED RESULT

After fixes:
1. Website loads without 404 ✅
2. Can type in chatbot ✅
3. API calls to backend ✅
4. Get responses from ML model ✅
5. No console errors ✅

---

**If error persists, share:**
- Vercel build logs (screenshot)
- Browser console errors
- Backend URL (to test)
- Which step you're stuck on

Then I can debug specifically!
