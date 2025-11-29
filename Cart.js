import React from "react";

function Cart({ cart, removeFromCart, proceedToCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span>
                  {item.name} - ${item.price}
                </span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button onClick={proceedToCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;