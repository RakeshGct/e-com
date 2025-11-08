// frontend/src/services/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Products API
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Cart API
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/cart/${itemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await axios.delete(`${API_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Checkout API
export const checkout = async (customerName, customerEmail, cartItems) => {
  try {
    const response = await axios.post(`${API_URL}/checkout`, {
      customerName,
      customerEmail,
      cartItems,
    });
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
