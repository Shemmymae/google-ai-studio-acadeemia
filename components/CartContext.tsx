
import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

export interface Addon {
  id: number;
  title: string;
  description: string;
  price: number;
  popular: boolean;
  type: 'SaaS' | 'Standalone';
  features: string[];
}

export interface CartItem extends Addon {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Addon) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('acadeemiaCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('acadeemiaCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Addon) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      }
      return prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };
  
  const clearCart = () => {
      setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
