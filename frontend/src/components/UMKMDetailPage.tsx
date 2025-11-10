import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowLeft, MapPin, Phone, Clock, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UMKMDetailPageProps {
  umkm: {
    id: number;
    name: string;
    category: string;
    address: string;
    image: string;
    description: string;
  };
  onBack: () => void;
}

export function UMKMDetailPage({ umkm, onBack }: UMKMDetailPageProps) {
  const galleryImages = [
    umkm.image,
    "https://images.unsplash.com/photo-1680345576151-bbc497ba969e?w=400",
    "https://images.unsplash.com/photo-1762592957827-99db60cfd0c7?w=400",
    "https://images.unsplash.com/photo-1575277340549-70f2441dee09?w=400"
  ];

  // Google Maps embed URL for Bogor area
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56402638384!2d106.72782745!3d-6.595038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d2e602b5f5%3A0x4027980f0e5c7e0!2sBogor%2C%20West%20Java%2C%20Indonesia!5e0!3m2!1sen!2s!4v1234567890";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="body-3"
            style={{ color: '#2F4858' }}
          >
            <ArrowLeft className="mr-2" size={20} />
            Kembali ke Direktori
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#FDE08E' }}>
            <span className="body-3" style={{ color: '#2F4858' }}>{umkm.category}</span>
          </div>
          <h2 style={{ color: '#2F4858' }} className="mb-4">
            {umkm.name}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Information */}
          <div className="space-y-8">
            {/* Tentang Kami */}
            <div>
              <h3 style={{ color: '#2F4858' }} className="mb-4">
                Tentang Kami
              </h3>
              <p style={{ color: '#4A4A4A' }}>
                {umkm.description}
              </p>
              <p style={{ color: '#4A4A4A' }} className="mt-4">
                Kami berkomitmen untuk menghadirkan produk berkualitas tinggi dengan tetap mempertahankan cita rasa dan tradisi khas Bogor. Setiap produk dibuat dengan penuh dedikasi dan menggunakan bahan-bahan pilihan terbaik.
              </p>
            </div>

            {/* Informasi Kontak */}
            <div>
              <h3 style={{ color: '#2F4858' }} className="mb-4">
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} style={{ color: '#FF8D28' }} className="mt-1" />
                  <div>
                    <p className="body-3" style={{ color: '#858585' }}>Alamat</p>
                    <p style={{ color: '#2F4858' }}>{umkm.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} style={{ color: '#FF8D28' }} className="mt-1" />
                  <div>
                    <p className="body-3" style={{ color: '#858585' }}>Telepon</p>
                    <p style={{ color: '#2F4858' }}>+62 812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={20} style={{ color: '#FF8D28' }} className="mt-1" />
                  <div>
                    <p className="body-3" style={{ color: '#858585' }}>Jam Operasional</p>
                    <p style={{ color: '#2F4858' }}>Senin - Minggu: 08.00 - 20.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lokasi (Peta Interaktif - Wajib) */}
            <div>
              <h3 style={{ color: '#2F4858' }} className="mb-4">
                Lokasi
              </h3>
              <div className="w-full h-80 rounded-lg overflow-hidden border">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Peta lokasi ${umkm.name}`}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Gallery and Action */}
          <div className="space-y-8">
            {/* Galeri Foto (Wajib) */}
            <div>
              <h3 style={{ color: '#2F4858' }} className="mb-4">
                Galeri Foto
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((image, index) => (
                  <ImageWithFallback
                    key={index}
                    src={image}
                    alt={`${umkm.name} foto ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-[#F5F5F5] p-6 rounded-lg">
              <h4 style={{ color: '#2F4858' }} className="mb-3">
                Tertarik dengan produk kami?
              </h4>
              <p className="body-3 mb-6" style={{ color: '#858585' }}>
                Mulai pesan sekarang dan nikmati produk asli Bogor langsung dari toko ini!
              </p>
              <Button 
                style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}
                className="w-full"
              >
                Mulai Pesan dari Toko Ini
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border rounded-lg p-6">
              <h4 style={{ color: '#2F4858' }} className="mb-4">
                Keunggulan Kami
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF8D28' }}>
                    <span className="body-3" style={{ color: '#FFFFFF' }}>✓</span>
                  </div>
                  <p className="body-3" style={{ color: '#4A4A4A' }}>
                    Produk 100% asli dan berkualitas
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF8D28' }}>
                    <span className="body-3" style={{ color: '#FFFFFF' }}>✓</span>
                  </div>
                  <p className="body-3" style={{ color: '#4A4A4A' }}>
                    Pengiriman cepat ke seluruh Bogor
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF8D28' }}>
                    <span className="body-3" style={{ color: '#FFFFFF' }}>✓</span>
                  </div>
                  <p className="body-3" style={{ color: '#4A4A4A' }}>
                    Harga bersahabat langsung dari produsen
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
