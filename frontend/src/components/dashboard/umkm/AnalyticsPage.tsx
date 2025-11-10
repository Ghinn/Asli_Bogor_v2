import { AnalyticsChart } from '../AnalyticsChart';
import { Card, CardContent } from '../../ui/card';
import { TrendingUp, Package, Users, DollarSign, Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../../AnimatedCounter';
import { CustomerAnalysis } from './CustomerAnalysis';
import { StockAlert } from './StockAlert';
import { ExportButton } from '../ExportButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { useState } from 'react';

export function UMKMAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'stock'>('overview');

  const stats = [
    { 
      label: 'Total Revenue', 
      value: 'Rp 45.2M',
      change: '+18.5%',
      icon: DollarSign, 
      color: '#4CAF50',
      trend: 'up'
    },
    { 
      label: 'Total Pesanan', 
      value: '1,234',
      change: '+12.3%',
      icon: ShoppingBag, 
      color: '#2196F3',
      trend: 'up'
    },
    { 
      label: 'Produk Terjual', 
      value: '3,456',
      change: '+8.7%',
      icon: Package, 
      color: '#FF8D28',
      trend: 'up'
    },
    { 
      label: 'Total Pelanggan', 
      value: '892',
      change: '+15.2%',
      icon: Users, 
      color: '#9C27B0',
      trend: 'up'
    },
    { 
      label: 'Rating Rata-rata', 
      value: '4.8',
      change: '+0.2',
      icon: Star, 
      color: '#FFB800',
      trend: 'up'
    },
    { 
      label: 'Conversion Rate', 
      value: '24.5%',
      change: '+3.1%',
      icon: TrendingUp, 
      color: '#4CAF50',
      trend: 'up'
    }
  ];

  const topProducts = [
    { name: 'Tahu Gejrot Original', sold: 456, revenue: 'Rp 6.8M', growth: '+25%' },
    { name: 'Tahu Gejrot Pedas', sold: 389, revenue: 'Rp 5.8M', growth: '+18%' },
    { name: 'Paket Hemat 3pcs', sold: 312, revenue: 'Rp 4.7M', growth: '+22%' },
    { name: 'Tahu Gejrot Manis', sold: 278, revenue: 'Rp 4.2M', growth: '+15%' },
    { name: 'Combo Spesial', sold: 234, revenue: 'Rp 3.5M', growth: '+12%' }
  ];

  const customerHistory = [
    { name: 'Budi Santoso', orders: 28, spent: 'Rp 2.1M', lastOrder: '2 hari lalu' },
    { name: 'Siti Nurhaliza', orders: 24, spent: 'Rp 1.8M', lastOrder: '1 hari lalu' },
    { name: 'Ahmad Fauzi', orders: 21, spent: 'Rp 1.6M', lastOrder: '3 hari lalu' },
    { name: 'Rina Wijaya', orders: 18, spent: 'Rp 1.4M', lastOrder: 'Hari ini' },
    { name: 'Dedi Hermawan', orders: 15, spent: 'Rp 1.1M', lastOrder: '5 hari lalu' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between">
        <h3 style={{ color: '#2F4858' }}>Analytics Penjualan UMKM</h3>
        <ExportButton filename="umkm-analytics" />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Analisis Pelanggan</TabsTrigger>
          <TabsTrigger value="stock">Stok & Produk</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: stat.color + '20' }}
                    >
                      <Icon size={24} style={{ color: stat.color }} />
                    </div>
                    <span
                      className="body-3 px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: '#C8E6C9',
                        color: '#2E7D32',
                        fontSize: '12px'
                      }}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <p className="body-3 mb-1" style={{ color: '#858585' }}>
                    {stat.label}
                  </p>
                  <h2 style={{ color: '#2F4858', fontSize: '28px' }}>
                    <AnimatedCounter value={typeof stat.value === 'string' ? parseFloat(stat.value) : stat.value} decimals={stat.value === 4.8 ? 1 : 0} />
                  </h2>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <AnalyticsChart type="umkm" />

      {/* Additional Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardContent className="p-6">
            <h4 className="mb-4" style={{ color: '#2F4858' }}>
              Produk Terlaris
            </h4>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover-scale"
                  style={{ backgroundColor: '#F9F9F9' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: index < 3 ? '#FFB80020' : '#E0E0E0',
                      color: index < 3 ? '#FFB800' : '#858585',
                      fontWeight: 700
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                      {product.name}
                    </p>
                    <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                      {product.sold} terjual • {product.revenue}
                    </p>
                  </div>
                  <span
                    className="body-3 px-2 py-1 rounded"
                    style={{
                      backgroundColor: '#C8E6C9',
                      color: '#2E7D32',
                      fontSize: '11px'
                    }}
                  >
                    {product.growth}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardContent className="p-6">
            <h4 className="mb-4" style={{ color: '#2F4858' }}>
              Pelanggan Setia
            </h4>
            <div className="space-y-3">
              {customerHistory.map((customer, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover-scale"
                  style={{ backgroundColor: '#F9F9F9' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: '#FF8D2820',
                      color: '#FF8D28',
                      fontWeight: 700
                    }}
                  >
                    {customer.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                      {customer.name}
                    </p>
                    <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                      {customer.orders} pesanan • {customer.spent}
                    </p>
                  </div>
                  <p className="body-3" style={{ color: '#CCCCCC', fontSize: '11px' }}>
                    {customer.lastOrder}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
        </TabsContent>

        {/* Customer Analysis Tab */}
        <TabsContent value="customers" className="mt-6">
          <CustomerAnalysis />
        </TabsContent>

        {/* Stock Alert Tab */}
        <TabsContent value="stock" className="mt-6">
          <StockAlert />
        </TabsContent>
      </Tabs>
    </div>
  );
}
