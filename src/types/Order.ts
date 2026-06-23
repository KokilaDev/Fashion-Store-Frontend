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