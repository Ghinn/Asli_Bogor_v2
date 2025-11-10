import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';
import { Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { toast } from 'sonner';

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

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Pilih item yang ingin dibeli');
      return;
    }
    toast.success('Menuju halaman pembayaran...');
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
    </div>
  );
}
