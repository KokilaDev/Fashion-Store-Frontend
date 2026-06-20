export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  type: string;
  expiryDate: string;
  minOrderAmount: number;
}

export interface CouponForm {
  code: string;
  discount: number;
  type: string;
  expiryDate: string;
  minOrderAmount: number;
}