import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'delivery' | 'payment' | 'system' | 'weather';
  status?: 'pending' | 'processing' | 'completed';
  timestamp: Date;
  read: boolean;
  icon?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate notifications based on user role
  useEffect(() => {
    if (!user) return;

    // Simulate random notifications for demo
    const simulateNotifications = () => {
      const random = Math.random();
      
      if (user.role === 'umkm' && random > 0.7) {
        addNotification({
          title: 'Pesanan Baru! 🎉',
          message: 'Ada pesanan baru dari pelanggan',
          type: 'order',
          status: 'pending'
        });
      } else if (user.role === 'driver' && random > 0.6) {
        addNotification({
          title: 'Order Menunggu! 🚚',
          message: 'Ada order baru menunggu untuk diambil',
          type: 'delivery',
          status: 'pending'
        });
      } else if (user.role === 'user' && random > 0.8) {
        addNotification({
          title: 'Pesanan Diproses ✓',
          message: 'UMKM sedang menyiapkan pesanan Anda',
          type: 'order',
          status: 'processing'
        });
      }
    };

    const interval = setInterval(simulateNotifications, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [user]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
