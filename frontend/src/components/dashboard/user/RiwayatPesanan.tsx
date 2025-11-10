import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Package, Truck, CheckCircle, XCircle, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  store: string;
}

export function RiwayatPesanan() {
  const [activeTab, setActiveTab] = useState('all');

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '10 Jan 2024',
      items: [
        { name: 'Tahu Gejrot Original', qty: 2, price: 15000 },
        { name: 'Es Pala Segar', qty: 1, price: 12000 }
      ],
      total: 42000,
      status: 'completed',
      store: 'Tahu Gejrot Pak Haji'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '12 Jan 2024',
      items: [
        { name: 'Makaroni Ngehe Pedas', qty: 1, price: 20000 }
      ],
      total: 20000,
      status: 'shipping',
      store: 'Makaroni Ngehe'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '15 Jan 2024',
      items: [
        { name: 'Kopi Robusta Bogor', qty: 2, price: 25000 },
        { name: 'Anyaman Bambu', qty: 1, price: 75000 }
      ],
      total: 125000,
      status: 'processing',
      store: 'Kopi Kenangan Bogor'
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '08 Jan 2024',
      items: [
        { name: 'Batik Motif Bogor', qty: 1, price: 150000 }
      ],
      total: 150000,
      status: 'cancelled',
      store: 'Batik Bogor Tradisiku'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return { bg: '#FDE08E', text: '#F57C00' };
      case 'processing':
        return { bg: '#B3E5FC', text: '#1976D2' };
      case 'shipping':
        return { bg: '#C5CAE9', text: '#5E35B1' };
      case 'completed':
        return { bg: '#C8E6C9', text: '#2E7D32' };
      case 'cancelled':
        return { bg: '#FFCDD2', text: '#C62828' };
      default:
        return { bg: '#E0E0E0', text: '#757575' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'processing': return 'Diproses';
      case 'shipping': return 'Dikirim';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package size={16} />;
      case 'processing': return <Package size={16} />;
      case 'shipping': return <Truck size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#2F4858' }}>Riwayat Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Menunggu</TabsTrigger>
              <TabsTrigger value="processing">Diproses</TabsTrigger>
              <TabsTrigger value="shipping">Dikirim</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
              <TabsTrigger value="cancelled">Batal</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <Package size={32} style={{ color: '#CCCCCC' }} />
                  </div>
                  <h4 style={{ color: '#858585' }}>Belum ada pesanan</h4>
                  <p className="body-3 mt-2" style={{ color: '#CCCCCC' }}>
                    Pesanan Anda akan muncul di sini
                  </p>
                </div>
              ) : (
                filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 style={{ color: '#2F4858' }}>{order.orderNumber}</h4>
                            <p className="body-3 mt-1" style={{ color: '#858585' }}>
                              {order.date} • {order.store}
                            </p>
                          </div>
                          <Badge
                            style={{
                              backgroundColor: getStatusColor(order.status).bg,
                              color: getStatusColor(order.status).text
                            }}
                          >
                            <span className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {getStatusLabel(order.status)}
                            </span>
                          </Badge>
                        </div>

                        {/* Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F9F9F9' }}>
                              <div>
                                <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                                  {item.name}
                                </p>
                                <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                                  {item.qty}x
                                </p>
                              </div>
                              <p className="body-3" style={{ color: '#FF8D28', fontWeight: 600 }}>
                                Rp {item.price.toLocaleString('id-ID')}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #E0E0E0' }}>
                          <div>
                            <p className="body-3" style={{ color: '#858585' }}>Total Pembayaran</p>
                            <h4 style={{ color: '#FF8D28' }}>
                              Rp {order.total.toLocaleString('id-ID')}
                            </h4>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              <Eye size={16} className="mr-1" />
                              Detail
                            </Button>
                            {order.status === 'completed' && (
                              <Button 
                                size="sm"
                                style={{ backgroundColor: '#FFB800', color: '#FFFFFF' }}
                              >
                                <Star size={16} className="mr-1" />
                                Beri Ulasan
                              </Button>
                            )}
                            {order.status === 'shipping' && (
                              <Button 
                                size="sm"
                                style={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }}
                              >
                                <Truck size={16} className="mr-1" />
                                Lacak
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
