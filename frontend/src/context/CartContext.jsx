// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import * as api from "../services/api";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await api.getCart();
      setCart(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const data = await api.addToCart(productId, quantity);
      setCart(data);
      setError(null);
      return { success: true };
    } catch (err) {
      setError("Failed to add item to cart");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      const data = await api.updateCartItem(itemId, quantity);
      setCart(data);
      setError(null);
    } catch (err) {
      setError("Failed to update item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      setLoading(true);
      const data = await api.removeFromCart(itemId);
      setCart(data);
      setError(null);
    } catch (err) {
      setError("Failed to remove item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearCartItems = async () => {
    try {
      setLoading(true);
      await api.clearCart();
      setCart({ items: [], total: 0 });
      setError(null);
    } catch (err) {
      setError("Failed to clear cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCartCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCartItems,
    getCartCount,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
