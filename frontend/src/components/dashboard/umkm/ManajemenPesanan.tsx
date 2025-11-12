import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Package, User, MapPin, Clock, Phone, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import type { Order, OrderStatus } from "../../../contexts/OrderContext";
import { useOrderContext } from "../../../contexts/OrderContext";

export function ManajemenPesanan() {
  const { orders, updateOrderStatus } = useOrderContext();
  const storeOptions = useMemo(() => {
    const unique = new Map<string, string>();
    orders.forEach((order) => {
      unique.set(order.storeId, order.storeName);
    });
    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  }, [orders]);
  const [activeStoreId, setActiveStoreId] = useState(() => storeOptions[0]?.id ?? "");

  useEffect(() => {
    if (storeOptions.length === 0) return;
    if (!storeOptions.some((option) => option.id === activeStoreId)) {
      setActiveStoreId(storeOptions[0].id);
    }
  }, [storeOptions, activeStoreId]);

  const storeOrders = useMemo(
    () => orders.filter((order) => !activeStoreId || order.storeId === activeStoreId),
    [orders, activeStoreId]
  );

  const newOrderIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    const currentIds = new Set(storeOrders.map((order) => order.id));
    if (!initializedRef.current) {
      newOrderIdsRef.current = currentIds;
      initializedRef.current = true;
      return;
    }
    storeOrders.forEach((order) => {
      if (!newOrderIdsRef.current.has(order.id) && order.status === "preparing") {
        toast.success(`Pesanan baru dari ${order.userName}`);
      }
    });
    newOrderIdsRef.current = currentIds;
  }, [storeOrders]);

  const statusMessages: Record<OrderStatus, string> = {
    preparing: "Pesanan sedang disiapkan",
    ready: "Pesanan siap! Driver segera diberi tahu.",
    pickup: "Driver dalam perjalanan ke toko",
    delivered: "Pesanan selesai diantar",
  };

  const getStatusInfo = (status: OrderStatus) => {
    const statusConfig: Record<OrderStatus, { label: string; color: string; textColor: string }> = {
      preparing: { label: "Sedang Disiapkan", color: "#B3E5FC", textColor: "#1976D2" },
      ready: { label: "Menunggu Driver", color: "#FDE08E", textColor: "#F57C00" },
      pickup: { label: "Sedang Diantar", color: "#C8E6C9", textColor: "#2E7D32" },
      delivered: { label: "Selesai", color: "#C8E6C9", textColor: "#2E7D32" },
    };
    return statusConfig[status];
  };

  const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    updateOrderStatus(orderId, nextStatus);
    toast.success(statusMessages[nextStatus]);
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const statusInfo = getStatusInfo(order.status);
    const itemsTotal = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const createdAt = new Date(order.createdAt).toLocaleString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 style={{ color: "#2F4858" }} className="mb-1">
                #{order.id.slice(-6).toUpperCase()}
              </h4>
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: "#858585" }} />
                <p className="body-3" style={{ color: "#858585" }}>
                  {createdAt}
                </p>
              </div>
            </div>
            <Badge style={{ backgroundColor: statusInfo.color, color: statusInfo.textColor }}>
              {statusInfo.label}
            </Badge>
          </div>

          {/* Customer Info */}
          <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: "#F5F5F5" }}>
            <div className="flex items-start gap-3 mb-3">
              <User size={20} style={{ color: "#2F4858" }} />
              <div className="flex-1">
                <p className="body-3" style={{ color: "#2F4858", fontWeight: 600 }}>
                  {order.userName}
                </p>
                <p className="body-3" style={{ color: "#858585", fontSize: "12px" }}>
                  {order.paymentMethod?.toUpperCase()} • {order.items.length} menu
                </p>
              </div>
              <Button variant="ghost" size="sm" style={{ color: "#2196F3" }}>
                <Phone size={16} />
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} style={{ color: "#FF8D28" }} />
              <p className="body-3" style={{ color: "#858585" }}>
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-4">
            <p className="body-3 mb-2" style={{ color: "#858585" }}>
              Pesanan ({itemsTotal} item)
            </p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.id}`} className="flex justify-between">
                  <p className="body-3" style={{ color: "#2F4858" }}>
                    {item.quantity}x {item.name}
                  </p>
                  <p className="body-3" style={{ color: "#858585" }}>
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t">
              <p style={{ color: "#2F4858", fontWeight: 600 }}>Total</p>
              <h4 style={{ color: "#FF8D28" }}>Rp {order.total.toLocaleString("id-ID")}</h4>
            </div>
          </div>

          {/* Driver Info */}
          {order.driverName && (
            <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: "#E3F2FD" }}>
              <p className="body-3" style={{ color: "#1976D2", fontWeight: 600 }}>
                Driver: {order.driverName}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {order.status === "preparing" && (
              <Button
                className="flex-1"
                style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
                onClick={() => handleStatusChange(order.id, "ready")}
              >
                <CheckCircle size={16} className="mr-2" />
                Pesanan Siap
              </Button>
            )}
            {order.status === "ready" && (
              <Button className="flex-1" style={{ backgroundColor: "#FF8D28", color: "#FFFFFF" }} disabled>
                Menunggu Driver
              </Button>
            )}
            {order.status === "pickup" && (
              <Button className="flex-1" variant="outline" disabled>
                Pesanan Dalam Pengiriman
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const newOrders = storeOrders.filter((o) => o.status === "preparing");
  const processingOrders = storeOrders.filter((o) => ["ready", "pickup"].includes(o.status));
  const completedOrders = storeOrders.filter((o) => o.status === "delivered");
  const activeStoreName =
    storeOptions.find((option) => option.id === activeStoreId)?.name ?? "Toko Anda";

  return (
    <div>
      {storeOptions.length > 1 && (
        <div className="mb-6">
          <label className="body-3 block mb-2" style={{ color: "#2F4858" }}>
            Pilih Toko
          </label>
          <select
            value={activeStoreId}
            onChange={(event) => setActiveStoreId(event.target.value)}
            className="w-full md:w-64 border rounded-md px-3 py-2"
            style={{ borderColor: "#E0E0E0", color: "#2F4858" }}
          >
            {storeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <h3 className="mb-4" style={{ color: "#2F4858" }}>
        Manajemen Pesanan - {activeStoreName}
      </h3>
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="new">Pesanan Baru ({newOrders.length})</TabsTrigger>
          <TabsTrigger value="processing">Diproses ({processingOrders.length})</TabsTrigger>
          <TabsTrigger value="completed">Selesai ({completedOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          {newOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package size={48} style={{ color: "#CCCCCC", margin: "0 auto" }} />
                <p style={{ color: "#858585" }} className="mt-4">
                  Tidak ada pesanan baru
                </p>
              </CardContent>
            </Card>
          ) : (
            newOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {processingOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p style={{ color: "#858585" }}>Tidak ada pesanan yang sedang diproses</p>
              </CardContent>
            </Card>
          ) : (
            processingOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p style={{ color: "#858585" }}>Belum ada pesanan selesai</p>
              </CardContent>
            </Card>
          ) : (
            completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
