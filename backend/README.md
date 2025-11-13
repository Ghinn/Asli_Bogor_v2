# Backend API - Asli Bogor

Backend API untuk aplikasi Asli Bogor menggunakan Node.js dan Express.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Jalankan server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Registrasi user baru
  - Body: `{ name, email, password, role, phone?, address?, description?, businessName? }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`

### Users (Admin)

- `GET /api/users` - Get all users
  - Query params: `role?`, `status?`
  
- `GET /api/users/:id` - Get user by ID

- `PATCH /api/users/:id/status` - Update user status
  - Body: `{ status: 'active' | 'inactive' | 'pending' }`

## Data Storage

Data disimpan dalam file JSON di `data/users.json`. Untuk production, disarankan menggunakan database seperti PostgreSQL atau MongoDB.

