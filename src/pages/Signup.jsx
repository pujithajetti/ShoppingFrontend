import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/Login');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  const handleAdminLoginRedirect = () => {
    navigate('/admin-login');
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <button onClick={handleGoogleSignup} className="google-btn">
        Sign up with Google
      </button>

      <p>
        Already have an account?{' '}
        <span onClick={handleLoginRedirect} className="nav-link">
          Login
        </span>
      </p>

      <p className="admin-login-link">
        Are you an admin?{' '}
        <span onClick={handleAdminLoginRedirect} className="nav-link">
          Admin Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
