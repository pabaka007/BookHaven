export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  isbn: string;
  stock_quantity: number;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  price: number;
  book?: Book;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}