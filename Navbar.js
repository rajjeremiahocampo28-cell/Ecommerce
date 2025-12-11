import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const linkStyle = (path) =>
    location.pathname === path ? 'text-[#4a503d] font-semibold' : 'hover:text-[#4a503d]';

  const handleLogout = () => {
    setUser(null);        // Clear login info
    navigate('/login');   // Redirect to login
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-[#f9f8f3] shadow-sm">

      <div className="flex items-center gap-6 nav-links">
        <img
          src="/logo.jpg"
          alt="Prestige Chronos"
          className="rounded-xl shadow-md logo"
        />

        <ul className="flex gap-6">
          <li><Link to="/" className={linkStyle("/")}>Home</Link></li>
          <li><Link to="/products" className={linkStyle("/products")}>Products</Link></li>
 
          <li><Link to="/cart" className={linkStyle("/cart")}>Cart</Link></li>
          <li><Link to="/order-history" className={linkStyle("/order-history")}>Order History</Link></li>
          <li><Link to="/login" className={linkStyle("/login")}>Login</Link></li>
          

          {/* SHOW ADMIN DASHBOARD ONLY IF ROLE = ADMIN */}
          {user?.role === "admin" && (
            <li><Link to="/admin-dashboard" className={linkStyle("/admin-dashboard")}>Admin</Link></li>
          )}
        </ul>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout ({user.username})
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
          
          </Link>
        )}
      </div>
    </nav>
  );
}