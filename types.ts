export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  contactNumber: string;
  email: string;
  items: CartItem[];
  total: number;
  deliveryMethod: 'pickup' | 'delivery';
  address?: string;
  timestamp: string;
  status: 'pending' | 'completed';
}

export interface Inventory {
  [productId: string]: number;
}