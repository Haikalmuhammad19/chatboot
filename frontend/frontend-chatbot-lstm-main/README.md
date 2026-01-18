## Instalasi & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd frontend/frontend-chatbot-lstm-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
# Update VITE_API_BASE_URL sesuai backend URL Anda
```

### 4. Menjalankan Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173`

**Pastikan backend sudah berjalan di `http://localhost:8000`**

## Build Production

```bash
npm run build
```

## Deployment ke Vercel

1. Push ke GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Buka https://vercel.com dan connect repository
3. Vercel akan auto-detect Vite configuration
4. Set environment variable di Vercel dashboard:
   - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
5. Click "Deploy"
 