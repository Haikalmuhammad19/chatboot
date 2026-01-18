# 🚨 URGENT: FIX 404 - ROOT DIRECTORY CONFIGURATION

**Status**: 404 NOT_FOUND masih terjadi
**Cause**: Vercel project tidak menggunakan root directory yang benar
**Solution**: Reconfigure Vercel project settings

---

## ⚡ QUICK FIX (5 MINUTES)

### Step 1: Go ke Vercel Dashboard
https://vercel.com/dashboard

### Step 2: Select Your Project
Klik project: `chatboot-tawny` (atau nama deployment Anda)

### Step 3: Go to Settings
Klik tab **Settings**

### Step 4: Find "Root Directory"
Cari "Root Directory" setting (biasanya di "Build & Development")

### Step 5: Set Correct Root Directory
Ubah dari kosong/default ke:
```
frontend/frontend-chatbot-lstm-main
```

### Step 6: Save Settings
Klik "Save"

### Step 7: Redeploy
Vercel Dashboard → Deployments → Klik "Redeploy" pada latest deployment

### Step 8: Wait & Test
Tunggu build selesai (status: "Ready ✓")
Buka website dan test

---

## 🔍 IF STILL 404: NUCLEAR OPTION

### Option A: Delete & Recreate Project

1. **Vercel Dashboard** → Select Project
2. **Settings** → Scroll to bottom → "Danger Zone"
3. Click **"Delete Project"**
4. Confirm deletion
5. Go to **https://vercel.com/new**
6. Select GitHub repository: `Haikalmuhammad19/chatboot`
7. **Root Directory**: `frontend/frontend-chatbot-lstm-main`
8. Click **Deploy**

⏱️ Time: 5-10 minutes

### Option B: Deploy Frontend Only

Jika ingin deploy frontend saja tanpa backend:

1. Create **new Vercel project** from GitHub
2. Select repo: `Haikalmuhammad19/chatboot`
3. **Root Directory**: `frontend/frontend-chatbot-lstm-main`
4. Click **Deploy**

This will auto-detect Vite and configure correctly.

---

## ✅ VERCEL SETTINGS CHECKLIST

Make sure these are set:

- [ ] **Framework**: Vite (auto-detected)
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`
- [ ] **Install Command**: `npm ci`
- [ ] **Root Directory**: `frontend/frontend-chatbot-lstm-main`
- [ ] **Node Version**: 18.x or higher (default is fine)

---

## 🔧 MANUAL VERIFICATION

Test locally before re-deploying:

```bash
cd frontend/frontend-chatbot-lstm-main

# Build
npm run build

# Check dist folder exists
ls dist/index.html
# Should output: dist/index.html

# Preview
npm run preview
# Open http://localhost:4173
# Should NOT show 404!
```

If works locally but fails on Vercel, then it's definitely the Root Directory setting.

---

## 📋 VERCEL CONFIGURATION EXPECTED

After fixing, Vercel should show:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm ci
Root Directory: frontend/frontend-chatbot-lstm-main
```

---

## 🚀 AFTER FIX

1. Website loads (no 404)
2. Can type in chatbot
3. Open DevTools → Network
4. Should see API calls
5. If API fails, that's next issue (not 404)

---

## 📞 IF STILL FAILING

Verify these files exist in your GitHub:
- `frontend/frontend-chatbot-lstm-main/package.json` ✓
- `frontend/frontend-chatbot-lstm-main/vite.config.ts` ✓
- `frontend/frontend-chatbot-lstm-main/src/main.tsx` ✓
- `frontend/frontend-chatbot-lstm-main/index.html` ✓
- `frontend/frontend-chatbot-lstm-main/vercel.json` ✓

If all exist, then it's 100% a Vercel configuration issue.

---

## 🎯 MOST COMMON ISSUE

**Problem**: Vercel is trying to deploy the root project directory instead of frontend subfolder

**Solution**: Set Root Directory to `frontend/frontend-chatbot-lstm-main`

**Result**: ✓ 404 fixed

---

**NEXT**: Go to Vercel and fix the Root Directory setting. This will 100% solve the 404 error!
