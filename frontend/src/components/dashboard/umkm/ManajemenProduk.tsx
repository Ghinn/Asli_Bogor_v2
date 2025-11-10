import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Plus, Edit, Trash, Star } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  sold: number;
  rating: number;
  status: 'active' | 'inactive';
}

export function ManajemenProduk() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Tahu Gejrot Original',
      price: 15000,
      stock: 50,
      category: 'Makanan',
      description: 'Tahu gejrot dengan bumbu khas yang pedas dan segar',
      image: 'https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400',
      sold: 234,
      rating: 4.8,
      status: 'active'
    },
    {
      id: '2',
      name: 'Tahu Gejrot Pedas',
      price: 15000,
      stock: 30,
      category: 'Makanan',
      description: 'Tahu gejrot dengan level kepedasan ekstra',
      image: 'https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400',
      sold: 189,
      rating: 4.9,
      status: 'active'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: ''
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        description: product.description,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: formData.name,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock),
              category: formData.category,
              description: formData.description,
              image: formData.image
            }
          : p
      ));
      toast.success('Produk berhasil diperbarui!');
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        description: formData.description,
        image: formData.image,
        sold: 0,
        rating: 0,
        status: 'active'
      };
      setProducts([...products, newProduct]);
      toast.success('Produk berhasil ditambahkan!');
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Produk berhasil dihapus!');
  };

  const toggleStatus = (id: string) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'inactive' as const : 'active' as const }
        : p
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 style={{ color: '#2F4858' }}>Manajemen Produk</h3>
          <p className="body-3" style={{ color: '#858585' }}>
            Kelola produk toko Anda
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
        >
          <Plus size={20} className="mr-2" />
          Tambah Produk
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <Badge
                className="absolute top-3 right-3"
                style={{
                  backgroundColor: product.status === 'active' ? '#C8E6C9' : '#FFCDD2',
                  color: product.status === 'active' ? '#2E7D32' : '#C62828'
                }}
              >
                {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h4 style={{ color: '#2F4858' }} className="mb-2">
                {product.name}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <Badge style={{ backgroundColor: '#FDE08E', color: '#2F4858' }}>
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star size={14} style={{ color: '#FFB800', fill: '#FFB800' }} />
                  <span className="body-3" style={{ color: '#858585' }}>{product.rating}</span>
                </div>
              </div>
              <p className="body-3 mb-3" style={{ color: '#858585' }}>
                {product.description.substring(0, 60)}...
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="body-3" style={{ color: '#858585' }}>Harga</span>
                  <span className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="body-3" style={{ color: '#858585' }}>Stok</span>
                  <span className="body-3" style={{ color: product.stock < 10 ? '#F44336' : '#2F4858', fontWeight: 600 }}>
                    {product.stock} unit
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="body-3" style={{ color: '#858585' }}>Terjual</span>
                  <span className="body-3" style={{ color: '#4CAF50', fontWeight: 600 }}>
                    {product.sold} unit
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleOpenDialog(product)}
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleStatus(product.id)}
                  style={{
                    borderColor: product.status === 'active' ? '#F44336' : '#4CAF50',
                    color: product.status === 'active' ? '#F44336' : '#4CAF50'
                  }}
                >
                  {product.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p style={{ color: '#858585' }}>
              Belum ada produk. Klik tombol "Tambah Produk" untuk mulai.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: '#2F4858' }}>
              {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Perbarui informasi produk Anda' : 'Tambahkan produk baru ke toko Anda'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="body-3">Nama Produk *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Tahu Gejrot Original"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="body-3">Harga *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="15000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="body-3">Stok *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="body-3">Kategori *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Makanan">Makanan</SelectItem>
                  <SelectItem value="Minuman">Minuman</SelectItem>
                  <SelectItem value="Kerajinan">Kerajinan</SelectItem>
                  <SelectItem value="Jasa">Jasa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="body-3">Deskripsi *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsikan produk Anda..."
                className="min-h-24"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                className="flex-1"
                style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
                onClick={handleSave}
              >
                {editingProduct ? 'Perbarui' : 'Tambah'} Produk
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
