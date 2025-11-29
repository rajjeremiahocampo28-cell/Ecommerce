import React, { useState } from "react";

function Checkout({ cart, clearCart, goBack }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <div className="checkout">
      <h2>💳 Checkout</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <p>Total Amount: ${total}</p>
          <button type="submit">Place Order</button>
          <button type="button" onClick={goBack} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </form>
      ) : (
        <p>
          ✅ Thank you, {name}! Your order (₱{total}) will be shipped to {address}.
        </p>
      )}
    </div>
  );
}

export default Checkout;