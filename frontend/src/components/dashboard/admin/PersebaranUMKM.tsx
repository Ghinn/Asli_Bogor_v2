import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { MapPin, Store, Search, Filter, ZoomIn, ZoomOut, Maximize2, Users, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface UMKMPoint {
  id: string;
  name: string;
  category: string;
  address: string;
  area: string;
  status: 'active' | 'inactive';
  x: number; // percentage position
  y: number; // percentage position
  color: string;
  orders: number;
  rating: number;
}

export function PersebaranUMKM() {
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<UMKMPoint | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const umkmPoints: UMKMPoint[] = [
    // Bogor Tengah
    { id: '1', name: 'Tahu Gejrot Raos', category: 'Makanan', address: 'Jl. Suryakencana No. 12', area: 'Bogor Tengah', status: 'active', x: 50, y: 45, color: '#FF8D28', orders: 456, rating: 4.9 },
    { id: '2', name: 'Kopi Bogor Asli', category: 'Minuman', address: 'Jl. Pajajaran No. 89', area: 'Bogor Tengah', status: 'active', x: 48, y: 50, color: '#4CAF50', orders: 389, rating: 4.8 },
    { id: '3', name: 'Roti Unyil Venus', category: 'Makanan', address: 'Jl. Raya Pajajaran', area: 'Bogor Tengah', status: 'active', x: 52, y: 48, color: '#FFB800', orders: 234, rating: 4.8 },
    
    // Bogor Utara
    { id: '4', name: 'Kerajinan Bambu Bogor', category: 'Kerajinan', address: 'Jl. Raya Tajur No. 45', area: 'Bogor Utara', status: 'active', x: 45, y: 25, color: '#2196F3', orders: 312, rating: 4.7 },
    { id: '5', name: 'Batik Bogor Heritage', category: 'Fashion', address: 'Jl. Pahlawan No. 67', area: 'Bogor Utara', status: 'active', x: 55, y: 28, color: '#9C27B0', orders: 278, rating: 4.9 },
    { id: '6', name: 'Asinan Bogor Pak Jaya', category: 'Makanan', address: 'Jl. Merdeka No. 23', area: 'Bogor Utara', status: 'inactive', x: 50, y: 30, color: '#858585', orders: 145, rating: 4.5 },
    
    // Bogor Selatan
    { id: '7', name: 'Makaroni Ngehe', category: 'Makanan', address: 'Jl. Malabar No. 34', area: 'Bogor Selatan', status: 'active', x: 48, y: 65, color: '#FF6B6B', orders: 423, rating: 4.8 },
    { id: '8', name: 'Kue Lapis Bogor', category: 'Makanan', address: 'Jl. Raya Bogor No. 78', area: 'Bogor Selatan', status: 'active', x: 52, y: 68, color: '#FFB800', orders: 367, rating: 4.7 },
    { id: '9', name: 'Soto Kuning Bogor', category: 'Makanan', address: 'Jl. Sukasari No. 12', area: 'Bogor Selatan', status: 'active', x: 50, y: 70, color: '#FF8D28', orders: 298, rating: 4.9 },
    
    // Bogor Timur
    { id: '10', name: 'Doclang Pak Aman', category: 'Makanan', address: 'Jl. Raya Ciluar No. 56', area: 'Bogor Timur', status: 'active', x: 70, y: 50, color: '#4CAF50', orders: 189, rating: 4.6 },
    { id: '11', name: 'Talas Bogor Sangkuriang', category: 'Makanan', address: 'Jl. Pahlawan No. 90', area: 'Bogor Timur', status: 'active', x: 75, y: 45, color: '#FFB800', orders: 256, rating: 4.8 },
    
    // Bogor Barat
    { id: '12', name: 'Keripik Talas Bogor', category: 'Makanan', address: 'Jl. Raya Dramaga No. 23', area: 'Bogor Barat', status: 'active', x: 25, y: 50, color: '#FF8D28', orders: 234, rating: 4.7 },
    { id: '13', name: 'Aneka Jajanan Pasar', category: 'Makanan', address: 'Jl. Raya Bogor No. 45', area: 'Bogor Barat', status: 'active', x: 30, y: 55, color: '#4CAF50', orders: 178, rating: 4.6 },
    { id: '14', name: 'Susu Kedelai Murni', category: 'Minuman', address: 'Jl. Lodaya No. 12', area: 'Bogor Barat', status: 'inactive', x: 28, y: 48, color: '#858585', orders: 123, rating: 4.5 },
  ];

  const areaStats = [
    { area: 'Bogor Tengah', count: 45, active: 42, color: '#FF8D28' },
    { area: 'Bogor Utara', count: 38, active: 35, color: '#2196F3' },
    { area: 'Bogor Selatan', count: 52, active: 49, color: '#FFB800' },
    { area: 'Bogor Timur', count: 31, active: 28, color: '#4CAF50' },
    { area: 'Bogor Barat', count: 28, active: 24, color: '#9C27B0' },
  ];

  const filteredPoints = umkmPoints.filter(point => {
    const matchesArea = selectedArea === 'all' || point.area === selectedArea;
    const matchesSearch = point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         point.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.2, 0.5));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 style={{ color: '#2F4858' }}>Persebaran UMKM Bogor</h3>
        <p className="body-3 mt-2" style={{ color: '#858585' }}>
          Peta interaktif menampilkan lokasi dan status UMKM di seluruh wilayah Kota Bogor
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        className="grid md:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {areaStats.map((stat, index) => (
          <motion.div
            key={stat.area}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card className="hover-scale cursor-pointer" onClick={() => setSelectedArea(stat.area)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                  <Badge variant="outline" style={{ fontSize: '10px' }}>
                    {stat.active}/{stat.count}
                  </Badge>
                </div>
                <p className="body-3" style={{ color: '#2F4858', fontWeight: 600, fontSize: '13px' }}>
                  {stat.area.replace('Bogor ', '')}
                </p>
                <p className="body-3 mt-1" style={{ color: '#858585', fontSize: '11px' }}>
                  {stat.count} UMKM
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: '#858585' }} />
                <Input
                  placeholder="Cari UMKM berdasarkan nama atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Area Filter */}
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Pilih Wilayah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Wilayah</SelectItem>
                  <SelectItem value="Bogor Tengah">Bogor Tengah</SelectItem>
                  <SelectItem value="Bogor Utara">Bogor Utara</SelectItem>
                  <SelectItem value="Bogor Selatan">Bogor Selatan</SelectItem>
                  <SelectItem value="Bogor Timur">Bogor Timur</SelectItem>
                  <SelectItem value="Bogor Barat">Bogor Barat</SelectItem>
                </SelectContent>
              </Select>

              {/* Zoom Controls */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut size={18} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div
              className="relative bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden"
              style={{ height: '600px' }}
            >
              {/* Map Background with Bogor Illustration */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Mountain Silhouette Background */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-200 to-transparent opacity-30" />
                
                {/* Grid Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2F4858" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Area Labels */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="body-3" style={{ color: '#2196F3', fontWeight: 600 }}>Bogor Utara</p>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="body-3" style={{ color: '#FFB800', fontWeight: 600 }}>Bogor Selatan</p>
                </div>
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
                  <p className="body-3" style={{ color: '#9C27B0', fontWeight: 600 }}>Bogor Barat</p>
                </div>
                <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                  <p className="body-3" style={{ color: '#4CAF50', fontWeight: 600 }}>Bogor Timur</p>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="body-3" style={{ color: '#FF8D28', fontWeight: 600, fontSize: '16px' }}>
                    Bogor Tengah
                  </p>
                </div>
              </motion.div>

              {/* UMKM Points */}
              <motion.div
                className="absolute inset-0"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <AnimatePresence>
                  {filteredPoints.map((point, index) => (
                    <motion.div
                      key={point.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }}
                      onMouseEnter={() => setHoveredPoint(point.id)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      onClick={() => setSelectedPoint(point)}
                      whileHover={{ scale: 1.3 }}
                    >
                      {/* Pulsing Animation for Active UMKM */}
                      {point.status === 'active' && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            backgroundColor: point.color,
                            opacity: 0.3,
                          }}
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}

                      {/* Point Marker */}
                      <motion.div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: point.color,
                          boxShadow: `0 4px 12px ${point.color}60`,
                        }}
                      >
                        <Store size={16} style={{ color: '#FFFFFF' }} />
                      </motion.div>

                      {/* Hover Tooltip */}
                      <AnimatePresence>
                        {hoveredPoint === point.id && (
                          <motion.div
                            className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 w-64 p-3 rounded-lg shadow-lg z-50"
                            style={{ backgroundColor: '#FFFFFF', border: `2px solid ${point.color}` }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                          >
                            <div className="flex items-start gap-2">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: point.color + '20' }}
                              >
                                <Store size={20} style={{ color: point.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="body-3 mb-1" style={{ color: '#2F4858', fontWeight: 600 }}>
                                  {point.name}
                                </p>
                                <Badge
                                  variant="outline"
                                  style={{
                                    fontSize: '10px',
                                    backgroundColor: point.status === 'active' ? '#C8E6C920' : '#F5F5F5',
                                    color: point.status === 'active' ? '#4CAF50' : '#858585',
                                    borderColor: point.status === 'active' ? '#4CAF50' : '#858585'
                                  }}
                                >
                                  {point.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                </Badge>
                                <p className="body-3 mt-2" style={{ color: '#858585', fontSize: '11px' }}>
                                  📍 {point.address}
                                </p>
                                <p className="body-3 mt-1" style={{ color: '#858585', fontSize: '11px' }}>
                                  🏷️ {point.category} • {point.area}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="body-3" style={{ color: '#FF8D28', fontSize: '11px', fontWeight: 600 }}>
                                    {point.orders} orders
                                  </span>
                                  <span className="body-3" style={{ color: '#FFB800', fontSize: '11px', fontWeight: 600 }}>
                                    ⭐ {point.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Legend */}
              <motion.div
                className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="body-3 mb-3" style={{ color: '#2F4858', fontWeight: 600, fontSize: '12px' }}>
                  Legend
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4CAF50' }} />
                    <p className="body-3" style={{ color: '#858585', fontSize: '11px' }}>UMKM Aktif</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#858585' }} />
                    <p className="body-3" style={{ color: '#858585', fontSize: '11px' }}>UMKM Nonaktif</p>
                  </div>
                </div>
              </motion.div>

              {/* Info Badge */}
              <motion.div
                className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                  {filteredPoints.length} UMKM ditampilkan
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoint(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: selectedPoint.color + '20' }}
                >
                  <Store size={32} style={{ color: selectedPoint.color }} />
                </div>
                <div className="flex-1">
                  <h3 style={{ color: '#2F4858', fontSize: '20px' }}>
                    {selectedPoint.name}
                  </h3>
                  <Badge
                    className="mt-2"
                    style={{
                      backgroundColor: selectedPoint.status === 'active' ? '#4CAF50' : '#858585',
                      color: '#FFFFFF'
                    }}
                  >
                    {selectedPoint.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F9F9F9' }}>
                  <MapPin size={18} style={{ color: selectedPoint.color }} />
                  <div>
                    <p className="body-3" style={{ color: '#858585', fontSize: '11px' }}>Alamat</p>
                    <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                      {selectedPoint.address}
                    </p>
                    <p className="body-3 mt-1" style={{ color: '#858585', fontSize: '11px' }}>
                      {selectedPoint.area}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FF8D2820' }}>
                    <p className="body-3 mb-1" style={{ color: '#858585', fontSize: '11px' }}>Total Orders</p>
                    <p className="body-3" style={{ color: '#FF8D28', fontWeight: 600, fontSize: '18px' }}>
                      {selectedPoint.orders}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFB80020' }}>
                    <p className="body-3 mb-1" style={{ color: '#858585', fontSize: '11px' }}>Rating</p>
                    <p className="body-3" style={{ color: '#FFB800', fontWeight: 600, fontSize: '18px' }}>
                      ⭐ {selectedPoint.rating}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: '#F9F9F9' }}>
                  <p className="body-3 mb-1" style={{ color: '#858585', fontSize: '11px' }}>Kategori</p>
                  <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                    {selectedPoint.category}
                  </p>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                style={{ backgroundColor: selectedPoint.color }}
                onClick={() => setSelectedPoint(null)}
              >
                Tutup
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
