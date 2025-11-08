// frontend/src/components/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = ({ onCheckout, onClose }) => {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
            <button className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">${cart.total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
