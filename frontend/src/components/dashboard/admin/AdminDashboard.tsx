import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Users, Store, Bike, TrendingUp, DollarSign, Package } from 'lucide-react';
import { PersonalizedGreeting } from '../../PersonalizedGreeting';

export function AdminDashboard() {
  const stats = [
    { label: 'Total User', value: '1,234', icon: Users, color: '#2196F3' },
    { label: 'Total UMKM', value: '156', icon: Store, color: '#FF8D28' },
    { label: 'Total Driver', value: '89', icon: Bike, color: '#4CAF50' },
    { label: 'Pesanan Hari Ini', value: '342', icon: Package, color: '#9C27B0' },
    { label: 'Transaksi Bulan Ini', value: 'Rp 45.5M', icon: DollarSign, color: '#FF6B6B' },
    { label: 'Pertumbuhan', value: '+12.5%', icon: TrendingUp, color: '#4CAF50' }
  ];

  const recentActivities = [
    { type: 'UMKM Baru', name: 'Tahu Gejrot Pak Haji', time: '5 menit yang lalu', status: 'pending' },
    { type: 'Driver Baru', name: 'Ahmad Fauzi', time: '15 menit yang lalu', status: 'pending' },
    { type: 'Pesanan', name: 'Order #1234', time: '20 menit yang lalu', status: 'completed' },
    { type: 'UMKM Disetujui', name: 'Kerajinan Bambu Ibu Siti', time: '1 jam yang lalu', status: 'approved' }
  ];

  return (
    <div className="space-y-6">
      {/* Personalized Greeting */}
      <PersonalizedGreeting />

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="body-3" style={{ color: '#858585' }}>{stat.label}</p>
                    <h3 style={{ color: '#2F4858' }} className="mt-2">{stat.value}</h3>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.color + '20' }}
                  >
                    <Icon size={24} style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#2F4858' }}>Statistik Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center" style={{ backgroundColor: '#F5F5F5', borderRadius: '8px' }}>
              <p className="body-3" style={{ color: '#858585' }}>Grafik transaksi 7 hari terakhir</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#2F4858' }}>Kategori Produk Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-3" style={{ color: '#2F4858' }}>Makanan</span>
                  <span className="body-3" style={{ color: '#858585' }}>45%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#E0E0E0' }}>
                  <div className="h-2 rounded-full" style={{ width: '45%', backgroundColor: '#FF8D28' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-3" style={{ color: '#2F4858' }}>Minuman</span>
                  <span className="body-3" style={{ color: '#858585' }}>30%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#E0E0E0' }}>
                  <div className="h-2 rounded-full" style={{ width: '30%', backgroundColor: '#4CAF50' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="body-3" style={{ color: '#2F4858' }}>Kerajinan</span>
                  <span className="body-3" style={{ color: '#858585' }}>25%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#E0E0E0' }}>
                  <div className="h-2 rounded-full" style={{ width: '25%', backgroundColor: '#2196F3' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#2F4858' }}>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                <div>
                  <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{activity.type}</p>
                  <p className="body-3" style={{ color: '#858585' }}>{activity.name}</p>
                  <p className="body-3" style={{ color: '#CCCCCC', fontSize: '12px' }}>{activity.time}</p>
                </div>
                <span 
                  className="px-3 py-1 rounded-full body-3"
                  style={{ 
                    backgroundColor: activity.status === 'pending' ? '#FDE08E' : activity.status === 'approved' ? '#C8E6C9' : '#E3F2FD',
                    color: activity.status === 'pending' ? '#F57C00' : activity.status === 'approved' ? '#2E7D32' : '#1976D2'
                  }}
                >
                  {activity.status === 'pending' ? 'Pending' : activity.status === 'approved' ? 'Disetujui' : 'Selesai'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
