// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const api = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
  },
  users: {
    getAll: `${API_BASE_URL}/users`,
    getById: (id: string) => `${API_BASE_URL}/users/${id}`,
    updateStatus: (id: string) => `${API_BASE_URL}/users/${id}/status`,
  },
  upload: {
    driver: `${API_BASE_URL}/upload/driver`,
    umkm: `${API_BASE_URL}/upload/umkm`,
  },
  orders: {
    getAll: `${API_BASE_URL}/orders`,
    getById: (id: string) => `${API_BASE_URL}/orders/${id}`,
    create: `${API_BASE_URL}/orders`,
    updateStatus: (id: string) => `${API_BASE_URL}/orders/${id}/status`,
    delete: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
  notifications: {
    getAll: `${API_BASE_URL}/notifications`,
    getByUser: (userId: string) => `${API_BASE_URL}/notifications/user/${userId}`,
    getUnreadCount: (userId: string) => `${API_BASE_URL}/notifications/user/${userId}/unread-count`,
    create: `${API_BASE_URL}/notifications`,
    markAsRead: (id: string) => `${API_BASE_URL}/notifications/${id}/read`,
    markAllAsRead: (userId: string) => `${API_BASE_URL}/notifications/user/${userId}/read-all`,
    delete: (id: string) => `${API_BASE_URL}/notifications/${id}`,
    clear: (userId: string) => `${API_BASE_URL}/notifications/user/${userId}`,
  },
};

