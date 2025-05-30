import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import './pages/Adminauth.css'; // Make sure this path matches your project structure

// Admin Login page component
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Set your admin credentials here
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('user', JSON.stringify({ isAdmin: true }));
      navigate('/admin');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-auth-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-auth-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit" className="admin-login-button">
          Login
        </button>
      </form>
    </div>
  );
};

// Protected admin route component
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
};

export default App;
