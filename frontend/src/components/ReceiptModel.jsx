// frontend/src/components/ReceiptModal.jsx
import React from "react";

const ReceiptModal = ({ receipt, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p className="success-message">Thank you for your purchase</p>
        </div>

        <div className="receipt-content">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <div className="receipt-row">
              <span className="label">Order ID:</span>
              <span className="value">{receipt.orderId}</span>
            </div>
            <div className="receipt-row">
              <span className="label">Date:</span>
              <span className="value">{formatDate(receipt.orderDate)}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Customer Information</h3>
            <div className="receipt-row">
              <span className="label">Name:</span>
              <span className="value">{receipt.customerName}</span>
            </div>
            <div className="receipt-row">
              <span className="label">Email:</span>
              <span className="value">{receipt.customerEmail}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Items Ordered</h3>
            <div className="receipt-items">
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="receipt-total">
            <span className="total-label">Total Amount:</span>
            <span className="total-amount">${receipt.total}</span>
          </div>
        </div>

        <div className="receipt-footer">
          <p className="receipt-note">
            A confirmation email has been sent to {receipt.customerEmail}
          </p>
          <button className="close-receipt-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
