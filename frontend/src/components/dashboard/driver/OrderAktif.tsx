import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { MapPin, Package, Clock, Navigation, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  orderNumber: string;
  store: string;
  storeAddress: string;
  customer: string;
  deliveryAddress: string;
  items: number;
  distance: string;
  fee: number;
  status: 'new' | 'accepted' | 'picked' | 'delivering';
  pickupTime?: string;
}

export function OrderAktif() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2025-001',
      store: 'Tahu Gejrot Pak Haji',
      storeAddress: 'Jl. Suryakencana No. 123, Bogor',
      customer: 'Budi Santoso',
      deliveryAddress: 'Jl. Pajajaran No. 45, Bogor',
      items: 3,
      distance: '2.5 km',
      fee: 15000,
      status: 'new'
    },
    {
      id: '2',
      orderNumber: 'ORD-2025-002',
      store: 'Makaroni Ngehe',
      storeAddress: 'Jl. Raya Dramaga No. 67, Bogor',
      customer: 'Siti Nurhaliza',
      deliveryAddress: 'Jl. Merdeka No. 89, Bogor',
      items: 2,
      distance: '3.2 km',
      fee: 18000,
      status: 'new'
    }
  ]);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'accepted' as const, pickupTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ));
    toast.success('Order diterima! Segera menuju lokasi penjemputan.');
  };

  const handlePickupOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'picked' as const } : order
    ));
    toast.success('Pesanan berhasil diambil! Mulai pengantaran.');
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
    toast.success('Pesanan berhasil diantar! Upah telah ditambahkan ke dompet Anda.');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: { bg: '#FDE08E', color: '#F57C00', label: 'Order Baru' },
      accepted: { bg: '#B3E5FC', color: '#1976D2', label: 'Menuju Toko' },
      picked: { bg: '#C8E6C9', color: '#2E7D32', label: 'Sedang Diantar' },
      delivering: { bg: '#C8E6C9', color: '#2E7D32', label: 'Dalam Pengiriman' }
    };
    const style = styles[status as keyof typeof styles];
    return (
      <Badge style={{ backgroundColor: style.bg, color: style.color }}>
        {style.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="body-3" style={{ color: '#858585' }}>Order Baru</p>
            <h3 style={{ color: '#FF8D28' }}>{orders.filter(o => o.status === 'new').length}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="body-3" style={{ color: '#858585' }}>Dalam Proses</p>
            <h3 style={{ color: '#2196F3' }}>
              {orders.filter(o => o.status === 'accepted' || o.status === 'picked').length}
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="body-3" style={{ color: '#858585' }}>Estimasi Penghasilan</p>
            <h3 style={{ color: '#4CAF50' }}>
              Rp {orders.reduce((sum, o) => sum + o.fee, 0).toLocaleString('id-ID')}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 style={{ color: '#2F4858' }} className="mb-1">
                    {order.orderNumber}
                  </h4>
                  <p className="body-3" style={{ color: '#858585' }}>
                    {order.items} item • {order.distance}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Pickup Location */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF8D28' }}>
                      <Package size={16} style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <p className="body-3" style={{ color: '#858585', marginBottom: '4px' }}>Ambil di</p>
                      <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{order.store}</p>
                      <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>{order.storeAddress}</p>
                    </div>
                  </div>
                  {order.status !== 'new' && order.pickupTime && (
                    <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: '#E0E0E0' }}>
                      <Clock size={14} style={{ color: '#858585' }} />
                      <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                        Dijemput: {order.pickupTime}
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Location */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4CAF50' }}>
                      <MapPin size={16} style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <p className="body-3" style={{ color: '#858585', marginBottom: '4px' }}>Antar ke</p>
                      <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{order.customer}</p>
                      <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>{order.deliveryAddress}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full"
                    style={{ color: '#2196F3' }}
                  >
                    <Phone size={14} className="mr-1" />
                    Hubungi Pelanggan
                  </Button>
                </div>
              </div>

              {/* Fee and Actions */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E0E0E0' }}>
                <div>
                  <p className="body-3" style={{ color: '#858585' }}>Upah Pengantaran</p>
                  <h4 style={{ color: '#4CAF50' }}>
                    Rp {order.fee.toLocaleString('id-ID')}
                  </h4>
                </div>
                <div className="flex gap-2">
                  {order.status === 'new' && (
                    <Button
                      style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Terima Order
                    </Button>
                  )}
                  {order.status === 'accepted' && (
                    <Button
                      style={{ backgroundColor: '#2196F3', color: '#FFFFFF' }}
                      onClick={() => handlePickupOrder(order.id)}
                    >
                      <Package size={16} className="mr-2" />
                      Pesanan Diambil
                    </Button>
                  )}
                  {order.status === 'picked' && (
                    <Button
                      style={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }}
                      onClick={() => handleCompleteOrder(order.id)}
                    >
                      Selesaikan Pengantaran
                    </Button>
                  )}
                  {order.status !== 'new' && (
                    <Button variant="outline">
                      <Navigation size={16} className="mr-2" />
                      Buka Navigasi
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package size={48} style={{ color: '#CCCCCC', margin: '0 auto' }} />
            <p style={{ color: '#858585' }} className="mt-4">
              Belum ada order aktif. Tunggu notifikasi order baru!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
