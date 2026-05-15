import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Checkout({ cart, total, onBack, onSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderResponse = await axios.post(`${API_URL}/orders/create`, {
        items: cart,
        total,
        paymentMethod,
        customerInfo
      });

      const newOrderId = orderResponse.data.order.id;
      setOrderId(newOrderId);

      // Process payment
      await axios.post(`${API_URL}/payment/process`, {
        orderId: newOrderId,
        paymentMethod,
        paymentDetails: {}
      });

      setStep(3);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Checkout</h2>
      </div>

      {step === 1 && (
        <form className="checkout-form" onSubmit={handleSubmitInfo}>
          <h3>Delivery Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Delivery Address</label>
            <textarea
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn">Continue to Payment →</button>
        </form>
      )}

      {step === 2 && (
        <form className="checkout-form" onSubmit={handlePayment}>
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <span>💵 Cash on Delivery</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>📱 UPI / Google Pay</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Debit / Credit Card</span>
            </label>
          </div>
          <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h3>Order Placed Successfully!</h3>
          <p>Order ID: {orderId}</p>
          <p>Thank you for your purchase. We'll send you a confirmation email shortly.</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
