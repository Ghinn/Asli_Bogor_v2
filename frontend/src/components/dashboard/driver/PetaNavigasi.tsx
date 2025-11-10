import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { MapPin, Navigation, Package, User } from 'lucide-react';

export function PetaNavigasi() {
  const activeDelivery = {
    orderNumber: 'ORD-2025-001',
    customer: 'Budi Santoso',
    address: 'Jl. Pajajaran No. 45, Bogor',
    distance: '1.2 km',
    estimatedTime: '8 menit',
    status: 'delivering',
    currentLocation: { lat: -6.5978, lng: 106.8067 }
  };

  return (
    <div className="space-y-6">
      {/* Active Delivery Info */}
      {activeDelivery && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle style={{ color: '#2F4858' }}>Pengantaran Aktif</CardTitle>
              <Badge style={{ backgroundColor: '#C8E6C9', color: '#2E7D32' }}>
                Dalam Perjalanan
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                <p className="body-3" style={{ color: '#858585', marginBottom: '4px' }}>Order</p>
                <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                  {activeDelivery.orderNumber}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                <p className="body-3" style={{ color: '#858585', marginBottom: '4px' }}>Jarak</p>
                <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                  {activeDelivery.distance}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                <p className="body-3" style={{ color: '#858585', marginBottom: '4px' }}>Estimasi</p>
                <p className="body-3" style={{ color: '#4CAF50', fontWeight: 600 }}>
                  {activeDelivery.estimatedTime}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#E3F2FD' }}>
              <div className="flex items-start gap-3">
                <MapPin size={20} style={{ color: '#1976D2' }} />
                <div>
                  <p className="body-3" style={{ color: '#1976D2', fontWeight: 600, marginBottom: '4px' }}>
                    Tujuan Pengantaran
                  </p>
                  <p className="body-3" style={{ color: '#2F4858' }}>{activeDelivery.customer}</p>
                  <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                    {activeDelivery.address}
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full" style={{ backgroundColor: '#2196F3', color: '#FFFFFF' }}>
              <Navigation size={20} className="mr-2" />
              Buka Google Maps
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#2F4858' }}>Peta Navigasi Real-Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="w-full rounded-lg flex flex-col items-center justify-center p-12"
            style={{ 
              height: '500px',
              backgroundColor: '#F5F5F5',
              backgroundImage: 'linear-gradient(45deg, #E0E0E0 25%, transparent 25%, transparent 75%, #E0E0E0 75%, #E0E0E0), linear-gradient(45deg, #E0E0E0 25%, transparent 25%, transparent 75%, #E0E0E0 75%, #E0E0E0)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}
          >
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF8D28' }}>
                <MapPin size={40} style={{ color: '#FFFFFF' }} />
              </div>
              <h4 style={{ color: '#2F4858' }} className="mb-3">
                Peta Navigasi Aktif
              </h4>
              <p className="body-3 mb-4" style={{ color: '#858585' }}>
                Peta akan menampilkan lokasi Anda secara real-time dan rute terbaik menuju alamat pelanggan
              </p>
              <div className="flex items-center justify-center gap-4 p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF8D28' }}></div>
                  <span className="body-3" style={{ color: '#858585' }}>Lokasi Anda</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4CAF50' }}></div>
                  <span className="body-3" style={{ color: '#858585' }}>Tujuan</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-auto p-4">
          <div className="text-center w-full">
            <User size={24} style={{ color: '#2196F3', margin: '0 auto 8px' }} />
            <p className="body-3" style={{ color: '#2F4858' }}>Hubungi Pelanggan</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto p-4">
          <div className="text-center w-full">
            <Package size={24} style={{ color: '#FF8D28', margin: '0 auto 8px' }} />
            <p className="body-3" style={{ color: '#2F4858' }}>Detail Pesanan</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto p-4">
          <div className="text-center w-full">
            <Navigation size={24} style={{ color: '#4CAF50', margin: '0 auto 8px' }} />
            <p className="body-3" style={{ color: '#2F4858' }}>Update Lokasi</p>
          </div>
        </Button>
      </div>

      {/* Delivery Tips */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#2F4858' }}>Tips Pengantaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4CAF50' }}>
                <span className="body-3" style={{ color: '#FFFFFF', fontSize: '12px' }}>✓</span>
              </div>
              <p className="body-3" style={{ color: '#4A4A4A' }}>
                Pastikan pesanan dalam kondisi baik sebelum diantar
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4CAF50' }}>
                <span className="body-3" style={{ color: '#FFFFFF', fontSize: '12px' }}>✓</span>
              </div>
              <p className="body-3" style={{ color: '#4A4A4A' }}>
                Hubungi pelanggan jika kesulitan menemukan alamat
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4CAF50' }}>
                <span className="body-3" style={{ color: '#FFFFFF', fontSize: '12px' }}>✓</span>
              </div>
              <p className="body-3" style={{ color: '#4A4A4A' }}>
                Update status pengiriman secara berkala
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
