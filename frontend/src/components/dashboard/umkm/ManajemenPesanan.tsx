import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Package, User, MapPin, Clock, Phone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  customerPhone: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  address: string;
  status: 'new' | 'preparing' | 'ready' | 'pickup' | 'delivering' | 'completed';
  createdAt: string;
  driver?: string;
}

export function ManajemenPesanan() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2025-001',
      customer: 'Budi Santoso',
      customerPhone: '+62 812-3456-7890',
      items: [
        { name: 'Tahu Gejrot Original', quantity: 2, price: 15000 },
        { name: 'Es Pala Segar', quantity: 1, price: 12000 }
      ],
      total: 42000,
      address: 'Jl. Pajajaran No. 45, Bogor',
      status: 'new',
      createdAt: '2025-11-09 10:30'
    },
    {
      id: '2',
      orderNumber: 'ORD-2025-002',
      customer: 'Siti Nurhaliza',
      customerPhone: '+62 813-4567-8901',
      items: [
        { name: 'Tahu Gejrot Pedas', quantity: 3, price: 15000 }
      ],
      total: 45000,
      address: 'Jl. Merdeka No. 89, Bogor',
      status: 'preparing',
      createdAt: '2025-11-09 11:00'
    },
    {
      id: '3',
      orderNumber: 'ORD-2025-003',
      customer: 'Ahmad Fauzi',
      customerPhone: '+62 814-5678-9012',
      items: [
        { name: 'Tahu Gejrot Original', quantity: 1, price: 15000 }
      ],
      total: 15000,
      address: 'Jl. Suryakencana No. 123, Bogor',
      status: 'ready',
      createdAt: '2025-11-09 09:30',
      driver: 'Ahmad Fauzi'
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const statusMessages = {
      preparing: 'Pesanan sedang disiapkan',
      ready: 'Pesanan siap! Mencari driver...',
      pickup: 'Driver dalam perjalanan ke toko',
      delivering: 'Pesanan sedang diantar',
      completed: 'Pesanan selesai diantar'
    };

    toast.success(statusMessages[newStatus]);
  };

  const getStatusInfo = (status: Order['status']) => {
    const statusConfig = {
      new: { label: 'Pesanan Baru', color: '#FDE08E', textColor: '#F57C00' },
      preparing: { label: 'Sedang Disiapkan', color: '#B3E5FC', textColor: '#1976D2' },
      ready: { label: 'Siap Diambil', color: '#C8E6C9', textColor: '#2E7D32' },
      pickup: { label: 'Driver Menuju Toko', color: '#FFCCBC', textColor: '#E64A19' },
      delivering: { label: 'Sedang Diantar', color: '#D1C4E9', textColor: '#512DA8' },
      completed: { label: 'Selesai', color: '#C8E6C9', textColor: '#2E7D32' }
    };
    return statusConfig[status];
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const statusInfo = getStatusInfo(order.status);
    const itemsTotal = order.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 style={{ color: '#2F4858' }} className="mb-1">
                {order.orderNumber}
              </h4>
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: '#858585' }} />
                <p className="body-3" style={{ color: '#858585' }}>
                  {order.createdAt}
                </p>
              </div>
            </div>
            <Badge style={{ backgroundColor: statusInfo.color, color: statusInfo.textColor }}>
              {statusInfo.label}
            </Badge>
          </div>

          {/* Customer Info */}
          <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#F5F5F5' }}>
            <div className="flex items-start gap-3 mb-3">
              <User size={20} style={{ color: '#2F4858' }} />
              <div className="flex-1">
                <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{order.customer}</p>
                <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>{order.customerPhone}</p>
              </div>
              <Button variant="ghost" size="sm" style={{ color: '#2196F3' }}>
                <Phone size={16} />
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} style={{ color: '#FF8D28' }} />
              <p className="body-3" style={{ color: '#858585' }}>{order.address}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-4">
            <p className="body-3 mb-2" style={{ color: '#858585' }}>Pesanan ({itemsTotal} item)</p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <p className="body-3" style={{ color: '#2F4858' }}>
                    {item.quantity}x {item.name}
                  </p>
                  <p className="body-3" style={{ color: '#858585' }}>
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t">
              <p style={{ color: '#2F4858', fontWeight: 600 }}>Total</p>
              <h4 style={{ color: '#FF8D28' }}>Rp {order.total.toLocaleString('id-ID')}</h4>
            </div>
          </div>

          {/* Driver Info */}
          {order.driver && (
            <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: '#E3F2FD' }}>
              <p className="body-3" style={{ color: '#1976D2', fontWeight: 600 }}>
                Driver: {order.driver}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {order.status === 'new' && (
              <Button
                className="flex-1"
                style={{ backgroundColor: '#2196F3', color: '#FFFFFF' }}
                onClick={() => updateOrderStatus(order.id, 'preparing')}
              >
                Terima & Proses
              </Button>
            )}
            {order.status === 'preparing' && (
              <Button
                className="flex-1"
                style={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }}
                onClick={() => updateOrderStatus(order.id, 'ready')}
              >
                <CheckCircle size={16} className="mr-2" />
                Pesanan Siap
              </Button>
            )}
            {order.status === 'ready' && (
              <Button
                className="flex-1"
                style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
              >
                Menunggu Driver
              </Button>
            )}
            {(order.status === 'pickup' || order.status === 'delivering') && (
              <Button className="flex-1" variant="outline" disabled>
                Pesanan Dalam Pengiriman
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const newOrders = orders.filter(o => o.status === 'new');
  const processingOrders = orders.filter(o => ['preparing', 'ready', 'pickup', 'delivering'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <div>
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="new">
            Pesanan Baru ({newOrders.length})
          </TabsTrigger>
          <TabsTrigger value="processing">
            Diproses ({processingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Selesai ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          {newOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package size={48} style={{ color: '#CCCCCC', margin: '0 auto' }} />
                <p style={{ color: '#858585' }} className="mt-4">
                  Tidak ada pesanan baru
                </p>
              </CardContent>
            </Card>
          ) : (
            newOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {processingOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p style={{ color: '#858585' }}>Tidak ada pesanan yang sedang diproses</p>
              </CardContent>
            </Card>
          ) : (
            processingOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p style={{ color: '#858585' }}>Belum ada pesanan selesai</p>
              </CardContent>
            </Card>
          ) : (
            completedOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
