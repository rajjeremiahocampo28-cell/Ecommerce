import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ user, setUser }) {
  const [isSignup, setIsSignup] = useState(false);

  // Login fields
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Sign Up fields
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load accounts from localStorage OR add defaults
  useEffect(() => {
    const savedAccounts = JSON.parse(localStorage.getItem("accounts"));

    if (savedAccounts && savedAccounts.length > 0) {
      setAccounts(savedAccounts);
    } else {
      const defaultAcc = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "user", password: "user123", role: "user" }
      ];
      setAccounts(defaultAcc);
      localStorage.setItem("accounts", JSON.stringify(defaultAcc));
    }
  }, []);

  // Login Function
  const handleLogin = (e) => {
    e.preventDefault();

    if (!role) {
      setError("Please select if you are Admin or User.");
      return;
    }

    const foundUser = accounts.find(
      (acc) =>
        acc.role === role &&
        acc.username === username &&
        acc.password === password
    );

    if (!foundUser) {
      setError("Incorrect username, password, or role.");
      return;
    }

    setUser(foundUser);

    if (foundUser.role === "admin") navigate("/admin-dashboard");
    else navigate("/");
  };

  // Sign Up Function
  const handleSignup = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!newUsername || !newPassword) {
      setError("All fields are required.");
      return;
    }

    const newAcc = {
      username: newUsername,
      password: newPassword,
      role: "user"
    };

    const updatedAccounts = [...accounts, newAcc];
    setAccounts(updatedAccounts);

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    alert("Account created! You can now log in.");

    setNewUsername("");
    setNewPassword("");
    setConfirmPassword("");

    setIsSignup(false);
  };

  // Logout Function (ONLY visible at bottom of login page)
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="login-error">{error}</p>}

        {!isSignup ? (
          <>
            {/* LOGIN FORM */}
            <form onSubmit={handleLogin} className="login-form">

              <label className="login-label">Login as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="login-input"
              >
                <option value=""> Select Role </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <label className="login-label">Username</label>
              <input
                type="text"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label className="login-label">Password</label>
              <input
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-button">Login</button>
            </form>

            <p className="signup-text">Don't have an account?</p>
            <button className="signup-button" onClick={() => setIsSignup(true)}>
              Sign Up
            </button>
          </>
        ) : (
          <>
            {/* SIGN UP FORM */}
            <form onSubmit={handleSignup} className="login-form">

              <label className="login-label">Create Username</label>
              <input
                type="text"
                className="login-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />

              <label className="login-label">Create Password</label>
              <input
                type="password"
                className="login-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <label className="login-label">Confirm Password</label>
              <input
                type="password"
                className="login-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-button">
                Create Account
              </button>
            </form>

            <p className="signup-text">Already have an account?</p>
            <button className="signup-button" onClick={() => setIsSignup(false)}>
              Back to Login
            </button>
          </>
        )}

        {/* 👇 LOGOUT BUTTON — BOTTOM ONLY, ONLY IF LOGGED IN */}
        {user && (
          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout ({user.username})
          </button>
        )}
      </div>
    </div>
  );
}