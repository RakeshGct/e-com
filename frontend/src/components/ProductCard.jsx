// frontend/src/components/ProductCard.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    const result = await addItem(product._id, 1);
    setAdding(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.stock < 10 && (
          <span className="stock-badge">Only {product.stock} left!</span>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`add-to-cart-btn ${adding ? "loading" : ""} ${
              showSuccess ? "success" : ""
            }`}
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            {adding ? "Adding..." : showSuccess ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
