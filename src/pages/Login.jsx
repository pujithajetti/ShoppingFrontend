import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleAdminLoginRedirect = () => {
    navigate('/admin-login');
  };

  return (
    <form onSubmit={login} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="password-input">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <button type="button" className="google-btn" onClick={loginWithGoogle}>
        Login with Google
      </button>
      <p>
        Don't have an account?{' '}
        <span onClick={handleSignupRedirect} className="nav-link">
          Sign up
        </span>
      </p>
      <p className="admin-login-link">
        Are you an admin?{' '}
        <span onClick={handleAdminLoginRedirect} className="nav-link">
          Admin Login
        </span>
      </p>
    </form>
  );
};

export default Login;
