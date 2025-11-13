import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_FILE = join(__dirname, '../data/users.json');

// Helper function untuk membaca data dari file
async function readUsers() {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Jika file tidak ada, return array kosong
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function untuk menulis data ke file
async function writeUsers(users) {
  await writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

// Get all users
export async function getAllUsers() {
  return await readUsers();
}

// Get user by ID
export async function getUserById(id) {
  const users = await readUsers();
  return users.find(user => user.id === id);
}

// Get user by email
export async function getUserByEmail(email) {
  const users = await readUsers();
  return users.find(user => user.email === email);
}

// Save new user
export async function saveUser(newUser) {
  const users = await readUsers();
  users.push(newUser);
  await writeUsers(users);
  return newUser;
}

// Update user
export async function updateUser(id, updates) {
  const users = await readUsers();
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    throw new Error('User tidak ditemukan');
  }

  users[index] = { ...users[index], ...updates };
  await writeUsers(users);
  return users[index];
}

// Delete user
export async function deleteUser(id) {
  const users = await readUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  await writeUsers(filteredUsers);
  return true;
}

