# 🚀 Panduan Deployment Project Asli Bogor

## Frontend di Vercel (Gratis)

### Langkah-langkah:

1. **Persiapan:**
   - Pastikan semua perubahan sudah di-push ke GitHub
   - Buat akun di [Vercel](https://vercel.com) (bisa login dengan GitHub)

2. **Deploy ke Vercel:**
   - Buka [Vercel Dashboard](https://vercel.com/dashboard)
   - Klik "Add New Project"
   - Import repository GitHub: `Ghinn/Project_Asli_Bogor`
   - Vercel akan auto-detect konfigurasi dari `vercel.json`

3. **Konfigurasi Build Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (root project)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `cd frontend && npm install`

4. **Environment Variables:**
   - Klik "Environment Variables"
   - Tambahkan:
     ```
     VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
     ```
   - Ganti `your-backend-url` dengan URL backend production (dari Render/Railway)

5. **Deploy:**
   - Klik "Deploy"
   - Tunggu proses build selesai
   - Website akan live di: `project-asli-bogor.vercel.app`

---

## Backend di Render (Gratis)

### Langkah-langkah:

1. **Persiapan:**
   - Buat akun di [Render](https://render.com) (bisa login dengan GitHub)

2. **Deploy Backend:**
   - Klik "New +" → "Web Service"
   - Connect repository GitHub: `Ghinn/Project_Asli_Bogor`

3. **Konfigurasi:**
   - **Name:** `asli-bogor-backend` (atau nama lain)
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** `backend`

4. **Environment Variables (jika ada):**
   - Tambahkan environment variables yang diperlukan

5. **Deploy:**
   - Klik "Create Web Service"
   - Tunggu deployment selesai
   - Backend akan live di: `asli-bogor-backend.onrender.com`

6. **Update Frontend:**
   - Setelah backend live, update `VITE_API_BASE_URL` di Vercel:
     ```
     VITE_API_BASE_URL=https://asli-bogor-backend.onrender.com/api
     ```
   - Redeploy frontend di Vercel

---

## Alternatif: Railway (Full-Stack)

Jika ingin deploy frontend dan backend di satu platform:

1. Buat akun di [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Pilih repository
4. Railway akan auto-detect dan deploy

---

## Catatan Penting:

- ✅ **CORS:** Pastikan backend mengizinkan request dari domain Vercel
- ✅ **Environment Variables:** Jangan commit file `.env` ke GitHub
- ✅ **Database:** File JSON di `backend/data/` akan reset setiap deploy (gunakan database eksternal untuk production)
- ✅ **Upload Files:** File upload akan hilang setelah restart (gunakan cloud storage seperti Cloudinary/S3)

---

## Troubleshooting:

**Frontend tidak bisa connect ke backend:**
- Cek `VITE_API_BASE_URL` di Vercel Environment Variables
- Pastikan backend sudah live dan accessible
- Cek CORS settings di backend

**Build error di Vercel:**
- Pastikan `vercel.json` sudah ada di root project
- Cek build logs di Vercel dashboard

**Backend error di Render:**
- Cek logs di Render dashboard
- Pastikan `package.json` di backend memiliki script `start`
- Pastikan port menggunakan `process.env.PORT || 3000`

