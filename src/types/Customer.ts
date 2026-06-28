export interface Customer {
  _id: string;
  name: string;
  contact: string;
  email: string;
  orders: number;
  totalPurchases: number;
  tier: "VIP" | "Loyal" | "New";
}