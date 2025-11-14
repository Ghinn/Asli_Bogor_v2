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
    productImage: `${API_BASE_URL}/upload/products`,
  },
  orders: {
    getAll: `${API_BASE_URL}/orders`,
    getById: (id: string) => `${API_BASE_URL}/orders/${id}`,
    create: `${API_BASE_URL}/orders`,
    updateStatus: (id: string) => `${API_BASE_URL}/orders/${id}/status`,
    updateTracking: (id: string) => `${API_BASE_URL}/orders/${id}/tracking`,
    processPayment: `${API_BASE_URL}/orders/payment`,
    delete: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
  wallet: {
    getByUser: (userId: string) => `${API_BASE_URL}/wallet/${userId}`,
    topUp: `${API_BASE_URL}/wallet/topup`,
    deduct: `${API_BASE_URL}/wallet/deduct`,
    getTransactions: (userId: string) => `${API_BASE_URL}/wallet/${userId}/transactions`,
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
  products: {
    getAll: `${API_BASE_URL}/products`,
    getByUMKM: (umkmId: string) => `${API_BASE_URL}/products/umkm/${umkmId}`,
    getById: (id: string) => `${API_BASE_URL}/products/${id}`,
    create: `${API_BASE_URL}/products`,
    update: (id: string) => `${API_BASE_URL}/products/${id}`,
    delete: (id: string) => `${API_BASE_URL}/products/${id}`,
  },
  cart: {
    getByUser: (userId: string) => `${API_BASE_URL}/cart/${userId}`,
    add: `${API_BASE_URL}/cart/add`,
    update: (id: string) => `${API_BASE_URL}/cart/${id}`,
    delete: (id: string) => `${API_BASE_URL}/cart/${id}`,
    clear: `${API_BASE_URL}/cart/clear`,
  },
  wallet: {
    getByUser: (userId: string) => `${API_BASE_URL}/wallet/${userId}`,
    topUp: `${API_BASE_URL}/wallet/topup`,
    getTransactions: (userId: string) => `${API_BASE_URL}/wallet/${userId}/transactions`,
  },
  orders: {
    getAll: `${API_BASE_URL}/orders`,
    getById: (id: string) => `${API_BASE_URL}/orders/${id}`,
    create: `${API_BASE_URL}/orders`,
    updateStatus: (id: string) => `${API_BASE_URL}/orders/${id}/status`,
    updateTracking: (id: string) => `${API_BASE_URL}/orders/${id}/tracking`,
    updateDriverLocation: (id: string) => `${API_BASE_URL}/orders/${id}/driver-location`,
    processPayment: `${API_BASE_URL}/orders/payment`,
    delete: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
};

