import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
