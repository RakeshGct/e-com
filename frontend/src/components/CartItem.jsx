// frontend/src/components/CartItem.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    await updateItem(item._id, newQuantity);
  };

  const handleRemove = async () => {
    await removeItem(item._id);
  };

  const itemTotal = (item.productId.price * quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img
        src={item.productId.image}
        alt={item.productId.name}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.productId.name}</h4>
        <p className="cart-item-price">${item.productId.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>

        <div className="cart-item-total">
          <span className="total-label">Total:</span>
          <span className="total-amount">${itemTotal}</span>
        </div>

        <button
          className="remove-btn"
          onClick={handleRemove}
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
