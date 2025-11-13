# Setup Backend - Asli Bogor

## Cara Menjalankan Backend

### 1. Install Dependencies

Masuk ke folder backend dan install dependencies:

```bash
cd backend
npm install
```

### 2. Jalankan Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Cara Menjalankan Frontend

### 1. Install Dependencies (jika belum)

```bash
cd frontend
npm install
```

### 2. Jalankan Frontend

```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173` (default Vite)

## Konfigurasi API

Frontend akan otomatis menggunakan `http://localhost:3000/api` sebagai base URL.

Jika backend berjalan di port atau URL yang berbeda, buat file `.env` di folder `frontend`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Testing

### 1. Test Registrasi Driver

1. Buka aplikasi di browser
2. Klik "Daftar" → Pilih "Driver"
3. Isi form:
   - Nama Lengkap
   - Email
   - Nomor HP
   - Password
4. Submit form
5. Data akan tersimpan di `backend/data/users.json`

### 2. Test Registrasi UMKM

1. Buka aplikasi di browser
2. Klik "Daftar" → Pilih "UMKM"
3. Isi form:
   - Nama UMKM
   - Email
   - Alamat
   - Deskripsi Singkat
   - Password
4. Submit form
5. Data akan tersimpan di `backend/data/users.json`

### 3. Test Admin View

1. Login sebagai admin:
   - Email: `admin@gmail.com`
   - Password: `123456`
2. Masuk ke menu "Manajemen Data"
3. Data driver dan UMKM yang sudah terdaftar akan muncul di tabel
4. Admin bisa:
   - Filter berdasarkan role (UMKM, Driver, User)
   - Filter berdasarkan status (Active, Inactive, Pending)
   - Update status user melalui dropdown menu
   - Refresh data

## API Endpoints

### Authentication

- `POST /api/auth/register` - Registrasi user baru
  ```json
  {
    "name": "Nama User",
    "email": "user@email.com",
    "password": "password123",
    "role": "driver" | "umkm" | "user",
    "phone": "081234567890", // optional untuk driver
    "address": "Alamat", // optional untuk UMKM
    "description": "Deskripsi", // optional untuk UMKM
    "businessName": "Nama Bisnis" // untuk UMKM
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@email.com",
    "password": "password123"
  }
  ```

### Users (Admin)

- `GET /api/users` - Get all users
  - Query params: `?role=UMKM&status=pending`
  
- `GET /api/users/:id` - Get user by ID

- `PATCH /api/users/:id/status` - Update user status
  ```json
  {
    "status": "active" | "inactive" | "pending"
  }
  ```

## Data Storage

Data disimpan dalam file JSON di `backend/data/users.json`. 

**Catatan:** File ini akan dibuat otomatis saat pertama kali ada data yang disimpan.

## File Upload

File yang di-upload saat onboarding driver dan UMKM akan disimpan di folder `backend/uploads/` dengan struktur:

```
backend/uploads/
├── driver/          # File dokumen driver (KTP, SIM, STNK, Selfie, Foto Kendaraan)
└── umkm/            # File dokumen UMKM (KTP, Foto Toko, Izin Usaha)
```

### Format Nama File

File disimpan dengan format: `userId_timestamp_originalname`

Contoh: `abc123_1703123456789_ktp.jpg`

### File yang Di-upload

**Driver:**
- Foto KTP
- Foto SIM C
- Foto STNK
- Foto Selfie
- Foto Kendaraan

**UMKM:**
- Foto KTP Pemilik
- Foto Tempat Usaha
- Izin Usaha (opsional, bisa PDF atau gambar)

### Mengakses File yang Di-upload

File dapat diakses melalui URL:
- `http://localhost:3000/uploads/driver/filename.jpg`
- `http://localhost:3000/uploads/umkm/filename.jpg`

Path file juga tersimpan di database user untuk referensi.

## Troubleshooting

### Backend tidak bisa start

1. Pastikan port 3000 tidak digunakan aplikasi lain
2. Cek apakah semua dependencies sudah terinstall
3. Pastikan Node.js versi 18+ terinstall

### Frontend tidak bisa connect ke backend

1. Pastikan backend sudah running di `http://localhost:3000`
2. Cek console browser untuk error CORS (seharusnya sudah di-handle)
3. Pastikan URL API di `frontend/src/config/api.ts` benar

### Data tidak muncul di admin

1. Pastikan sudah ada data di `backend/data/users.json`
2. Cek network tab di browser untuk melihat response API
3. Pastikan filter tidak terlalu ketat

