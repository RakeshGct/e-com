// frontend/src/App.jsx
import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModel";
import "./App.css";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const handleCheckoutSuccess = (receiptData) => {
    setShowCheckout(false);
    setReceipt(receiptData);
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
  };

  const handleHomeClick = () => {
    setShowCart(false);
    setShowCheckout(false);
    setReceipt(null);
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar onCartClick={handleCartClick} onHomeClick={handleHomeClick} />

        <main className="main-content">
          <ProductGrid />
        </main>

        {showCart && (
          <Cart onCheckout={handleCheckout} onClose={handleCloseCart} />
        )}

        {showCheckout && (
          <CheckoutForm
            onSuccess={handleCheckoutSuccess}
            onCancel={handleCloseCheckout}
          />
        )}

        {receipt && (
          <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
        )}

        <footer className="footer">
          <p>&copy; 2024 Vibe Commerce. All rights reserved.</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
