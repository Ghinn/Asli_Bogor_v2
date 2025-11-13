# Troubleshooting - Failed to Fetch

## Error: "Failed to fetch" saat registrasi

Error ini biasanya terjadi karena backend tidak berjalan atau ada masalah koneksi.

### Solusi 1: Pastikan Backend Berjalan

1. Buka terminal baru
2. Masuk ke folder backend:
   ```bash
   cd backend
   ```
3. Install dependencies (jika belum):
   ```bash
   npm install
   ```
4. Jalankan backend:
   ```bash
   npm run dev
   ```
5. Pastikan muncul pesan:
   ```
   🚀 Server running on http://localhost:3000
   📡 API available at http://localhost:3000/api
   ```

### Solusi 2: Cek Port Backend

Pastikan port 3000 tidak digunakan aplikasi lain:

**Windows:**
```powershell
netstat -ano | findstr :3000
```

**Mac/Linux:**
```bash
lsof -i :3000
```

Jika port sudah digunakan, ubah port di `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Ubah ke port lain
```

Dan update `frontend/src/config/api.ts`:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
```

### Solusi 3: Cek URL API

Pastikan URL API di frontend benar. Buka browser console (F12) dan cek:
- Network tab → Lihat request yang gagal
- Console tab → Lihat error detail

### Solusi 4: Test Backend Manual

Test apakah backend berjalan dengan baik:

1. Buka browser
2. Kunjungi: `http://localhost:3000/api/health`
3. Seharusnya muncul:
   ```json
   {
     "status": "OK",
     "message": "Backend API is running"
   }
   ```

### Solusi 5: Cek CORS

Jika masih error, cek apakah CORS sudah benar di `backend/server.js`:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // URL frontend
  credentials: true
}));
```

### Solusi 6: Cek Error di Backend Console

Lihat terminal tempat backend berjalan, cek apakah ada error:
- Import error
- Module not found
- Port already in use

### Solusi 7: Restart Backend

1. Stop backend (Ctrl+C)
2. Hapus `node_modules` dan install ulang:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Jalankan lagi:
   ```bash
   npm run dev
   ```

## Checklist

- [ ] Backend sudah berjalan di terminal
- [ ] Port 3000 tidak digunakan aplikasi lain
- [ ] Dependencies sudah terinstall (`npm install` di folder backend)
- [ ] URL API di frontend benar (`http://localhost:3000/api`)
- [ ] Browser console tidak ada error lain
- [ ] Network tab menunjukkan request ke backend

## Test Manual API

Test registrasi dengan curl atau Postman:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test UMKM",
    "email": "test@test.com",
    "password": "123456",
    "role": "umkm",
    "address": "Bogor",
    "description": "Test"
  }'
```

Jika ini berhasil, berarti backend OK dan masalahnya di frontend.

