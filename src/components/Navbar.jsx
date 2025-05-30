import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
import '../pages/Home.css';

const Navbar = ({ cartCount, onCartClick }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Track auth state properly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup
  }, []);

  const getUserGreeting = () => {
    if (!user) return '';
    if (user.displayName) return `Hello, ${user.displayName}`;
    if (user.email) {
      const name = user.email.split('@')[0];
      return `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    }
    return 'Hello';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div 
        className="navbar-logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer' }}
        aria-label="Go to homepage"
      >
        🛒 ShopEase
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {!user ? (
          <>
            <button className="cart-button" onClick={() => navigate('/Login')}>Login</button>
            <button className="cart-button" onClick={() => navigate('/Signup')}>Signup</button>
          </>
        ) : (
          <>
            <span style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
              {getUserGreeting()}
            </span>
            <button className="cart-button" onClick={onCartClick}>
              View Cart ({cartCount})
            </button>
            <button className="cart-button" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
