import { ReactNode } from "react";

// Common types definition for re-usability
type PaymentMethod = "card" | "paypal" | "bank-transfer";
type PaymentFinalization = "before" | "after"; // Client pays before or after the session
type Location = "online" | "in-person";

// Main entities
export type Client = {
  id: string;
  name: string;
  discount: string;
  paymentMethodPreference: PaymentMethod;
  locationPreference: Location;
  generateInvoices: boolean;
};

 export type Product = {
  id: string
  name: string
  durationMinutes: number;
  price: string;
  paymentFinalization: PaymentFinalization;
};

export type Session = {
  id: string;
  clientId: string;
  productId: string;
  name: string;
  date: Date;

  // Defaults from the Product
  durationMinutes: number;
  price: string;
  paymentFinalization: PaymentFinalization;

  // Defaults from the Client
  discount: string; // flat value in EUR
  paymentMethod: PaymentMethod;
  location: Location;
  generateInvoice: boolean;
};

export type MenuItem = {
    link: string;
    icon: ReactNode;
    text: string;
};

export type MenuGroup = {
    group: string;
    items: MenuItem[];
};