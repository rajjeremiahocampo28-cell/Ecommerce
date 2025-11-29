import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path ? 'text-[#4a503d] font-semibold' : 'hover:text-[#4a503d]';

return (
  
  <nav className="flex items-center justify-between px-8 py-5 bg-[#f9f8f3] shadow-sm">

    <div className="flex items-center gap-6 nav-links">
    <img src="/logo.jpg" alt="Prestige Chronos" 
      className="rounded-xl shadow-md logo" />
      
       <ul>
        <li><Link to="/" className={linkStyle("/")}>Home</Link></li>
        <li><Link to="/products" className={linkStyle("/products")}>Products</Link></li>
        <li><Link to="/contacts" className={linkStyle("/contacts")}>Contacts</Link></li>
        <li><Link to="/about" className={linkStyle("/about")}>About Us</Link></li>
        <li><Link to="/cart" className={linkStyle("/cart")}>Cart</Link></li>
      </ul>

      

    </div>
  </nav>
  
);
}