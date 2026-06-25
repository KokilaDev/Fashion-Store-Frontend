export interface Coupon {
  _id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  type: string;
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
  expiryDate: string;
  minOrderAmount: number;
  event?: string;
  isBirthdayMonthOffer?: boolean;
  isActive?: boolean;
}