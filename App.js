import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import HomePage from "./Homepage";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./Cart";
import Product from "./Product";
import Checkout from "./Checkout";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import OrderHistory from "./OrderHistory";

import "./App.css";

export default function App() {
  // Cart & User State
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // store logged-in user

  // Products State (for admin management + user-facing products)
  const [products, setProducts] = useState([
    { id: 1, name: "Watch A", price: 100, img: "https://via.placeholder.com/80" },
    { id: 2, name: "Watch B", price: 150, img: "https://via.placeholder.com/80" },
  ]);

  // Cart Functions
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="min-h-screen bg-[#f9f8f3]">
        {/* PASS user + setUser to Navbar */}
        <Navbar user={user} setUser={setUser} />

        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Admin Page - Pass products + setProducts for management */}
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard products={products} setProducts={setProducts} />}
          />

          {/* Public Pages */}
          <Route path="/" element={<HomePage addToCart={addToCart} products={products} />} />
          <Route
            path="/products"
            element={<ProductList addToCart={addToCart} products={products} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetails addToCart={addToCart} products={products} />}
          />
          <Route path="/order-history" element={<OrderHistory />} />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <div className="cart-page flex gap-6">
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  proceedToCheckout={() => (window.location.href = "/checkout")}
                />
                <Product addToCart={addToCart} products={products} />
              </div>
            }
          />

          {/* Checkout Page */}
          <Route
            path="/checkout"
            element={<Checkout cart={cart} clearCart={clearCart} goBack={() => window.history.back()} />}
          />
        </Routes>
      </div>
    </Router>
  );
}