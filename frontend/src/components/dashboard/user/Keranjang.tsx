import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';
import { Trash, Plus, Minus, ShoppingBag, Bike, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';
import type { OrderStatus } from '../../../contexts/OrderContext';
import { useOrderById, useOrderContext } from '../../../contexts/OrderContext';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
  selected: boolean;
}

export function Keranjang() {
  const { createOrder } = useOrderContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      productId: '1',
      name: 'Tahu Gejrot Original',
      price: 15000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400',
      store: 'Tahu Gejrot Pak Haji',
      selected: true
    },
    {
      id: '2',
      productId: '3',
      name: 'Es Pala Segar',
      price: 12000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1762592957827-99db60cfd0c7?w=400',
      store: 'Es Pala Pak Sahak',
      selected: true
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const toggleSelect = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(items =>
      items.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success('Item dihapus dari keranjang');
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = selectedItems.length > 0 ? 10000 : 0;
  const total = subtotal + shippingFee;

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'ewallet' | 'transfer' | 'cod'>('ewallet');
  const [deliveryStep, setDeliveryStep] = useState<0 | 1 | 2 | 3>(0);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const deliveryStages = [
    'Disiapkan di toko',
    'Diambil kurir',
    'Kurir hampir tiba',
    'Pesanan selesai',
  ];
  const deliveryProgress = Math.min((deliveryStep / 3) * 100, 100);
  const indicatorLeft = `${deliveryProgress}%`;
  const trackedOrder = useOrderById(trackingOrderId);
  const statusToStep: Record<OrderStatus, 0 | 1 | 2 | 3> = useMemo(
    () => ({
      preparing: 0,
      ready: 1,
      pickup: 2,
      delivered: 3,
    }),
    []
  );

  useEffect(() => {
    if (!trackedOrder) return;
    setDeliveryStep(statusToStep[trackedOrder.status] ?? 0);
    if (trackedOrder.status === 'delivered') {
      toast.success(`Pesanan #${trackedOrder.id.slice(-5)} sudah selesai diantar!`);
    }
  }, [trackedOrder, statusToStep]);

  const storeAddressMap = useMemo(
    () => ({
      'Tahu Gejrot Pak Haji': 'Jl. Suryakencana No. 123, Bogor',
      'Es Pala Pak Sahak': 'Jl. Pajajaran No. 78, Bogor',
    }),
    []
  );

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Pilih item yang ingin dibeli');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const proceedToPayment = async () => {
    setIsProcessingPayment(true);
    // Simulasi proses pembayaran
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsProcessingPayment(false);
    setIsPaymentDone(true);
    toast.success(`Pembayaran berhasil (${paymentMethod.toUpperCase()}).`);

    const groupedByStore = selectedItems.reduce<Record<string, CartItem[]>>((acc, item) => {
      if (!acc[item.store]) {
        acc[item.store] = [];
      }
      acc[item.store].push(item);
      return acc;
    }, {});

    const groupCount = Object.keys(groupedByStore).length || 1;
    const perGroupShipping = shippingFee / groupCount;

    const createdOrders = Object.entries(groupedByStore).map(([storeName, items]) => {
      const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const order = createOrder({
        storeId: slugify(storeName),
        storeName,
        storeAddress: storeAddressMap[storeName as keyof typeof storeAddressMap] ?? 'Bogor, Jawa Barat',
        items: items.map((item) => ({
          id: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: itemsTotal + perGroupShipping,
        deliveryFee: perGroupShipping,
        userName: 'Aisyah Putri',
        deliveryAddress: 'Jl. Pajajaran No. 45, Bogor',
        paymentMethod,
      });
      toast.info(`Pesanan baru terkirim ke ${storeName}.`);
      return order;
    });

    if (createdOrders.length > 0) {
      setTrackingOrderId(createdOrders[0].id);
    }

    setCartItems(items => items.filter(item => !item.selected));
  };

  const closeCheckoutDialog = () => {
    setIsCheckoutOpen(false);
    setIsProcessingPayment(false);
    setIsPaymentDone(false);
    setDeliveryStep(0);
  };

  return (
    <div className="space-y-6">
      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag size={48} style={{ color: '#CCCCCC', margin: '0 auto' }} />
            <h4 style={{ color: '#2F4858' }} className="mt-4 mb-2">
              Keranjang Kosong
            </h4>
            <p style={{ color: '#858585' }}>
              Belum ada produk di keranjang Anda
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Checkbox
                    checked={cartItems.every(item => item.selected)}
                    onCheckedChange={toggleSelectAll}
                  />
                  <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                    Pilih Semua ({cartItems.length} item)
                  </p>
                </div>

                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={() => toggleSelect(item.id)}
                      />
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 style={{ color: '#2F4858' }} className="mb-1">
                          {item.name}
                        </h4>
                        <p className="body-3 mb-2" style={{ color: '#858585' }}>
                          {item.store}
                        </p>
                        <p style={{ color: '#FF8D28', fontWeight: 600 }}>
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeItem(item.id)}>
                          <Trash size={20} style={{ color: '#F44336' }} />
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#E0E0E0' }}
                          >
                            <Minus size={16} style={{ color: '#2F4858' }} />
                          </button>
                          <Input
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center p-1"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded flex items-center justify-center"
                            style={{ backgroundColor: '#FF8D28' }}
                          >
                            <Plus size={16} style={{ color: '#FFFFFF' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h4 style={{ color: '#2F4858' }} className="mb-4">
                  Ringkasan Belanja
                </h4>
                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between">
                    <span className="body-3" style={{ color: '#858585' }}>
                      Subtotal ({selectedItems.length} item)
                    </span>
                    <span className="body-3" style={{ color: '#2F4858' }}>
                      Rp {subtotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="body-3" style={{ color: '#858585' }}>
                      Ongkos Kirim
                    </span>
                    <span className="body-3" style={{ color: '#2F4858' }}>
                      Rp {shippingFee.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <span style={{ color: '#2F4858', fontWeight: 600 }}>
                    Total
                  </span>
                  <h4 style={{ color: '#FF8D28' }}>
                    Rp {total.toLocaleString('id-ID')}
                  </h4>
                </div>
                <Button
                  className="w-full"
                  style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                >
                  Checkout ({selectedItems.length})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <AlertDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: '#2F4858' }}>
              {isPaymentDone ? 'Pembayaran Selesai' : 'Lanjut ke Pembayaran'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {!isPaymentDone ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkos Kirim</span>
                      <span>Rp {shippingFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span style={{ color: '#FF8D28' }}>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium" style={{ color: '#2F4858' }}>Metode Pembayaran</p>
                    <div className="grid gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pay"
                          checked={paymentMethod === 'ewallet'}
                          onChange={() => setPaymentMethod('ewallet')}
                        />
                        <span>E-Wallet (OVO/DANA/GoPay)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pay"
                          checked={paymentMethod === 'transfer'}
                          onChange={() => setPaymentMethod('transfer')}
                        />
                        <span>Transfer Bank (VA)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pay"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                        />
                        <span>Bayar di Tempat (COD)</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>Terima kasih! Pembayaran Anda sudah kami terima.</div>
                  <div className="space-y-4">
                    <div className="text-sm" style={{ color: '#2F4858' }}>
                      Pesanan Anda sedang diproses. Berikut status terkininya.
                    </div>
                    <div className="space-y-3">
                      <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E9EEF1' }}>
                        <div
                          className="absolute h-full transition-all duration-500"
                          style={{ width: `${deliveryProgress}%`, backgroundColor: '#FF8D28' }}
                        />
                        <div
                          className="absolute -top-3 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-500"
                          style={{
                            left: indicatorLeft,
                            transform: 'translateX(-50%)',
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                            border: '1px solid #FF8D28',
                          }}
                          aria-label={deliveryStages[deliveryStep]}
                          title={deliveryStages[deliveryStep]}
                        >
                          {deliveryStep < 3 ? (
                            deliveryStep === 0 ? (
                              <ShoppingBag size={14} style={{ color: '#FF8D28' }} />
                            ) : (
                              <Bike size={14} style={{ color: '#FF8D28' }} />
                            )
                          ) : (
                            <CheckCircle2 size={14} style={{ color: '#4CAF50' }} />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        {deliveryStages.map((stage, index) => (
                          <div
                            key={stage}
                            style={{
                              color: deliveryStep >= index ? '#FF8D28' : '#9AA6AF',
                              fontWeight: deliveryStep === index ? 600 : 500,
                            }}
                          >
                            {stage}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {!isPaymentDone ? (
              <>
                <AlertDialogCancel onClick={closeCheckoutDialog}>
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={proceedToPayment}
                  disabled={isProcessingPayment}
                  style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
                >
                  {isProcessingPayment ? 'Memproses...' : 'Lanjut ke Pembayaran'}
                </AlertDialogAction>
              </>
            ) : (
              <AlertDialogAction onClick={closeCheckoutDialog}>
                Selesai
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
