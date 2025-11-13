import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { saveUser, getUserByEmail, getAllUsers } from '../models/userModel.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, description, businessName } = req.body;

    // Validasi input
    if (!name && !businessName) {
      return res.status(400).json({ error: 'Nama atau nama bisnis harus diisi' });
    }
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, dan role harus diisi' });
    }

    // Cegah registrasi dengan email admin
    if (email === 'admin@gmail.com') {
      return res.status(400).json({ error: 'Email ini tidak dapat digunakan untuk registrasi' });
    }

    // Cegah registrasi role admin
    if (role === 'admin') {
      return res.status(400).json({ error: 'Role admin tidak dapat didaftarkan' });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tentukan nama berdasarkan role
    const displayName = role === 'umkm' ? businessName : name;

    // Buat user object
    const newUser = {
      id: uuidv4(),
      name: displayName,
      email,
      password: hashedPassword,
      role,
      phone: phone || null,
      address: address || null,
      description: description || null,
      status: role === 'admin' || role === 'user' ? 'active' : 'pending', // Driver dan UMKM perlu verifikasi
      isVerified: role === 'admin' || role === 'user',
      isOnboarded: role === 'user' || role === 'admin',
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Simpan user
    await saveUser(newUser);

    // Return user tanpa password
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat registrasi' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password harus diisi' });
    }

    // Cari user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Return user tanpa password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login berhasil',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat login' });
  }
};

