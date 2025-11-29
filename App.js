import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./Homepage";
import AboutUs from "./AboutUs";
import Contacts from "./Contacts";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./Cart";
import Product from "./Product";
import Checkout from "./Checkout";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);

  // Cart functions
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="min-h-screen bg-[#f9f8f3]">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Products Page */}
          <Route path="/products" element={<ProductList addToCart={addToCart} />} />

          {/* Product Details */}
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <div className="cart-page">
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  proceedToCheckout={() => window.location.href = "/checkout"} 
                />
                <Product addToCart={addToCart} />
              </div>
            }
          />

          {/* Checkout Page */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                clearCart={clearCart}
                goBack={() => window.history.back()} // go back to cart
              />
            }
          />

          {/* Contacts and About */}
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}
