export interface OrderCancellationData {
  email: string;
  userName: string;
  orderId: string;
}

export interface OtpVerificationData {
  email: string;
  userName: string;
  otp: string;
  orderId: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ShippingAddress {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface ShippingAddressResponse {
  success: boolean;
  shippingAddress: ShippingAddress | null;
  error?: string;
  [key: string]: unknown;
}
