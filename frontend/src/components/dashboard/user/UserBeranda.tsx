import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Search, Heart, ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { toast } from 'sonner';
import { PersonalizedGreeting } from '../../PersonalizedGreeting';
import { GamificationBadge } from '../../GamificationBadge';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  store: string;
  rating: number;
  sold: number;
  category: string;
}

export function UserBeranda() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Makanan', 'Minuman', 'Kerajinan', 'Jasa'];

  const products: Product[] = [
    {
      id: '1',
      name: 'Tahu Gejrot Original',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400',
      store: 'Tahu Gejrot Pak Haji',
      rating: 4.8,
      sold: 1234,
      category: 'Makanan'
    },
    {
      id: '2',
      name: 'Makaroni Ngehe Pedas',
      price: 20000,
      image: 'https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400',
      store: 'Makaroni Ngehe',
      rating: 4.9,
      sold: 2156,
      category: 'Makanan'
    },
    {
      id: '3',
      name: 'Es Pala Segar',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1762592957827-99db60cfd0c7?w=400',
      store: 'Es Pala Pak Sahak',
      rating: 4.7,
      sold: 987,
      category: 'Minuman'
    },
    {
      id: '4',
      name: 'Kopi Robusta Bogor',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1762592957827-99db60cfd0c7?w=400',
      store: 'Kopi Kenangan Bogor',
      rating: 4.9,
      sold: 1543,
      category: 'Minuman'
    },
    {
      id: '5',
      name: 'Anyaman Bambu',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1575277340549-70f2441dee09?w=400',
      store: 'Kerajinan Bambu Ibu Siti',
      rating: 4.6,
      sold: 234,
      category: 'Kerajinan'
    },
    {
      id: '6',
      name: 'Batik Motif Bogor',
      price: 150000,
      image: 'https://images.unsplash.com/photo-1575277340549-70f2441dee09?w=400',
      store: 'Batik Bogor Tradisiku',
      rating: 4.8,
      sold: 456,
      category: 'Kerajinan'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} ditambahkan ke keranjang!`);
  };

  const handleAddToWishlist = (productName: string) => {
    toast.success(`${productName} ditambahkan ke wishlist!`);
  };

  return (
    <div className="space-y-6">
      {/* Personalized Greeting */}
      <PersonalizedGreeting />

      {/* Gamification Badges */}
      <GamificationBadge role="user" />

      {/* Hero Banner */}
      <Card className="overflow-hidden">
        <div 
          className="p-8 lg:p-12"
          style={{ 
            background: 'linear-gradient(135deg, #FF8D28 0%, #2F4858 100%)'
          }}
        >
          <h2 style={{ color: '#FFFFFF' }} className="mb-4">
            Selamat Datang di Asli Bogor! 🎉
          </h2>
          <p style={{ color: '#FFFFFF', opacity: 0.9 }}>
            Temukan produk lokal terbaik dari UMKM Bogor pilihan
          </p>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#858585' }} size={20} />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                  style={
                    activeCategory === category
                      ? { backgroundColor: '#FF8D28', color: '#FFFFFF' }
                      : {}
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleAddToWishlist(product.name)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
              >
                <Heart size={20} style={{ color: '#FF8D28' }} />
              </button>
              <Badge 
                className="absolute top-3 left-3"
                style={{ backgroundColor: '#FDE08E', color: '#2F4858' }}
              >
                {product.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h4 style={{ color: '#2F4858' }} className="mb-2">
                {product.name}
              </h4>
              <p className="body-3 mb-2" style={{ color: '#858585' }}>
                {product.store}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star size={16} style={{ color: '#FFB800', fill: '#FFB800' }} />
                  <span className="body-3" style={{ color: '#2F4858' }}>{product.rating}</span>
                </div>
                <span className="body-3" style={{ color: '#CCCCCC' }}>•</span>
                <span className="body-3" style={{ color: '#858585' }}>{product.sold} terjual</span>
              </div>
              <div className="flex items-center justify-between">
                <p style={{ color: '#FF8D28', fontWeight: 600 }}>
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <Button
                  size="sm"
                  style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
                  onClick={() => handleAddToCart(product.name)}
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Beli
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p style={{ color: '#858585' }}>
              Tidak ada produk yang ditemukan. Coba kata kunci lain.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
