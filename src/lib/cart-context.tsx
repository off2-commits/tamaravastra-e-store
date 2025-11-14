import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tamaravastra-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tamaravastra-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existingIndex = current.findIndex(
        i => i.id === item.id && i.color === item.color
      );

      if (existingIndex >= 0) {
        const updated = [...current];
        const newQty = updated[existingIndex].quantity + 1;
        if (newQty <= item.maxStock) {
          updated[existingIndex].quantity = newQty;
          toast.success('Quantity updated in cart');
          return updated;
        } else {
          toast.error('Maximum stock reached');
          return current;
        }
      } else {
        toast.success('Added to cart');
        return [...current, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string, color: string) => {
    setItems(current => current.filter(i => !(i.id === id && i.color === color)));
    toast.success('Removed from cart');
  };

  const updateQuantity = (id: string, color: string, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.id === id && item.color === color
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxStock)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
