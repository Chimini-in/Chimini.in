"use client";

import React from 'react';
import { useStore } from '@/context/StoreContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, changeCartQty, removeFromCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const isFreeShipping = subtotal >= 150;
  const shippingCost = isFreeShipping ? 0 : 15.00;
  const total = subtotal + shippingCost;

  return (
    <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} id="cartOverlay" onClick={(e) => {
      if (e.target.id === 'cartOverlay') setIsCartOpen(false);
    }}>
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Close Cart">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
        
        <div className="cart-body" id="cartBody">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <svg viewBox="0 0 24 24"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/></svg>
              <span className="cart-empty-text">Your cart is currently empty.</span>
              <button className="btn-accent" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.product.id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.product.name}</h4>
                    <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
                    <div className="cart-item-controls">
                      <div className="quantity-selector">
                        <button className="quantity-btn" onClick={() => changeCartQty(item.product.id, -1)}>-</button>
                        <span className="quantity-val">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => changeCartQty(item.product.id, 1)}>+</button>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer" id="cartFooter">
            <div className="cart-summary-line">
              <span>Shipping</span>
              {isFreeShipping ? (
                <strong style={{ color: 'var(--color-accent)' }}>FREE SHIPPING</strong>
              ) : (
                <span>${shippingCost.toFixed(2)}</span>
              )}
            </div>
            <div className="cart-summary-line cart-summary-total">
              <span>Estimated Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn-accent cart-checkout-btn" onClick={() => alert('Checkout initiated! Thank you for purchasing from CHIMINI.')}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
