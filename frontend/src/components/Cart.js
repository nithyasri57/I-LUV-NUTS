import React from 'react';

function Cart({ isOpen, cart, total, onClose, onUpdateQuantity, onRemove, onClear, onCheckout }) {
  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-left">
            <div className="cart-header-icon">🛒</div>
            <div>
              <h2>Your Cart</h2>
              <p>{cart.length} items</p>
            </div>
          </div>
          <button className="close-cart" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious nuts!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-header">
                    <h4>{item.name}</h4>
                    <button className="remove-item" onClick={() => onRemove(item.id)}>🗑️</button>
                  </div>
                  <div className="cart-item-price">₹{item.price}</div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="item-total">₹{item.price * item.quantity}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="cart-buttons">
              <button className="btn btn-clear" onClick={onClear}>Clear Cart</button>
              <button className="btn" onClick={onCheckout}>Checkout →</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
