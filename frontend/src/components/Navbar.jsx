// frontend/src/components/Navbar.jsx
import React from "react";
import { useCart } from "../context/CartContext";

const Navbar = ({ onCartClick, onHomeClick }) => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={onHomeClick}>
          <h1>🛍️ Vibe Commerce</h1>
        </div>
        <div className="navbar-actions">
          <button className="cart-button" onClick={onCartClick}>
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
