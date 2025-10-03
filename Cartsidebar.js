import React from 'react';
import './CartSidebar.css';

function CartSidebar({ cart, setCart, onClose }) {

  const removeFromCart = (homeName) => {
    setCart(prev => prev.filter(item => item.name !== homeName));
  };

  const handleCheckout = () => {
    if(cart.length === 0){
      alert("Your cart is empty! 🛒");
      return;
    }
    alert(`Demo Checkout Complete! You inquired about ${cart.length} home(s) 🚀`);
    setCart([]);
    onClose();
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <h3>Your Cart / Inquiry</h3>
        {cart.length ? (
          <div className="cart-items">
            {cart.map((home, idx) => (
              <div key={idx} className="cart-item">
                <img src={home.image} alt={home.name} />
                <div className="cart-info">
                  <p>{home.name}</p>
                  <p>${home.price.toLocaleString()}</p>
                  <button onClick={() => removeFromCart(home.name)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty!</p>
        )}
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout / Send Inquiry
        </button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CartSidebar;
