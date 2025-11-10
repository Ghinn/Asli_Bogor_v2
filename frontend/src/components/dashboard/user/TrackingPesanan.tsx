import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Package, MapPin, Check, Bike, Store, User } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  items: string[];
  store: string;
  driver?: string;
  status: 'preparing' | 'pickup' | 'delivering' | 'delivered';
  timeline: {
    preparing?: string;
    pickup?: string;
    delivering?: string;
    delivered?: string;
  };
  address: string;
}

export function TrackingPesanan() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2025-001',
      items: ['Tahu Gejrot Original (2x)', 'Es Pala Segar (1x)'],
      store: 'Tahu Gejrot Pak Haji',
      driver: 'Ahmad Fauzi',
      status: 'delivering',
      timeline: {
        preparing: '10:30',
        pickup: '10:45',
        delivering: '10:50'
      },
      address: 'Jl. Pajajaran No. 123, Bogor'
    },
    {
      id: '2',
      orderNumber: 'ORD-2025-002',
      items: ['Makaroni Ngehe Pedas (3x)'],
      store: 'Makaroni Ngehe',
      status: 'preparing',
      timeline: {
        preparing: '11:00'
      },
      address: 'Jl. Merdeka No. 45, Bogor'
    }
  ]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Sedang Disiapkan';
      case 'pickup':
        return 'Driver Menuju Toko';
      case 'delivering':
        return 'Dalam Pengiriman';
      case 'delivered':
        return 'Terkirim';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return '#FDE08E';
      case 'pickup':
      case 'delivering':
        return '#B3E5FC';
      case 'delivered':
        return '#C8E6C9';
      default:
        return '#E0E0E0';
    }
  };

  const TrackingTimeline = ({ order }: { order: Order }) => {
    const steps = [
      { key: 'preparing', label: 'Sedang Disiapkan', icon: Store, time: order.timeline.preparing },
      { key: 'pickup', label: 'Driver Ambil Pesanan', icon: MapPin, time: order.timeline.pickup },
      { key: 'delivering', label: 'Dalam Perjalanan', icon: Bike, time: order.timeline.delivering },
      { key: 'delivered', label: 'Pesanan Diterima', icon: Package, time: order.timeline.delivered }
    ];

    const statusIndex = steps.findIndex(step => step.key === order.status);

    return (
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= statusIndex;
          const isCurrent = index === statusIndex;

          return (
            <div key={step.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-[#FF8D28]' : 'bg-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    isCurrent && order.status !== 'delivered' ? (
                      <Icon size={24} style={{ color: '#FFFFFF' }} />
                    ) : (
                      <Check size={24} style={{ color: '#FFFFFF' }} />
                    )
                  ) : (
                    <Icon size={24} style={{ color: '#858585' }} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-16 ${
                      isCompleted ? 'bg-[#FF8D28]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pb-8">
                <h4
                  style={{ color: isCompleted ? '#2F4858' : '#858585' }}
                  className="mb-1"
                >
                  {step.label}
                </h4>
                {step.time && (
                  <p className="body-3" style={{ color: '#858585' }}>
                    {step.time}
                  </p>
                )}
                {isCurrent && order.driver && (
                  <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                    <p className="body-3" style={{ color: '#2F4858' }}>
                      Driver: {order.driver}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle style={{ color: '#2F4858' }}>
                  {order.orderNumber}
                </CardTitle>
                <p className="body-3 mt-1" style={{ color: '#858585' }}>
                  {order.store}
                </p>
              </div>
              <Badge style={{ backgroundColor: getStatusColor(order.status), color: '#2F4858' }}>
                {getStatusText(order.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Timeline */}
              <div>
                <h4 style={{ color: '#2F4858' }} className="mb-4">
                  Status Pengiriman
                </h4>
                <TrackingTimeline order={order} />
              </div>

              {/* Right: Map & Details */}
              <div className="space-y-6">
                <div>
                  <h4 style={{ color: '#2F4858' }} className="mb-4">
                    Peta Pengiriman
                  </h4>
                  <div 
                    className="w-full h-64 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    {order.status === 'delivering' || order.status === 'pickup' ? (
                      <div className="text-center">
                        <MapPin size={48} style={{ color: '#FF8D28', margin: '0 auto' }} />
                        <p className="body-3 mt-2" style={{ color: '#858585' }}>
                          Peta tracking lokasi driver real-time
                        </p>
                        <p className="body-3" style={{ color: '#FF8D28', fontWeight: 600 }}>
                          🏍️ Driver sedang dalam perjalanan
                        </p>
                      </div>
                    ) : (
                      <p className="body-3" style={{ color: '#858585' }}>
                        Peta akan aktif saat driver mengambil pesanan
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#2F4858' }} className="mb-3">
                    Detail Pesanan
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                      <p className="body-3" style={{ color: '#858585', marginBottom: '4px' }}>
                        Item Pesanan
                      </p>
                      {order.items.map((item, idx) => (
                        <p key={idx} className="body-3" style={{ color: '#2F4858' }}>
                          • {item}
                        </p>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                      <p className="body-3" style={{ color: '#858585', marginBottom: '4px' }}>
                        Alamat Pengiriman
                      </p>
                      <p className="body-3" style={{ color: '#2F4858' }}>
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {orders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package size={48} style={{ color: '#CCCCCC', margin: '0 auto' }} />
            <p style={{ color: '#858585' }} className="mt-4">
              Belum ada pesanan aktif untuk dilacak
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
