import { Client, Product, Session } from "@/model";



export const clients: Client[] = [
  {
    id: "1",
    name: "Ján Novák",
    discount: "10",
    paymentMethodPreference: "card",
    locationPreference: "online",
    generateInvoices: true,
  },
  {
    id: "2",
    name: "Mária Kováčová",
    discount: "5",
    paymentMethodPreference: "paypal",
    locationPreference: "in-person",
    generateInvoices: false,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Klasická Terapia",
    durationMinutes: 60,
    price: "50",
    paymentFinalization: "before",
  },
  {
    id: "2",
    name: "Skupinová Terapia",
    durationMinutes: 90,
    price: "30",
    paymentFinalization: "after",
  },
];

export const sessions: Session[] = [
  {
    id: "1",
    clientId: "1",
    productId: "1",
    name: "Sedenie s Ján Novák",
    date: new Date("2024-06-15T10:00:00"),
    durationMinutes: 60,
    price: "50",
    paymentFinalization: "before",
    discount: "10",
    paymentMethod: "card",
    location: "online",
    generateInvoice: true,
  },
  {
    id: "2",
    clientId: "2",
    productId: "2",
    name: "Sedenie s Mária Kováčová",
    date: new Date("2024-06-16T14:00:00"),
    durationMinutes: 90,
    price: "30",
    paymentFinalization: "after",
    discount: "5",
    paymentMethod: "paypal",
    location: "in-person",
    generateInvoice: false,
  },
];