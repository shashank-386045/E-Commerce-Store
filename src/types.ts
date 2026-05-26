/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details: string; // Materials, organic properties, size, etc.
  price: number; // in INR
  image: string;
  category: "Home & Living" | "Wellness" | "Tea & Spice" | "Decor" | "Electronics" | "Books" | "Beauty & Cosmetics" | "Handicrafts";
  stock: number;
  rating: number;
  reviews?: Review[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  status: OrderStatus;
  trackingNumber: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
