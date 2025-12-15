import { createContext, useContext } from 'react';

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useCart = () => useContext(CartContext);
