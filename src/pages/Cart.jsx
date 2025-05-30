// --- Cart.jsx ---
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const initialCart = location.state?.cart || JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemove = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart Page</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">No items in the cart.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-details">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            </div>
            <button className="remove-button" onClick={() => handleRemove(index)}>
              ❌ Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
