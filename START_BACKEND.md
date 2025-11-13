# Cara Menjalankan Backend

## Quick Start

### Windows:
1. Double-click file `backend/start.bat`
2. Atau buka terminal di folder `backend` dan jalankan:
   ```bash
   npm run dev
   ```

### Mac/Linux:
```bash
cd backend
npm install  # Jika belum install
npm run dev
```

## Pastikan Backend Berjalan

Setelah menjalankan, Anda harus melihat:
```
🚀 Server running on http://localhost:3000
📡 API available at http://localhost:3000/api
```

## Test Backend

Buka browser dan kunjungi:
- `http://localhost:3000/api/health`

Seharusnya muncul:
```json
{
  "status": "OK",
  "message": "Backend API is running"
}
```

## Troubleshooting

Jika ada error, lihat file `TROUBLESHOOTING.md`

