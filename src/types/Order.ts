export interface Order {
  _id: string;

  billingDetails: {
    fullName: string;
    email: string;
    phone: string;
  };

  shippingDetails: {
    address: string;
    district: string;
    postalCode: string;
  };

  paymentMethod: string;

  total: number;

  status: string;

  items: {
    productId: string;
    name: string;
    qty: number;
    size: string;
    price: number;
  }[];

  createdAt: string;
}

export interface AdminOrder {
  _id: string;

  billingDetails: {
    fullName: string;
    email: string;
    phone: string;
  };

  shippingDetails: {
    address: string;
    district: string;
    postalCode: string;
  };

  paymentMethod: string;

  total: number;

  paymentStatus: PaymentStatus;

  status: OrderStatus;

  items: {
    productId: string;
    name: string;
    qty: number;
    size: string;
    price: number;
  }[];

  createdAt: string;
}

export type OrderStatus =
  | "Pending"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus = "Pending" | "Paid" | "Failed";

export const currency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(value)
