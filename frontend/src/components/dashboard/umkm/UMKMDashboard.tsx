import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { TrendingUp, Star, Package, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { PersonalizedGreeting } from '../../PersonalizedGreeting';
import { GamificationBadge } from '../../GamificationBadge';

export function UMKMDashboard() {
  const stats = [
    { label: 'Total Penjualan', value: 'Rp 12.5M', icon: DollarSign, color: '#4CAF50', change: '+15%' },
    { label: 'Pesanan Bulan Ini', value: '234', icon: ShoppingCart, color: '#2196F3', change: '+8%' },
    { label: 'Produk Aktif', value: '24', icon: Package, color: '#FF8D28', change: '+2' },
    { label: 'Rating Toko', value: '4.8', icon: Star, color: '#FFB800', change: '+0.2' },
    { label: 'Total Pelanggan', value: '1,234', icon: Users, color: '#9C27B0', change: '+23%' },
    { label: 'Pertumbuhan', value: '+18.5%', icon: TrendingUp, color: '#4CAF50', change: 'vs bulan lalu' }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Budi Santoso', items: '2 items', total: 'Rp 45.000', status: 'Menunggu', time: '5 menit lalu' },
    { id: 'ORD-002', customer: 'Siti Nurhaliza', items: '1 item', total: 'Rp 15.000', status: 'Diproses', time: '15 menit lalu' },
    { id: 'ORD-003', customer: 'Ahmad Fauzi', items: '3 items', total: 'Rp 60.000', status: 'Dikirim', time: '1 jam lalu' },
    { id: 'ORD-004', customer: 'Rina Wijaya', items: '1 item', total: 'Rp 20.000', status: 'Selesai', time: '2 jam lalu' }
  ];

  const topProducts = [
    { name: 'Tahu Gejrot Original', sold: 234, revenue: 'Rp 3.5M' },
    { name: 'Tahu Gejrot Pedas', sold: 189, revenue: 'Rp 2.8M' },
    { name: 'Tahu Gejrot Manis', sold: 156, revenue: 'Rp 2.3M' },
    { name: 'Paket Hemat 3pcs', sold: 145, revenue: 'Rp 1.9M' }
  ];

  const reviews = [
    { customer: 'Budi S.', rating: 5, comment: 'Enak banget! Bumbunya pas...', time: '1 jam lalu' },
    { customer: 'Siti N.', rating: 5, comment: 'Pengiriman cepat, rasanya mantap!', time: '3 jam lalu' },
    { customer: 'Ahmad F.', rating: 4, comment: 'Good, tapi bisa lebih pedas lagi', time: '5 jam lalu' }
  ];

  return (
    <div className="space-y-6">
      {/* Personalized Greeting */}
      <PersonalizedGreeting />

      {/* Gamification Badges */}
      <GamificationBadge role="umkm" />

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.color + '20' }}
                  >
                    <Icon size={24} style={{ color: stat.color }} />
                  </div>
                  <span
                    className="body-3 px-2 py-1 rounded"
                    style={{
                      backgroundColor: stat.change.includes('+') ? '#C8E6C9' : '#E3F2FD',
                      color: stat.change.includes('+') ? '#2E7D32' : '#1976D2'
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="body-3" style={{ color: '#858585' }}>{stat.label}</p>
                <h3 style={{ color: '#2F4858' }} className="mt-1">{stat.value}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts & Recent */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#2F4858' }}>Grafik Penjualan 7 Hari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <p className="body-3" style={{ color: '#858585' }}>Grafik penjualan harian</p>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#2F4858' }}>Produk Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="flex-1">
                    <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{product.name}</p>
                    <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>{product.sold} terjual</p>
                  </div>
                  <p className="body-3" style={{ color: '#4CAF50', fontWeight: 600 }}>{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Reviews */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#2F4858' }}>Pesanan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                  <div>
                    <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{order.id}</p>
                    <p className="body-3" style={{ color: '#858585' }}>{order.customer} • {order.items}</p>
                    <p className="body-3" style={{ color: '#CCCCCC', fontSize: '12px' }}>{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{order.total}</p>
                    <span
                      className="body-3 px-2 py-1 rounded"
                      style={{
                        backgroundColor: order.status === 'Selesai' ? '#C8E6C9' : order.status === 'Dikirim' ? '#B3E5FC' : '#FDE08E',
                        color: order.status === 'Selesai' ? '#2E7D32' : order.status === 'Dikirim' ? '#1976D2' : '#F57C00',
                        fontSize: '12px'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#2F4858' }}>Ulasan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{review.customer}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} style={{ color: '#FFB800', fill: '#FFB800' }} />
                      ))}
                    </div>
                  </div>
                  <p className="body-3 mb-1" style={{ color: '#4A4A4A' }}>{review.comment}</p>
                  <p className="body-3" style={{ color: '#CCCCCC', fontSize: '12px' }}>{review.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
