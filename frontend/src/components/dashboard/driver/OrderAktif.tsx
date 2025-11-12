import { useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { MapPin, Package, Clock, Navigation, Phone } from "lucide-react";
import { toast } from "sonner";
import { useOrderContext } from "../../../contexts/OrderContext";

export function OrderAktif() {
  const { orders, updateOrderStatus } = useOrderContext();

  const availableOrders = useMemo(
    () => orders.filter((order) => order.status === "ready" || order.status === "pickup"),
    [orders]
  );

  const newOrders = availableOrders.filter((order) => order.status === "ready");
  const inProgressOrders = availableOrders.filter((order) => order.status === "pickup");
  const totalEarnings = availableOrders.reduce((sum, order) => sum + order.deliveryFee, 0);

  const newOrderIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    const currentIds = new Set(newOrders.map((order) => order.id));
    if (!initializedRef.current) {
      newOrderIdsRef.current = currentIds;
      initializedRef.current = true;
      return;
    }
    newOrders.forEach((order) => {
      if (!newOrderIdsRef.current.has(order.id)) {
        toast.info(`Order baru siap diambil di ${order.storeName}`);
      }
    });
    newOrderIdsRef.current = currentIds;
  }, [newOrders]);

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, "pickup", {
      driverName: "Driver Satria",
      pickupTime: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    });
    toast.success("Order diterima! Segera menuju lokasi penjemputan.");
  };

  const handleCompleteOrder = (orderId: string) => {
    updateOrderStatus(orderId, "delivered");
    toast.success("Pesanan berhasil diantar! Upah telah ditambahkan ke dompet Anda.");
  };

  const getStatusBadge = (status: "ready" | "pickup") => {
    const styles = {
      ready: { bg: "#FDE08E", color: "#F57C00", label: "Order Baru" },
      pickup: { bg: "#B3E5FC", color: "#1976D2", label: "Sedang Diantar" },
    } as const;
    const style = styles[status];
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
            <p className="body-3" style={{ color: "#858585" }}>Order Baru</p>
            <h3 style={{ color: "#FF8D28" }}>{newOrders.length}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="body-3" style={{ color: "#858585" }}>Dalam Proses</p>
            <h3 style={{ color: "#2196F3" }}>{inProgressOrders.length}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="body-3" style={{ color: "#858585" }}>Estimasi Penghasilan</p>
            <h3 style={{ color: "#4CAF50" }}>
              Rp {totalEarnings.toLocaleString("id-ID")}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {availableOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 style={{ color: "#2F4858" }} className="mb-1">
                    #{order.id.slice(-6).toUpperCase()}
                  </h4>
                  <p className="body-3" style={{ color: "#858585" }}>
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} item • {order.storeName}
                  </p>
                </div>
                {getStatusBadge(order.status as "ready" | "pickup")}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Pickup Location */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: "#F5F5F5" }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FF8D28" }}>
                      <Package size={16} style={{ color: "#FFFFFF" }} />
                    </div>
                    <div className="flex-1">
                      <p className="body-3" style={{ color: "#858585", marginBottom: "4px" }}>Ambil di</p>
                      <p className="body-3" style={{ color: "#2F4858", fontWeight: 600 }}>{order.storeName}</p>
                      <p className="body-3" style={{ color: "#858585", fontSize: "12px" }}>{order.storeAddress}</p>
                    </div>
                  </div>
                  {order.pickupTime && (
                    <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: "#E0E0E0" }}>
                      <Clock size={14} style={{ color: "#858585" }} />
                      <p className="body-3" style={{ color: "#858585", fontSize: "12px" }}>
                        Dijemput: {order.pickupTime}
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Location */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: "#F5F5F5" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4CAF50" }}>
                      <MapPin size={16} style={{ color: "#FFFFFF" }} />
                    </div>
                    <div className="flex-1">
                      <p className="body-3" style={{ color: "#858585", marginBottom: "4px" }}>Antar ke</p>
                      <p className="body-3" style={{ color: "#2F4858", fontWeight: 600 }}>{order.userName}</p>
                      <p className="body-3" style={{ color: "#858585", fontSize: "12px" }}>{order.deliveryAddress}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full"
                    style={{ color: "#2196F3" }}
                  >
                    <Phone size={14} className="mr-1" />
                    Hubungi Pelanggan
                  </Button>
                </div>
              </div>

              {/* Fee and Actions */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#E0E0E0" }}>
                <div>
                  <p className="body-3" style={{ color: "#858585" }}>Upah Pengantaran</p>
                  <h4 style={{ color: "#4CAF50" }}>
                    Rp {order.deliveryFee.toLocaleString("id-ID")}
                  </h4>
                </div>
                <div className="flex gap-2">
                  {order.status === "ready" && (
                    <Button
                      style={{ backgroundColor: "#FF8D28", color: "#FFFFFF" }}
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Terima Order
                    </Button>
                  )}
                  {order.status === "pickup" && (
                    <Button
                      style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
                      onClick={() => handleCompleteOrder(order.id)}
                    >
                      Selesaikan Pengantaran
                    </Button>
                  )}
                  {(order.status === "ready" || order.status === "pickup") && (
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

      {availableOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package size={48} style={{ color: "#CCCCCC", margin: "0 auto" }} />
            <p style={{ color: "#858585" }} className="mt-4">
              Belum ada order aktif. Tunggu notifikasi order baru!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
