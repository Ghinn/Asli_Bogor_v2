import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Search, MapPin, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UMKMItem {
  id: number;
  name: string;
  category: string;
  address: string;
  image: string;
  description: string;
}

const umkmData: UMKMItem[] = [
  {
    id: 1,
    name: "Tahu Gejrot Pak Haji",
    category: "Makanan",
    address: "Jl. Suryakencana, Bogor Tengah",
    image: "https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400",
    description: "Tahu gejrot legendaris dengan bumbu khas Bogor yang pedas dan segar"
  },
  {
    id: 2,
    name: "Kerajinan Bambu Ibu Siti",
    category: "Kerajinan",
    address: "Jl. Pajajaran, Bogor Timur",
    image: "https://images.unsplash.com/photo-1575277340549-70f2441dee09?w=400",
    description: "Kerajinan anyaman bambu berkualitas tinggi dengan desain modern"
  },
  {
    id: 3,
    name: "Kopi Kenangan Bogor",
    category: "Minuman",
    address: "Jl. Ir. H. Juanda, Bogor",
    image: "https://images.unsplash.com/photo-1762592957827-99db60cfd0c7?w=400",
    description: "Kopi lokal Bogor dengan cita rasa yang khas dan nikmat"
  },
  {
    id: 4,
    name: "Makaroni Ngehe",
    category: "Makanan",
    address: "Jl. Raya Dramaga, Bogor Barat",
    image: "https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400",
    description: "Makaroni pedas khas Bogor yang terkenal lezat dan nagih"
  },
  {
    id: 5,
    name: "Batik Bogor Tradisiku",
    category: "Kerajinan",
    address: "Jl. Merdeka, Bogor Tengah",
    image: "https://images.unsplash.com/photo-1575277340549-70f2441dee09?w=400",
    description: "Batik dengan motif khas Bogor yang elegan dan berkelas"
  },
  {
    id: 6,
    name: "Es Pala Pak Sahak",
    category: "Minuman",
    address: "Jl. Empang, Bogor Selatan",
    image: "https://images.unsplash.com/photo-1762592957827-99db60cfd0c7?w=400",
    description: "Minuman segar khas Bogor dari buah pala pilihan"
  }
];

const categories = ["Semua", "Makanan", "Minuman", "Jasa", "Kerajinan"];

interface DirectorySectionProps {
  onSelectUMKM: (umkm: UMKMItem) => void;
}

export function DirectorySection({ onSelectUMKM }: DirectorySectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredUMKM = umkmData.filter(umkm => {
    const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || umkm.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="direktori" className="py-20 relative" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF4E6 100%)' }}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ color: '#2F4858' }} className="mb-4">
            Temukan UMKM Lokal
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '18px' }}>
            Jelajahi berbagai produk dan jasa dari UMKM terbaik di Bogor
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#858585' }} size={20} />
            <Input
              placeholder="Cari berdasarkan nama UMKM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 body-3 border-orange-200 focus:border-orange-400"
            />
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
            >
              <Button
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                style={
                  activeCategory === category
                    ? { background: 'linear-gradient(135deg, #FF8D28 0%, #FFB84D 100%)', color: '#FFFFFF', border: 'none' }
                    : { borderColor: '#E0E0E0', color: '#2F4858' }
                }
                className="body-3 hover-lift"
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* UMKM Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUMKM.map((umkm, index) => (
            <motion.div
              key={umkm.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card 
                className="overflow-hidden hover-lift cursor-pointer border-2 border-transparent hover:border-orange-300 transition-all"
                onClick={() => onSelectUMKM(umkm)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>4.8</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div 
                    className="inline-block px-3 py-1 rounded-full mb-3" 
                    style={{ 
                      background: umkm.category === 'Makanan' ? 'linear-gradient(135deg, #FFE5CC 0%, #FFD4A3 100%)' :
                                 umkm.category === 'Minuman' ? 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)' :
                                 'linear-gradient(135deg, #FFF4E6 0%, #FFE0B2 100%)'
                    }}
                  >
                    <span className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>{umkm.category}</span>
                  </div>
                  <h4 style={{ color: '#2F4858' }} className="mb-2">
                    {umkm.name}
                  </h4>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} style={{ color: '#858585' }} className="mt-1 flex-shrink-0" />
                    <p className="body-3" style={{ color: '#858585' }}>
                      {umkm.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredUMKM.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p style={{ color: '#858585' }}>
              Tidak ada UMKM yang ditemukan. Coba kata kunci lain.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
