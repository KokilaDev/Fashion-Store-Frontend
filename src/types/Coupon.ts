export interface Coupon {
  [x: string]: any;
  _id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  type: string;
  startDate: string;
  expiryDate: string;
  minOrderAmount: number;
  event?: string;
  isBirthdayMonthOffer?: boolean;
  isActive?: boolean;
}

export interface CouponForm {
  code: string;
  title: string;
  description: string;
  discount: number;
  type: string;
  startDate: string;
  expiryDate: string;
  minOrderAmount: number;
  event?: string;
  isBirthdayMonthOffer?: boolean;
  isActive?: boolean;
}

export const events = [
  "new-year",
  "christmas",
  "valentine",
  "year-end",
  "birthday",
  "birth-month",
  "order-value",
] as const;

export type CouponEvents = (typeof events)[number];