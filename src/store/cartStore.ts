import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Book } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book: Book, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.book.id === book.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.book.id === book.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { book, quantity }],
          };
        });
      },

      removeItem: (bookId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.book.id !== bookId),
        }));
      },

      updateQuantity: (bookId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(bookId);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.book.id === bookId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
      },

      getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-store',
    }
  )
);