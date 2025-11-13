import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Package, Truck, CloudRain, CheckCircle, Clock } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import type { Notification } from '../contexts/NotificationContext';

export function NotificationToast() {
  const { notifications } = useNotifications();
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Show only the latest 1 unread notification (to avoid confusion)
    // Full notifications are available in the notification page
    const unread = notifications.filter(n => !n.read).slice(0, 1);
    setVisibleNotifications(unread);
  }, [notifications]);

  const getIcon = (notification: Notification) => {
    switch (notification.type) {
      case 'order':
        return <Package size={20} />;
      case 'delivery':
        return <Truck size={20} />;
      case 'weather':
        return <CloudRain size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const getColor = (notification: Notification) => {
    switch (notification.status) {
      case 'pending':
        return '#FFB84D';
      case 'processing':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      default:
        return '#FF8D28';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 141, 40, 0.2)'
            }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent, ${getColor(notification)}, transparent)`,
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative p-4">
              <div className="flex items-start gap-3">
                {/* Icon with pulse animation */}
                <motion.div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getColor(notification) + '20' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div style={{ color: getColor(notification) }}>
                    {getIcon(notification)}
                  </div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h4 className="mb-1" style={{ color: '#2F4858', fontSize: '14px', fontWeight: 600 }}>
                    {notification.title}
                  </h4>
                  <p className="body-3" style={{ color: '#858585', fontSize: '13px' }}>
                    {notification.message}
                  </p>
                  
                  {/* Status indicator */}
                  {notification.status && (
                    <div className="flex items-center gap-2 mt-2">
                      {notification.status === 'pending' && (
                        <motion.div
                          className="flex items-center gap-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Clock size={12} style={{ color: getColor(notification) }} />
                          <span className="body-3" style={{ color: getColor(notification), fontSize: '11px' }}>
                            Menunggu
                          </span>
                        </motion.div>
                      )}
                      {notification.status === 'processing' && (
                        <motion.div
                          className="flex items-center gap-1"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full border-2 border-t-transparent"
                            style={{ borderColor: getColor(notification) }}
                          />
                          <span className="body-3" style={{ color: getColor(notification), fontSize: '11px' }}>
                            Diproses
                          </span>
                        </motion.div>
                      )}
                      {notification.status === 'completed' && (
                        <div className="flex items-center gap-1">
                          <CheckCircle size={12} style={{ color: getColor(notification) }} />
                          <span className="body-3" style={{ color: getColor(notification), fontSize: '11px' }}>
                            Selesai
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
