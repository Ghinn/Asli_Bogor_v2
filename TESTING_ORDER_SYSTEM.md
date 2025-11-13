# Panduan Testing Sistem Order

## Setup Awal

### 1. Pastikan Backend Berjalan
```bash
cd backend
npm run dev
```
Backend harus berjalan di `http://localhost:3000`

### 2. Pastikan Frontend Berjalan
```bash
cd frontend
npm run dev
```
Frontend harus berjalan di `http://localhost:5173`

## Data Testing yang Tersedia

### UMKM Contoh (sudah ditambahkan di backend/data/users.json):
1. **Tahu Gejrot Pak Haji**
   - Email: `tahu.gejrot.pak.haji@gmail.com`
   - Password: `123123`
   - StoreName: `Tahu Gejrot Pak Haji`

2. **Es Pala Pak Sahak**
   - Email: `es.pala.pak.sahak@gmail.com`
   - Password: `123123`
   - StoreName: `Es Pala Pak Sahak`

3. **Makaroni Ngehe**
   - Email: `makaroni.ngehe@gmail.com`
   - Password: `123123`
   - StoreName: `Makaroni Ngehe`

4. **Kopi Kenangan Bogor**
   - Email: `kopi.kenangan.bogor@gmail.com`
   - Password: `123123`
   - StoreName: `Kopi Kenangan Bogor`

5. **Kerajinan Bambu Ibu Siti**
   - Email: `kerajinan.bambu.ibu.siti@gmail.com`
   - Password: `123123`
   - StoreName: `Kerajinan Bambu Ibu Siti`

6. **Batik Bogor Tradisiku**
   - Email: `batik.bogor.tradisiku@gmail.com`
   - Password: `123123`
   - StoreName: `Batik Bogor Tradisiku`

### Driver Contoh:
- Email: `driver1@gmail.com`
- Password: `123123`

### User/Pembeli Contoh:
- Email: `aisyahputrihhh16@gmail.com` atau buat akun baru
- Password: sesuai yang didaftarkan

## Testing Flow

### Test 1: User Membuat Order

1. **Login sebagai User/Pembeli**
   - Login dengan akun user
   - Pastikan sudah ada item di keranjang (contoh: Tahu Gejrot Original dari "Tahu Gejrot Pak Haji")

2. **Checkout**
   - Buka halaman "Keranjang"
   - Pilih item yang ingin dibeli
   - Klik "Checkout"
   - Pilih metode pembayaran
   - Klik "Bayar Sekarang"

3. **Verifikasi**
   - Order harus berhasil dibuat
   - Notifikasi muncul: "Pesanan baru terkirim ke [nama toko]"
   - Cek di `backend/data/orders.json` - harus ada order baru

### Test 2: UMKM Menerima Notifikasi

1. **Login sebagai UMKM**
   - Login dengan `tahu.gejrot.pak.haji@gmail.com` / `123123`
   - Buka halaman "Manajemen Pesanan"

2. **Verifikasi**
   - Order baru harus muncul di tab "Pesanan Baru"
   - Notifikasi toast muncul: "Pesanan baru dari [nama pembeli]"
   - Cek notifikasi di halaman "Notifikasi"

3. **Update Status**
   - Klik order baru
   - Ubah status menjadi "Siap Diambil" (ready)
   - Driver harus mendapat notifikasi

### Test 3: Driver Menerima Notifikasi

1. **Login sebagai Driver**
   - Login dengan `driver1@gmail.com` / `123123`
   - Buka halaman "Order Aktif"

2. **Verifikasi**
   - Order dengan status "ready" harus muncul
   - Notifikasi toast muncul: "Order baru siap diambil di [nama toko]"

3. **Ambil Order**
   - Klik "Ambil Order" pada order yang tersedia
   - Status order menjadi "Sedang Diantar" (pickup)
   - UMKM dan User mendapat notifikasi

4. **Selesaikan Order**
   - Klik "Selesai" setelah mengantar
   - Status order menjadi "Selesai" (delivered)
   - User mendapat notifikasi

### Test 4: Admin Melihat Semua Orders

1. **Login sebagai Admin**
   - Login dengan `admin@gmail.com` / `123123`
   - Buka halaman "Manajemen Order"

2. **Verifikasi**
   - Semua orders dari semua UMKM harus muncul
   - Bisa filter berdasarkan status
   - Bisa lihat detail order lengkap
   - Bisa search berdasarkan ID, nama user, atau nama toko

## Troubleshooting

### Error: "UMKM tidak ditemukan"
**Penyebab**: UMKM dengan storeName tersebut belum ada di backend atau backend belum restart.

**Solusi**:
1. Restart backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. Pastikan UMKM sudah ada di `backend/data/users.json`
3. Pastikan UMKM memiliki `storeName` yang sesuai
4. Pastikan UMKM `status: "active"` dan `isVerified: true`

### Error: "Failed to fetch"
**Penyebab**: Backend tidak berjalan atau URL API salah.

**Solusi**:
1. Pastikan backend berjalan di `http://localhost:3000`
2. Cek `frontend/.env` atau `frontend/src/config/api.ts` untuk `API_BASE_URL`
3. Cek console browser untuk error detail

### Order tidak muncul di UMKM dashboard
**Penyebab**: Filter order di frontend hanya menampilkan order untuk UMKM yang sedang login.

**Solusi**:
1. Pastikan login dengan UMKM yang benar (yang memiliki order)
2. Pastikan `umkmId` di order sesuai dengan `id` UMKM yang login
3. Refresh halaman atau tunggu auto-refresh (30 detik)

### Notifikasi tidak muncul
**Penyebab**: Notifikasi hanya muncul jika backend berhasil create notification.

**Solusi**:
1. Cek `backend/data/notifications.json` - harus ada notifikasi baru
2. Pastikan `userId` di notification sesuai dengan user yang login
3. Refresh halaman atau tunggu auto-refresh (30 detik)
4. Cek console browser untuk error

## File yang Perlu Diperhatikan

- `backend/data/orders.json` - Semua order data
- `backend/data/notifications.json` - Semua notifikasi
- `backend/data/users.json` - Semua user data (termasuk UMKM)

## API Endpoints

- `GET /api/orders` - Get all orders (filter: userId, umkmId, driverId, status)
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/notifications/user/:userId` - Get notifications for user
- `GET /api/users?role=UMKM` - Get all UMKM users

## Tips Testing

1. **Gunakan Multiple Browser/Incognito**: Untuk test flow lengkap (User, UMKM, Driver) secara bersamaan
2. **Check Backend Files**: Langsung cek `backend/data/*.json` untuk verifikasi data
3. **Monitor Console**: Check browser console dan terminal backend untuk error messages
4. **Auto-Refresh**: System auto-refresh setiap 30 detik, tunggu sebentar jika data belum muncul

