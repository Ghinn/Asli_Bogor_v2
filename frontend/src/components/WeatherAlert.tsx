import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Umbrella, X } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

export function WeatherAlert() {
  const { isRaining } = useWeather();
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isRaining && !dismissed) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isRaining, dismissed]);

  const getMessage = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'driver':
        return {
          title: 'Cuaca Sedang Hujan! ☔',
          message: 'Mohon berhati-hati di jalan. Jalanan licin, pastikan berkendara dengan aman.',
          icon: <Umbrella size={24} />
        };
      case 'user':
        return {
          title: 'Hujan Nih! 🌧️',
          message: 'Yuk cobain makanan hangat khas Bogor! Pas banget buat cuaca dingin.',
          icon: <CloudRain size={24} />
        };
      case 'umkm':
        return {
          title: 'Hujan Turun! 🌧️',
          message: 'Cuaca dingin, waktu yang tepat untuk promosi menu hangat!',
          icon: <CloudRain size={24} />
        };
      default:
        return {
          title: 'Bogor Lagi Hujan! 🌧️',
          message: 'Kota Hujan memang selalu segar. Tetap semangat!',
          icon: <CloudRain size={24} />
        };
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  const messageContent = getMessage();
  if (!messageContent) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div 
            className="relative overflow-hidden rounded-2xl shadow-2xl p-4"
            style={{
              background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.95) 0%, rgba(100, 149, 237, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Animated rain effect in background */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-4 bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'linear'
                  }}
                />
              ))}
            </div>

            <div className="relative flex items-start gap-3">
              {/* Icon */}
              <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div style={{ color: '#FFFFFF' }}>
                  {messageContent.icon}
                </div>
              </motion.div>

              <div className="flex-1">
                <h4 className="mb-1" style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700 }}>
                  {messageContent.title}
                </h4>
                <p className="body-3" style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '13px' }}>
                  {messageContent.message}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                <X size={16} style={{ color: '#FFFFFF' }} />
              </button>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-2 -right-2 opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <CloudRain size={60} style={{ color: '#FFFFFF' }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
