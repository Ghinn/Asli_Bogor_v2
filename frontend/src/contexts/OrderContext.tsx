import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type OrderStatus = "preparing" | "ready" | "pickup" | "delivered";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  storeAddress: string;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  status: OrderStatus;
  createdAt: string;
  userName: string;
  deliveryAddress: string;
  paymentMethod?: string;
  driverName?: string;
  driverId?: string;
  pickupTime?: string;
}

export interface CreateOrderInput {
  storeId: string;
  storeName: string;
  storeAddress: string;
  items: OrderItem[];
  total: number;
  deliveryFee?: number;
  userName: string;
  deliveryAddress: string;
  paymentMethod?: string;
}

type OrderAction =
  | { type: "LOAD"; payload: Order[] }
  | { type: "CREATE"; payload: Order }
  | { type: "UPDATE"; payload: { id: string; changes: Partial<Order> } }
  | { type: "CLEAR" };

interface OrderContextValue {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    changes?: Partial<Order>
  ) => void;
  updateOrder: (orderId: string, changes: Partial<Order>) => void;
  clearOrders: () => void;
}

const ORDER_STORAGE_KEY = "asli-bogor-orders";

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

const generateOrderId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `order-${Date.now()}-${Math.round(Math.random() * 100000)}`;
};

const loadInitialOrders = (): Order[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Order[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.warn("Failed to load orders from storage", error);
    return [];
  }
};

const orderReducer = (state: Order[], action: OrderAction): Order[] => {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "CREATE":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((order) =>
        order.id === action.payload.id
          ? { ...order, ...action.payload.changes }
          : order
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

interface OrderProviderProps {
  children: React.ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, dispatch] = useReducer(orderReducer, [], loadInitialOrders);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = (input: CreateOrderInput): Order => {
    const deliveryFee =
      input.deliveryFee ??
      Math.max(8000, Math.round((input.total * 0.12) / 1000) * 1000);
    const order: Order = {
      ...input,
      id: generateOrderId(),
      deliveryFee,
      status: "preparing",
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "CREATE", payload: order });
    return order;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    changes?: Partial<Order>
  ) => {
    dispatch({
      type: "UPDATE",
      payload: { id: orderId, changes: { status, ...changes } },
    });
  };

  const updateOrder = (orderId: string, changes: Partial<Order>) => {
    dispatch({
      type: "UPDATE",
      payload: { id: orderId, changes },
    });
  };

  const clearOrders = () => {
    dispatch({ type: "CLEAR" });
  };

  const value = useMemo<OrderContextValue>(
    () => ({
      orders,
      createOrder,
      updateOrderStatus,
      updateOrder,
      clearOrders,
    }),
    [orders]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
}

export function useOrders() {
  return useOrderContext().orders;
}

export function useOrderById(orderId: string | null | undefined) {
  const { orders } = useOrderContext();
  if (!orderId) return undefined;
  return orders.find((order) => order.id === orderId);
}

